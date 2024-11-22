// screens/ShowtimeScreen/index.js
import React from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { styles } from './styles';
import { showtimes } from '../../MockData';

const ShowtimeScreen = ({ route }) => {
    const { movie } = route.params;

    const renderShowtime = (showtime) => (
        <TouchableOpacity
            key={showtime.id}
            style={styles.showtimeCard}
            onPress={() => {
                // TODO: Navigate to seat selection
                console.log('Selected showtime:', showtime);
            }}
        >
            <View style={styles.showtimeInfo}>
                <Text style={styles.time}>{showtime.time}</Text>
                <Text style={styles.theatre}>{showtime.theatre}</Text>
            </View>
            <Text style={styles.price}>{showtime.price}</Text>
        </TouchableOpacity>
    );

    return (
        <ScrollView style={styles.container}>
            <View style={styles.movieInfo}>
                <Text style={styles.movieTitle}>{movie.title}</Text>
                <Text style={styles.movieDetails}>
                    {movie.duration}m • {movie.genre}
                </Text>
            </View>

            <View style={styles.dateSelector}>
                <Text style={styles.dateTitle}>Select Date</Text>
                {/* Date selector to be implemented */}
            </View>

            <View style={styles.showtimesContainer}>
                <Text style={styles.sectionTitle}>Available Showtimes</Text>
                {showtimes.map(renderShowtime)}
            </View>
        </ScrollView>
    );
};

export default ShowtimeScreen;