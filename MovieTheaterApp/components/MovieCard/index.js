// components/MovieCard/index.js
import React, { useState } from 'react';
import { View, Text, Image, TouchableOpacity, Platform } from 'react-native';
import { styles } from './styles';

const MovieCard = ({ movie, onPress }) => {
    const [isHovered, setIsHovered] = useState(false);

    const formatDate = (dateString) => {
        const options = { year: 'numeric', month: 'short', day: 'numeric' };
        return new Date(dateString).toLocaleDateString('en-US', options);
    };

    const webProps = Platform.select({
        web: {
            onMouseEnter: () => setIsHovered(true),
            onMouseLeave: () => setIsHovered(false),
            style: [
                styles.container,
                isHovered && styles.containerHovered,
                { transition: 'all 0.2s ease-in-out' }
            ]
        },
        default: {
            style: styles.container
        }
    });

    const handlePress = () => {
        console.log('Card pressed');
        onPress && onPress();
    };

    return (
        <TouchableOpacity
            {...webProps}
            activeOpacity={0.7}
            onPress={handlePress}
        >
            <Image
                source={{ uri: movie.posterUrl }}
                style={styles.poster}
                resizeMode="cover"
            />
            <View style={styles.infoContainer}>
                <Text style={styles.title} numberOfLines={1}>
                    {movie.title}
                </Text>
                <View style={styles.detailsContainer}>
                    <Text style={styles.genre} numberOfLines={1}>
                        {movie.genre}
                    </Text>
                    <Text style={styles.duration}>
                        {movie.duration}m
                    </Text>
                </View>
                <View style={styles.dateContainer}>
                    <Text style={styles.releaseDate}>
                        {formatDate(movie.releaseDate)}
                    </Text>
                    <Text style={styles.rating}>★ {movie.rating}</Text>
                </View>
            </View>
        </TouchableOpacity>
    );
};

export default MovieCard;