// App.js
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './screens/HomeScreen';
import MovieDetailsScreen from './screens/MovieDetailsScreen';
import ShowtimeScreen from './screens/ShowtimeScreen';

const Stack = createNativeStackNavigator();

export default function App() {
    return (
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen
                    name="Home"
                    component={HomeScreen}
                    options={{ headerShown: false }}
                />
                <Stack.Screen
                    name="MovieDetails"
                    component={MovieDetailsScreen}
                    options={{ headerShown: true, title: '' }}
                />
                <Stack.Screen
                    name="Showtime"
                    component={ShowtimeScreen}
                    options={{ headerShown: true, title: 'Select Showtime' }}
                />
            </Stack.Navigator>
        </NavigationContainer>
    );
}