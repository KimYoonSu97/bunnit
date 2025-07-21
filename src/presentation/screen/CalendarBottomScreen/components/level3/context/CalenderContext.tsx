import dayjs from 'dayjs';
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react';
import { getWeekOfMonth } from '../util/getWeekOfMonth';

interface CalendarContextType {
  monthlyCalendarData: dayjs.Dayjs;
  setMonthlyCalendarData: (day: dayjs.Dayjs) => void;
  weeklyCalendarData: dayjs.Dayjs;
  setWeeklyCalendarData: (day: dayjs.Dayjs) => void;
  selectDate: dayjs.Dayjs | null;
  setSelectDate: (day: dayjs.Dayjs) => void;
  currentWeeklyCalendarIndex: number;
  setCurrentWeeklyCalendarIndex: (index: number) => void;
  onPressDay: (day: dayjs.Dayjs, isMonthly: boolean) => void;
}

export const CalendarContext = createContext<CalendarContextType>({
  monthlyCalendarData: dayjs(),
  setMonthlyCalendarData: (day: dayjs.Dayjs) => {},
  weeklyCalendarData: dayjs(),
  setWeeklyCalendarData: (day: dayjs.Dayjs) => {},
  selectDate: null,
  setSelectDate: (day: dayjs.Dayjs) => {},
  currentWeeklyCalendarIndex: 1,
  setCurrentWeeklyCalendarIndex: (index: number) => {},
  onPressDay: (day: dayjs.Dayjs, isMonthly: boolean) => {},
});

const CalendarProvider = ({ children }: { children: React.ReactNode }) => {
  const [monthlyCalendarData, setMonthlyCalendarData] = useState(
    dayjs().startOf('month'),
  );
  // 주의 수요일이 기준이되어야함
  const [weeklyCalendarData, setWeeklyCalendarData] = useState(
    dayjs().startOf('week').add(3, 'day'),
  );
  const [selectDate, setSelectDate] = useState<dayjs.Dayjs | null>(null);

  const [currentWeeklyCalendarIndex, setCurrentWeeklyCalendarIndex] = useState(
    getWeekOfMonth(weeklyCalendarData),
  );

  const onPressDay = useCallback((day: dayjs.Dayjs, isMonthly: boolean) => {
    //날짜가 눌렸는데 지금 만약 월 캘린더 라면 눌린날짜가 해당 월에 몇번째 주인지 알아내어서 currentWeeklyCalendarIndex를 업데이트해야한다.
    //그리고 주 캘린더를 그쪽으로 보여줄수 있게 업데이트해야한다.
    if (isMonthly) {
      const weekIndex = getWeekOfMonth(day);
      setCurrentWeeklyCalendarIndex(weekIndex);
      setWeeklyCalendarData(day.startOf('week').add(3, 'day'));
    }
    setSelectDate(day);
  }, []);

  useEffect(() => {
    //만약 weeklyCalendarData와 monthlyCalendarData가 다른 달이고 이 차이가 monthly와 weekly의 월 차이가 1이라면
    //currentWeeklyCalendarIndex는 1이다.
    if (!weeklyCalendarData.isSame(monthlyCalendarData, 'month')) {
      setCurrentWeeklyCalendarIndex(1);
    } else {
      const weekIndex = getWeekOfMonth(weeklyCalendarData);
      setCurrentWeeklyCalendarIndex(weekIndex);
    }
  }, [weeklyCalendarData, monthlyCalendarData]);

  return (
    <CalendarContext.Provider
      value={{
        monthlyCalendarData,
        setMonthlyCalendarData,
        weeklyCalendarData,
        setWeeklyCalendarData,
        selectDate,
        setSelectDate,
        currentWeeklyCalendarIndex,
        setCurrentWeeklyCalendarIndex,
        onPressDay,
      }}
    >
      {children}
    </CalendarContext.Provider>
  );
};

export const useCalendarContext = () => {
  const context = useContext(CalendarContext);
  if (!context) {
    throw new Error(
      'useCalendarContext must be used within a CalendarProvider',
    );
  }
  return context;
};

export default CalendarProvider;
