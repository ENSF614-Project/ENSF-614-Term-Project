// screens/SeatSelectionScreen/index.js
import React from 'react';
import { View, Text, ScrollView } from 'react-native';
import { styles } from './styles';

const SeatSelectionScreen = ({ route }) => {
    const { showtime, movie } = route.params;

    return (
        <ScrollView style={styles.container}>
            <View style={styles.movieInfo}>
                <Text style={styles.movieTitle}>{movie.title}</Text>
                <Text style={styles.showtimeInfo}>
                    {showtime.time} - {showtime.theatre}
                </Text>
            </View>
        </ScrollView>
    );
};

export default SeatSelectionScreen;