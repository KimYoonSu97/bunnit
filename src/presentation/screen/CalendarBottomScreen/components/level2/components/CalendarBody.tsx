import { View, Text, Pressable } from 'react-native';
import React, { useMemo } from 'react';
import dayjs from 'dayjs';
import { styleSheet } from './calendarBodyStyle';

const CalendarBody = ({
  dayItemList,
  currentMonth,
  selectDay,
  onPressDayItem,
}: {
  dayItemList: dayjs.Dayjs[];
  currentMonth: dayjs.Dayjs;
  selectDay: dayjs.Dayjs | null;
  onPressDayItem: (item: dayjs.Dayjs) => void;
}) => {
  const weeklyDayItemList = useMemo(() => {
    const result: dayjs.Dayjs[][] = [];
    for (let i = 0; i < dayItemList.length; i += 7) {
      result.push(dayItemList.slice(i, i + 7));
    }
    return result;
  }, [dayItemList]);

  return (
    <View style={styleSheet.container}>
      {weeklyDayItemList.map((week, index) => (
        <View key={index} style={styleSheet.weekRow}>
          {week.map(day => (
            <Pressable
              key={day.format('YYYY-MM-DD')}
              onPress={() => {
                onPressDayItem(day);
              }}
            >
              <View
                style={[
                  styleSheet.dayItem,
                  selectDay?.isSame(day, 'day') && styleSheet.selectDay,
                ]}
              >
                <Text
                  style={[
                    styleSheet.dayText,
                    day.isSame(currentMonth, 'month')
                      ? styleSheet.isCurrentMonth
                      : styleSheet.isOtherMonth,
                    selectDay?.isSame(day, 'day') && styleSheet.selectDayText,
                  ]}
                >
                  {day.format('DD')}
                </Text>
              </View>
            </Pressable>
          ))}
        </View>
      ))}
    </View>
  );
};

export default CalendarBody;
