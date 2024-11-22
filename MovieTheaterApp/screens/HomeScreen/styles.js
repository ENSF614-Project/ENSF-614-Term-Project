// screens/HomeScreen/styles.js
import { StyleSheet } from 'react-native';
import { COLORS, SPACING } from '../../styles';

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.background,
    },
    movieList: {
        padding: SPACING.lg,
    },
    columnWrapper: {
        justifyContent: 'flex-start',
        gap: SPACING.md,
    }
});