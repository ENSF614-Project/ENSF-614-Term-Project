// components/Header/index.js
import React, { useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { User, Menu } from 'lucide-react-native';
import { useNavigation } from '@react-navigation/native';
import { styles } from './styles';

const Header = () => {
    const navigation = useNavigation();
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isUserLoggedIn, setIsUserLoggedIn] = useState(true); // Replace with actual login logic

    const handleLoginPress = () => {
        if (!isUserLoggedIn) {
            navigation.navigate('Login');
        }
        else{
            navigation.navigate('Account');
        }
    };

    const handleMenuItemPress = (route) => {
        setIsMenuOpen(false);
        navigation.navigate(route);
    };
            //Get rid of the view account in the hamburger menu later, this is only for testing.
    return (
        <>
            <View style={styles.container}>
                <View style={styles.leftContainer}>
                    <TouchableOpacity
                        style={styles.iconButton}
                        onPress={() => setIsMenuOpen(!isMenuOpen)}
                    >
                        <Menu size={24} color={styles.iconButton.color} />
                    </TouchableOpacity>
                    <Text style={styles.logo}>AcmePlex</Text>
                </View>

                <TouchableOpacity
                    style={styles.iconButton}
                    onPress={handleLoginPress}
                >
                    <User size={24} color={styles.iconButton.color} />
                </TouchableOpacity>
            </View>

            {isMenuOpen && (
                <View style={styles.menuContainer}>
                    <TouchableOpacity
                        style={styles.menuItem}
                        onPress={() => handleMenuItemPress('Ticket')}
                    >
                        <Text style={styles.menuItemText}>View and Cancel Tickets</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={styles.menuItem}
                        onPress={() => handleMenuItemPress('News')}
                    >
                        <Text style={styles.menuItemText}>View News</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={styles.menuItem}
                        onPress={() => handleMenuItemPress('Coupon')}
                    >
                        <Text style={styles.menuItemText}>View Coupon</Text>
                    </TouchableOpacity> 

                    {/* <TouchableOpacity
                        style={styles.menuItem}
                        onPress={() => handleMenuItemPress('Account')}
                    >
                        <Text style={styles.menuItemText}>View Account</Text>
                    </TouchableOpacity>  */}
                </View>
            )}
        </>
    );
};

export default Header;