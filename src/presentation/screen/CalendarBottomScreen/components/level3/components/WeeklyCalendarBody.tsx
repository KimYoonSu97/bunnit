import { View, Text, Dimensions, Pressable } from 'react-native';
import React, { useEffect, useMemo, useRef, useCallback } from 'react';
import { useCalendarContext } from '../context/CalenderContext';
import dayjs from 'dayjs';
import { getCalendarList } from '../util/getCalendarList';
import { getCalendarListWeekly } from '../util/getCalendarListWeekly';
import calendarBodyStyle from './style';
import { Gesture } from 'react-native-gesture-handler/lib/typescript/handlers/gestures/gesture';
import { FlatList } from 'react-native-gesture-handler';

const { width } = Dimensions.get('window');

const WeeklyDayItem = React.memo(
  ({
    day,
    isToday,
    isSelected,
    onPress,
  }: {
    day: dayjs.Dayjs;
    isToday: boolean;
    isSelected: boolean;
    onPress: () => void;
  }) => {
    const dayStyle = useMemo(
      () => [
        calendarBodyStyle.dayItem,
        isToday && calendarBodyStyle.today,
        isSelected && calendarBodyStyle.selected,
      ],
      [isToday, isSelected],
    );

    return (
      <Pressable style={dayStyle} onPress={onPress}>
        <Text style={calendarBodyStyle.dayText}>{day.format('D')}</Text>
      </Pressable>
    );
  },
);

const RenderItem = React.memo(({ item }: { item: dayjs.Dayjs[] }) => {
  const { selectDate, onPressDay } = useCalendarContext();
  const today = dayjs();

  const containerStyle = useMemo(
    () => [calendarBodyStyle.weeklyContainer, { width }],
    [],
  );

  return (
    <View style={containerStyle}>
      {item.map((day, index) => {
        const isToday = day.isSame(today, 'day');
        const isSelected = selectDate?.isSame(day, 'day') || false;

        return (
          <WeeklyDayItem
            key={index}
            day={day}
            isToday={isToday}
            isSelected={isSelected}
            onPress={() => onPressDay(day, false)}
          />
        );
      })}
    </View>
  );
});

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

  const getItemLayout = useCallback(
    (data: any, index: number) => ({
      length: width,
      offset: width * index,
      index,
    }),
    [],
  );

  const keyExtractor = useCallback(
    (item: any, index: number) => index.toString(),
    [],
  );

  const renderItem = useCallback(
    ({ item }: { item: dayjs.Dayjs[] }) => <RenderItem item={item} />,
    [],
  );

  const handleMomentumScrollEnd = useCallback(
    (e: any) => {
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
      }
    },
    [
      weeklyCalendarData,
      monthlyCalendarData,
      setMonthlyCalendarData,
      setWeeklyCalendarData,
    ],
  );

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
        getItemLayout={getItemLayout}
        onMomentumScrollEnd={handleMomentumScrollEnd}
        renderItem={renderItem}
        keyExtractor={keyExtractor}
      />
    </View>
  );
};

export default WeeklyCalendarBody;
