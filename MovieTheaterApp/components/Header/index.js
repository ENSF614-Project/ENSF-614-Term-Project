// components/Header/index.js
import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { User, Search } from 'lucide-react-native';
import { styles } from './styles';
import { COLORS } from '../../styles';

const Header = () => {
    return (
        <View style={styles.container}>
            <Text style={styles.logo}>AcmePlex</Text>
            <View style={styles.rightContainer}>
                <TouchableOpacity style={styles.iconButton}>
                    {/*TODO: Add functionality*/}
                    <Search size={24} color={COLORS.text.primary} />
                </TouchableOpacity>
                <TouchableOpacity style={styles.iconButton}>
                    {/*TODO: Add functionality*/}
                    <User size={24} color={COLORS.text.primary} />
                </TouchableOpacity>
            </View>
        </View>
    );
};

export default Header;
