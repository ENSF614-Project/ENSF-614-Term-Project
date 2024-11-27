// screens/CouponScreen/styles.js
import { StyleSheet } from 'react-native';
import { COLORS, SPACING, TYPOGRAPHY } from '../../styles';

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: SPACING.lg,
        backgroundColor: COLORS.background,
    },
    title: {
        ...TYPOGRAPHY.title,
        fontSize: 24,
        marginBottom: SPACING.lg,
    },
});