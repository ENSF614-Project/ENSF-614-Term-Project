// components/Header/styles.js
import { StyleSheet } from 'react-native';
import { COLORS, SPACING, TYPOGRAPHY } from '../../styles';

export const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: SPACING.lg,
        height: 64,
        backgroundColor: COLORS.background,
        borderBottomWidth: 1,
        borderBottomColor: COLORS.border,
    },
    leftContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    logo: {
        ...TYPOGRAPHY.logo,
        color: COLORS.text.primary,
        marginLeft: SPACING.lg,
        fontSize: 20,
    },
    iconButton: {
        padding: SPACING.xs,
    },
    menuContainer: {
        width: '100%',
        backgroundColor: COLORS.background,
        borderBottomWidth: 1,
        borderBottomColor: COLORS.border,
        paddingVertical: SPACING.xs,
    },
    menuItem: {
        paddingVertical: SPACING.md,
        paddingHorizontal: SPACING.lg,
    },
    menuItemText: {
        ...TYPOGRAPHY.body,
        color: COLORS.text.primary,
        fontSize: 16,
    },
});