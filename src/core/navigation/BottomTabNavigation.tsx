import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeBottomScreen from '../../presentation/screen/HomeBottomScreen';
import CalendarBottomScreen from '../../presentation/screen/CalendarBottomScreen';
import LibraryBottomScreen from '../../presentation/screen/LibraryBottomScreen';
import MypageBottomScreen from '../../presentation/screen/MypageBottomScreen';

const BottomTab = createBottomTabNavigator();

const BottomTabNavigation = () => {
  return (
    <BottomTab.Navigator>
      <BottomTab.Screen name="Home" component={HomeBottomScreen} />
      <BottomTab.Screen name="Calendar" component={CalendarBottomScreen} />
      <BottomTab.Screen name="Library" component={LibraryBottomScreen} />
      <BottomTab.Screen name="Mypage" component={MypageBottomScreen} />
    </BottomTab.Navigator>
  );
};

export default BottomTabNavigation;
