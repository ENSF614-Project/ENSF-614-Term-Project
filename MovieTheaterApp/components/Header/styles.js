// components/Header/styles.js
import { StyleSheet, StatusBar } from 'react-native';
import { COLORS, SPACING, TYPOGRAPHY } from '../../styles';

export const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: SPACING.lg,
        paddingTop: StatusBar.currentHeight + SPACING.sm,
        paddingBottom: SPACING.sm,
        backgroundColor: COLORS.background,
        borderBottomWidth: 1,
        borderBottomColor: COLORS.border,
    },
    logo: {
        ...TYPOGRAPHY.logo,
        color: COLORS.text.primary,
    },
    rightContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: SPACING.md,
    },
    iconButton: {
        padding: SPACING.xs,
    }
});
