// screens/SeatSelectionScreen/styles.js
import { StyleSheet } from 'react-native';
import { COLORS, SPACING, TYPOGRAPHY } from '../../styles';

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.background.primary,
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
    screen: {
        height: 40,
        marginVertical: SPACING.xl,
        backgroundColor: COLORS.background.secondary,
        justifyContent: 'center',
        alignItems: 'center',
        marginHorizontal: SPACING.xl,
    },
    screenText: {
        ...TYPOGRAPHY.body,
        color: COLORS.text.secondary,
    },
    seatingContainer: {
        padding: SPACING.lg,
        alignItems: 'center',
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: SPACING.md,
    },
    rowLabel: {
        width: 30,
        ...TYPOGRAPHY.body,
        textAlign: 'center',
        color: COLORS.text.primary,
    },
    seat: {
        width: 35,
        height: 35,
        margin: 3,
        borderRadius: 6,
        backgroundColor: COLORS.background.primary,
        borderWidth: 1,
        borderColor: COLORS.button.primary.background,
        justifyContent: 'center',
        alignItems: 'center',
    },
    selectedSeat: {
        backgroundColor: COLORS.button.primary.background,
    },
    occupiedSeat: {
        backgroundColor: COLORS.background.secondary,
        borderColor: COLORS.border.default,
    },
    seatText: {
        fontSize: 12,
        color: COLORS.button.primary.background,
    },
    selectedSeatText: {
        color: COLORS.text.inverse,
    },
    occupiedSeatText: {
        color: COLORS.text.secondary,
    },
    legend: {
        flexDirection: 'row',
        justifyContent: 'center',
        padding: SPACING.lg,
        gap: SPACING.xl,
    },
    legendItem: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: SPACING.xs,
    },
    legendSeat: {
        width: 20,
        height: 20,
        borderRadius: 4,
        backgroundColor: COLORS.background.primary,
        borderWidth: 1,
        borderColor: COLORS.button.primary.background,
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
        margin: SPACING.lg,
        padding: SPACING.md,
        borderRadius: SPACING.sm,
        alignItems: 'center',
    },
    disabledButton: {
        opacity: 0.5,
    },
    confirmButtonText: {
        color: COLORS.button.primary.text,
        ...TYPOGRAPHY.title,
    },
});