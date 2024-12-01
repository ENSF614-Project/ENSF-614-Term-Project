// screens/SeatSelectionScreen/styles.js
import { StyleSheet } from 'react-native';
import { COLORS, SPACING, TYPOGRAPHY } from '../../styles';

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.background.primary,
    },
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: COLORS.background.primary,
    },
    loadingSpinner: {
        color: COLORS.button.primary.background,
    },
    errorContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: SPACING.xl,
        backgroundColor: COLORS.background.primary,
    },
    errorText: {
        ...TYPOGRAPHY.body,
        color: COLORS.text.error,
        textAlign: 'center',
        marginBottom: SPACING.lg,
    },
    retryButton: {
        backgroundColor: COLORS.button.primary.background,
        padding: SPACING.md,
        borderRadius: SPACING.sm,
    },
    retryButtonText: {
        ...TYPOGRAPHY.body,
        color: COLORS.text.inverse,
    },
    movieInfo: {
        padding: SPACING.lg,
        borderBottomWidth: 1,
        borderBottomColor: COLORS.border.default,
    },
    movieTitle: {
        ...TYPOGRAPHY.title,
        color: COLORS.text.primary,
        marginBottom: SPACING.xs,
    },
    showtimeInfo: {
        ...TYPOGRAPHY.body,
        color: COLORS.text.secondary,
    },
    theatreInfo: {
        ...TYPOGRAPHY.body,
        color: COLORS.text.secondary,
        marginTop: SPACING.xs,
    },
    screen: {
        height: 40,
        backgroundColor: COLORS.background.secondary,
        justifyContent: 'center',
        alignItems: 'center',
        marginVertical: SPACING.xl,
        marginHorizontal: SPACING.xl,
        borderRadius: SPACING.sm,
    },
    screenText: {
        ...TYPOGRAPHY.body,
        color: COLORS.text.secondary,
    },
    seatingContainer: {
        alignItems: 'center',
        padding: SPACING.lg,
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: SPACING.sm,
    },
    seatRow: {
        flexDirection: 'row',
        gap: SPACING.xs,
    },
    rowLabel: {
        width: 30,
        ...TYPOGRAPHY.body,
        textAlign: 'center',
        color: COLORS.text.primary,
        marginRight: SPACING.sm,
    },
    seat: {
        width: 35,
        height: 35,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: SPACING.xs,
        borderWidth: 1,
        backgroundColor: COLORS.background.primary,
        borderColor: COLORS.button.primary.background,
    },
    occupiedSeat: {
        backgroundColor: COLORS.status.inactive,
        borderColor: COLORS.status.inactive,
    },
    selectedSeat: {
        backgroundColor: COLORS.button.primary.background,
        borderColor: COLORS.button.primary.background,
    },
    seatText: {
        fontSize: 12,
        color: COLORS.button.primary.background,
    },
    occupiedSeatText: {
        color: COLORS.text.inverse,
    },
    selectedSeatText: {
        color: COLORS.text.inverse,
    },
    availableSeat: {
        backgroundColor: COLORS.background.primary,
        borderColor: COLORS.button.primary.background,
    },
    legend: {
        flexDirection: 'row',
        justifyContent: 'center',
        gap: SPACING.xl,
        marginVertical: SPACING.xl,
    },
    legendItem: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: SPACING.xs,
    },
    legendSeat: {
        width: 20,
        height: 20,
        borderRadius: SPACING.xs,
        borderWidth: 1,
    },
    legendText: {
        ...TYPOGRAPHY.body,
        color: COLORS.text.secondary,
    },
    summary: {
        padding: SPACING.lg,
        borderTopWidth: 1,
        borderTopColor: COLORS.border.default,
    },
    summaryTitle: {
        ...TYPOGRAPHY.title,
        color: COLORS.text.primary,
        marginBottom: SPACING.xs,
    },
    summaryText: {
        ...TYPOGRAPHY.body,
        color: COLORS.text.primary,
        marginBottom: SPACING.sm,
    },
    summaryTotal: {
        ...TYPOGRAPHY.title,
        color: COLORS.button.primary.background,
    },
    confirmButton: {
        backgroundColor: COLORS.button.primary.background,
        padding: SPACING.md,
        margin: SPACING.lg,
        borderRadius: SPACING.sm,
        alignItems: 'center',
    },
    confirmButtonDisabled: {
        opacity: 0.5,
    },
    confirmButtonText: {
        color: COLORS.text.inverse,
        ...TYPOGRAPHY.title,
    },
    hoveredSeat: {
        backgroundColor: COLORS.button.primary.light,
        borderColor: COLORS.button.primary.background,
        transform: [{ scale: 1.1 }],
    },
    hoveredSeatText: {
        color: COLORS.text.primary,
    },
});