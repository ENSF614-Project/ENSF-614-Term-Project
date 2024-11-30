// screens/ShowtimeScreen/index.js
import React, { useState, useMemo, useEffect } from 'react';
import { View, Text, TouchableOpacity, ScrollView, ActivityIndicator } from 'react-native';
import { Calendar } from 'lucide-react-native';
import { styles } from './styles';
import { showtimeService } from '../../services/showtimeService';
import { movieService } from '../../services/movieService';
import { useAuth } from '../../context/AuthContext';
import { toLocalTime, toLocalDate, getLocalDateString, toShortLocalDate } from '../../utils/dateUtils';

const ShowtimeScreen = ({ route, navigation }) => {
    const { movieId } = route.params;
    const { user } = useAuth();
    const [showtimeData, setShowtimeData] = useState([]);
    const [movie, setMovie] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [selectedDate, setSelectedDate] = useState(null);
    const [showCalendar, setShowCalendar] = useState(false);

    // Fetch both movie and showtime data
    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                setError(null);
                const [movieData, showtimes] = await Promise.all([
                    movieService.getMovieById(movieId),
                    showtimeService.getShowtimesByMovie(movieId)
                ]);
                setMovie(movieData);
                setShowtimeData(showtimes);
            } catch (err) {
                setError('Failed to load showtime data. Please try again later.');
                console.error('Error fetching data:', err);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [movieId]);

    const availableDates = useMemo(() => {
        if (!showtimeData.length) return [];

        const dates = new Set();
        showtimeData.forEach(showtime => {
            const localDate = getLocalDateString(showtime.startTime);
            dates.add(localDate);
        });

        const sortedDates = Array.from(dates)
            .map(date => new Date(date))
            .sort((a, b) => a - b);

        // Set initial selected date if not already set
        if (sortedDates.length > 0 && !selectedDate) {
            setSelectedDate(sortedDates[0]);
        }

        return sortedDates;
    }, [showtimeData]);

    const filteredShowtimes = useMemo(() => {
        if (!selectedDate || !showtimeData.length) return [];

        const selectedDateStr = getLocalDateString(selectedDate);
        return showtimeData.filter(showtime => {
            const showtimeDateStr = getLocalDateString(showtime.startTime);
            return showtimeDateStr === selectedDateStr;
        });
    }, [showtimeData, selectedDate]);

    const handleDateSelect = (date) => {
        setSelectedDate(date);
        setShowCalendar(false);
    };

    const handleShowtimePress = (showtime) => {
        navigation.navigate('SeatSelection', {
            showtime: {
                ...showtime,
                movie,
                date: new Date(showtime.startTime)
            }
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
                    onPress={() => fetchData()}
                >
                    <Text style={styles.retryButtonText}>Retry</Text>
                </TouchableOpacity>
            </View>
        );
    }

    return (
        <ScrollView style={styles.container}>
            {movie && (
                <View style={styles.movieInfo}>
                    <Text style={styles.movieTitle}>{movie.title}</Text>
                    <Text style={styles.movieDetails}>
                        {movie.duration}m - {movie.genre}
                    </Text>
                </View>
            )}

            <View style={styles.datePickerContainer}>
                <TouchableOpacity
                    style={styles.dateButton}
                    onPress={() => setShowCalendar(!showCalendar)}
                >
                    <Calendar size={24} color={styles.dateButton.iconColor} />
                    <Text style={styles.dateText}>
                        {selectedDate ? toLocalDate(selectedDate) : 'Select Date'}
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
                                    getLocalDateString(selectedDate) === getLocalDateString(date) &&
                                    styles.selectedDate
                                ]}
                                onPress={() => handleDateSelect(date)}
                            >
                                <Text style={[
                                    styles.calendarDateText,
                                    selectedDate &&
                                    getLocalDateString(selectedDate) === getLocalDateString(date) &&
                                    styles.selectedDateText
                                ]}>
                                    {toShortLocalDate(date)}
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
                                    {toLocalTime(showtime.startTime)}
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