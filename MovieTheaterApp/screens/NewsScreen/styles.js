// screens/NewsScreen/styles.js
import { StyleSheet } from 'react-native';
import { COLORS, SPACING, TYPOGRAPHY } from '../../styles';

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.background,
    },
    centered: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: COLORS.background,
    },
    title: {
        ...TYPOGRAPHY.title,
        fontSize: 24,
        margin: SPACING.lg,
    },
    subtitle: {
        ...TYPOGRAPHY.body,
        fontSize: 16,
        margin: SPACING.md,
        color: COLORS.text.secondary,
    },
    loadingText: {
        ...TYPOGRAPHY.body,
        marginTop: SPACING.md,
        color: COLORS.text.secondary,
    },
    messageContainer: {
        padding: SPACING.lg,
        margin: SPACING.lg,
        borderRadius: SPACING.sm,
        borderWidth: 1,
        borderColor: COLORS.border,
        alignItems: 'center',
    },
    errorText: {
        ...TYPOGRAPHY.body,
        color: COLORS.RED,
        textAlign: 'center',
        marginBottom: SPACING.lg,
    },
    retryButton: {
        backgroundColor: COLORS.RED,
        padding: SPACING.md,
        borderRadius: SPACING.sm,
    },
    retryButtonText: {
        color: COLORS.background,
        ...TYPOGRAPHY.body,
        fontWeight: 'bold',
    },
    userCard: {
        margin: SPACING.md,
        padding: SPACING.md,
        borderRadius: SPACING.sm,
        backgroundColor: COLORS.background,
        borderWidth: 1,
        borderColor: COLORS.border,
    },
    userText: {
        ...TYPOGRAPHY.body,
        marginBottom: SPACING.xs,
    },
    debugContainer: {
        margin: SPACING.lg,
        padding: SPACING.md,
        backgroundColor: COLORS.greyDEBUG,
        borderRadius: SPACING.sm,
    },
    debugTitle: {
        ...TYPOGRAPHY.title,
        marginBottom: SPACING.sm,
        color: COLORS.text.secondary,
    },
    debugText: {
        ...TYPOGRAPHY.body,
        color: COLORS.text.secondary,
        fontFamily: 'monospace',
    },
    activity: {
        color: "#0000FF",
    }
});