import dayjs from 'dayjs';
import { createContext, useContext, useState } from 'react';
import { getWeekOfMonth } from '../util/getWeekOfMonth';

interface CalendarContextType {
  currentDay: dayjs.Dayjs;
  setCurrentDay: (day: dayjs.Dayjs) => void;
  calenderDataDay: dayjs.Dayjs;
  setCalenderDataDay: (day: dayjs.Dayjs) => void;
  selectDate: dayjs.Dayjs | null;
  setSelectDate: (day: dayjs.Dayjs) => void;
  selectWeekIndex: number;
  setSelectWeekIndex: (index: number) => void;
  currentWeek: number;
  setCurrentWeek: (week: number) => void;
}

export const CalendarContext = createContext<CalendarContextType>({
  currentDay: dayjs(),
  setCurrentDay: (day: dayjs.Dayjs) => {},
  calenderDataDay: dayjs(),
  setCalenderDataDay: (day: dayjs.Dayjs) => {},
  selectDate: null,
  setSelectDate: (day: dayjs.Dayjs | null) => {},
  selectWeekIndex: 0,
  setSelectWeekIndex: (index: number) => {},
  currentWeek: 0,
  setCurrentWeek: (week: number) => {},
});

const CalendarProvider = ({ children }: { children: React.ReactNode }) => {
  // 월 캘린더를 렌더링할때 필요한 날짜 데이터== 이걸 기반으로 월 캘린더를 그립니다.
  const [calenderDataDay, setCalenderDataDay] = useState(dayjs());
  // 이것은 그냥 오늘 날짜입니다.
  const [currentDay, setCurrentDay] = useState(dayjs());
  // 이것은 선택된 날짜입니다.
  const [selectDate, setSelectDate] = useState<dayjs.Dayjs | null>(null);
  // 이것은 선택된 날짜가 해당 월에 몇번째 줄인가? 에대한 인덱스입니다.
  // 초기값은 calenderDataDay의 날짜가 기준이됩니다.
  // 월 -> 주로 넘어갈때 필요합니다.
  const [selectWeekIndex, setSelectWeekIndex] = useState(
    getWeekOfMonth(calenderDataDay) - 1,
  );
  //이것은 지금 보이는 날짜가 몇번째 주인가? 에대한 값입니다. 이것은 주 캘린더를 그리는 기준이 되는 날짜입니다.
  //주 -> 월로 넘어갈때 필요합니다.
  const [currentWeek, setCurrentWeek] = useState(0);

  return (
    <CalendarContext.Provider
      value={{
        currentDay,
        setCurrentDay,
        calenderDataDay,
        setCalenderDataDay,
        selectDate,
        setSelectDate,
        selectWeekIndex,
        setSelectWeekIndex,
        currentWeek,
        setCurrentWeek,
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
