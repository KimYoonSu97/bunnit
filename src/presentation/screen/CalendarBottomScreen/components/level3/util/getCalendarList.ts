import dayjs from 'dayjs';

export const getCalendarList = (day: dayjs.Dayjs): dayjs.Dayjs[] => {
  const startDayOfMonth = day.startOf('month');
  const startDayOfWeek = startDayOfMonth.startOf('week');
  const endDayOfMonth = day.endOf('month');
  const endDayOfWeek = endDayOfMonth.endOf('week');
  const days = endDayOfWeek.diff(startDayOfWeek, 'day');
  
  return Array.from({ length: days + 1 }, (_, index) => 
    startDayOfWeek.add(index, 'day')
  );
};
