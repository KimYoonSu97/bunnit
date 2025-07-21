import dayjs from 'dayjs';

export const getCalendarList = (day: dayjs.Dayjs) => {
  const startDayOfMonth = dayjs(day).startOf('month');
  const startDayOfWeek = dayjs(startDayOfMonth).startOf('week');
  const endDayOfMonth = dayjs(day).endOf('month');
  const endDayOfWeek = dayjs(endDayOfMonth).endOf('week');
  const days = endDayOfWeek.diff(startDayOfWeek, 'day');
  return Array.from({ length: days + 1 }, (item, index) => {
    return startDayOfWeek.add(index, 'day');
  });
};
