import { View, Text, FlatList, Dimensions, StyleSheet } from 'react-native';
import React, { useEffect, useMemo, useRef } from 'react';
import useWeeklyList from './useWeeklyList';
import dayjs from 'dayjs';
import { weeklyStyle } from '../gestureCalendarStyle';
import { useCalendarContext } from '../context/CelanderContext';
import { getWeekOfMonth } from '../util/getWeekOfMonth';

const { width } = Dimensions.get('window');

const getWeeklyList = (day: dayjs.Dayjs) => {
  const startDayOfWeek = dayjs(day).startOf('week');
  return Array.from({ length: 7 }, (item, index) => {
    return startDayOfWeek.add(index, 'day');
  });
};

const renderItem = ({
  item,
  selectDate,
}: {
  item: dayjs.Dayjs[];
  selectDate: dayjs.Dayjs | null;
}) => {
  return (
    <View style={weeklyStyle.row}>
      {item.map((item, index) => (
        <View key={index} style={weeklyStyle.item}>
          <Text
            style={[
              weeklyStyle.text,
              selectDate &&
                item.isSame(selectDate, 'day') && {
                  backgroundColor: 'red',
                },
            ]}
          >
            {item.format('DD')}
          </Text>
        </View>
      ))}
    </View>
  );
};

const WeeklyList = ({}: // currentDay,
// setCurrentDay,
// selectWeekIndex,
// setSelectWeekIndex,
{
  currentDay: dayjs.Dayjs;
  setCurrentDay: (day: dayjs.Dayjs) => void;
  selectWeekIndex: number;
  // setSelectWeekIndex: React.Dispatch<React.SetStateAction<number>>;
}) => {
  const {
    calenderDataDay,
    setCalenderDataDay,
    selectDate,
    setSelectDate,
    currentWeek,
    setCurrentWeek,
    currentDay: today,
  } = useCalendarContext();

  const flatListRef = useRef<FlatList>(null);
  const [isScrolling, setIsScrolling] = React.useState(false);

  const list = useMemo(() => {
    return [
      getWeeklyList(calenderDataDay.add(-1, 'week')),
      getWeeklyList(calenderDataDay),
      getWeeklyList(calenderDataDay.add(1, 'week')),
    ];
  }, [calenderDataDay]);

  useEffect(() => {
    const currentWeekIndex = getWeekOfMonth(calenderDataDay);
    setCurrentWeek(currentWeekIndex - 1);
  }, [calenderDataDay, setCurrentWeek]);

  useEffect(() => {
    if (!isScrolling && flatListRef.current) {
      flatListRef.current.scrollToIndex({
        index: 1,
        animated: false,
      });
    }
  }, [calenderDataDay, isScrolling]);

  const handleScrollBegin = () => {
    setIsScrolling(true);
  };

  const handleMomentumScrollEnd = (e: any) => {
    const newIndex = Math.round(e.nativeEvent.contentOffset.x / width);
    setIsScrolling(false);
    if (newIndex === 0) {
      const newDataDay = dayjs(calenderDataDay).add(-1, 'week');
      if (selectDate) {
        if (selectDate.isSame(newDataDay, 'week')) {
          setCalenderDataDay(selectDate);
        } else {
          setCalenderDataDay(newDataDay.startOf('week'));
        }
      } else {
        setCalenderDataDay(newDataDay.startOf('week'));
      }
    } else if (newIndex === 2) {
      const newDataDay = dayjs(calenderDataDay).add(1, 'week');
      if (selectDate) {
        if (selectDate.isSame(newDataDay, 'week')) {
          setCalenderDataDay(selectDate);
        } else {
          setCalenderDataDay(newDataDay.startOf('week'));
        }
      } else {
        setCalenderDataDay(newDataDay.startOf('week'));
      }
    }
  };

  return (
    <FlatList
      ref={flatListRef}
      data={list}
      horizontal
      showsHorizontalScrollIndicator={false}
      initialScrollIndex={1}
      onScrollBeginDrag={handleScrollBegin}
      onMomentumScrollEnd={handleMomentumScrollEnd}
      getItemLayout={(data, index) => {
        return {
          length: width,
          offset: width * index,
          index,
        };
      }}
      pagingEnabled
      keyExtractor={(item, index) => index.toString()}
      renderItem={({ item }) => renderItem({ item, selectDate })}
    />
  );
};

export default WeeklyList;

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
