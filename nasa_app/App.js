import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import TodayImage from './screens/TodayPicture.js';
import PreviousImages from './screens/PreviousPictures.js';
/**
 * The main entry point for the app.
 * It creates a navigator using the Stack Navigator and sets up two screens, HomeScreen and PreviousImages,
 * which can be navigated between using the navigator.
 */
const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Today Image" component={TodayImage} />
        <Stack.Screen name="Previous images" component={PreviousImages} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}