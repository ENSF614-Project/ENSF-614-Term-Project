// components/MovieCard/index.js
import React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import { styles } from './styles';
import { SPACING } from '../../styles';

const MovieCard = ({ movie, onPress }) => {
    // Used for debugging purposes
    const handlePress = () => {
        console.log('Card pressed');
        onPress && onPress();
    };

    return (
        <TouchableOpacity
            style={styles.container}
            activeOpacity={0.7}
            onPress={handlePress}
        >
            <Image
                source={{
                    uri: `https://picsum.photos/${SPACING.cardPoster.width}/${SPACING.cardPoster.height}`
                }}
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