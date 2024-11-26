// components\CreditCardForm\styles.js
import { StyleSheet } from 'react-native';
import { COLORS, SPACING, TYPOGRAPHY } from '../../styles';

export const styles = StyleSheet.create({
    container: {
        padding: SPACING.lg,
    },
    cardIconContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: SPACING.md,
        gap: SPACING.sm,
    },
    cardIconText: {
        ...TYPOGRAPHY.title,
        fontSize: 18,
    },
    cardIcon: {
        color: "#0000FF",
    },
    input: {
        borderWidth: 1,
        borderColor: COLORS.border,
        borderRadius: SPACING.sm,
        padding: SPACING.md,
        marginBottom: SPACING.xs,
        fontSize: 16,
    },
    inputError: {
        borderColor: COLORS.RED,
    },
    row: {
        flexDirection: 'row',
        gap: SPACING.md,
        marginBottom: SPACING.sm,
    },
    halfInputContainer: {
        flex: 1,
    },
    errorText: {
        ...TYPOGRAPHY.body,
        color: COLORS.RED,
        fontSize: 12,
        marginBottom: SPACING.sm,
        marginLeft: SPACING.xs,
    },
    saveCardContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: SPACING.md,
        gap: SPACING.sm,
    },
    checkbox: {
        width: 20,
        height: 20,
        borderWidth: 2,
        borderColor: COLORS.border,
        borderRadius: 4,
    },
    checkboxChecked: {
        backgroundColor: COLORS.RED,
        borderColor: COLORS.RED,
    },
    saveCardText: {
        ...TYPOGRAPHY.body,
    },
});