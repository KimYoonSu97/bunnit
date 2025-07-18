import { View, Text } from 'react-native';
import React, { useEffect, useState } from 'react';
import dayjs from 'dayjs';
import { Gesture } from 'react-native-gesture-handler';
import {
  useSharedValue,
  runOnJS,
  withTiming,
  useAnimatedStyle,
} from 'react-native-reanimated';
const getWeekOfMonth = (date: dayjs.Dayjs) => {
  const startOfMonth = date.startOf('month'); // 해당 달의 1일
  const startDayOfWeek = startOfMonth.day(); // 0: 일요일, 6: 토요일

  const dayOfMonth = date.date(); // 현재 날짜 (ex: 1~31)

  // 1일부터 현재 날짜까지 지난 날 수 + 요일 오프셋
  const offset = startDayOfWeek;
  const adjustedDay = dayOfMonth + offset;

  // 주차 계산
  const week = Math.ceil(adjustedDay / 7);

  return week;
};

export const getTotalWeeksInMonth = (date: dayjs.Dayjs): number => {
  const startOfMonth = date.startOf('month'); // 해당 월 1일
  const endOfMonth = date.endOf('month'); // 해당 월 마지막일
  const startDayOfWeek = startOfMonth.day(); // 0 = 일요일, 6 = 토요일

  const totalDaysInMonth = endOfMonth.date();

  // 예: 1일이 토요일(6)이면 → 6일 오프셋 필요
  const adjustedTotal = startDayOfWeek + totalDaysInMonth;

  const totalWeeks = Math.ceil(adjustedTotal / 7);
console.log('totalWeeks',date.format('YYYY-MM'))
console.log(totalWeeks)
  return totalWeeks;
};

const useGestureCalendar = () => {
  const [selectWeekIndex, setSelectWeekIndex] = useState(
    getWeekOfMonth(dayjs()),
  );
  const [selectDay, setSelectDay] = useState<dayjs.Dayjs>(dayjs());
  const [currentDay, setCurrentDay] = useState<dayjs.Dayjs>(dayjs());
  const currentMonthWeekCount = getTotalWeeksInMonth(currentDay);

  const [isWeekly, setIsWeekly] = useState(false);
  const isWeeklyCalendar = useSharedValue(false);
  const height = useSharedValue(currentMonthWeekCount * (40 + 10));
  const position = useSharedValue(0);
  const opacity = useSharedValue(1);
  const toWeekly = () => {
    setIsWeekly(true);
  };
  const toMonthly = () => {
    setIsWeekly(false);
  };

  useEffect(() => {
    console.log('selectWeekIndex', selectWeekIndex);
  }, [selectWeekIndex]);

  const pan = Gesture.Pan().onEnd(e => {
    if (isWeeklyCalendar.value) {
      if (e.translationY > 50) {
        runOnJS(toMonthly)();

        isWeeklyCalendar.value = false;
        opacity.value = withTiming(1, { duration: 1000 });
        position.value = withTiming(0, { duration: 1000 });
        height.value = withTiming(currentMonthWeekCount * (40 + 10), {
          duration: 1500,
        });
      } else {
        opacity.value = withTiming(0, { duration: 1000 });
        position.value = withTiming(selectWeekIndex * (40 + 10) * -1, {
          duration: 1000,
        });
        height.value = withTiming(40, { duration: 1500 });
      }
    } else {
      if (e.translationY < -50) {
        opacity.value = withTiming(0, { duration: 1000 });
        position.value = withTiming(selectWeekIndex * (40 + 10) * -1, {
          duration: 1000,
        });
        height.value = withTiming(40, { duration: 1500 }, () => {
          runOnJS(toWeekly)();
        });
        isWeeklyCalendar.value = true;
      } else {
        opacity.value = withTiming(1, { duration: 1000 });
        position.value = withTiming(0, { duration: 1000 });
        height.value = withTiming(currentMonthWeekCount * (40 + 10), {
          duration: 1500,
        });
      }
    }
  });

  const heightAnimatedStyle = useAnimatedStyle(() => ({
    height: height.value,
  }));

  const positionAnimatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: position.value }],
  }));

  const opacityAnimatedStyle = useAnimatedStyle(() => {
    return { opacity: opacity.value };
  });

  return {
    selectDay,
    setSelectDay,
    selectWeekIndex,
    setSelectWeekIndex,
    heightAnimatedStyle,
    positionAnimatedStyle,
    pan,
    isWeekly,
    currentDay,
    setCurrentDay,
    opacityAnimatedStyle,
  };
};

export default useGestureCalendar;
