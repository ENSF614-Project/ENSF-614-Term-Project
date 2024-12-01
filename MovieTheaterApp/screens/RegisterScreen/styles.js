// screens/RegisterScreen/styles.js
import { StyleSheet } from 'react-native';
import { COLORS, SPACING, TYPOGRAPHY } from '../../styles';

export const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        backgroundColor: COLORS.background.primary,
        justifyContent: 'center',
        padding: SPACING.xl,
    },
    formContainer: {
        width: '100%',
        maxWidth: 400,
        alignSelf: 'center',
        marginBottom: SPACING.xl,
    },
    title: {
        ...TYPOGRAPHY.title,
        fontSize: 24,
        marginBottom: SPACING.xl,
        textAlign: 'center',
        color: COLORS.text.primary,
    },
    section: {
        marginBottom: SPACING.xl,
        backgroundColor: COLORS.background.secondary,
        borderRadius: SPACING.sm,
        borderWidth: 1,
        borderColor: COLORS.border.default,
        padding: SPACING.lg,
    },
    sectionHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: SPACING.lg,
        gap: SPACING.sm,
    },
    sectionTitle: {
        ...TYPOGRAPHY.title,
        fontSize: 18,
        color: COLORS.text.primary,
    },
    input: {
        borderWidth: 1,
        borderColor: COLORS.input.border,
        backgroundColor: COLORS.input.background,
        borderRadius: SPACING.sm,
        padding: SPACING.md,
        marginBottom: SPACING.lg,
        fontSize: 16,
        color: COLORS.text.primary,
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
    membershipContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: SPACING.md,
    },
    membershipTitle: {
        ...TYPOGRAPHY.title,
        fontSize: 18,
        color: COLORS.text.primary,
    },
    membershipAmount: {
        ...TYPOGRAPHY.title,
        fontSize: 20,
        color: COLORS.button.danger.background,
    },
    membershipInfo: {
        ...TYPOGRAPHY.body,
        color: COLORS.text.secondary,
        fontStyle: 'italic',
    },
    registerButton: {
        backgroundColor: COLORS.button.primary.background,
        padding: SPACING.md,
        borderRadius: SPACING.sm,
        marginBottom: SPACING.md,
    },
    registerButtonText: {
        color: COLORS.button.primary.text,
        textAlign: 'center',
        fontSize: 16,
        fontWeight: 'bold',
    },

    registerButtonDisabled: {
        opacity: 0.6,
    },

    loginButton: {
        padding: SPACING.sm,
    },
    loginButtonText: {
        color: COLORS.text.secondary,
        textAlign: 'center',
    },

    errorContainer: {
        marginVertical: SPACING.md,
        padding: SPACING.md,
        backgroundColor: COLORS.background.error,
        borderRadius: SPACING.sm,
    },
    errorText: {
        color: COLORS.text.error,
        fontSize: 14,
        textAlign: 'center',
    },
});
