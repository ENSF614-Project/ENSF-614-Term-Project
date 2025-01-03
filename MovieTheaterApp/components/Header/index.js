// components/Header/index.js
import React, { useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { User, Menu } from 'lucide-react-native';
import { useNavigation } from '@react-navigation/native';
import { styles } from './styles';
import { COLORS } from '../../styles';
import { useAuth } from '../../context/AuthContext';

const Header = () => {
    const navigation = useNavigation();
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const { user, logout } = useAuth();

    const handleLoginPress = () => {
        if (!user) {
            navigation.navigate('Login');
        } else {
            navigation.navigate('Account');
        }
    };

    const handleLogout = () => {
        logout();
        setIsMenuOpen(false);
        navigation.navigate('Home');
    };

    const handleLogoPress = () => {
        navigation.navigate('Home');
        setIsMenuOpen(false); // Close menu if it's open
    };

    const handleMenuItemPress = (route) => {
        setIsMenuOpen(false);

        // Allow access to Ticket and Coupon without authentication
        if (route === 'Ticket' || route === 'Coupon') {
            navigation.navigate(route);
            return;
        }

        // Keep other routes behind authentication if in header
        if (!user) {
            navigation.navigate('Login');
            return;
        }
        navigation.navigate(route);
    };

    return (
        <>
            <View style={styles.container}>
                <View style={styles.leftContainer}>
                    <TouchableOpacity
                        style={styles.iconButton}
                        onPress={() => setIsMenuOpen(!isMenuOpen)}
                    >
                        <Menu size={24} color={COLORS.text.primary} />
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={handleLogoPress}
                        style={styles.logoButton}
                    >
                        <Text style={styles.logo}>AcmePlex</Text>
                    </TouchableOpacity>
                </View>

                <TouchableOpacity
                    style={styles.iconButton}
                    onPress={handleLoginPress}
                >
                    <User size={24} color={COLORS.text.primary} />
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
                    {user && (
                        <TouchableOpacity
                            style={styles.menuItem}
                            onPress={handleLogout}
                        >
                            <Text style={styles.menuItemTextLogout}>Logout</Text>
                        </TouchableOpacity>
                    )}
                </View>
            )}
        </>
    );
};

export default Header;