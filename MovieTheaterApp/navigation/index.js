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
import CouponScreen from '../screens/CouponScreen';
import RegisterScreen from '../screens/RegisterScreen';
import AccountScreen from '../screens/AccountScreen';
import PaymentScreen from '../screens/PaymentScreen';
import TicketConfirmationScreen from '../screens/TicketConfirmationScreen';
import Header from '../components/Header';
import { COLORS } from '../styles';

const Stack = createNativeStackNavigator();

// Remove the HeaderRight component and update screenOptions
const screenOptions = {
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
};

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
            headerTitle: 'Login',
        }
    },
    {
        name: 'MovieDetails',
        component: MovieDetailsScreen,
        options: {
            headerTitle: 'Movie Details',
            header: () => <Header />
        }
    },
    {
        name: 'Showtime',
        component: ShowtimeScreen,
        options: {
            headerTitle: 'Select Showtime',
            header: () => <Header />
        }
    },
    {
        name: 'SeatSelection',
        component: SeatSelectionScreen,
        options: {
            headerTitle: 'Select Seats',
            header: () => <Header />
        }
    },
    {
        name: 'News',
        component: NewsScreen,
        options: {
            headerTitle: 'Movie News',
            header: () => <Header />
        }
    },
    {
        name: 'Ticket',
        component: TicketScreen,
        options: {
            headerTitle: 'Tickets',
            header: () => <Header />
        }
    },
    {
        name: 'Coupon',
        component: CouponScreen,
        options: {
            headerTitle: 'Coupon',
            header: () => <Header />
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
        name: 'Account',
        component: AccountScreen,
        options: {
            headerTitle: 'Account',
        }
    },
    {
        name: 'Payment',
        component: PaymentScreen,
        options: {
            headerTitle: 'Payment',
            header: () => <Header />
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