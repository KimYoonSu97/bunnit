import { View, Text, Dimensions, Button } from 'react-native';
import React, { useEffect, useState } from 'react';
import MonthlyCalendarBody from './components/MonthlyCalendarBody';
import WeeklyCalendarBody from './components/WeeklyCalendarBody';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import Animated, {
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withTiming,
} from 'react-native-reanimated';
import { useCalendarContext } from './context/CalenderContext';
import { CALENDAR_DAY_LIST } from '../../../../../core/constant/calendar';

const width = Dimensions.get('window').width;

const GestureCalendar = () => {
  const [isMonthly, setIsMonthly] = useState(true);
  const {
    currentWeeklyCalendarIndex,
    monthlyCalendarData,
    weeklyCalendarData,
  } = useCalendarContext();
  const changeMonthly = () => {
    setIsMonthly(true);
  };
  const changeWeekly = () => {
    setIsMonthly(false);
  };

  const monthlyCalendarPosition = useSharedValue(0);
  const monthlyCalendarOpacity = useSharedValue(1);
  const calendarBodyHeight = useSharedValue(300);

  const pan = Gesture.Pan()
    .onUpdate(e => {
      console.log(e.translationX);
    })
    .onEnd(e => {
      //위로 스와이프
      if (e.translationY < -40) {
        monthlyCalendarPosition.value = 0;
        if (isMonthly) {
          monthlyCalendarOpacity.value = withTiming(0, {
            duration: 500,
          });
          calendarBodyHeight.value = withTiming(40, {
            duration: 500,
          });
          monthlyCalendarPosition.value = withDelay(
            0,
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
          monthlyCalendarPosition.value = currentWeeklyCalendarIndex * -50 + 50;
          runOnJS(changeMonthly)();
          monthlyCalendarOpacity.value = withTiming(1, {
            duration: 500,
          });
          calendarBodyHeight.value = withTiming(300, {
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
    });

  const monthlyCalendarStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateY: monthlyCalendarPosition.value }],
    };
  });

  return (
    <View style={{ flex: 1 }}>
      <View
        style={{
          width: width,
          padding: 10,
        }}
      >
        <Text style={{ fontSize: 20, fontWeight: 'bold' }}>
          {isMonthly
            ? `${monthlyCalendarData.format(
                'YYYY',
              )}년 ${monthlyCalendarData.format('MM')}월`
            : `${weeklyCalendarData.format(
                'YYYY',
              )}년 ${weeklyCalendarData.format('MM')}월`}
        </Text>
      </View>
      <View
        style={{
          width: width,

          flexDirection: 'row',
          justifyContent: 'space-around',
          paddingHorizontal: 16,
          paddingVertical: 10,
          gap: 10,
        }}
      >
        {CALENDAR_DAY_LIST.map((item, index) => {
          return (
            <View
              key={index}
              style={{
                flex: 1,
                // backgroundColor: 'pink',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Text style={{ textAlign: 'center' }}>{item}</Text>
            </View>
          );
        })}
      </View>
      <GestureDetector gesture={pan}>
        <Animated.View
          style={[
            { overflow: 'hidden', height: isMonthly ? 300 : 40 },
            // calendarBodyHeightStyle,
          ]}
        >
          {isMonthly ? (
            <Animated.View style={[monthlyCalendarStyle, { flex: 1 }]}>
              <MonthlyCalendarBody opacity={monthlyCalendarOpacity} />
            </Animated.View>
          ) : (
            <WeeklyCalendarBody />
          )}
        </Animated.View>
      </GestureDetector>
    </View>
  );
};

export default GestureCalendar;
