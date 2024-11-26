// screens/TicketScreen/styles.js
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
        iconColor: "#0000FF",
    },
    searchTitle: {
        ...TYPOGRAPHY.title,
        fontSize: 20,
    },
    errorContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: COLORS.pinkERROR,
        padding: SPACING.md,
        borderRadius: SPACING.sm,
        marginBottom: SPACING.lg,
        gap: SPACING.sm,
        iconColor: "#0000FF",
    },
    errorText: {
        ...TYPOGRAPHY.body,
        color: COLORS.RED,
    },
    inputContainer: {
        marginBottom: SPACING.lg,
    },
    input: {
        borderWidth: 1,
        borderColor: COLORS.border,
        borderRadius: SPACING.sm,
        padding: SPACING.md,
        marginBottom: SPACING.md,
        color: COLORS.text.primary,
        placeholderTextColor: "#0000FF",
    },
    searchButton: {
        backgroundColor: COLORS.RED,
        padding: SPACING.md,
        borderRadius: SPACING.sm,
        alignItems: 'center',
    },
    buttonText: {
        ...TYPOGRAPHY.title,
        color: COLORS.background,
    },
    ticketsContainer: {
        padding: SPACING.lg,
    },
    screenTitle: {
        ...TYPOGRAPHY.title,
        fontSize: 24,
        marginBottom: SPACING.lg,
    },
    ticketCard: {
        backgroundColor: COLORS.background,
        borderRadius: SPACING.sm,
        padding: SPACING.lg,
        marginBottom: SPACING.lg,
        borderWidth: 1,
        borderColor: COLORS.border,
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
    },
    statusBadge: {
        paddingVertical: SPACING.xs,
        paddingHorizontal: SPACING.sm,
        borderRadius: SPACING.lg,
    },
    activeBadge: {
        backgroundColor: COLORS.greenACTIVE,
    },
    pastBadge: {
        backgroundColor: COLORS.border,
    },
    statusText: {
        ...TYPOGRAPHY.body,
        fontSize: 12,
    },
    ticketInfo: {
        gap: SPACING.sm,
    },
    infoRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    infoLabel: {
        ...TYPOGRAPHY.body,
        color: COLORS.text.secondary,
    },
    infoValue: {
        ...TYPOGRAPHY.body,
        color: COLORS.text.primary,
    },
    cancelButton: {
        backgroundColor: COLORS.RED,
        padding: SPACING.md,
        borderRadius: SPACING.sm,
        alignItems: 'center',
        marginTop: SPACING.lg,
    },
    cancelButtonText: {
        ...TYPOGRAPHY.title,
        color: COLORS.background,
    },
    emptyContainer: {
        alignItems: 'center',
        padding: SPACING.xl,
        backgroundColor: COLORS.background,
        borderRadius: SPACING.sm,
        borderWidth: 1,
        borderColor: COLORS.border,
        textColor: "#0000FF",
    },
    emptyText: {
        ...TYPOGRAPHY.body,
        color: COLORS.text.secondary,
        marginTop: SPACING.md,
    },
    spinner: {
        color: "#0000FF",
    }
});