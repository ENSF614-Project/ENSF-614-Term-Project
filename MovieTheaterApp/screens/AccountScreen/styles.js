// screens/AccountScreen/styles.js
import { StyleSheet } from 'react-native';
import { COLORS, SPACING, TYPOGRAPHY } from '../../styles';

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.background.primary,
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
        backgroundColor: COLORS.background.primary,
        borderRadius: SPACING.sm,
        borderWidth: 1,
        borderColor: COLORS.border.default,
        padding: SPACING.lg,
    },
    paymentSection: {
        marginBottom: SPACING.xl,
        backgroundColor: COLORS.background.primary,
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
        borderColor: COLORS.border.default,
        borderRadius: SPACING.sm,
        padding: SPACING.md,
        marginBottom: SPACING.lg,
        fontSize: 16,
        backgroundColor: COLORS.input.background,
        color: COLORS.text.primary,
    },
    inputError: {
        borderColor: COLORS.text.error,
    },
    errorText: {
        ...TYPOGRAPHY.body,
        color: COLORS.text.error,
        fontSize: 12,
        marginBottom: SPACING.sm,
        marginLeft: SPACING.xs,
    },
    paymentMethodContainer: {
        padding: SPACING.lg,
    },
    savedCard: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: SPACING.md,
        borderWidth: 1,
        borderColor: COLORS.border.default,
        borderRadius: SPACING.sm,
        marginBottom: SPACING.md,
        backgroundColor: COLORS.background.primary,
    },
    selectedCard: {
        borderColor: COLORS.button.primary.background,
        backgroundColor: COLORS.background.secondary,
    },
    savedCardInfo: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: SPACING.md,
    },
    savedCardText: {
        ...TYPOGRAPHY.body,
        color: COLORS.text.primary,
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
    navigationButtonsContainer: {
        marginTop: SPACING.lg,
        width: '100%',
        alignItems: 'center',
    },
    navigationButton: {
        backgroundColor: COLORS.button.primary.background,
        paddingVertical: SPACING.md,
        paddingHorizontal: SPACING.xl,
        borderRadius: SPACING.sm,
        marginBottom: SPACING.md,
        width: '80%',
        alignItems: 'center',
    },
    navigationButtonText: {
        color: COLORS.button.primary.text,
        fontSize: 16,
        fontWeight: 'bold',
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
        color: COLORS.button.primary.background,
    },
    membershipInfo: {
        ...TYPOGRAPHY.body,
        color: COLORS.text.secondary,
        fontStyle: 'italic',
    }
});