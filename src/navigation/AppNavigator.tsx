import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import BottomTabsNavigator from './BottomTabsNavigator';
import MovieDetailScreen from '../screens/MovieDetailScreen';
import MusicDetailScreen from '../screens/MusicDetailScreen';
import MovieLitScreen from '../screens/MovieListScreen';



export type RootStackParamList = {
  Tabs: undefined;
  MovieDetail: { id: string };
  MusicDetail: { song: any };
};

export type BottomTabParamList = {
  MovieList: undefined;
  MusicScreen: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function AppNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Tabs"
        component={BottomTabsNavigator}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="MovieDetail"
        component={MovieDetailScreen}
        options={{ title: 'Movie Detail' }}
      />
      <Stack.Screen
        name="MusicDetail"
        component={MusicDetailScreen}
        options={{ title: 'Music Detail' }}
      />
    </Stack.Navigator>
  );
}
