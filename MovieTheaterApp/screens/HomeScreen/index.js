// screens/HomeScreen/index.js
import React, { useState } from 'react';
import { View, FlatList, TextInput, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Search } from 'lucide-react-native';
import MovieCard from '../../components/MovieCard';
import { styles } from './styles';
import { SPACING, COLORS } from '../../styles';
import { movies } from '../../MockData';

const HomeScreen = () => {
    const navigation = useNavigation();
    const [searchQuery, setSearchQuery] = useState('');

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
            <View style={styles.searchContainer}>
                <TextInput
                    style={styles.searchInput}
                    placeholder="Search movies..."
                    value={searchQuery}
                    onChangeText={setSearchQuery}
                    placeholderTextColor={styles.searchInput.placeholderTextColor}
                />
                <TouchableOpacity style={styles.searchButton}>
                    <Search size={24} color={COLORS.text.primary} />
                </TouchableOpacity>
            </View>
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