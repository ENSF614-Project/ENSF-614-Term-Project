// screens/MovieDetailsScreen/index.js
import React from 'react';
import { View, Text, Image, ScrollView, TouchableOpacity } from 'react-native';
import { Calendar, Clock, Star } from 'lucide-react-native';
import { styles } from './styles';

const MovieDetailsScreen = ({ route, navigation }) => {
    const { movie } = route.params;

    const formatDate = (dateString) => {
        const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
        return new Date(dateString).toLocaleDateString('en-US', options);
    };

    return (
        <ScrollView style={styles.container}>
            <Image
                source={{ uri: movie.posterUrl }}
                style={styles.headerImage}
                resizeMode="cover"
            />

            <View style={styles.contentContainer}>
                <Text style={styles.title}>{movie.title}</Text>

                <View style={styles.infoContainer}>
                    <View style={styles.infoItem}>
                        <Calendar size={20} color={styles.infoItem.calendarColor} />
                        <Text style={styles.infoText}>
                            {formatDate(movie.releaseDate)} (Release Date)
                        </Text>
                    </View>

                    <View style={styles.infoItem}>
                        <Clock size={20} color={styles.infoItem.clockColor} />
                        <Text style={styles.infoText}>
                            {movie.duration} minutes
                        </Text>
                    </View>

                    <View style={styles.infoItem}>
                        <Star size={20} color={styles.infoItem.starColor} />
                        <Text style={styles.infoText}>
                            {movie.rating}/10
                        </Text>
                    </View>
                </View>

                <View style={styles.genreContainer}>
                    {movie.genre.split('/').map((genre, index) => (
                        <View key={index} style={styles.genreTag}>
                            <Text style={styles.genreText}>{genre.trim()}</Text>
                        </View>
                    ))}
                </View>

                <Text style={styles.sectionTitle}>Synopsis</Text>
                <Text style={styles.description}>
                    {/*TODO: Implement a description?*/}
                    {movie.description ||
                        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."}
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