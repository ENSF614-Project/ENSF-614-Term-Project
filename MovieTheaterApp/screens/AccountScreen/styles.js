// screens/RegisterScreen/styles.js
import { StyleSheet } from 'react-native';
import { COLORS, SPACING, TYPOGRAPHY } from '../../styles';

export const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        backgroundColor: COLORS.background,
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
    },
    section: {
        marginBottom: SPACING.xl,
        backgroundColor: COLORS.background,
        borderRadius: SPACING.sm,
        borderWidth: 1,
        borderColor: COLORS.border,
        padding: SPACING.lg,
    },
    paymentSection: {
        marginBottom: SPACING.xl,
        backgroundColor: COLORS.background,
        borderRadius: SPACING.sm,
        borderWidth: 1,
        borderColor: COLORS.border,
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
    },
    input: {
        borderWidth: 1,
        borderColor: COLORS.border,
        borderRadius: SPACING.sm,
        padding: SPACING.md,
        marginBottom: SPACING.lg,
        fontSize: 16,
    },
    inputError: {
        borderColor: COLORS.RED,
    },
    errorText: {
        ...TYPOGRAPHY.body,
        color: COLORS.RED,
        fontSize: 12,
        marginBottom: SPACING.sm,
        marginLeft: SPACING.xs,
    },
    registerButton: {
        backgroundColor: COLORS.RED,
        padding: SPACING.md,
        borderRadius: SPACING.sm,
        marginBottom: SPACING.md,
    },
    registerButtonText: {
        color: COLORS.background,
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

    paymentMethodContainer: {
        padding: SPACING.lg,
    },
    savedCard: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: SPACING.md,
        borderWidth: 1,
        borderColor: COLORS.border,
        borderRadius: SPACING.sm,
        marginBottom: SPACING.md,
    },
    selectedCard: {
        borderColor: COLORS.RED,
        backgroundColor: COLORS.secondaryBackground,
    },
    savedCardInfo: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: SPACING.md,
    },
    savedCardText: {
        ...TYPOGRAPHY.body,
    },
    navigationButtonsContainer: {
        marginTop: SPACING.lg,
        width: '100%',
        alignItems: 'center',
    },
    navigationButton: {
        backgroundColor: COLORS.RED,
        paddingVertical: SPACING.md,
        paddingHorizontal: SPACING.xl,
        borderRadius: SPACING.sm,
        marginBottom: SPACING.md,
        width: '80%',
        alignItems: 'center',
    },
    navigationButtonText: {
        color: COLORS.background,
        fontSize: 16,
        fontWeight: 'bold',
    },
});
