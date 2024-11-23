// App.js
import React from 'react';
import { TouchableOpacity } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { User } from 'lucide-react-native';
import HomeScreen from './screens/HomeScreen';
import MovieDetailsScreen from './screens/MovieDetailsScreen';
import ShowtimeScreen from './screens/ShowtimeScreen';
import LoginScreen from './screens/LoginScreen';
import SeatSelectionScreen from './screens/SeatSelectionScreen';
import Header from './components/Header';
import { COLORS } from './styles';
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



export default function App() {
    return (
        <NavigationContainer>
            <Stack.Navigator
                initialRouteName="Home"
                screenOptions={({ navigation }) => ({
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
                })}
            >
                <Stack.Screen
                    name="Home"
                    component={HomeScreen}
                    options={{
                        header: () => <Header />
                    }}
                />
                <Stack.Screen
                    name="Login"
                    component={LoginScreen}
                    options={{
                        headerRight: null,
                        headerTitle: 'Login',
                    }}
                />
                <Stack.Screen
                    name="MovieDetails"
                    component={MovieDetailsScreen}
                    options={{
                        headerTitle: 'Movie Details',
                    }}
                />
                <Stack.Screen
                    name="Showtime"
                    component={ShowtimeScreen}
                    options={{
                        headerTitle: 'Select Showtime',
                    }}
                />
                <Stack.Screen
                    name="SeatSelection"
                    component={SeatSelectionScreen}
                    options={{
                        headerTitle: 'Select Seats',
                    }}
                />
            </Stack.Navigator>
        </NavigationContainer>
    );
}