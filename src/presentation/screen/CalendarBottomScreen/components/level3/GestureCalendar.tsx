import { View, Text, Dimensions } from 'react-native';
import React from 'react';
import useGestureCalendar from './useGestureCalendar';
import { GestureDetector } from 'react-native-gesture-handler';
import Animated from 'react-native-reanimated';
import { CALENDAR_DAY_LIST } from '../../../../../core/constant/calendar';
import { styleSheet } from './gestureCalendarStyle';
import WeeklyList from './components/WeeklyList';
import MonthlyList from './components/MonthlyList';
import CalendarProvider, {
  useCalendarContext,
} from './context/CelanderContext';
const width = Dimensions.get('window').width;

const GestureCalendar = () => {
  const {
    setSelectWeekIndex,
    heightAnimatedStyle,
    positionAnimatedStyle,
    pan,
    isWeekly,
    currentDay,
    setCurrentDay,
    opacityAnimatedStyle,
  } = useGestureCalendar();
  const {
    calenderDataDay,
    setCalenderDataDay,
    selectDate,
    setSelectDate,
    selectWeekIndex,
    currentWeek,
    // setSelectWeekIndex,
  } = useCalendarContext();

  return (
    <>
      <View>
        <Text style={{ fontSize: 20, fontWeight: 'bold' }}>
          {calenderDataDay.format('YYYY-MM')}
        </Text>
        <View style={styleSheet.headerContainer}>
          <View style={styleSheet.weekdayHeader}>
            {CALENDAR_DAY_LIST.map((day, index) => (
              <View key={index} style={styleSheet.weekdayItem}>
                <Text
                  style={[
                    day === 'Sun' && { color: 'red' },
                    day === 'Sat' && { color: 'blue' },
                  ]}
                >
                  {day}
                </Text>
              </View>
            ))}
          </View>
        </View>
        <GestureDetector gesture={pan}>
          <Animated.View
            style={[
              {
                backgroundColor: 'aqua',
                overflow: 'hidden',
              },
              // heightAnimatedStyle,
            ]}
          >
            {isWeekly ? (
              <WeeklyList
                currentDay={currentDay}
                setCurrentDay={setCurrentDay}
                selectWeekIndex={selectWeekIndex}
              />
            ) : (
              <Animated.View style={[positionAnimatedStyle]}>
                <MonthlyList
                  isWeekly={isWeekly}
                  setCurrentDay={setCurrentDay}
                  opacityAnimatedStyle={opacityAnimatedStyle}
                />
              </Animated.View>
            )}
          </Animated.View>
        </GestureDetector>
      </View>
      <Text>지금 선택된 날짜 = 월 캘린더를 그리는 기준이 되는 날짜</Text>
      <Text>
        {'calenderDataDay' + '====' + calenderDataDay.format('YYYY-MM-DD')}
      </Text>
      <Text>지금 선택된 날짜</Text>
      <Text>{'selectDate' + '====' + selectDate?.format('YYYY-MM-DD')}</Text>
      <Text>
        지금 선택된 날짜가 선택된 날짜의 월에 몇번째 줄인가? 에대한 인덱스
      </Text>
      <Text>{'selectWeekIndex' + '====' + selectWeekIndex}</Text>
      <Text>지금 보이는 날짜가 해당 월의 몇번째 주인가? 에대한 값</Text>
      <Text>{'currentWeek' + '====' + currentWeek}</Text>
    </>
  );
};

export default GestureCalendar;
