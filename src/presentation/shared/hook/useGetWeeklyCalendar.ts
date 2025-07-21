import { View, Text } from 'react-native';
import React, { useMemo, useState } from 'react';
import dayjs from 'dayjs';

const useGetWeeklyCalendar = ({ day }: { day?: dayjs.Dayjs }) => {
  const [currentWeek, setCurrentWeek] = useState<dayjs.Dayjs>(
    day ? day : dayjs(),
  );
  const weekDayItemList = useMemo(() => {
    const startDayOfWeek = dayjs(currentWeek).startOf('week');
    return Array.from({ length: 7 }, (item, index) => {
      return startDayOfWeek.add(index, 'day');
    });
  }, [currentWeek]);

  const handlePrevWeek = () => {
    setCurrentWeek(currentWeek.add(-1, 'week'));
  };
  const handleNextWeek = () => {
    setCurrentWeek(currentWeek.add(1, 'week'));
  };

  return { currentWeek, weekDayItemList, handleNextWeek, handlePrevWeek };
};

export default useGetWeeklyCalendar;
