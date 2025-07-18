import { View, Text } from 'react-native';
import React from 'react';
import useGetWeeklyCalendar from '../../../../../shared/hook/useGetWeeklyCalendar';

const useWeeklyList = () => {
  const { currentWeek, weekDayItemList, handleNextWeek, handlePrevWeek } =
    useGetWeeklyCalendar({});
  return { currentWeek, weekDayItemList, handleNextWeek, handlePrevWeek };
};

export default useWeeklyList;
