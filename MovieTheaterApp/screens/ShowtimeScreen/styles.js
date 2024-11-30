// screens/ShowtimeScreen/styles.js
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
        color: COLORS.button.primary.text,
    },
    earlyAccessText: {
        ...TYPOGRAPHY.body,
        color: COLORS.button.primary.background,
        fontStyle: 'italic',
    },
    movieInfo: {
        padding: SPACING.lg,
        borderBottomWidth: 1,
        borderBottomColor: COLORS.border.default,
    },
    movieTitle: {
        ...TYPOGRAPHY.title,
        fontSize: 20,
        marginBottom: SPACING.xs,
        color: COLORS.text.primary,
    },
    movieDetails: {
        ...TYPOGRAPHY.body,
        color: COLORS.text.secondary,
    },
    datePickerContainer: {
        padding: SPACING.lg,
        borderBottomWidth: 1,
        borderBottomColor: COLORS.border.default,
    },
    dateButton: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: SPACING.md,
        padding: SPACING.md,
        borderWidth: 1,
        borderColor: COLORS.border.default,
        borderRadius: SPACING.sm,
        iconColor: COLORS.icon.primary,
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
        borderColor: COLORS.border.default,
        minWidth: 100,
        alignItems: 'center',
        backgroundColor: COLORS.background.primary,
    },
    selectedDate: {
        backgroundColor: COLORS.button.primary.background,
        borderColor: COLORS.button.primary.background,
    },
    calendarDateText: {
        ...TYPOGRAPHY.body,
        color: COLORS.text.primary,
    },
    selectedDateText: {
        color: COLORS.text.inverse,
    },
    showtimesContainer: {
        padding: SPACING.lg,
    },
    sectionTitle: {
        ...TYPOGRAPHY.title,
        marginBottom: SPACING.lg,
        color: COLORS.text.primary,
    },
    showtimeCard: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: SPACING.md,
        backgroundColor: COLORS.background.primary,
        borderRadius: SPACING.sm,
        marginBottom: SPACING.md,
        borderWidth: 1,
        borderColor: COLORS.border.default,
    },
    time: {
        ...TYPOGRAPHY.title,
        marginBottom: SPACING.xs,
        color: COLORS.text.primary,
    },
    theatre: {
        ...TYPOGRAPHY.body,
        color: COLORS.text.secondary,
    },
    price: {
        ...TYPOGRAPHY.title,
        color: COLORS.button.primary.background,
    },
    noShowtimesText: {
        ...TYPOGRAPHY.body,
        color: COLORS.text.secondary,
        textAlign: 'center',
        padding: SPACING.xl,
    },
});