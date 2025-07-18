import { View, Text } from 'react-native';
import React from 'react';
import useGetWeeklyCalendar from '../../../../../shared/hook/useGetWeeklyCalendar';
import useGetMonthlyCalendar from '../../../../../shared/hook/useGetMonthlyCalendar';

const useMonthlyList = () => {
  const { dayItemList, handlePrevMonth, handleNextMonth, currentMonth } =
    useGetMonthlyCalendar({});
  return {
    dayItemList,
    handlePrevMonth,
    handleNextMonth,
    currentMonth,
  };
};

export default useMonthlyList;
