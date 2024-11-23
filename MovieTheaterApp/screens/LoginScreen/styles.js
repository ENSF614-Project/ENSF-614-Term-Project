// screens/LoginScreen/styles.js
import { StyleSheet } from 'react-native';
import { COLORS, SPACING, TYPOGRAPHY } from '../../styles';

export const styles = StyleSheet.create({
    container: {
        flex: 1,
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
    loginButton: {
        backgroundColor: '#E31837',
        padding: SPACING.md,
        borderRadius: SPACING.sm,
        marginBottom: SPACING.md,
    },
    loginButtonText: {
        color: COLORS.background,
        textAlign: 'center',
        fontSize: 16,
        fontWeight: 'bold',
    },
    registerButton: {
        padding: SPACING.sm,
    },
    registerButtonText: {
        color: COLORS.text.secondary,
        textAlign: 'center',
    },
});