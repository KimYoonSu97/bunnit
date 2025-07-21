import { useState, useCallback, useMemo } from 'react';
import { Gesture } from 'react-native-gesture-handler';
import {
  useSharedValue,
  withTiming,
  withDelay,
  runOnJS,
  useAnimatedStyle,
} from 'react-native-reanimated';
import { useCalendarContext } from './context/CalenderContext';

const useGestureCalendar = () => {
  const [isMonthly, setIsMonthly] = useState(true);
  const {
    currentWeeklyCalendarIndex,
    monthlyCalendarData,
    weeklyCalendarData,
  } = useCalendarContext();

  const changeMonthly = useCallback(() => {
    setIsMonthly(true);
  }, []);

  const changeWeekly = useCallback(() => {
    setIsMonthly(false);
  }, []);

  const monthlyCalendarPosition = useSharedValue(0);
  const monthlyCalendarOpacity = useSharedValue(1);

  const pan = useMemo(
    () =>
      Gesture.Pan().onEnd(e => {
        if (e.translationY < -40) {
          if (isMonthly) {
            monthlyCalendarPosition.value = 0;
            monthlyCalendarOpacity.value = withTiming(0, {
              duration: 500,
            });
            monthlyCalendarPosition.value = withDelay(
              100,
              withTiming(
                currentWeeklyCalendarIndex * -50 + 50,
                {
                  duration: 500,
                },
                () => {
                  runOnJS(changeWeekly)();
                },
              ),
            );
          }
        }
        if (e.translationY > 40) {
          if (!isMonthly) {
            monthlyCalendarPosition.value =
              currentWeeklyCalendarIndex * -50 + 50;
            runOnJS(changeMonthly)();
            monthlyCalendarOpacity.value = withTiming(1, {
              duration: 500,
            });
            monthlyCalendarPosition.value = withDelay(
              100,
              withTiming(0, {
                duration: 500,
              }),
            );
          }
        }
      }),
    [
      isMonthly,
      currentWeeklyCalendarIndex,
      changeMonthly,
      changeWeekly,
      monthlyCalendarOpacity,
      monthlyCalendarPosition,
    ],
  );

  const monthlyCalendarStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateY: monthlyCalendarPosition.value }],
    };
  });

  return {
    pan,
    monthlyCalendarStyle,
    monthlyCalendarOpacity,
    monthlyCalendarPosition,
    isMonthly,
    monthlyCalendarData,
    weeklyCalendarData,
  };
};

export default useGestureCalendar;
