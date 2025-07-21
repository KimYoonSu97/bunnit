import dayjs from 'dayjs';

export const getCalendarListWeekly = (day: dayjs.Dayjs) => {
  const startDayOfWeek = dayjs(day).startOf('week');
  const endDayOfWeek = dayjs(day).endOf('week');
  const days = endDayOfWeek.diff(startDayOfWeek, 'day');
  return Array.from({ length: days + 1 }, (item, index) => {
    return startDayOfWeek.add(index, 'day');
  });
};
