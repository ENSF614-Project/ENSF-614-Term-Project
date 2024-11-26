// components/Header/index.js
import React, { useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { User, Menu } from 'lucide-react-native';
import { useNavigation } from '@react-navigation/native';
import { styles } from './styles';
import { COLORS } from '../../styles';

const Header = () => {
    const navigation = useNavigation();
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const handleLoginPress = () => {
        navigation.navigate('Login');
    };

    const handleMenuItemPress = (route) => {
        setIsMenuOpen(false);
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
                    <Text style={styles.logo}>AcmePlex</Text>
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
                </View>
            )}
        </>
    );
};

export default Header;