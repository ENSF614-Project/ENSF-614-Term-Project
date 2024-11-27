// components/MovieCard/styles.js
import { StyleSheet } from 'react-native';
import { COLORS, SPACING, TYPOGRAPHY } from '../../styles';

export const styles = StyleSheet.create({
    container: {
        backgroundColor: COLORS.card.background,
        borderRadius: SPACING.sm,
        shadowOffset: {
            width: 1,
            height: 2,
        },
        shadowOpacity: 0.5,
        shadowRadius: 3.84,
        margin: SPACING.xs,
        width: SPACING.cardPoster.width,
        overflow: 'hidden',
    },
    poster: {
        width: SPACING.cardPoster.width,
        height: SPACING.cardPoster.height,
        backgroundColor: COLORS.background.secondary,
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
        marginBottom: SPACING.xs,
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
    },
    dateContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingTop: SPACING.xs,
        borderTopWidth: 1,
        borderTopColor: COLORS.border.default,
    },
    releaseDate: {
        ...TYPOGRAPHY.body,
        color: COLORS.text.secondary,
        fontSize: 12,
    },
    rating: {
        ...TYPOGRAPHY.body,
        color: COLORS.button.primary.background,
        fontSize: 12,
        fontWeight: 'bold',
    }
});