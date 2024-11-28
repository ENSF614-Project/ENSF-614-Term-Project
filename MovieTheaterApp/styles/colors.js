// styles/colors.js

// Base palette
const palette = {
    // Primary colors
    primary: {
        main: '#E31837',    // Previously RED
        light: '#FF4D6A',   // Lighter shade for hover states
        dark: '#961328',    // Previously hoverRED
        contrast: '#FFFFFF' // Text color on primary backgrounds
    },

    // Neutral colors
    neutral: {
        100: '#FFFFFF', // Previously background
        200: '#F8F9FA',
        300: '#EEEEEE', // Previously border
        400: '#666666', // Previously secondary
        500: '#1E1E1E'  // Previously primary
    },

    // Semantic colors
    success: {
        light: '#D1FAE5', // Previously greenACTIVE
        main: '#10B981',
        dark: '#059669'
    },

    error: {
        light: '#FEE2E2', // Previously pinkERROR
        main: '#EF4444',
        dark: '#DC2626'
    },

    warning: {
        light: '#FEF3C7',
        main: '#F59E0B',
        dark: '#D97706'
    },

    info: {
        light: '#F0F0F0', // Previously greyDEBUG
        main: '#3B82F6',
        dark: '#2563EB'
    }
};

export const COLORS = {
    // Background colors
    background: {
        primary: palette.neutral[100],
        secondary: palette.neutral[200],
        tertiary: palette.neutral[300],
        error: palette.error.light,
        success: palette.success.light,
        warning: palette.warning.light,
        info: palette.info.light
    },

    // Text colors
    text: {
        primary: palette.neutral[500],
        secondary: palette.neutral[400],
        disabled: palette.neutral[300],
        inverse: palette.neutral[100],
        error: palette.error.main,
        success: palette.success.main
    },

    // Border colors
    border: {
        default: palette.neutral[300],
        focus: palette.primary.main,
        error: palette.error.main
    },

    // Button colors
    button: {
        primary: {
            background: palette.primary.main,
            hover: palette.primary.dark,
            text: palette.primary.contrast
        },
        secondary: {
            background: palette.neutral[200],
            hover: palette.neutral[300],
            text: palette.neutral[500]
        },
        danger: {
            background: palette.error.main,
            hover: palette.error.dark,
            text: palette.primary.contrast
        }
    },

    // Icon colors
    icon: {
        primary: palette.primary.main,
        secondary: palette.neutral[400],
        error: palette.error.main,
        success: palette.success.main
    },

    // Input colors
    input: {
        background: palette.neutral[100],
        border: palette.neutral[300],
        borderFocus: palette.primary.main,
        borderError: palette.error.main,
        placeholder: palette.neutral[400]
    },

    // Card colors
    card: {
        background: palette.neutral[100],
        border: palette.neutral[300],
        shadow: `${palette.neutral[500]}1A`
    },

    // Status colors
    status: {
        active: palette.success.light,
        inactive: palette.neutral[300],
        error: palette.error.light,
        warning: palette.warning.light
    }
};