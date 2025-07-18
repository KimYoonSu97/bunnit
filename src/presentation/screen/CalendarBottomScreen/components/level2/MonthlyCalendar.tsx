import { View, Text, Button } from 'react-native';
import React from 'react';
import { CALENDAR_DAY_LIST } from '../../../../../core/constant/calendar';
import useMonthlyCalendar from './useMonthlyCalendar';
import { styleSheet } from './monthlyCalendarStyle';
import CalendarBody from './components/CalendarBody';


const MonthlyCalendar = () => {
  const {
    selectDay,
    handlePressDayItem,
    dayItemList,
    handlePrevMonth,
    handleNextMonth,
    currentMonth,
  } = useMonthlyCalendar();
  return (
    <View style={styleSheet.container}>
      {/* 헤더 */}
      <View style={styleSheet.headerContainer}>
        <Button title="<" onPress={handlePrevMonth} />
        <View>
          <Text style={styleSheet.monthText}>
            {currentMonth.format('MMMM YYYY')}
          </Text>
        </View>
        <Button title=">" onPress={handleNextMonth} />
      </View>
      <View style={styleSheet.bodyContainer}>
        {/* 요일 헤더 */}
        <View style={styleSheet.weekdayHeader}>
          {CALENDAR_DAY_LIST.map((day, index) => (
            <View key={index} style={styleSheet.weekdayItem}>
              <Text
                style={[
                  styleSheet.weekdayItemText,
                  day === 'Sun' && { color: 'red' },
                  day === 'Sat' && { color: 'blue' },
                ]}
              >
                {day}
              </Text>
            </View>
          ))}
        </View>
        {/* 날짜 리스트 */}
        <View style={styleSheet.dateList}>
          <CalendarBody
            dayItemList={dayItemList}
            currentMonth={currentMonth}
            selectDay={selectDay}
            onPressDayItem={handlePressDayItem}
          />
        </View>
      </View>
    </View>
  );
};

export default MonthlyCalendar;
