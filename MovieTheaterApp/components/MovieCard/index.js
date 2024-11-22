// components/MovieCard/index.js
import React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import { styles } from './styles';
import { SPACING } from '../../styles';

const MovieCard = ({ movie }) => {
    // Calculate image dimensions based on SPACING constants
    const imageWidth = SPACING.cardPoster.width;
    const imageHeight = SPACING.cardPoster.height;

    return (
        <TouchableOpacity
            style={styles.container}
            activeOpacity={0.7}
        >
            <Image
                source={{ uri: `https://picsum.photos/${imageWidth}/${imageHeight}` }}
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
            </View>
        </TouchableOpacity>
    );
};

export default MovieCard;