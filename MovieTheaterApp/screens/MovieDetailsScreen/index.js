// screens/MovieDetailsScreen/index.js
import React from 'react';
import { View, Text, Image, ScrollView, TouchableOpacity } from 'react-native';
import { styles } from './styles';
import { SPACING } from '../../styles';

const MovieDetailsScreen = ({ route, navigation }) => {
    const { movie } = route.params;

    return (
        <ScrollView style={styles.container}>
            <Image
                source={{
                    uri: `https://picsum.photos/${SPACING.cardPoster.width * 2}/${SPACING.cardPoster.height * 1.5}`
                }}
                style={styles.headerImage}
            />

            <View style={styles.contentContainer}>
                <Text style={styles.title}>{movie.title}</Text>

                <View style={styles.infoRow}>
                    <Text style={styles.genre}>{movie.genre}</Text>
                    <Text style={styles.duration}>{movie.duration}m</Text>
                    <Text style={styles.rating}>{movie.rating}/10</Text>
                </View>

                <Text style={styles.description}>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor
                    incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis
                    nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                </Text>

                <TouchableOpacity
                    style={styles.showtimeButton}
                    onPress={() => navigation.navigate('Showtime', { movie })}
                >
                    <Text style={styles.showtimeButtonText}>View Showtimes</Text>
                </TouchableOpacity>
            </View>
        </ScrollView>
    );
};

export default MovieDetailsScreen;