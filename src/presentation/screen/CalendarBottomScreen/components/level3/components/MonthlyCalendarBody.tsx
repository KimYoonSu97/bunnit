import {
  View,
  Text,
  Dimensions,
  Pressable,
  NativeScrollEvent,
  NativeSyntheticEvent,
} from 'react-native';
import React, { useEffect, useMemo, useRef, useCallback } from 'react';
import dayjs from 'dayjs';
import { getCalendarList } from '../util/getCalendarList';
import { useCalendarContext } from '../context/CalenderContext';
import calendarBodyStyle from './style';
import Animated, {
  SharedValue,
  useAnimatedStyle,
} from 'react-native-reanimated';
import { FlatList } from 'react-native-gesture-handler';

const DayItem = React.memo(
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

const WeekRow = React.memo(
  ({
    week,
    weekIndex,
    currentWeeklyCalendarIndex,
    opacity,
    onPressDay,
  }: {
    week: dayjs.Dayjs[];
    weekIndex: number;
    currentWeeklyCalendarIndex: number;
    opacity: SharedValue<number>;
    onPressDay: (day: dayjs.Dayjs, isMonthly: boolean) => void;
  }) => {
    const { selectDate } = useCalendarContext();
    const today = dayjs();

    const opacityStyle = useAnimatedStyle(() => {
      return {
        opacity: opacity.value,
      };
    });

    const containerStyle = useMemo(
      () => [
        calendarBodyStyle.weeklyContainer,
        currentWeeklyCalendarIndex !== weekIndex + 1 && opacityStyle,
      ],
      [currentWeeklyCalendarIndex, weekIndex, opacityStyle],
    );

    return (
      <Animated.View style={containerStyle}>
        {week.map((day, dayIndex) => {
          const isToday = day.isSame(today, 'day');
          const isSelected = selectDate?.isSame(day, 'day') || false;

          return (
            <DayItem
              key={dayIndex}
              day={day}
              isToday={isToday}
              isSelected={isSelected}
              onPress={() => onPressDay(day, true)}
            />
          );
        })}
      </Animated.View>
    );
  },
);

const RenderItem = React.memo(
  ({
    item,
    opacity,
    currentWeeklyCalendarIndex,
  }: {
    item: dayjs.Dayjs[];
    opacity: SharedValue<number>;
    currentWeeklyCalendarIndex: number;
  }) => {
    const { onPressDay } = useCalendarContext();

    // 7개로 나눠서 주단위로 묶여있는 이중배열
    const dayItem = useMemo(() => {
      const result: dayjs.Dayjs[][] = [];
      for (let i = 0; i < item.length; i += 7) {
        result.push(item.slice(i, i + 7));
      }
      return result;
    }, [item]);

    return (
      <View style={calendarBodyStyle.monthlyContainer}>
        {dayItem.map((week, weekIndex) => (
          <WeekRow
            key={weekIndex}
            week={week}
            weekIndex={weekIndex}
            currentWeeklyCalendarIndex={currentWeeklyCalendarIndex}
            opacity={opacity}
            onPressDay={onPressDay}
          />
        ))}
      </View>
    );
  },
);

const { width } = Dimensions.get('window');

const MonthlyCalendarBody = ({ opacity }: { opacity: SharedValue<number> }) => {
  const {
    monthlyCalendarData,
    setMonthlyCalendarData,
    setWeeklyCalendarData,
    selectDate,
    currentWeeklyCalendarIndex,
  } = useCalendarContext();

  const flatListRef = useRef<FlatList>(null);

  const list = useMemo(() => {
    return [
      getCalendarList(dayjs(monthlyCalendarData).subtract(1, 'month')),
      getCalendarList(dayjs(monthlyCalendarData)),
      getCalendarList(dayjs(monthlyCalendarData).add(1, 'month')),
    ];
  }, [monthlyCalendarData]);

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
    ({ item, index }: { item: dayjs.Dayjs[]; index: number }) => (
      <RenderItem
        item={item}
        opacity={opacity}
        currentWeeklyCalendarIndex={currentWeeklyCalendarIndex}
      />
    ),
    [opacity, currentWeeklyCalendarIndex],
  );

  const handleMomentumScrollEnd = (
    e: NativeSyntheticEvent<NativeScrollEvent>,
  ) => {
    const movement = Math.round(e.nativeEvent.contentOffset.x / width);

    if (movement === 0) {
      const newBaseDay = dayjs(monthlyCalendarData)
        .subtract(1, 'month')
        .startOf('month');

      if (selectDate) {
        if (selectDate.isSame(newBaseDay, 'month')) {
          setWeeklyCalendarData(selectDate.startOf('week').add(3, 'day'));
        } else {
          setWeeklyCalendarData(newBaseDay.startOf('week').add(3, 'day'));
        }
      } else {
        setWeeklyCalendarData(newBaseDay.startOf('week').add(3, 'day'));
      }
      setMonthlyCalendarData(newBaseDay);
    }
    if (movement === 2) {
      const newBaseDay = dayjs(monthlyCalendarData)
        .add(1, 'month')
        .startOf('month');
      if (selectDate) {
        if (selectDate.isSame(newBaseDay, 'month')) {
          setWeeklyCalendarData(selectDate.startOf('week').add(3, 'day'));
        } else {
          setWeeklyCalendarData(newBaseDay.startOf('week').add(3, 'day'));
        }
      } else {
        setWeeklyCalendarData(newBaseDay.startOf('week').add(3, 'day'));
      }

      setMonthlyCalendarData(newBaseDay);
    }
  };

  useEffect(() => {
    if (flatListRef.current) {
      flatListRef.current.scrollToIndex({
        index: 1,
        animated: false,
      });
    }
  }, [monthlyCalendarData]);

  return (
    <View style={{ flex: 1 }}>
      <FlatList
        bounces={false}
        ref={flatListRef}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        data={list}
        style={{ flex: 1 }}
        getItemLayout={getItemLayout}
        onMomentumScrollEnd={handleMomentumScrollEnd}
        renderItem={renderItem}
        keyExtractor={keyExtractor}
      />
    </View>
  );
};

export default MonthlyCalendarBody;
