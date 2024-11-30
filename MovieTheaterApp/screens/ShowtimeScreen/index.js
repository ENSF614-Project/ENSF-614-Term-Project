// screens/ShowtimeScreen/index.js
import React, { useState, useMemo, useEffect } from 'react';
import { View, Text, TouchableOpacity, ScrollView, ActivityIndicator } from 'react-native';
import { Calendar } from 'lucide-react-native';
import { styles } from './styles';
import { showtimeService } from '../../services/showtimeService';
import { useAuth } from '../../context/AuthContext';
import { dateUtils } from '../../utils/dateUtils';

const ShowtimeScreen = ({ route, navigation }) => {
    const { movieId } = route.params;
    const { user } = useAuth();
    const [showtimes, setShowtimes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [selectedDate, setSelectedDate] = useState(null);
    const [showCalendar, setShowCalendar] = useState(false);

    const availableDates = useMemo(() => {
        const dates = new Set();
        showtimes.forEach(showtime => {
            const localDate = dateUtils.getLocalDateString(showtime.startTime);
            dates.add(localDate);
        });
        return Array.from(dates)
            .map(date => new Date(date))
            .sort((a, b) => a - b);
    }, [showtimes]);

    const filteredShowtimes = useMemo(() => {
        if (!selectedDate) return [];
        const selectedDateStr = dateUtils.getLocalDateString(selectedDate);

        return showtimes.filter(showtime => {
            const showtimeDateStr = dateUtils.getLocalDateString(showtime.startTime);
            return showtimeDateStr === selectedDateStr;
        });
    }, [showtimes, selectedDate]);

    useEffect(() => {
        fetchShowtimes();
    }, [movieId]);

    useEffect(() => {
        if (availableDates.length > 0 && !selectedDate) {
            setSelectedDate(availableDates[0]);
        }
    }, [availableDates]);

    const fetchShowtimes = async () => {
        try {
            setLoading(true);
            setError(null);
            const data = await showtimeService.getShowtimesByMovie(movieId);
            setShowtimes(data);
        } catch (err) {
            setError('Failed to load showtimes. Please try again later.');
            console.error('Error fetching showtimes:', err);
        } finally {
            setLoading(false);
        }
    };
    // Need to use useEffect to fetch showtimes
    useEffect(() => {
        fetchShowtimes();
    }, [movieId]);

    // This will set the initial date after availableDates is populated
    useEffect(() => {
        if (availableDates.length > 0 && !selectedDate) {
            setSelectedDate(availableDates[0]);
        }
    }, [availableDates]); //This whole bit of code is redundant since the time zone fix, but it works so I'm leaving it in 

    const formatTime = (dateTimeString) => {
        return new Date(dateTimeString).toLocaleTimeString('en-US', {
            hour: 'numeric',
            minute: '2-digit'
        });
    };

    const handleDateSelect = (date) => {
        setSelectedDate(date);
        setShowCalendar(false);
    };

    const handleShowtimePress = (showtime) => {
        navigation.navigate('SeatSelection', {
            showtime: {
                ...showtime,
                date: new Date(showtime.startTime),
                time: formatTime(showtime.startTime)
            },
            movieId
        });
    };

    if (loading) {
        return (
            <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color={styles.loadingSpinner.color} />
            </View>
        );
    }

    if (error) {
        return (
            <View style={styles.errorContainer}>
                <Text style={styles.errorText}>{error}</Text>
                <TouchableOpacity
                    style={styles.retryButton}
                    onPress={fetchShowtimes}
                >
                    <Text style={styles.retryButtonText}>Retry</Text>
                </TouchableOpacity>
            </View>
        );
    }

    return (
        <ScrollView style={styles.container}>
            <View style={styles.datePickerContainer}>
                <TouchableOpacity
                    style={styles.dateButton}
                    onPress={() => setShowCalendar(!showCalendar)}
                >
                    <Calendar size={24} color={styles.dateButton.iconColor} />
                    <Text style={styles.dateText}>
                        {selectedDate ? dateUtils.toLocalDate(selectedDate) : 'Select Date'}
                    </Text>
                </TouchableOpacity>

                {showCalendar && (
                    <View style={styles.calendarContainer}>
                        {availableDates.map((date) => (
                            <TouchableOpacity
                                key={date.toISOString()}
                                style={[
                                    styles.calendarDate,
                                    selectedDate &&
                                    dateUtils.getLocalDateString(selectedDate) === dateUtils.getLocalDateString(date) &&
                                    styles.selectedDate
                                ]}
                                onPress={() => handleDateSelect(date)}
                            >
                                <Text style={[
                                    styles.calendarDateText,
                                    selectedDate &&
                                    dateUtils.getLocalDateString(selectedDate) === dateUtils.getLocalDateString(date) &&
                                    styles.selectedDateText
                                ]}>
                                    {dateUtils.toShortLocalDate(date)}
                                </Text>
                            </TouchableOpacity>
                        ))}
                    </View>
                )}
            </View>

            <View style={styles.showtimesContainer}>
                <Text style={styles.sectionTitle}>Available Showtimes</Text>
                {filteredShowtimes.length > 0 ? (
                    filteredShowtimes.map((showtime) => (
                        <TouchableOpacity
                            key={showtime.showtimeId}
                            style={styles.showtimeCard}
                            onPress={() => handleShowtimePress(showtime)}
                        >
                            <View style={styles.showtimeInfo}>
                                <Text style={styles.time}>
                                    {dateUtils.toLocalTime(showtime.startTime)}
                                </Text>
                                <Text style={styles.theatre}>
                                    {showtime.theatre.theatreName}
                                </Text>
                            </View>
                            {showtime.isEarlyAccessOnly && !user?.isRU && (
                                <Text style={styles.earlyAccessText}>
                                    Early Access Only
                                </Text>
                            )}
                        </TouchableOpacity>
                    ))
                ) : (
                    <Text style={styles.noShowtimesText}>
                        No showtimes available for this date
                    </Text>
                )}
            </View>
        </ScrollView>
    );
};

export default ShowtimeScreen;