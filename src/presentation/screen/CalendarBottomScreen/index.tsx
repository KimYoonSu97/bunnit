import { View, Button } from 'react-native';
import React, { useState } from 'react';
import { commonStyleSheet } from '../../shared/style/commonStyleSheet';
import MonthlyCalendar from './components/level2/MonthlyCalendar';
import GestureCalendar from './components/level3/GestureCalendar';

const Index = () => {
  const [level, setLevel] = useState<'2' | '3'>('2');
  return (
    <View style={commonStyleSheet.container}>
      <Button
        onPress={() => {
          if (level === '2') {
            setLevel('3');
          } else {
            setLevel('2');
          }
        }}
        title={level === '2' ? '3 ' : '2 '}
      />
      {level === '2' && <MonthlyCalendar />}
      {level === '3' && <GestureCalendar />}
      {/* 캘린더 컨테이너 */}
    </View>
  );
};

export default Index;
