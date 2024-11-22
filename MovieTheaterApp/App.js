// App.js
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './screens/HomeScreen';
import MovieDetailsScreen from './screens/MovieDetailsScreen';
import ShowtimeScreen from './screens/ShowtimeScreen';
import LoginScreen from './screens/LoginScreen';
import SeatSelectionScreen from './screens/SeatSelectionScreen';

const Stack = createNativeStackNavigator();

export default function App() {
    return (
        <NavigationContainer>
            <Stack.Navigator
                initialRouteName="Home"
                screenOptions={{
                    headerShown: false,
                }}
            >
                <Stack.Screen name="Home" component={HomeScreen} />
                <Stack.Screen name="Login"
                    component={LoginScreen}
                    options={{
                        headerShown: true,
                        headerTitle: 'Login',
                    }}
                />
                <Stack.Screen
                    name="MovieDetails"
                    component={MovieDetailsScreen}
                    options={{
                        headerShown: true,
                        headerTitle: 'Movie Details',
                    }}
                />
                <Stack.Screen
                    name="Showtime"
                    component={ShowtimeScreen}
                    options={{
                        headerShown: true,
                        headerTitle: 'Select Showtime',
                    }}
                />
                <Stack.Screen
                    name="SeatSelection"
                    component={SeatSelectionScreen}
                    options={{
                        headerShown: true,
                        headerTitle: 'Select Seats',
                    }}
                />
            </Stack.Navigator>
        </NavigationContainer>
    );
}