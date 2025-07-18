import { useMemo, useState } from 'react';
import dayjs from 'dayjs';
import useGetMonthlyCalendar from '../../../../shared/hook/useGetMonthlyCalendar';

const useMonthlyCalendar = () => {
  const [selectDay, setSelectDay] = useState<dayjs.Dayjs | null>(null);
  const { dayItemList, handlePrevMonth, handleNextMonth, currentMonth } =
    useGetMonthlyCalendar({});

  const handlePressDayItem = (item: dayjs.Dayjs) => {
    setSelectDay(item);
  };

  return {
    selectDay,
    setSelectDay,
    dayItemList,
    handlePrevMonth,
    handleNextMonth,
    currentMonth,
    handlePressDayItem,
  };
};

export default useMonthlyCalendar;
