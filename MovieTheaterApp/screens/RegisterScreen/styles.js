// screens/RegisterScreen/styles.js
import { StyleSheet } from 'react-native';
import { COLORS, SPACING, TYPOGRAPHY } from '../../styles';

export const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        backgroundColor: COLORS.background,
        justifyContent: 'center',
        padding: SPACING.xl,
    },
    formContainer: {
        width: '100%',
        maxWidth: 400,
        alignSelf: 'center',
    },
    title: {
        ...TYPOGRAPHY.title,
        fontSize: 24,
        marginBottom: SPACING.xl,
        textAlign: 'center',
    },
    input: {
        borderWidth: 1,
        borderColor: COLORS.border,
        borderRadius: SPACING.sm,
        padding: SPACING.md,
        marginBottom: SPACING.lg,
        fontSize: 16,
    },
    sectionTitle: {
        ...TYPOGRAPHY.title,
        fontSize: 18,
        marginVertical: SPACING.md,
    },
    cardDetailsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    cardExpiryInput: {
        //flex: 1,
        width: '48%',
        marginRight: SPACING.sm,
    },
    cardCvvInput: {
        //flex: 1,
        width: '48%',
    },
    registerButton: {
        backgroundColor: COLORS.RED,
        padding: SPACING.md,
        borderRadius: SPACING.sm,
        marginBottom: SPACING.md,
    },
    registerButtonText: {
        color: COLORS.background,
        textAlign: 'center',
        fontSize: 16,
        fontWeight: 'bold',
    },
    loginButton: {
        padding: SPACING.sm,
    },
    loginButtonText: {
        color: COLORS.text.secondary,
        textAlign: 'center',
    },
});
