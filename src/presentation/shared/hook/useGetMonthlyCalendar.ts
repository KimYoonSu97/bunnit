import { View, Text } from 'react-native';
import React, { useMemo, useState } from 'react';
import dayjs from 'dayjs';

const useGetMonthlyCalendar = ({ day }: { day?: dayjs.Dayjs }) => {
  // day를 받아오게되면 해당 day에 맞는 월의 캘린더 정보, 없다면 오늘날짜 기준의 캘린더 정보
  const [currentMonth, setCurrentMonth] = useState<dayjs.Dayjs>(
    day ? day : dayjs(),
  );
  const dayItemList = useMemo(() => {
    const startDayOfMonth = dayjs(currentMonth).startOf('month');
    const startDayOfWeek = dayjs(startDayOfMonth).startOf('week');
    const endDayOfMonth = dayjs(currentMonth).endOf('month');
    const endDayOfWeek = dayjs(endDayOfMonth).endOf('week');
    const days = endDayOfWeek.diff(startDayOfWeek, 'day');
    return Array.from({ length: days + 1 }, (item, index) => {
      return startDayOfWeek.add(index, 'day');
    });
  }, [currentMonth]);
  const handlePrevMonth = () => {
    setCurrentMonth(currentMonth.add(-1, 'month'));
  };
  const handleNextMonth = () => {
    setCurrentMonth(currentMonth.add(1, 'month'));
  };
  return {
    dayItemList,
    handlePrevMonth,
    handleNextMonth,
    currentMonth,
  };
};

export default useGetMonthlyCalendar;
