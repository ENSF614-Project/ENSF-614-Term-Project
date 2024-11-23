// screens/SeatSelectionScreen/styles.js
import { StyleSheet } from 'react-native';
import { COLORS, SPACING, TYPOGRAPHY } from '../../styles';

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.background,
    },
    movieInfo: {
        padding: SPACING.lg,
        borderBottomWidth: 1,
        borderBottomColor: COLORS.border,
    },
    movieTitle: {
        ...TYPOGRAPHY.title,
        marginBottom: SPACING.xs,
    },
    showtimeInfo: {
        ...TYPOGRAPHY.body,
        color: COLORS.text.secondary,
    },
    screen: {
        height: 40,
        marginVertical: SPACING.xl,
        backgroundColor: COLORS.border,
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
    },
    seat: {
        width: 35,
        height: 35,
        margin: 3,
        borderRadius: 6,
        backgroundColor: COLORS.background,
        borderWidth: 1,
        borderColor: '#E31837',
        justifyContent: 'center',
        alignItems: 'center',
    },
    selectedSeat: {
        backgroundColor: '#E31837',
    },
    occupiedSeat: {
        backgroundColor: COLORS.border,
        borderColor: COLORS.border,
    },
    seatText: {
        fontSize: 12,
        color: '#E31837',
    },
    selectedSeatText: {
        color: COLORS.background,
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
        backgroundColor: COLORS.background,
        borderWidth: 1,
        borderColor: '#E31837',
    },
    legendText: {
        ...TYPOGRAPHY.body,
        color: COLORS.text.secondary,
    },
    summary: {
        padding: SPACING.lg,
        borderTopWidth: 1,
        borderTopColor: COLORS.border,
    },
    summaryTitle: {
        ...TYPOGRAPHY.title,
        marginBottom: SPACING.xs,
    },
    summaryText: {
        ...TYPOGRAPHY.body,
        marginBottom: SPACING.sm,
    },
    summaryTotal: {
        ...TYPOGRAPHY.title,
        color: '#E31837',
    },
    confirmButton: {
        backgroundColor: '#E31837',
        margin: SPACING.lg,
        padding: SPACING.md,
        borderRadius: SPACING.sm,
        alignItems: 'center',
    },
    disabledButton: {
        opacity: 0.5,
    },
    confirmButtonText: {
        color: COLORS.background,
        ...TYPOGRAPHY.title,
    },
});