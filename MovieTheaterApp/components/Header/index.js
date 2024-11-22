// components/Header/index.js
import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { User, Search } from 'lucide-react-native';
import { useNavigation } from '@react-navigation/native';
import { styles } from './styles';
import { COLORS } from '../../styles';

const Header = () => {
    const navigation = useNavigation();

    const handleLoginPress = () => {
        console.log('Navigate to Login'); // Debug log
        navigation.navigate('Login');
    };

    return (
        <View style={styles.container}>
            <Text style={styles.logo}>AcmePlex</Text>
            <View style={styles.rightContainer}>
                {/*Search Icon*/}
                <TouchableOpacity style={styles.iconButton}>
                    {/*TODO: Add functionality*/}
                    <Search size={24} color={COLORS.text.primary} />
                </TouchableOpacity>
                {/*User Icon*/}
                <TouchableOpacity
                    style={styles.iconButton}
                    onPress={handleLoginPress}
                >
                    <User size={24} color={COLORS.text.primary} />
                </TouchableOpacity>
            </View>
        </View>
    );
};

export default Header;