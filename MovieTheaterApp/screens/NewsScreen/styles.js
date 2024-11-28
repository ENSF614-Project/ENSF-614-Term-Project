// screens/NewsScreen/styles.js
import { StyleSheet } from 'react-native';
import { COLORS, SPACING, TYPOGRAPHY } from '../../styles';
export const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: SPACING.lg,
        backgroundColor: COLORS.background,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: SPACING.md,
        textAlign: 'center',
    },
    newsContainer: {
        marginTop: SPACING.sm,
    },
    newsItem: {
        borderWidth: 1,
        borderColor: COLORS.border,
        borderRadius: SPACING.sm,
        padding: SPACING.md,
        marginBottom: SPACING.xs,
        backgroundColor: COLORS.background,
    },
    newsType: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: SPACING.xs,
        color: COLORS.text.primary,
    },
    newsText: {
        fontSize: 16,
        color: COLORS.text.secondary,
    },
});
