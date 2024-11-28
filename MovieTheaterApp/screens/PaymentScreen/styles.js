// screens/PaymentScreen/styles.js
import { StyleSheet } from 'react-native';
import { COLORS, SPACING, TYPOGRAPHY } from '../../styles';

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.background.primary,
    },
    summaryContainer: {
        padding: SPACING.lg,
        borderBottomWidth: 1,
        borderBottomColor: COLORS.border.default,
    },
    sectionTitle: {
        ...TYPOGRAPHY.title,
        fontSize: 20,
        marginBottom: SPACING.md,
        color: COLORS.text.primary,
    },
    summaryRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: SPACING.sm,
    },
    summaryLabel: {
        ...TYPOGRAPHY.body,
        color: COLORS.text.secondary,
    },
    summaryText: {
        ...TYPOGRAPHY.body,
        color: COLORS.text.primary,
    },
    totalText: {
        ...TYPOGRAPHY.title,
        color: COLORS.button.primary.background,
        fontSize: 18,
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
        cardColor: COLORS.icon.primary,
    },
    savedCardText: {
        ...TYPOGRAPHY.body,
        color: COLORS.text.primary,
    },
    payButton: {
        backgroundColor: COLORS.button.primary.background,
        padding: SPACING.md,
        borderRadius: SPACING.sm,
        margin: SPACING.lg,
    },
    payButtonDisabled: {
        backgroundColor: COLORS.button.secondary.background,
    },
    payButtonText: {
        ...TYPOGRAPHY.title,
        color: COLORS.button.primary.text,
        textAlign: 'center',
    },
    trashIcon: {
        color: COLORS.icon.error,
    }
});