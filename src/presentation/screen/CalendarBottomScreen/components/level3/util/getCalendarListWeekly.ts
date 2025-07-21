import dayjs from 'dayjs';

export const getCalendarListWeekly = (day: dayjs.Dayjs): dayjs.Dayjs[] => {
  const startDayOfWeek = day.startOf('week');
  const endDayOfWeek = day.endOf('week');
  const days = endDayOfWeek.diff(startDayOfWeek, 'day');
  
  return Array.from({ length: days + 1 }, (_, index) => 
    startDayOfWeek.add(index, 'day')
  );
};