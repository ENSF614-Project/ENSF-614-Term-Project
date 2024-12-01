// screens/AccountScreen/styles.js
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
    accountDetailsContainer: {
        marginBottom: SPACING.xl,
        backgroundColor: COLORS.background.secondary,
        borderRadius: SPACING.sm,
        borderWidth: 1,
        borderColor: COLORS.border.default,
        padding: SPACING.lg,
    },
    sectionTitle: {
        ...TYPOGRAPHY.subtitle,
        fontSize: 20,
        marginBottom: SPACING.md,
        color: COLORS.text.primary,
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
    inputLabel: {
        ...TYPOGRAPHY.body,
        fontSize: 14,
        fontWeight: 'bold',
        color: COLORS.text.primary,
        marginBottom: SPACING.xs,
    },
    inputError: {
        borderColor: COLORS.input.borderError,
    },
    navigationButtonsContainer: {
        marginTop: SPACING.xl,
        flexDirection: 'column',
        alignItems: 'center',
    },
    navigationButton: {
        backgroundColor: COLORS.button.primary.background,
        padding: SPACING.md,
        borderRadius: SPACING.sm,
        marginBottom: SPACING.md,
        width: '80%',
    },
    navigationButtonText: {
        color: COLORS.button.primary.text,
        textAlign: 'center',
        fontSize: 16,
        fontWeight: 'bold',
    },
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
});
