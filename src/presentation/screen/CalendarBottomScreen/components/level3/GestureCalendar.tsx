import { View, Text, Dimensions, Button } from 'react-native';
import React, { useMemo } from 'react';
import MonthlyCalendarBody from './components/MonthlyCalendarBody';
import WeeklyCalendarBody from './components/WeeklyCalendarBody';
import { GestureDetector } from 'react-native-gesture-handler';
import Animated from 'react-native-reanimated';
import { useCalendarContext } from './context/CalenderContext';
import { CALENDAR_DAY_LIST } from '../../../../../core/constant/calendar';
import styles from './gestureCalendarStyle';
import useGestureCalendar from './useGestureCalendar';

const width = Dimensions.get('window').width;

const DayHeaderItem = React.memo(
  ({ item, index }: { item: string; index: number }) => {
    const textStyle = useMemo(
      () => [
        styles.dayHeaderItemText,
        item === 'Sun' && { color: 'red' },
        item === 'Sat' && { color: 'blue' },
      ],
      [item],
    );

    return (
      <View style={styles.dayHeaderItem}>
        <Text style={textStyle}>{item}</Text>
      </View>
    );
  },
);

const DayHeader = React.memo(() => {
  return (
    <View style={styles.dayHeader}>
      {CALENDAR_DAY_LIST.map((item, index) => (
        <DayHeaderItem key={index} item={item} index={index} />
      ))}
    </View>
  );
});

const GestureCalendar = () => {
  const { pan, monthlyCalendarStyle, monthlyCalendarOpacity, isMonthly } =
    useGestureCalendar();
  const { monthlyCalendarData, weeklyCalendarData } = useCalendarContext();

  const headerText = useMemo(() => {
    const data = isMonthly ? monthlyCalendarData : weeklyCalendarData;
    return `${data.format('YYYY')}년 ${data.format('MM')}월`;
  }, [isMonthly, monthlyCalendarData, weeklyCalendarData]);

  const containerStyle = useMemo(
    () => ({
      overflow: 'hidden' as const,
      height: isMonthly ? 300 : 40,
    }),
    [isMonthly],
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>{headerText}</Text>
      </View>
      <DayHeader />
      <GestureDetector gesture={pan}>
        <Animated.View style={containerStyle}>
          {isMonthly ? (
            <Animated.View style={[monthlyCalendarStyle, { flex: 1 }]}>
              <MonthlyCalendarBody opacity={monthlyCalendarOpacity} />
            </Animated.View>
          ) : (
            <WeeklyCalendarBody />
          )}
        </Animated.View>
      </GestureDetector>
    </View>
  );
};

export default GestureCalendar;
