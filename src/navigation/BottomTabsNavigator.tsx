import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MovieListScreen from '../screens/MovieListScreen';
import MusicScreen from '../screens/MusicScreen';
import Ionicons from 'react-native-vector-icons/Ionicons';

export type BottomTabParamList = {
  MovieList: undefined;
  MusicScreen: undefined;
};

const Tab = createBottomTabNavigator<BottomTabParamList>();

export default function BottomTabsNavigator() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarIcon: ({ focused, color, size }) => {
          let iconName = '';
          if (route.name === 'MovieList') iconName = focused ? 'film' : 'film-outline';
          if (route.name === 'MusicScreen') iconName = focused ? 'musical-notes' : 'musical-notes-outline';
          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: 'tomato',
        tabBarInactiveTintColor: 'gray',
      })}
    >
      <Tab.Screen name="MovieList" component={MovieListScreen} options={{ title: 'Movies' }} />
      <Tab.Screen name="MusicScreen" component={MusicScreen} options={{ title: 'Music' }} />
    </Tab.Navigator>
  );
}
