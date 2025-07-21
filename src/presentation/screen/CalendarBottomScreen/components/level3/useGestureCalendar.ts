import { View, Text } from 'react-native';
import React, { useEffect, useState } from 'react';
import dayjs from 'dayjs';
import { Gesture } from 'react-native-gesture-handler';
import {
  useSharedValue,
  runOnJS,
  withTiming,
  useAnimatedStyle,
} from 'react-native-reanimated';
import { useCalendarContext } from './context/CelanderContext';

const useGestureCalendar = () => {
  return {};
};

export default useGestureCalendar;
