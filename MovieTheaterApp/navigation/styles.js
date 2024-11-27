// navigation/styles.js
import { StyleSheet } from 'react-native';
import { COLORS } from '../styles';

export const styles = StyleSheet.create({
    header: {
        tintColor: COLORS.text.primary,
        backgroundColor: COLORS.background.primary,
    },
    icon: {
        color: COLORS.icon.primary,
    }
});