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
    couponContainer: {
        padding: SPACING.lg,
        borderBottomWidth: 1,
        borderBottomColor: COLORS.border.default,
    },
    couponInputContainer: {
        flexDirection: 'row',
        gap: SPACING.sm,
        marginBottom: SPACING.md,
    },
    couponInput: {
        flex: 1,
        borderWidth: 1,
        borderColor: COLORS.border.default,
        borderRadius: SPACING.sm,
        padding: SPACING.md,
        color: COLORS.text.primary,
        backgroundColor: COLORS.input.background,
    },
    couponButton: {
        backgroundColor: COLORS.button.primary.background,
        padding: SPACING.md,
        borderRadius: SPACING.sm,
        justifyContent: 'center',
    },
    couponButtonText: {
        color: COLORS.button.primary.text,
        ...TYPOGRAPHY.body,
        fontWeight: 'bold',
    },
    userCouponsContainer: {
        marginTop: SPACING.md,
    },
    subsectionTitle: {
        ...TYPOGRAPHY.title,
        fontSize: 16,
        marginBottom: SPACING.sm,
        color: COLORS.text.primary,
    },
    userCoupon: {
        borderWidth: 1,
        borderColor: COLORS.border.default,
        borderRadius: SPACING.sm,
        padding: SPACING.md,
        marginBottom: SPACING.sm,
        backgroundColor: COLORS.background.primary,
    },
    couponInfo: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: SPACING.sm,
    },
    couponIcon: {
        color: COLORS.icon.primary,
    },
    couponCode: {
        ...TYPOGRAPHY.body,
        fontWeight: 'bold',
        color: COLORS.text.primary,
    },
    couponValue: {
        ...TYPOGRAPHY.body,
        color: COLORS.text.secondary,
    },
    couponExpiry: {
        ...TYPOGRAPHY.body,
        color: COLORS.text.secondary,
        fontSize: 12,
        marginTop: SPACING.xs,
    },
    appliedCouponContainer: {
        backgroundColor: COLORS.background.success,
        borderRadius: SPACING.sm,
        padding: SPACING.md,
        marginVertical: SPACING.md,
    },
    appliedCouponInfo: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: SPACING.xs,
    },
    appliedCouponText: {
        ...TYPOGRAPHY.body,
        color: COLORS.text.primary,
        fontWeight: 'bold',
    },
    discountText: {
        ...TYPOGRAPHY.body,
        color: COLORS.button.primary.background,
        fontWeight: 'bold',
    },
    removeCouponButton: {
        alignSelf: 'flex-end',
    },
    removeCouponText: {
        ...TYPOGRAPHY.body,
        color: COLORS.text.error,
        fontSize: 12,
    },
    totalContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: SPACING.sm,
    },
    totalLabel: {
        ...TYPOGRAPHY.body,
        color: COLORS.text.secondary,
    },
    totalAmount: {
        ...TYPOGRAPHY.body,
        color: COLORS.text.primary,
    },
    discountAmount: {
        ...TYPOGRAPHY.body,
        color: COLORS.button.primary.background,
    },
    finalTotalLabel: {
        ...TYPOGRAPHY.title,
        color: COLORS.text.primary,
    },
    finalTotalAmount: {
        ...TYPOGRAPHY.title,
        color: COLORS.button.primary.background,
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
    },
    spinner: {
        color: COLORS.button.primary.background,
    },
    emailContainer: {
        backgroundColor: COLORS.background.primary,
        padding: SPACING.lg,
        borderBottomWidth: 1,
        borderBottomColor: COLORS.border.default,
    },
    input: {
        borderWidth: 1,
        borderColor: COLORS.input.border,
        borderRadius: SPACING.sm,
        padding: SPACING.md,
        backgroundColor: COLORS.input.background,
        color: COLORS.text.primary,
        fontSize: 16,
        marginBottom: SPACING.xs,
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
    discountSummary: {
        marginTop: SPACING.lg,
        padding: SPACING.lg,
        backgroundColor: COLORS.background.secondary,
        borderRadius: SPACING.sm,
        borderWidth: 1,
        borderColor: COLORS.border.default,
    },
    summaryRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: SPACING.sm,
    },
    summaryLabel: {
        ...TYPOGRAPHY.body,
        color: COLORS.text.secondary,
    },
    summaryValue: {
        ...TYPOGRAPHY.body,
        color: COLORS.text.primary,
    },
    discountValue: {
        ...TYPOGRAPHY.body,
        color: COLORS.button.primary.background,
        fontWeight: 'bold',
    },
    finalTotalLabel: {
        ...TYPOGRAPHY.title,
        fontSize: 18,
        color: COLORS.text.primary,
    },
    finalTotalAmount: {
        ...TYPOGRAPHY.title,
        fontSize: 18,
        color: COLORS.button.primary.background,
    },
    selectedCoupon: {
        borderColor: COLORS.button.primary.background,
        backgroundColor: COLORS.background.secondary,
    }
});