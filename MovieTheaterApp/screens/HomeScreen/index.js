// screens/HomeScreen/index.js
import React from 'react';
import { View, FlatList } from 'react-native';
import Header from '../../components/Header';
import MovieCard from '../../components/MovieCard';
import { styles } from './styles';
import { SPACING } from '../../styles';

const HomeScreen = () => {
    const movies = [
        {
            movieId: 1,
            title: 'Avengers: Endgame',
            genre: 'Action/Sci-Fi',
            duration: 180,
            rating: 8.5,
        },
        {
            movieId: 2,
            title: 'Inception',
            genre: 'Sci-Fi/Thriller',
            duration: 148,
            rating: 8.8,
        },
        {
            movieId: 3,
            title: 'The Dark Knight',
            genre: 'Action/Drama',
            duration: 152,
            rating: 9.0,
        },
        {
            movieId: 4,
            title: 'Pulp Fiction',
            genre: 'Crime/Drama',
            duration: 154,
            rating: 8.9,
        }
    ];

    const renderMovieCard = ({ item }) => (
        <MovieCard movie={item} />
    );

    const getNumColumns = () => {
        const cardWidth = SPACING.cardPoster.width + (SPACING.xs * 2); // card width + margins
        return Math.floor(((window?.innerWidth || 400) - (SPACING.lg * 2)) / cardWidth);
    };

    return (
        <View style={styles.container}>
            <Header />
            <FlatList
                data={movies}
                renderItem={renderMovieCard}
                keyExtractor={(item) => item.movieId.toString()}
                numColumns={getNumColumns()}
                contentContainerStyle={styles.movieList}
                columnWrapperStyle={styles.columnWrapper}
            />
        </View>
    );
};

export default HomeScreen;