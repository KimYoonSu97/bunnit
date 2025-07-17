import dayjs from 'dayjs';
import { useMemo, useState } from 'react';

const useCalendarBottomScreen = () => {
  const [selectDay, setSelectDay] = useState<dayjs.Dayjs | null>(null);
  const [currentMonth, setCurrentMonth] = useState<dayjs.Dayjs>(dayjs());
  const [isWeekly, _setIsWeekly] = useState(false);
  const dayItemList = useMemo(() => {
    //현재 달의 첫번째 일
    const startDayOfMonth = dayjs(currentMonth).startOf('month');
    //현재 달의 첫번째 주의 시작일
    const startDayOfWeek = dayjs(startDayOfMonth).startOf('week');
    console.log('startWeek', startDayOfWeek.format());
    console.log('startDay', startDayOfMonth.format());
    const endDayOfMonth = dayjs(currentMonth).endOf('month');
    const endDayOfWeek = dayjs(endDayOfMonth).endOf('week');
    console.log('endDayOfMonth', endDayOfMonth.format());
    console.log('endDayOfWeek', endDayOfWeek.format());
    const days = endDayOfWeek.diff(startDayOfWeek, 'day');
    console.log(days);
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
