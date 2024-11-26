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
        placeholderTextColor: "#0000FF",
    },
    clearButton: {
        padding: SPACING.xs,
        marginRight: SPACING.xs,
        color: "#0000FF",
    },
    searchButton: {
        padding: SPACING.xs,
        color: "#0000FF",
    },
    genreFilterContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        borderBottomWidth: 1,
        borderBottomColor: COLORS.border,
        backgroundColor: COLORS.background,
    },
    genreScrollContainer: {
        paddingHorizontal: SPACING.lg,
        paddingVertical: SPACING.md,
    },
    genreChip: {
        paddingHorizontal: SPACING.md,
        paddingVertical: SPACING.xs,
        borderRadius: SPACING.lg,
        backgroundColor: COLORS.background,
        borderWidth: 1,
        borderColor: COLORS.border,
        marginRight: SPACING.sm,
    },
    genreChipSelected: {
        backgroundColor: COLORS.RED,
        borderColor: COLORS.RED,
    },
    genreChipText: {
        ...TYPOGRAPHY.body,
        color: COLORS.text.primary,
    },
    genreChipTextSelected: {
        color: COLORS.background,
    },
    clearFiltersButton: {
        padding: SPACING.md,
        marginRight: SPACING.md,
        color: "#0000FF",
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