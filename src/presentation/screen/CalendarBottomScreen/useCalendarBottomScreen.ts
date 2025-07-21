import dayjs from 'dayjs';
import { useMemo, useState } from 'react';

const useCalendarBottomScreen = () => {
  const [selectDay, setSelectDay] = useState<dayjs.Dayjs | null>(null);
  const [currentMonth, setCurrentMonth] = useState<dayjs.Dayjs>(dayjs());
  const [isWeekly, _setIsWeekly] = useState(false);
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
    isWeekly,
  };
};

export default useCalendarBottomScreen;
