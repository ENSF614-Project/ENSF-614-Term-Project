// utils/dateUtils.js

const TIMEZONE = 'America/Edmonton';

const toLocalTime = (dateString) => {
    return new Date(dateString).toLocaleString('en-US', {
        timeZone: TIMEZONE,
        hour: 'numeric',
        minute: '2-digit'
    });
};

const toLocalDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
        timeZone: TIMEZONE,
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
};

const getLocalDateString = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
        timeZone: TIMEZONE
    });
};

const toShortLocalDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
        timeZone: TIMEZONE,
        weekday: 'short',
        month: 'short',
        day: 'numeric'
    });
};

export {
    toLocalTime,
    toLocalDate,
    getLocalDateString,
    toShortLocalDate
};