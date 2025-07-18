import { View, Text, FlatList, Dimensions, StyleSheet } from 'react-native';
import React, { useEffect, useMemo, useRef } from 'react';
import useWeeklyList from './useWeeklyList';
import dayjs from 'dayjs';
import { weeklyStyle } from '../gestureCalendarStyle';

const { width } = Dimensions.get('window');

const getWeeklyList = (day: dayjs.Dayjs) => {
  const startDayOfWeek = dayjs(day).startOf('week');
  return Array.from({ length: 7 }, (item, index) => {
    return startDayOfWeek.add(index, 'day');
  });
};

const renderItem = ({
  item,
  currentDay,
}: {
  item: dayjs.Dayjs[];
  currentDay: dayjs.Dayjs;
}) => {
  return (
    <View style={weeklyStyle.row}>
      {item.map((item, index) => (
        <View key={index} style={weeklyStyle.item}>
          <Text
            style={[
              weeklyStyle.text,
              item.isSame(currentDay, 'day') && styleSheet.selectDayText,
            ]}
          >
            {item.format('DD')}
          </Text>
        </View>
      ))}
    </View>
  );
};

const WeeklyList = ({
  currentDay,
  setCurrentDay,
  selectWeekIndex,
  setSelectWeekIndex,
}: {
  currentDay: dayjs.Dayjs;
  setCurrentDay: (day: dayjs.Dayjs) => void;
  selectWeekIndex: number;
  setSelectWeekIndex: React.Dispatch<React.SetStateAction<number>>;
}) => {
  // const { currentWeek, weekDayItemList, handleNextWeek, handlePrevWeek } =
  //   useWeeklyList();
  const flatListRef = useRef<FlatList>(null);
  const [isScrolling, setIsScrolling] = React.useState(false);

  const list = useMemo(() => {
    return [
      getWeeklyList(currentDay.add(-1, 'week')),
      getWeeklyList(currentDay),
      getWeeklyList(currentDay.add(1, 'week')),
    ];
  }, [currentDay]);

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
      setCurrentDay(dayjs(currentDay).add(-1, 'week'));
    } else if (newIndex === 2) {
      setCurrentDay(dayjs(currentDay).add(1, 'week'));
    }
  };

  return (
    <FlatList
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
      renderItem={({ item }) => renderItem({ item, currentDay })}
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
