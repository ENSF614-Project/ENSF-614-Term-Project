// navigation/index.js
import React from 'react';
import { TouchableOpacity } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { User } from 'lucide-react-native';

import HomeScreen from '../screens/HomeScreen';
import MovieDetailsScreen from '../screens/MovieDetailsScreen';
import ShowtimeScreen from '../screens/ShowtimeScreen';
import LoginScreen from '../screens/LoginScreen';
import SeatSelectionScreen from '../screens/SeatSelectionScreen';
import NewsScreen from '../screens/NewsScreen';
import TicketScreen from '../screens/TicketScreen';
import RegisterScreen from '../screens/RegisterScreen';
import PaymentScreen from '../screens/PaymentScreen';
import TicketConfirmationScreen from '../screens/TicketConfirmationScreen';
import Header from '../components/Header';
import { COLORS } from '../styles';

const Stack = createNativeStackNavigator();

const HeaderRight = ({ navigation }) => {
    const handleLoginPress = () => {
        navigation.navigate('Login');
    };

    return (
        <TouchableOpacity
            onPress={handleLoginPress}
            style={{ padding: 8, marginRight: 8 }}
        >
            <User size={24} color={COLORS.text.primary} />
        </TouchableOpacity>
    );
};

// Default screen options that apply to all screens
const screenOptions = ({ navigation }) => ({
    headerRight: () => <HeaderRight navigation={navigation} />,
    headerTintColor: COLORS.text.primary,
    headerStyle: {
        backgroundColor: COLORS.background,
        height: 64,
    },
    headerTitleStyle: {
        fontSize: 20,
    },
    contentStyle: {
        backgroundColor: COLORS.background,
    }
});

const screens = [
    {
        name: 'Home',
        component: HomeScreen,
        options: {
            header: () => <Header />
        }
    },
    {
        name: 'Login',
        component: LoginScreen,
        options: {
            headerRight: null,
            headerTitle: 'Login',
        }
    },
    {
        name: 'MovieDetails',
        component: MovieDetailsScreen,
        options: {
            headerTitle: 'Movie Details',
        }
    },
    {
        name: 'Showtime',
        component: ShowtimeScreen,
        options: {
            headerTitle: 'Select Showtime',
        }
    },
    {
        name: 'SeatSelection',
        component: SeatSelectionScreen,
        options: {
            headerTitle: 'Select Seats',
        }
    },
    {
        name: 'News',
        component: NewsScreen,
        options: {
            headerTitle: 'Movie News',
        }
    },
    {
        name: 'Ticket',
        component: TicketScreen,
        options: {
            headerTitle: 'Tickets',
        }
    },
    {
        name: 'Register',
        component: RegisterScreen,
        options: {
            headerTitle: 'Registration',
        }
    },
    {
        name: 'Payment',
        component: PaymentScreen,
        options: {
            headerTitle: 'Payment',
        }
    },
    {
        name: 'TicketConfirmation',
        component: TicketConfirmationScreen,
        options: {
            headerTitle: 'Confirmation',
            // Prevent going back to payment screen after confirmation
            headerLeft: () => null,
            gestureEnabled: false
        }
    }
];

export const Navigation = () => {
    return (
        <Stack.Navigator
            initialRouteName="Home"
            screenOptions={screenOptions}
        >
            {screens.map((screen) => (
                <Stack.Screen
                    key={screen.name}
                    name={screen.name}
                    component={screen.component}
                    options={screen.options}
                />
            ))}
        </Stack.Navigator>
    );
};