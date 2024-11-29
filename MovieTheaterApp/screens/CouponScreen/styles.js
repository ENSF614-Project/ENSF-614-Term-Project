// screens/CouponScreen/styles.js
import { StyleSheet } from 'react-native';
import { COLORS, SPACING, TYPOGRAPHY } from '../../styles';

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.background.primary,
    },
    title: {
        ...TYPOGRAPHY.title,
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: SPACING.xl,
        textAlign: 'center',
        color: COLORS.text.primary,
    },
    inputContainer: {
        alignItems: 'center',
        marginBottom: SPACING.xl,
    },
    input: {
        width: '80%',
        borderWidth: 1,
        borderColor: COLORS.border.default,
        borderRadius: SPACING.sm,
        padding: SPACING.lg,
        textAlign: 'center',
        backgroundColor: COLORS.input.background,
        color: COLORS.text.primary,
    },
    inputError: {
        borderColor: COLORS.text.error,
    },
    button: {
        marginTop: SPACING.lg,
        backgroundColor: COLORS.button.primary.background,
        padding: SPACING.lg,
        borderRadius: SPACING.sm,
    },
    buttonText: {
        color: COLORS.button.primary.text,
        ...TYPOGRAPHY.title,
    },
    errorText: {
        color: COLORS.text.error,
        marginTop: SPACING.sm,
        marginBottom: SPACING.lg,
        textAlign: 'center',
        ...TYPOGRAPHY.body,
    },
    couponListWrapper: {
        width: '100%',
        alignItems: 'center',
    },
    couponList: {
        marginTop: SPACING.xl,
        width: '100%',
    },
    couponItem: {
        width: '80%',
        borderWidth: 1,
        borderColor: COLORS.border.default,
        borderRadius: SPACING.sm,
        padding: SPACING.lg,
        marginBottom: SPACING.lg,
        alignItems: 'center',
        backgroundColor: COLORS.background.primary,
    },
    couponCode: {
        ...TYPOGRAPHY.title,
        color: COLORS.text.primary,
        marginBottom: SPACING.xs,
    },
    statusBadge: {
        paddingVertical: SPACING.xs,
        paddingHorizontal: SPACING.sm,
        borderRadius: SPACING.lg,
        marginTop: SPACING.sm,
    },
    validBadge: {
        backgroundColor: COLORS.status.active,
    },
    expiredBadge: {
        backgroundColor: COLORS.status.inactive,
    },
    badgeText: {
        ...TYPOGRAPHY.body,
        fontSize: 12,
        color: COLORS.text.primary,
    },
    couponValue: {
        ...TYPOGRAPHY.title,
        color: COLORS.button.primary.background,
        marginVertical: SPACING.xs,
    },
    couponExpiry: {
        ...TYPOGRAPHY.body,
        color: COLORS.text.secondary,
    },
    emptyState: {
        alignItems: 'center',
        padding: SPACING.xl,
        backgroundColor: COLORS.background.secondary,
        borderRadius: SPACING.sm,
        margin: SPACING.lg,
    },
    emptyStateText: {
        ...TYPOGRAPHY.body,
        color: COLORS.text.secondary,
        textAlign: 'center',
    }
});