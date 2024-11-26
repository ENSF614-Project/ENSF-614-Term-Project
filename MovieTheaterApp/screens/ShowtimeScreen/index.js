// screens/ShowtimeScreen/index.js
import React, { useState, useMemo } from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { Calendar } from 'lucide-react-native';
import { styles } from './styles';
import { COLORS } from '../../styles';
import { showtimes } from '../../MockData';

const ShowtimeScreen = ({ route, navigation }) => {
    const { movie } = route.params;

    // used to get the available dates for the selected movie
    const availableDates = useMemo(() => {
        return Object.keys(showtimes[movie.movieId])
            .map(date => new Date(date))
            .sort((a, b) => a - b); // Sort dates in ascending order
    }, [movie.movieId]);

    // initialize selectedDate with the first available date
    const [selectedDate, setSelectedDate] = useState(availableDates[0]);
    const [showCalendar, setShowCalendar] = useState(false);

    const currentShowtimes = useMemo(() => {
        const dateStr = selectedDate.toISOString().split('T')[0];
        return showtimes[movie.movieId][dateStr] || [];
    }, [movie.movieId, selectedDate]);

    const formatDate = (date) => {
        return date.toLocaleDateString('en-US', {
            weekday: 'long',
            month: 'long',
            day: 'numeric',
            year: 'numeric'
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
                date: selectedDate
            },
            movie
        });
    };

    const renderDatePicker = () => (
        <View style={styles.datePickerContainer}>
            <TouchableOpacity
                style={styles.dateButton}
                onPress={() => setShowCalendar(!showCalendar)}
            >
                <Calendar size={24} color={COLORS.text.primary} />
                <Text style={styles.dateText}>{formatDate(selectedDate)}</Text>
            </TouchableOpacity>

            {showCalendar && (
                <View style={styles.calendarContainer}>
                    {availableDates.map((date) => (
                        <TouchableOpacity
                            key={date.toISOString()}
                            style={[
                                styles.calendarDate,
                                date.toISOString() === selectedDate.toISOString() && styles.selectedDate
                            ]}
                            onPress={() => handleDateSelect(date)}
                        >
                            <Text style={[
                                styles.calendarDateText,
                                date.toISOString() === selectedDate.toISOString() && styles.selectedDateText
                            ]}>
                                {date.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })}
                            </Text>
                        </TouchableOpacity>
                    ))}
                </View>
            )}
        </View>
    );

    const renderShowtime = (showtime) => (
        <TouchableOpacity
            key={showtime.id}
            style={styles.showtimeCard}
            onPress={() => handleShowtimePress(showtime)}
        >
            <View style={styles.showtimeInfo}>
                <Text style={styles.time}>{showtime.time}</Text>
                <Text style={styles.theatre}>{showtime.theatre}</Text>
            </View>
            <Text style={styles.price}>${showtime.price.toFixed(2)}</Text>
        </TouchableOpacity>
    );

    return (
        <ScrollView style={styles.container}>
            <View style={styles.movieInfo}>
                <Text style={styles.movieTitle}>{movie.title}</Text>
                <Text style={styles.movieDetails}>
                    {movie.duration}m - {movie.genre}
                </Text>
            </View>

            {renderDatePicker()}

            <View style={styles.showtimesContainer}>
                <Text style={styles.sectionTitle}>Available Showtimes</Text>
                {currentShowtimes.length > 0 ? (
                    currentShowtimes.map(renderShowtime)
                ) : (
                    <Text style={styles.noShowtimesText}>No showtimes available for this date</Text>
                )}
            </View>
        </ScrollView>
    );
};

export default ShowtimeScreen;