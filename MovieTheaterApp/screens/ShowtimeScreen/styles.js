// screens/ShowtimeScreen/styles.js
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
        fontSize: 20,
        marginBottom: SPACING.xs,
    },
    movieDetails: {
        ...TYPOGRAPHY.body,
        color: COLORS.text.secondary,
    },
    datePickerContainer: {
        padding: SPACING.lg,
        borderBottomWidth: 1,
        borderBottomColor: COLORS.border,
    },
    dateButton: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: SPACING.md,
        padding: SPACING.md,
        borderWidth: 1,
        borderColor: COLORS.border,
        borderRadius: SPACING.sm,
    },
    dateText: {
        ...TYPOGRAPHY.body,
        color: COLORS.text.primary,
    },
    calendarContainer: {
        marginTop: SPACING.md,
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: SPACING.sm,
    },
    calendarDate: {
        padding: SPACING.md,
        borderRadius: SPACING.sm,
        borderWidth: 1,
        borderColor: COLORS.border,
        minWidth: 100,
        alignItems: 'center',
    },
    selectedDate: {
        backgroundColor: COLORS.RED,
        borderColor: COLORS.RED,
    },
    calendarDateText: {
        ...TYPOGRAPHY.body,
        color: COLORS.text.primary,
    },
    selectedDateText: {
        color: COLORS.background,
    },
    showtimesContainer: {
        padding: SPACING.lg,
    },
    sectionTitle: {
        ...TYPOGRAPHY.title,
        marginBottom: SPACING.lg,
    },
    showtimeCard: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: SPACING.md,
        backgroundColor: COLORS.background,
        borderRadius: SPACING.sm,
        marginBottom: SPACING.md,
        borderWidth: 1,
        borderColor: COLORS.border,
    },
    showtimeInfo: {
        flex: 1,
    },
    time: {
        ...TYPOGRAPHY.title,
        marginBottom: SPACING.xs,
    },
    theatre: {
        ...TYPOGRAPHY.body,
        color: COLORS.text.secondary,
    },
    price: {
        ...TYPOGRAPHY.title,
        color: COLORS.RED,
    },
    noShowtimesText: {
        ...TYPOGRAPHY.body,
        color: COLORS.text.secondary,
        textAlign: 'center',
        padding: SPACING.xl,
    },
});