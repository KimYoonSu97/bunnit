import { View, Text, FlatList, Dimensions, Pressable } from 'react-native';
import React, { useEffect, useMemo, useRef } from 'react';
import { useCalendarContext } from '../context/CalenderContext';
import dayjs from 'dayjs';
import { getCalendarList } from '../util/getCalendarList';
import { getCalendarListWeekly } from '../util/getCalendarListWeekly';
import calendarBodyStyle from './style';
const { width } = Dimensions.get('window');

const RenderItem = ({ item }: { item: dayjs.Dayjs[] }) => {
  const { selectDate, onPressDay } = useCalendarContext();
  const today = dayjs();
  return (
    <View style={[calendarBodyStyle.weeklyContainer, { width }]}>
      {item.map((day, index) => {
        const isToday = day.isSame(today, 'day');
        return (
          <Pressable
            key={index}
            style={[
              calendarBodyStyle.dayItem,
              isToday && calendarBodyStyle.today,
              selectDate?.isSame(day, 'day') && calendarBodyStyle.selected,
            ]}
            onPress={() => {
              onPressDay(day, false);
            }}
          >
            <Text style={[calendarBodyStyle.dayText]}>{day.format('D')}</Text>
          </Pressable>
        );
      })}
    </View>
  );
};

const WeeklyCalendarBody = () => {
  const {
    monthlyCalendarData,
    weeklyCalendarData,
    setWeeklyCalendarData,
    setMonthlyCalendarData,
  } = useCalendarContext();
  const flatListRef = useRef<FlatList>(null);
  const list = useMemo(() => {
    return [
      getCalendarListWeekly(dayjs(weeklyCalendarData).subtract(1, 'week')),
      getCalendarListWeekly(dayjs(weeklyCalendarData)),
      getCalendarListWeekly(dayjs(weeklyCalendarData).add(1, 'week')),
    ];
  }, [weeklyCalendarData]);

  useEffect(() => {
    if (flatListRef.current) {
      flatListRef.current.scrollToIndex({
        index: 1,
        animated: false,
      });
    }
  }, [weeklyCalendarData]);
  return (
    <View style={{ flex: 1 }}>
      <FlatList
        ref={flatListRef}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        data={list}
        style={{ flex: 1 }}
        initialScrollIndex={1}
        getItemLayout={(data, index) => ({
          length: width,
          offset: width * index,
          index,
        })}
        onMomentumScrollEnd={e => {
          const movement = e.nativeEvent.contentOffset.x / width;
          if (movement === 0) {
            //이전달로
            const newBaseDay = dayjs(weeklyCalendarData)
              .subtract(1, 'week')
              .startOf('week')
              .add(3, 'day');
            if (!newBaseDay.isSame(monthlyCalendarData, 'month')) {
              setMonthlyCalendarData(newBaseDay.startOf('month'));
            }
            setWeeklyCalendarData(newBaseDay);
          }
          if (movement === 2) {
            const newBaseDay = dayjs(weeklyCalendarData)
              .add(1, 'week')
              .startOf('week')
              .add(3, 'day');
            if (!newBaseDay.isSame(monthlyCalendarData, 'month')) {
              setMonthlyCalendarData(newBaseDay.startOf('month'));
            }
            setWeeklyCalendarData(newBaseDay);

            //다음달로
          }
          if (movement === 1) {
            return;
          }
        }}
        renderItem={({ item }) => <RenderItem item={item} />}
        keyExtractor={(item, index) => index.toString()}
      />
    </View>
  );
};

export default WeeklyCalendarBody;
