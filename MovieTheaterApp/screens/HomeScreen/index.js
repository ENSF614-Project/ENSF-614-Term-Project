// screens/HomeScreen/index.js
import React from 'react';
import { View, FlatList } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Header from '../../components/Header';
import MovieCard from '../../components/MovieCard';
import { styles } from './styles';
import { SPACING } from '../../styles';
import { movies } from '../../MockData';

const HomeScreen = () => {
    const navigation = useNavigation();

    // Used for debugging purposes
    const handleMoviePress = (movie) => {
        console.log('Movie pressed:', movie);
        navigation.navigate('MovieDetails', {
            movie: movie
        });
    };

    const getNumColumns = () => {
        const cardWidth = SPACING.cardPoster.width + (SPACING.xs * 2);
        return Math.floor(((window?.innerWidth || 400) - (SPACING.lg * 2)) / cardWidth);
    };

    const renderMovieCard = ({ item }) => (
        <MovieCard
            movie={item}
            onPress={() => handleMoviePress(item)}
        />
    );

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
