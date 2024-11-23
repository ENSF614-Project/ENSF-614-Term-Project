// screens/HomeScreen/styles.js
import { StyleSheet } from 'react-native';
import { COLORS, SPACING } from '../../styles';

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
    searchInput: {
        flex: 1,
        height: 40,
        backgroundColor: COLORS.background,
        borderWidth: 1,
        borderColor: COLORS.border,
        borderRadius: SPACING.sm,
        paddingHorizontal: SPACING.md,
        marginRight: SPACING.sm,
        color: COLORS.text.primary,
        placeholderTextColor: COLORS.placeholder,
    },
    searchButton: {
        padding: SPACING.xs,
    },
    movieList: {
        padding: SPACING.lg,
    },
    columnWrapper: {
        justifyContent: 'flex-start',
        gap: SPACING.md,
    }
});
