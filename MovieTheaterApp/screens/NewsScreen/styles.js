// screens/NewsScreen/styles.js
import { StyleSheet } from 'react-native';
import { COLORS, SPACING, TYPOGRAPHY } from '../../styles';

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.background.primary,
        padding: SPACING.lg,
    },
    title: {
        ...TYPOGRAPHY.title,
        fontSize: 24,
        color: COLORS.text.primary,
        marginBottom: SPACING.md,
        textAlign: 'center',
    },
    newsContainer: {
        marginTop: SPACING.sm,
    },
    newsItem: {
        borderWidth: 1,
        borderColor: COLORS.border.default,
        borderRadius: SPACING.sm,
        padding: SPACING.md,
        marginBottom: SPACING.md,
        backgroundColor: COLORS.background.primary,
    },
    newsType: {
        ...TYPOGRAPHY.title,
        fontSize: 18,
        color: COLORS.text.primary,
        marginBottom: SPACING.xs,
    },
    newsText: {
        ...TYPOGRAPHY.body,
        fontSize: 16,
        color: COLORS.text.secondary,
    },
});