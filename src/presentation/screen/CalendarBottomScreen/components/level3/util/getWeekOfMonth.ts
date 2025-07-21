import dayjs from 'dayjs';

export const getWeekOfMonth = (date: dayjs.Dayjs): number => {
  const startOfMonth = date.startOf('month'); // 해당 달의 1일
  const startDayOfWeek = startOfMonth.day(); // 0: 일요일, 6: 토요일
  const dayOfMonth = date.date(); // 현재 날짜 (ex: 1~31)

  // 1일부터 현재 날짜까지 지난 날 수 + 요일 오프셋
  const offset = startDayOfWeek;
  const adjustedDay = dayOfMonth + offset;

  // 주차 계산
  return Math.ceil(adjustedDay / 7);
};
