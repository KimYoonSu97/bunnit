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
import { useCalendarContext } from './context/CelanderContext';
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
  console.log('totalWeeks', date.format('YYYY-MM'));
  console.log(totalWeeks);
  return totalWeeks;
};

const useGestureCalendar = () => {
  const {
    calenderDataDay,
    currentDay: today,
    selectWeekIndex,
    setSelectWeekIndex,
    currentWeek,
    selectDate,
  } = useCalendarContext();

  // const [_, setSelectWeekIndex] = useState(getWeekOfMonth(dayjs()));

  const [currentDay, setCurrentDay] = useState<dayjs.Dayjs>(dayjs());
  const currentMonthWeekCount = getTotalWeeksInMonth(currentDay);

  const [isWeekly, setIsWeekly] = useState(false);
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
    //   // 만약 선택된 날이 별도로 있을때
    if (selectDate) {
      // 만약 선택된 날이 해당하는 월과 같은 월이라면
      if (selectDate.isSame(calenderDataDay, 'month')) {
        // 그러면 선택된 날의 주를 기준으로 주 캘린더를 그리면 됩니다.
        setSelectWeekIndex(getWeekOfMonth(selectDate) - 1);
      } else {
        // 그러면 캘린더를 그리는 달의 첫번째 주를 기준으로 주 캘린더를 그리면 됩니다.
        setSelectWeekIndex(0);
      }
    } else {
      // 만약 선택된 날이 별도로 없다면?

      //만약 캘린더를 그리는 달이 오늘과 같은 월이라면?
      if (calenderDataDay.isSame(today, 'month')) {
        // 그러면 오늘의 주를 기준으로 주 캘린더를 그리면 됩니다.
        setSelectWeekIndex(getWeekOfMonth(calenderDataDay) - 1);
      } else {
        // 그러면 캘린더를 그리는 달의 첫번째 주를 기준으로 주 캘린더를 그리면 됩니다.
        setSelectWeekIndex(0);
      }
    }
  }, [calenderDataDay, today, setSelectWeekIndex, selectDate]);

  const pan = Gesture.Pan().onEnd(e => {
    if (isWeekly) {
      // 주 -> 월로 갈때
      if (e.translationY > 50) {
        // 월캘린더로 바꾸기 전에 주 캘린더에보이는 값으로 포지션을 조정해야해요.
        position.value = currentWeek * (40 + 10) * -1;
        runOnJS(toMonthly)();

        height.value = withTiming(currentMonthWeekCount * (40 + 10), {
          duration: 1000,
        });
        opacity.value = withTiming(1, { duration: 1000 });
        position.value = withTiming(0, { duration: 1000 }, () => {});
      } else {
        opacity.value = withTiming(0, { duration: 1000 });
        position.value = withTiming(selectWeekIndex * (40 + 10) * -1, {
          duration: 1000,
        });
        height.value = withTiming(40, { duration: 1500 });
      }
    } else {
      // 월 -> 주로 갈때

      if (e.translationY < -50) {
        opacity.value = withTiming(0, { duration: 1000 });
        height.value = withTiming(40, { duration: 1000 }, () => {});
        position.value = withTiming(
          selectWeekIndex * (40 + 10) * -1,
          {
            duration: 1000,
          },
          () => {
            runOnJS(toWeekly)();
          },
        );

        
      } else {
        opacity.value = withTiming(1, { duration: 1000 });
        position.value = withTiming(0, { duration: 1000 });
        height.value = withTiming(currentMonthWeekCount * (40 + 10), {
          duration: 1000,
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
