// screens\PaymentScreen\styles.js
import { StyleSheet } from 'react-native';
import { COLORS, SPACING, TYPOGRAPHY } from '../../styles';

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.background,
    },
    summaryContainer: {
        padding: SPACING.lg,
        borderBottomWidth: 1,
        borderBottomColor: COLORS.border,
    },
    sectionTitle: {
        ...TYPOGRAPHY.title,
        fontSize: 20,
        marginBottom: SPACING.md,
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
    },
    totalText: {
        ...TYPOGRAPHY.title,
        color: COLORS.RED,
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
    formContainer: {
        padding: SPACING.lg,
    },
    input: {
        borderWidth: 1,
        borderColor: COLORS.border,
        borderRadius: SPACING.sm,
        padding: SPACING.md,
        marginBottom: SPACING.md,
        fontSize: 16,
    },
    row: {
        flexDirection: 'row',
        gap: SPACING.md,
    },
    halfInput: {
        flex: 1,
    },
    saveCardContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: SPACING.lg,
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
    payButton: {
        backgroundColor: COLORS.RED,
        padding: SPACING.md,
        borderRadius: SPACING.sm,
        margin: SPACING.lg,
    },
    payButtonText: {
        ...TYPOGRAPHY.title,
        color: COLORS.background,
        textAlign: 'center',
    },
});