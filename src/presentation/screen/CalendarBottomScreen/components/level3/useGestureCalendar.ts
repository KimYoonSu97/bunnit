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
  const [showMonthly, setShowMonthly] = useState(true);
  const [showWeekly, setShowWeekly] = useState(false);
  const {
    currentWeeklyCalendarIndex,
    monthlyCalendarData,
    weeklyCalendarData,
  } = useCalendarContext();

  const changeToMonthly = useCallback(() => {
    // 주 -> 월: 월캘린더 즉시 마운트, 0.1초 후 주캘린더 언마운트
    setShowMonthly(true);
    setTimeout(() => {
      setShowWeekly(false);
      setIsMonthly(true);
    }, 100);
  }, []);

  const changeToWeekly = useCallback(() => {
    // 월 -> 주: 주캘린더 마운트, 0.1초 후 월캘린더 언마운트
    setShowWeekly(true);
    setTimeout(() => {
      setShowMonthly(false);
      setIsMonthly(false);
    }, 100);
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
                  runOnJS(changeToWeekly)();
                },
              ),
            );
          }
        }
        if (e.translationY > 40) {
          if (!isMonthly) {
            monthlyCalendarPosition.value =
              currentWeeklyCalendarIndex * -50 + 50;
            runOnJS(changeToMonthly)();
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
      changeToMonthly,
      changeToWeekly,
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
    showMonthly,
    showWeekly,
    monthlyCalendarData,
    weeklyCalendarData,
  };
};

export default useGestureCalendar;
