import { View, Text, Dimensions, FlatList, Pressable } from 'react-native';
import React, { useEffect, useMemo, useRef, useState } from 'react';
import dayjs from 'dayjs';
import { getCalendarList } from '../util/getCalendarList';
import { useCalendarContext } from '../context/CalenderContext';
import calendarBodyStyle from './style';
import Animated, {
  SharedValue,
  useAnimatedStyle,
} from 'react-native-reanimated';

const RenderItem = ({
  item,
  opacity,
  currentWeeklyCalendarIndex,
}: // isAnimated,
{
  item: dayjs.Dayjs[];
  opacity: SharedValue<number>;
  currentWeeklyCalendarIndex: number;
  // isAnimated: boolean;
}) => {
  const { selectDate, onPressDay } = useCalendarContext();
  const opacityStyle = useAnimatedStyle(() => {
    return {
      opacity: opacity.value,
    };
  });

  // 7개로 나눠서 주단위로 묶여있는 이중배열
  const dayItem: dayjs.Dayjs[][] = [];
  for (let i = 0; i < item.length; i += 7) {
    dayItem.push(item.slice(i, i + 7));
  }
  const today = dayjs();
  return (
    <View style={calendarBodyStyle.monthlyContainer}>
      {dayItem.map((week, weekIndex) => {
        return (
          <Animated.View
            key={weekIndex}
            style={[
              calendarBodyStyle.weeklyContainer,
              currentWeeklyCalendarIndex !== weekIndex + 1 && opacityStyle,
            ]}
          >
            {week.map((day, dayIndex) => {
              const isToday = day.isSame(today, 'day');
              return (
                <Pressable
                  key={dayIndex}
                  style={[
                    calendarBodyStyle.dayItem,
                    isToday && calendarBodyStyle.today,
                    selectDate?.isSame(day, 'day') &&
                      calendarBodyStyle.selected,
                  ]}
                  onPress={() => {
                    onPressDay(day, true);
                  }}
                >
                  <Text style={[calendarBodyStyle.dayText]}>
                    {day.format('D')}
                  </Text>
                </Pressable>
              );
            })}
          </Animated.View>
        );
      })}
    </View>
  );
};

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
        ref={flatListRef}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        data={list}
        style={{ flex: 1 }}
        getItemLayout={(data, index) => ({
          length: width,
          offset: width * index,
          index,
        })}
        onMomentumScrollEnd={e => {
          const movement = e.nativeEvent.contentOffset.x / width;
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
          if (movement === 1) {
          }
        }}
        renderItem={({ item, index }) => {
          return (
            <RenderItem
              item={item}
              opacity={opacity}
              currentWeeklyCalendarIndex={currentWeeklyCalendarIndex}
            />
          );
        }}
        keyExtractor={(item, index) => index.toString()}
      />
    </View>
  );
};

export default MonthlyCalendarBody;
