// screens/MovieDetailsScreen/styles.js
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
    headerImage: {
        width: '100%',
        height: 500,
        backgroundColor: COLORS.background.secondary,
    },
    contentContainer: {
        padding: SPACING.lg,
        marginTop: -SPACING.xl,
        backgroundColor: COLORS.background.primary,
        borderTopLeftRadius: SPACING.lg,
        borderTopRightRadius: SPACING.lg,
    },
    title: {
        ...TYPOGRAPHY.title,
        fontSize: 24,
        marginBottom: SPACING.lg,
        color: COLORS.text.primary,
    },
    earlyAccessBadge: {
        color: COLORS.button.primary.background,
        fontStyle: 'italic',
    },
    infoContainer: {
        flexDirection: 'column',
        gap: SPACING.md,
        marginBottom: SPACING.lg,
        backgroundColor: COLORS.background.primary,
        padding: SPACING.md,
        borderRadius: SPACING.sm,
        borderWidth: 1,
        borderColor: COLORS.border.default,
    },
    infoItem: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: SPACING.sm,
        calendarColor: COLORS.icon.secondary,
        clockColor: COLORS.icon.primary,
        starColor: COLORS.icon.warning,
    },
    infoText: {
        ...TYPOGRAPHY.body,
        color: COLORS.text.primary,
        flex: 1,
    },
    genreContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: SPACING.xs,
        marginBottom: SPACING.xl,
    },
    genreTag: {
        backgroundColor: COLORS.button.primary.background,
        paddingVertical: SPACING.xs,
        paddingHorizontal: SPACING.sm,
        borderRadius: SPACING.lg,
    },
    genreText: {
        color: COLORS.text.inverse,
        ...TYPOGRAPHY.body,
        fontSize: 12,
    },
    sectionTitle: {
        ...TYPOGRAPHY.title,
        fontSize: 18,
        marginBottom: SPACING.md,
        color: COLORS.text.primary,
    },
    description: {
        ...TYPOGRAPHY.body,
        marginBottom: SPACING.xl,
        lineHeight: 24,
        color: COLORS.text.secondary,
    },
    showtimeButton: {
        backgroundColor: COLORS.button.primary.background,
        padding: SPACING.md,
        borderRadius: SPACING.sm,
        alignItems: 'center',
    },
    showtimeButtonText: {
        color: COLORS.button.primary.text,
        ...TYPOGRAPHY.title,
        fontSize: 16,
    },
});