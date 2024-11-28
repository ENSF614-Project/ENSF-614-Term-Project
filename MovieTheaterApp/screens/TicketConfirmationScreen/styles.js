// screens/TicketConfirmationScreen/styles.js
import { StyleSheet } from 'react-native';
import { COLORS, SPACING, TYPOGRAPHY } from '../../styles';

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.background.primary,
    },
    successContainer: {
        alignItems: 'center',
        padding: SPACING.xl,
        backgroundColor: COLORS.background.primary,
    },
    checkCircle: {
        width: 80,
        height: 80,
        borderRadius: 40,
        backgroundColor: COLORS.button.primary.background,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: SPACING.lg,
        iconColor: COLORS.text.inverse,
    },
    successTitle: {
        ...TYPOGRAPHY.title,
        fontSize: 24,
        marginBottom: SPACING.sm,
        color: COLORS.text.primary,
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
        color: COLORS.text.primary,
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
        color: COLORS.button.primary.background,
    },
    paymentInfoContainer: {
        marginTop: SPACING.xl,
        paddingTop: SPACING.lg,
        borderTopWidth: 1,
        borderTopColor: COLORS.border.default,
    },
    paymentText: {
        ...TYPOGRAPHY.body,
        color: COLORS.text.secondary,
    },
    doneButton: {
        backgroundColor: COLORS.button.primary.background,
        padding: SPACING.md,
        borderRadius: SPACING.sm,
        margin: SPACING.lg,
    },
    doneButtonText: {
        ...TYPOGRAPHY.title,
        color: COLORS.button.primary.text,
        textAlign: 'center',
    },
});