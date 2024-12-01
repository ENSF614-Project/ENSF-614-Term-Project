// screens/HomeScreen/styles.js
import { StyleSheet } from 'react-native';
import { COLORS, SPACING, TYPOGRAPHY } from '../../styles';

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.background.primary,
    },
    searchContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: SPACING.lg,
        paddingVertical: SPACING.md,
        borderBottomWidth: 1,
        borderBottomColor: COLORS.border.default,
        backgroundColor: COLORS.background.secondary,
    },
    searchInputContainer: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: COLORS.input.background,
        borderWidth: 1,
        borderColor: COLORS.input.border,
        borderRadius: SPACING.sm,
        marginRight: SPACING.sm,
    },
    searchInput: {
        flex: 1,
        height: 40,
        paddingHorizontal: SPACING.md,
        color: COLORS.text.primary,
        placeholderTextColor: COLORS.input.placeholder,
    },
    clearButton: {
        padding: SPACING.xs,
        marginRight: SPACING.xs,
        color: COLORS.icon.secondary,
    },
    searchButton: {
        padding: SPACING.xs,
        color: COLORS.icon.primary,
    },
    genreFilterContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        borderBottomWidth: 1,
        borderBottomColor: COLORS.border.default,
        backgroundColor: COLORS.background.primary,
    },
    genreScrollContainer: {
        paddingHorizontal: SPACING.lg,
        paddingVertical: SPACING.md,
    },
    genreChip: {
        paddingHorizontal: SPACING.md,
        paddingVertical: SPACING.xs,
        borderRadius: SPACING.lg,
        backgroundColor: COLORS.background.primary,
        borderWidth: 1,
        borderColor: COLORS.border.default,
        marginRight: SPACING.sm,
    },
    genreChipSelected: {
        backgroundColor: COLORS.button.primary.background,
        borderColor: COLORS.button.primary.background,
    },
    genreChipText: {
        ...TYPOGRAPHY.body,
        color: COLORS.text.primary,
    },
    genreChipTextSelected: {
        color: COLORS.text.inverse,
    },
    clearFiltersButton: {
        padding: SPACING.md,
        marginRight: SPACING.md,
        color: COLORS.icon.primary,
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
        backgroundColor: COLORS.button.primary.background,
        borderRadius: SPACING.sm,
    },
    clearSearchButtonText: {
        ...TYPOGRAPHY.body,
        color: COLORS.button.primary.text,
        fontWeight: 'bold',
    },
    searchResultsContainer: {
        paddingHorizontal: SPACING.lg,
        paddingVertical: SPACING.md,
        borderBottomWidth: 1,
        borderBottomColor: COLORS.border.default,
    },
    searchResultsText: {
        ...TYPOGRAPHY.body,
        color: COLORS.text.secondary,
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
});