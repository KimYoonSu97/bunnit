import { View, Text, Dimensions, Button } from 'react-native';
import React, { useEffect, useState } from 'react';
import MonthlyCalendarBody from './components/MonthlyCalendarBody';
import WeeklyCalendarBody from './components/WeeklyCalendarBody';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import Animated, {
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withTiming,
} from 'react-native-reanimated';
import { useCalendarContext } from './context/CalenderContext';
import { CALENDAR_DAY_LIST } from '../../../../../core/constant/calendar';
import styles from './gestureCalendarStyle';
import useGestureCalendar from './useGestureCalendar';

const width = Dimensions.get('window').width;

const GestureCalendar = () => {
  const {
    pan,
    monthlyCalendarStyle,
    monthlyCalendarOpacity,
    isMonthly,
  } = useGestureCalendar();
  const { monthlyCalendarData, weeklyCalendarData } = useCalendarContext();

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>
          {isMonthly
            ? `${monthlyCalendarData.format(
                'YYYY',
              )}년 ${monthlyCalendarData.format('MM')}월`
            : `${weeklyCalendarData.format(
                'YYYY',
              )}년 ${weeklyCalendarData.format('MM')}월`}
        </Text>
      </View>
      <View style={styles.dayHeader}>
        {CALENDAR_DAY_LIST.map((item, index) => {
          return (
            <View key={index} style={styles.dayHeaderItem}>
              <Text
                style={[
                  styles.dayHeaderItemText,
                  item === 'Sun' && { color: 'red' },
                  item === 'Sat' && { color: 'blue' },
                ]}
              >
                {item}
              </Text>
            </View>
          );
        })}
      </View>
      <GestureDetector gesture={pan}>
        <Animated.View
          style={[{ overflow: 'hidden', height: isMonthly ? 300 : 40 }]}
        >
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
