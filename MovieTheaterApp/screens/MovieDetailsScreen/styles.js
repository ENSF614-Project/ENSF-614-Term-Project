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
        height: 300,
    },
    contentContainer: {
        padding: SPACING.lg,
    },
    title: {
        ...TYPOGRAPHY.title,
        fontSize: 24,
        marginBottom: SPACING.md,
    },
    infoRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: SPACING.lg,
        gap: SPACING.md,
    },
    genre: {
        ...TYPOGRAPHY.body,
        color: COLORS.text.secondary,
    },
    duration: {
        ...TYPOGRAPHY.body,
        color: COLORS.text.secondary,
    },
    rating: {
        ...TYPOGRAPHY.body,
        color: COLORS.text.secondary,
    },
    description: {
        ...TYPOGRAPHY.body,
        marginBottom: SPACING.xl,
        lineHeight: 24,
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
    },
});
