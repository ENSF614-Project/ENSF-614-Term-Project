// screens/TicketScreen/styles.js
import { StyleSheet } from 'react-native';
import { COLORS, SPACING, TYPOGRAPHY } from '../../styles';

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.background.primary,
    },
    centered: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: COLORS.background.primary,
    },
    loadingText: {
        ...TYPOGRAPHY.body,
        marginTop: SPACING.md,
        color: COLORS.text.secondary,
    },
    searchContainer: {
        padding: SPACING.lg,
    },
    searchHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: SPACING.lg,
        gap: SPACING.sm,
        iconColor: COLORS.icon.primary,
    },
    searchTitle: {
        ...TYPOGRAPHY.title,
        fontSize: 20,
        color: COLORS.text.primary,
    },
    errorContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: COLORS.background.error,
        padding: SPACING.md,
        borderRadius: SPACING.sm,
        marginBottom: SPACING.lg,
        gap: SPACING.sm,
        iconColor: COLORS.icon.error,
    },
    errorText: {
        ...TYPOGRAPHY.body,
        color: COLORS.text.error,
    },
    input: {
        borderWidth: 1,
        borderColor: COLORS.border.default,
        borderRadius: SPACING.sm,
        padding: SPACING.md,
        marginBottom: SPACING.md,
        color: COLORS.text.primary,
        backgroundColor: COLORS.input.background,
        placeholderTextColor: COLORS.input.placeholder,
    },
    searchButton: {
        backgroundColor: COLORS.button.primary.background,
        padding: SPACING.md,
        borderRadius: SPACING.sm,
        alignItems: 'center',
    },
    buttonText: {
        ...TYPOGRAPHY.title,
        color: COLORS.button.primary.text,
    },
    ticketsContainer: {
        padding: SPACING.lg,
    },
    screenTitle: {
        ...TYPOGRAPHY.title,
        fontSize: 24,
        marginBottom: SPACING.lg,
        color: COLORS.text.primary,
    },
    ticketCard: {
        backgroundColor: COLORS.background.primary,
        borderRadius: SPACING.sm,
        padding: SPACING.lg,
        marginBottom: SPACING.lg,
        borderWidth: 1,
        borderColor: COLORS.border.default,
    },
    ticketHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: SPACING.md,
    },
    movieTitle: {
        ...TYPOGRAPHY.title,
        fontSize: 18,
        color: COLORS.text.primary,
        flex: 1,
    },
    statusBadge: {
        paddingVertical: SPACING.xs,
        paddingHorizontal: SPACING.sm,
        borderRadius: SPACING.lg,
    },
    activeBadge: {
        backgroundColor: COLORS.status.active,
    },
    pastBadge: {
        backgroundColor: COLORS.status.inactive,
    },
    statusText: {
        ...TYPOGRAPHY.body,
        fontSize: 12,
        color: COLORS.text.primary,
    },
    ticketInfo: {
        gap: SPACING.xs,
    },
    infoRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: SPACING.xs,
    },
    infoLabel: {
        ...TYPOGRAPHY.body,
        color: COLORS.text.secondary,
        width: '30%',
    },
    infoValue: {
        ...TYPOGRAPHY.body,
        color: COLORS.text.primary,
        flex: 1,
        textAlign: 'right',
    },
    cancelButton: {
        backgroundColor: COLORS.button.danger.background,
        padding: SPACING.md,
        borderRadius: SPACING.sm,
        alignItems: 'center',
        marginTop: SPACING.lg,
    },
    cancelButtonText: {
        ...TYPOGRAPHY.title,
        color: COLORS.button.danger.text,
    },
    emptyContainer: {
        alignItems: 'center',
        padding: SPACING.xl,
        backgroundColor: COLORS.background.primary,
        borderRadius: SPACING.sm,
        borderWidth: 1,
        borderColor: COLORS.border.default,
        textColor: COLORS.text.secondary,
    },
    emptyText: {
        ...TYPOGRAPHY.body,
        color: COLORS.text.secondary,
        marginTop: SPACING.md,
    },
    toggleButton: {
        backgroundColor: COLORS.button.secondary.background,
        padding: SPACING.md,
        borderRadius: SPACING.sm,
        marginVertical: SPACING.md,
        marginHorizontal: SPACING.lg,
        alignItems: 'center',
    },
    toggleButtonText: {
        ...TYPOGRAPHY.body,
        color: COLORS.text.primary,
    },
    spinner: {
        color: COLORS.icon.primary,
    }
});