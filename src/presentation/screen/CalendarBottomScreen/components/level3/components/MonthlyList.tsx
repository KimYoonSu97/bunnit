import {
  View,
  Text,
  FlatList,
  Dimensions,
  Pressable,
  StyleSheet,
} from 'react-native';
import React, { useMemo, useRef, useEffect } from 'react';
import dayjs from 'dayjs';
import { weeklyStyle } from '../gestureCalendarStyle';
import Animated from 'react-native-reanimated';

const getCalendarList = (day: dayjs.Dayjs) => {
  const startDayOfMonth = dayjs(day).startOf('month');
  const startDayOfWeek = dayjs(startDayOfMonth).startOf('week');
  const endDayOfMonth = dayjs(day).endOf('month');
  const endDayOfWeek = dayjs(endDayOfMonth).endOf('week');
  const days = endDayOfWeek.diff(startDayOfWeek, 'day');
  return Array.from({ length: days + 1 }, (item, index) => {
    return startDayOfWeek.add(index, 'day');
  });
};

const { width } = Dimensions.get('window');

const MonthlyList = ({
  currentDay,
  setCurrentDay,
  setSelectWeekIndex,
  opacityAnimatedStyle,
  selectWeekIndex,
}: {
  currentDay: dayjs.Dayjs;
  setCurrentDay: (day: dayjs.Dayjs) => void;
  setSelectWeekIndex: React.Dispatch<React.SetStateAction<number>>;
  opacityAnimatedStyle: any;
  selectWeekIndex: number;
}) => {
  const flatListRef = useRef<FlatList>(null);
  const [isScrolling, setIsScrolling] = React.useState(false);

  console.log('currentDay', currentDay.format('YYYY-MM'));

  const list = useMemo(() => {
    return [
      getCalendarList(currentDay.add(-1, 'month')),
      getCalendarList(currentDay),
      getCalendarList(currentDay.add(1, 'month')),
    ];
  }, [currentDay]);

  // currentDay가 변경될 때 FlatList 위치 조정
  useEffect(() => {
    if (!isScrolling && flatListRef.current) {
      flatListRef.current.scrollToIndex({
        index: 1,
        animated: false,
      });
    }
  }, [currentDay, isScrolling]);

  const handleScrollBegin = () => {
    setIsScrolling(true);
  };

  const handleMomentumScrollEnd = (e: any) => {
    const newIndex = Math.round(e.nativeEvent.contentOffset.x / width);
    setIsScrolling(false);
    if (newIndex === 0) {
      // 0이면 이전 달로 이동
      setCurrentDay(dayjs(currentDay).add(-1, 'month'));
      setSelectWeekIndex(0);
    } else if (newIndex === 2) {
      // 2면 다음 달로 이동
      setCurrentDay(dayjs(currentDay).add(1, 'month'));
      setSelectWeekIndex(0);
    }
  };

  return (
    <FlatList
      ref={flatListRef}
      data={list}
      keyExtractor={(item, index) => index.toString()}
      horizontal
      pagingEnabled
      initialScrollIndex={1}
      getItemLayout={(data, index) => {
        return {
          length: width,
          offset: width * index,
          index,
        };
      }}
      onScrollBeginDrag={handleScrollBegin}
      onMomentumScrollEnd={handleMomentumScrollEnd}
      renderItem={({ item }) => {
        const dayItem = () => {
          const result: dayjs.Dayjs[][] = [];
          for (let i = 0; i < item.length; i += 7) {
            result.push(item.slice(i, i + 7));
          }
          return result;
        };
        return (
          <View style={{ width, gap: 10 }}>
            {dayItem().map((day, weekIndex) => (
              <Animated.View
                key={weekIndex.toString()}
                style={[
                  weeklyStyle.row,
                  weekIndex !== selectWeekIndex && opacityAnimatedStyle,
                ]}
              >
                {day.map(item => (
                  <Pressable
                    key={item.format('YYYY-MM-DD')}
                    style={weeklyStyle.item}
                    onPress={() => {
                      setCurrentDay(item);
                      setSelectWeekIndex(weekIndex);
                    }}
                  >
                    <Text
                      style={[
                        weeklyStyle.text,
                        item.isSame(currentDay, 'date') &&
                          styleSheet.selectDayText,
                        item.isSame(currentDay, 'month') &&
                          styleSheet.isCurrentMonth,
                        !item.isSame(currentDay, 'month') &&
                          styleSheet.isOtherMonth,
                      ]}
                    >
                      {item.format('DD')}
                    </Text>
                  </Pressable>
                ))}
              </Animated.View>
            ))}
          </View>
        );
      }}
    />
  );
};

export default MonthlyList;

export const styleSheet = StyleSheet.create({
  container: {
    flex: 1,
  },
  weekRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    flex: 1,
    maxHeight: 50,
    padding: 5,
  },
  dayItem: {
    flex: 1,
    aspectRatio: 1,

    justifyContent: 'center',
    alignItems: 'center',
  },
  dayText: {
    fontSize: 16,
    textAlign: 'center',
  },
  isCurrentMonth: {
    color: 'black',
  },
  isOtherMonth: {
    color: 'gray',
    opacity: 0.4,
  },
  selectDay: {
    borderRadius: 100,
    borderColor: 'black',
    borderWidth: 1,
  },
  selectDayText: {
    fontWeight: '700',
  },
});
