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
        backgroundColor: COLORS.background.primary,
        borderBottomWidth: 1,
        borderBottomColor: COLORS.border.default,
    },
    leftContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    logoButton: {
        marginLeft: SPACING.lg,
        padding: SPACING.xs,
    },
    logo: {
        ...TYPOGRAPHY.logo,
        color: COLORS.text.primary,
        fontSize: 20,
    },
    iconButton: {
        padding: SPACING.xs,
        color: COLORS.icon.primary,
    },
    menuContainer: {
        width: '100%',
        backgroundColor: COLORS.background.primary,
        borderBottomWidth: 1,
        borderBottomColor: COLORS.border.default,
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
    menuItemTextLogout: {
        ...TYPOGRAPHY.body,
        color: COLORS.text.error,
        fontSize: 16,
    },
    iconColor: {
        color: COLORS.icon.primary,
    },
});