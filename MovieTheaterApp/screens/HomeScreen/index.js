// screens/HomeScreen/index.js
import React, { useState, useCallback } from 'react';
import { View, FlatList, TextInput, TouchableOpacity, useWindowDimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Search } from 'lucide-react-native';
import MovieCard from '../../components/MovieCard';
import { styles } from './styles';
import { SPACING, COLORS } from '../../styles';
import { movies } from '../../MockData';

const HomeScreen = () => {
    const navigation = useNavigation();
    const [searchQuery, setSearchQuery] = useState('');
    const { width } = useWindowDimensions();

    const handleMoviePress = (movie) => {
        console.log('Movie pressed:', movie);
        navigation.navigate('MovieDetails', {
            movie: movie
        });
    };

    const getNumColumns = useCallback(() => {
        const cardWidth = SPACING.cardPoster.width + (SPACING.xs * 2);
        const columns = Math.floor((width - (SPACING.lg * 2)) / cardWidth);
        return Math.max(1, columns); // Need to have at least 1 column, otherwise FlatList will throw an error
    }, [width]);

    const renderMovieCard = ({ item }) => (
        <MovieCard
            movie={item}
            onPress={() => handleMoviePress(item)}
        />
    );

    const numColumns = getNumColumns();

    // Dynamically calculate styles based on number of columns
    const getContentContainerStyle = () => {
        return {
            padding: SPACING.lg,
            // For single column, center the items
            alignItems: numColumns === 1 ? 'center' : undefined
        };
    };

    // Only use columnWrapperStyle when there are multiple columns
    const getColumnWrapperStyle = () => {
        if (numColumns === 1) return undefined;
        return {
            justifyContent: 'flex-start',
            gap: SPACING.md,
        };
    };

    return (
        <View style={styles.container}>
            <View style={styles.searchContainer}>
                <TextInput
                    style={styles.searchInput}
                    placeholder="Search movies..."
                    value={searchQuery}
                    onChangeText={setSearchQuery}
                    placeholderTextColor={COLORS.placeholder}
                />
                <TouchableOpacity style={styles.searchButton}>
                    <Search size={24} color={COLORS.text.primary} />
                </TouchableOpacity>
            </View>
            <FlatList
                data={movies}
                renderItem={renderMovieCard}
                keyExtractor={(item) => item.movieId.toString()}
                numColumns={numColumns}
                contentContainerStyle={getContentContainerStyle()}
                columnWrapperStyle={getColumnWrapperStyle()}
                key={numColumns}
            />
        </View>
    );
};

export default HomeScreen;