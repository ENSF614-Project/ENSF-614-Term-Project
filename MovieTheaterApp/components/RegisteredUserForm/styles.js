// components/RegisteredUserForm/styles.js
import { StyleSheet } from 'react-native';
import { COLORS, SPACING, TYPOGRAPHY } from '../../styles';

export const styles = StyleSheet.create({
    container: {
        padding: SPACING.lg,
    },
    userIconContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: SPACING.md,
        gap: SPACING.sm,
    },
    userIconText: {
        ...TYPOGRAPHY.title,
        fontSize: 18,
    },
    input: {
        borderWidth: 1,
        borderColor: COLORS.input.border,
        borderRadius: SPACING.sm,
        padding: SPACING.md,
        marginBottom: SPACING.sm,
        fontSize: 16,
        backgroundColor: COLORS.input.background,
    },
    inputError: {
        borderColor: COLORS.input.borderError,
    },
    errorText: {
        ...TYPOGRAPHY.body,
        color: COLORS.text.error,
        fontSize: 12,
        marginBottom: SPACING.sm,
        marginLeft: SPACING.xs,
    },
});
