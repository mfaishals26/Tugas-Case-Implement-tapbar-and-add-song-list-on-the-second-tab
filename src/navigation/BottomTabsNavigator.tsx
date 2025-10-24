import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MovieListScreen from '../screens/MovieListScreen';
import MusicScreen from '../screens/MusicScreen';
import Ionicons from 'react-native-vector-icons/Ionicons';

const Tab = createBottomTabNavigator();

export default function BottomTabsNavigator() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarIcon: ({ focused, color, size }) => {
          let iconName = '';

          // 🔹 Pilih icon sesuai route
          switch (route.name) {
            case 'MovieList':
              iconName = focused ? 'film' : 'film-outline';
              break;
            case 'MusicScreen':
              iconName = focused ? 'musical-notes' : 'musical-notes-outline';
              break;
            default:
              iconName = 'help-circle-outline'; // fallback jika route salah
          }

          // 🔹 Debug jika icon tidak muncul
          console.log(`Route: ${route.name}, Icon: ${iconName}, Size: ${size}, Color: ${color}`);

          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: 'tomato',
        tabBarInactiveTintColor: 'gray',
        tabBarStyle: { height: 60, paddingBottom: 5 },
      })}
    >
      {/* 🔹 Route name harus sama dengan yang dipakai di AppNavigator */}
      <Tab.Screen
        name="MovieList"
        component={MovieListScreen}
        options={{ title: 'Movies' }}
      />
      <Tab.Screen
        name="MusicScreen"
        component={MusicScreen}
        options={{ title: 'Music' }}
      />
    </Tab.Navigator>
  );
}
