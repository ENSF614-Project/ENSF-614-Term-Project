// screens/MovieDetailsScreen/index.js
import React, { useState, useEffect } from 'react';
import { View, Text, Image, ScrollView, TouchableOpacity, ActivityIndicator } from 'react-native';
import { Calendar, Clock, Star } from 'lucide-react-native';
import { styles } from './styles';
import { movieService } from '../../services/movieService';

const MovieDetailsScreen = ({ route, navigation }) => {
    const { movieId } = route.params;
    const [movie, setMovie] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchMovieDetails();
    }, [movieId]);

    const fetchMovieDetails = async () => {
        try {
            setLoading(true);
            setError(null);
            const movieData = await movieService.getMovieById(movieId);
            setMovie(movieData);
        } catch (err) {
            setError('Failed to load movie details. Please try again later.');
            console.error('Error fetching movie details:', err);
        } finally {
            setLoading(false);
        }
    };

    const isEarlyAccessOnly = (releaseDate) => {
        if (!releaseDate) return false;
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        const movieReleaseDate = new Date(releaseDate);
        movieReleaseDate.setHours(0, 0, 0, 0);
        return movieReleaseDate > today;
    };

    const formatDate = (dateString) => {
        const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
        return new Date(dateString).toLocaleDateString('en-US', options);
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
                    onPress={fetchMovieDetails}
                >
                    <Text style={styles.retryButtonText}>Retry</Text>
                </TouchableOpacity>
            </View>
        );
    }

    if (!movie) {
        return (
            <View style={styles.errorContainer}>
                <Text style={styles.errorText}>Movie not found</Text>
                <TouchableOpacity
                    style={styles.retryButton}
                    onPress={() => navigation.goBack()}
                >
                    <Text style={styles.retryButtonText}>Go Back</Text>
                </TouchableOpacity>
            </View>
        );
    }

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
                            {formatDate(movie.releaseDate)}
                            {isEarlyAccessOnly(movie.releaseDate) && (
                                <Text style={styles.earlyAccessBadge}> (Early Access)</Text>
                            )}
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
                <Text style={styles.description}>{movie.description}</Text>

                <TouchableOpacity
                    style={styles.showtimeButton}
                    onPress={() => navigation.navigate('Showtime', { movieId: movie.movieId })}
                >
                    <Text style={styles.showtimeButtonText}>View Showtimes</Text>
                </TouchableOpacity>
            </View>
        </ScrollView>
    );
};

export default MovieDetailsScreen;