// screens/TicketConfirmationScreen/styles.js
import { StyleSheet } from 'react-native';
import { COLORS, SPACING, TYPOGRAPHY } from '../../styles';

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.background,
    },
    successContainer: {
        alignItems: 'center',
        padding: SPACING.xl,
        backgroundColor: COLORS.background,
    },
    checkCircle: {
        width: 80,
        height: 80,
        borderRadius: 40,
        backgroundColor: COLORS.RED,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: SPACING.lg,
        iconColor: "#0000FF",
    },
    successTitle: {
        ...TYPOGRAPHY.title,
        fontSize: 24,
        marginBottom: SPACING.sm,
    },
    successText: {
        ...TYPOGRAPHY.body,
        color: COLORS.text.secondary,
    },
    detailsContainer: {
        padding: SPACING.lg,
    },
    sectionTitle: {
        ...TYPOGRAPHY.title,
        fontSize: 18,
        marginBottom: SPACING.md,
    },
    detailRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: SPACING.md,
    },
    label: {
        ...TYPOGRAPHY.body,
        color: COLORS.text.secondary,
    },
    value: {
        ...TYPOGRAPHY.body,
        color: COLORS.text.primary,
        flex: 1,
        textAlign: 'right',
    },
    total: {
        ...TYPOGRAPHY.title,
        color: COLORS.RED,
    },
    paymentInfoContainer: {
        marginTop: SPACING.xl,
        paddingTop: SPACING.lg,
        borderTopWidth: 1,
        borderTopColor: COLORS.border,
    },
    paymentText: {
        ...TYPOGRAPHY.body,
        color: COLORS.text.secondary,
    },
    doneButton: {
        backgroundColor: COLORS.RED,
        padding: SPACING.md,
        borderRadius: SPACING.sm,
        margin: SPACING.lg,
    },
    doneButtonText: {
        ...TYPOGRAPHY.title,
        color: COLORS.background,
        textAlign: 'center',
    },
});
