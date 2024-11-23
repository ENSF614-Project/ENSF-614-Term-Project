import { StyleSheet } from 'react-native';
import { COLORS, SPACING, TYPOGRAPHY } from '../../styles';

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.background,
    },
    searchContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: SPACING.lg,
        paddingVertical: SPACING.md,
        borderBottomWidth: 1,
        borderBottomColor: COLORS.border,
        backgroundColor: COLORS.secondary,
    },
    searchInputContainer: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: COLORS.background,
        borderWidth: 1,
        borderColor: COLORS.border,
        borderRadius: SPACING.sm,
        marginRight: SPACING.sm,
    },
    searchInput: {
        flex: 1,
        height: 40,
        paddingHorizontal: SPACING.md,
        color: COLORS.text.primary,
    },
    clearButton: {
        padding: SPACING.xs,
        marginRight: SPACING.xs,
    },
    searchButton: {
        padding: SPACING.xs,
    },
    cardWrapper: {
        flex: 1,
        alignItems: 'center',
    },
    emptyContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: SPACING.xl,
        marginTop: SPACING.xxl,
    },
    emptyText: {
        ...TYPOGRAPHY.body,
        textAlign: 'center',
        color: COLORS.text.secondary,
        marginBottom: SPACING.md,
    },
    clearSearchButton: {
        padding: SPACING.md,
        backgroundColor: COLORS.RED,
        borderRadius: SPACING.sm,
    },
    clearSearchButtonText: {
        ...TYPOGRAPHY.body,
        color: COLORS.background,
        fontWeight: 'bold',
    },
    searchResultsContainer: {
        paddingHorizontal: SPACING.lg,
        paddingVertical: SPACING.md,
        borderBottomWidth: 1,
        borderBottomColor: COLORS.border,
    },
    searchResultsText: {
        ...TYPOGRAPHY.body,
        color: COLORS.text.secondary,
    }
});