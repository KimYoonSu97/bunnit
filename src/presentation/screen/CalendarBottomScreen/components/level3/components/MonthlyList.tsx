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
import { useCalendarContext } from '../context/CelanderContext';
import { getWeekOfMonth } from '../util/getWeekOfMonth';

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
  setCurrentDay,
  // setSelectWeekIndex,
  opacityAnimatedStyle,
  isWeekly,
}: // selectWeekIndex,
{
  setCurrentDay: (day: dayjs.Dayjs) => void;
  // setSelectWeekIndex: React.Dispatch<React.SetStateAction<number>>;
  opacityAnimatedStyle: any;
  // selectWeekIndex: number;
  isWeekly: boolean;
}) => {
  const flatListRef = useRef<FlatList>(null);
  const [isScrolling, setIsScrolling] = React.useState(false);
  // 여기서 필요한건/
  // 1. 달력을 그릴 날짜
  // 2. 날짜를 선택했을떄 업데이트할 상태 및 함수
  // 3. 선택된 날짜가 해당 월에 몇번째 줄인가? 에대한 인덱스를 저장할 함수
  const {
    calenderDataDay,
    setCalenderDataDay,
    selectDate,
    setSelectDate,
    selectWeekIndex,
    setSelectWeekIndex,
    currentWeek,
  } = useCalendarContext();

  const list = useMemo(() => {
    return [
      getCalendarList(calenderDataDay.add(-1, 'month')),
      getCalendarList(calenderDataDay),
      getCalendarList(calenderDataDay.add(1, 'month')),
    ];
  }, [calenderDataDay]);

  // currentDay가 변경될 때 FlatList 위치 조정
  useEffect(() => {
    if (!isScrolling && flatListRef.current) {
      flatListRef.current.scrollToIndex({
        index: 1,
        animated: false,
      });
    }
  }, [calenderDataDay, isScrolling]);

  useEffect(() => {
    //달 캘린더가 업데이트 될때
    if (selectDate) {
      if (selectDate.isSame(calenderDataDay, 'month')) {
        setCalenderDataDay(selectDate);
      }
    }
  }, [selectDate, setCalenderDataDay, calenderDataDay]);

  const handleScrollBegin = () => {
    setIsScrolling(true);
  };

  const handleMomentumScrollEnd = (e: any) => {
    const newIndex = Math.round(e.nativeEvent.contentOffset.x / width);
    setIsScrolling(false);

    if (newIndex === 0) {
      const newDataDay = dayjs(calenderDataDay).add(-1, 'month');
      if (selectDate) {
        if (selectDate.isSame(newDataDay, 'month')) {
          setCalenderDataDay(selectDate);
        } else {
          setCalenderDataDay(newDataDay.startOf('month'));
          setSelectWeekIndex(0);
        }
      } else {
        setCalenderDataDay(newDataDay.startOf('month'));
        setSelectWeekIndex(0);
      }
    } else if (newIndex === 2) {
      // 2면 다음 달로 이동
      const newDataDay = dayjs(calenderDataDay).add(1, 'month');
      if (selectDate) {
        if (selectDate.isSame(newDataDay, 'month')) {
          setCalenderDataDay(selectDate);
        } else {
          setCalenderDataDay(newDataDay.startOf('month'));
          setSelectWeekIndex(0);
        }
      } else {
        setCalenderDataDay(newDataDay.startOf('month'));
        setSelectWeekIndex(0);
      }
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
               
                ]}
              >
                {day.map(item => (
                  <Pressable
                    key={item.format('YYYY-MM-DD')}
                    style={weeklyStyle.item}
                    onPress={() => {
                      setSelectDate(item);
                      setCalenderDataDay(item);
                      setSelectWeekIndex(weekIndex);
                    }}
                  >
                    <Text
                      style={[
                        weeklyStyle.text,
                        !item.isSame(calenderDataDay, 'month') &&
                          styleSheet.isOtherMonth,
                        item.isSame(calenderDataDay, 'date') &&
                          styleSheet.isCurrentMonth,
                        item.isSame(selectDate, 'day') && {
                          backgroundColor: 'red',
                        },
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
