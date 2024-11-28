// screens/CouponScreen/styles.js
import { StyleSheet } from 'react-native';
import { COLORS, SPACING, TYPOGRAPHY } from '../../styles';

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: SPACING.xl,
        backgroundColor: COLORS.background,
        alignItems: 'center', // Centers the main content horizontally
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: SPACING.xl,
        textAlign: 'center',
    },
    inputContainer: {
        alignItems: 'center',
        marginBottom: SPACING.xl,
    },
    input: {
        width: '80%',
        borderWidth: 1,
        borderColor: COLORS.border,
        borderRadius: SPACING.sm,
        padding: SPACING.lg,
        textAlign: 'center',
    },
    inputError: {
        borderColor: COLORS.RED,
    },
    button: {
        marginTop: SPACING.lg,
        backgroundColor: COLORS.RED,
        padding: SPACING.lg,
        borderRadius: SPACING.sm,
    },
    buttonText: {
        color: COLORS.background,
        fontWeight: 'bold',
    },
    errorText: {
        color: COLORS.RED,
        marginTop: SPACING.sm,
        marginBottom: SPACING.lg,
        textAlign: 'center',
    },
    couponListWrapper: {
        width: '100%',
        alignItems: 'center', // Centers the list items horizontally
    },
    couponList: {
        marginTop: SPACING.xl,
        width: '100%',
    },
    couponItem: {
        width: '30%', // Reduces the width of each coupon item
        borderWidth: 1,
        borderColor: COLORS.border,
        borderRadius: SPACING.sm,
        padding: SPACING.lg,
        marginBottom: SPACING.lg,
        alignItems: 'center', // Centers the content within each coupon item
    },
    couponCode: {
        fontWeight: 'bold',
        textAlign: 'center',
    },
});

