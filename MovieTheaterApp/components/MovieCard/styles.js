// components/MovieCard/styles.js
import { StyleSheet } from 'react-native';
import { COLORS, SPACING, TYPOGRAPHY } from '../../styles';

export const styles = StyleSheet.create({
    container: {
        backgroundColor: COLORS.background,
        borderRadius: SPACING.sm,
        elevation: 3,
        shadowColor: COLORS.shadow,
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 10,
        margin: SPACING.xs,
        width: SPACING.cardPoster.width,
        overflow: 'hidden',
    },
    poster: {
        width: SPACING.cardPoster.width,
        height: SPACING.cardPoster.height,
        backgroundColor: COLORS.border,
    },
    infoContainer: {
        padding: SPACING.sm,
    },
    title: {
        ...TYPOGRAPHY.title,
        color: COLORS.text.primary,
        marginBottom: SPACING.xs,
    },
    detailsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    genre: {
        ...TYPOGRAPHY.body,
        color: COLORS.text.secondary,
        flex: 1,
        marginRight: SPACING.xs,
    },
    duration: {
        ...TYPOGRAPHY.body,
        color: COLORS.text.secondary,
    }
});