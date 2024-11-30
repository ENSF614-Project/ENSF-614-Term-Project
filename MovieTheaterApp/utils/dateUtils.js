// utils/dateUtils.js

const TIMEZONE = 'America/Edmonton';
export const dateUtils = {
    // Convert UTC date from backend to Calgary time
    toLocalTime: (dateString) => {
        return new Date(dateString).toLocaleString('en-US', {
            timeZone: TIMEZONE,
            hour: 'numeric',
            minute: '2-digit'
        });
    },

    // Convert UTC date to Calgary date
    toLocalDate: (dateString) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            timeZone: TIMEZONE,
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    },

    // Get date only in Calgary timezone for comparison
    getLocalDateString: (dateString) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            timeZone: TIMEZONE
        });
    },

    // Format short date for calendar
    getLocalDateString: (dateString) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            timeZone: TIMEZONE,
            weekday: 'short',
            month: 'short',
            day: 'numeric'
        });
    }
};