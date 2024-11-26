// screens/MovieDetailsScreen/styles.js
import { StyleSheet } from 'react-native';
import { COLORS, SPACING, TYPOGRAPHY } from '../../styles';

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.background,
    },
    headerImage: {
        width: '100%',
        height: 500,
        backgroundColor: COLORS.border,
    },
    contentContainer: {
        padding: SPACING.lg,
        marginTop: -SPACING.xl,
        backgroundColor: COLORS.background,
        borderTopLeftRadius: SPACING.lg,
        borderTopRightRadius: SPACING.lg,
    },
    title: {
        ...TYPOGRAPHY.title,
        fontSize: 24,
        marginBottom: SPACING.lg,
        color: COLORS.text.primary,
    },
    infoContainer: {
        flexDirection: 'column',
        gap: SPACING.md,
        marginBottom: SPACING.lg,
        backgroundColor: COLORS.background,
        padding: SPACING.md,
        borderRadius: SPACING.sm,
        borderWidth: 1,
        borderColor: COLORS.border,
    },
    infoItem: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: SPACING.sm,
        calendarColor: "#0000FF",
        clockColor: "#FF0000",
        starColor: "#FFD700",
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
        backgroundColor: COLORS.RED,
        paddingVertical: SPACING.xs,
        paddingHorizontal: SPACING.sm,
        borderRadius: SPACING.lg,
    },
    genreText: {
        color: COLORS.background,
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
        backgroundColor: COLORS.RED,
        padding: SPACING.md,
        borderRadius: SPACING.sm,
        alignItems: 'center',
    },
    showtimeButtonText: {
        color: COLORS.background,
        ...TYPOGRAPHY.title,
        fontSize: 16,
    },
});