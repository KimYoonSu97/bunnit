/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';

import { NavigationContainer } from '@react-navigation/native';
import BottomTabNavigation from './src/core/navigation/BottomTabNavigation';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

function App() {
  return (
    <NavigationContainer>
      <GestureHandlerRootView>
        <BottomTabNavigation />
      </GestureHandlerRootView>
    </NavigationContainer>
  );
}

export default App;
