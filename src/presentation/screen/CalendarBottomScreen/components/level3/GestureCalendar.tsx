import {
  View,
  Text,
  Pressable,
  Button,
  FlatList,
  Dimensions,
} from 'react-native';
import React, { useMemo, useState } from 'react';
import useGestureCalendar from './useGestureCalendar';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import Animated, {
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import { CALENDAR_DAY_LIST } from '../../../../../core/constant/calendar';
import { styleSheet } from './gestureCalendarStyle';
import WeeklyList from './components/WeeklyList';
import dayjs from 'dayjs';
import useGetMonthlyCalendar from '../../../../shared/hook/useGetMonthlyCalendar';
import CalendarBody from '../level2/components/CalendarBody';
import MonthlyList from './components/MonthlyList';
const width = Dimensions.get('window').width;

const GestureCalendar = () => {
  const {
    selectDay,
    setSelectDay,
    selectWeekIndex,
    setSelectWeekIndex,
    heightAnimatedStyle,
    positionAnimatedStyle,
    pan,
    isWeekly,
    currentDay,
    setCurrentDay,
    opacityAnimatedStyle,
  } = useGestureCalendar();

  return (
    <View style={styleSheet.container}>
      <Text style={{ fontSize: 20, fontWeight: 'bold' }}>
        {currentDay.format('YYYY-MM')}
      </Text>
      <View style={styleSheet.headerContainer}>
        <View style={styleSheet.weekdayHeader}>
          {CALENDAR_DAY_LIST.map((day, index) => (
            <View key={index} style={styleSheet.weekdayItem}>
              <Text
                style={[
                  day === 'Sun' && { color: 'red' },
                  day === 'Sat' && { color: 'blue' },
                ]}
              >
                {day}
              </Text>
            </View>
          ))}
        </View>
      </View>
      <GestureDetector gesture={pan}>
        <Animated.View
          style={[
            {
              backgroundColor: 'aqua',
              // overflow: 'hidden',
            },
            // heightAnimatedStyle,
          ]}
        >
          {isWeekly ? (
            <WeeklyList
              currentDay={currentDay}
              setCurrentDay={setCurrentDay}
              selectWeekIndex={selectWeekIndex}
              setSelectWeekIndex={setSelectWeekIndex}
            />
          ) : (
            <Animated.View style={[positionAnimatedStyle]}>
              <MonthlyList
                currentDay={currentDay}
                setCurrentDay={setCurrentDay}
                selectWeekIndex={selectWeekIndex}
                setSelectWeekIndex={setSelectWeekIndex}
                opacityAnimatedStyle={opacityAnimatedStyle}
              />
            </Animated.View>
          )}
        </Animated.View>
      </GestureDetector>
    </View>
  );
};

export default GestureCalendar;
