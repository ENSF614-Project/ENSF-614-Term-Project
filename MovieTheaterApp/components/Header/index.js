// components/Header/index.js
import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { User } from 'lucide-react-native';
import { useNavigation } from '@react-navigation/native';
import { styles } from './styles';
import { COLORS } from '../../styles';

const Header = () => {
    const navigation = useNavigation();

    const handleLoginPress = () => {
        navigation.navigate('Login');
    };

    return (
        <View style={styles.container}>
            <Text style={styles.logo}>AcmePlex</Text>
            <TouchableOpacity
                style={styles.iconButton}
                onPress={handleLoginPress}
            >
                <User size={24} color={COLORS.text.primary} />
            </TouchableOpacity>
        </View>
    );
};

export default Header;