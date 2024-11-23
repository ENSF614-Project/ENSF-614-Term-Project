import React, { useState, useCallback, useMemo } from 'react';
import { View, FlatList, TextInput, TouchableOpacity, Text, useWindowDimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Search, X } from 'lucide-react-native';
import MovieCard from '../../components/MovieCard';
import { styles } from './styles';
import { SPACING, COLORS } from '../../styles';
import { movies } from '../../MockData';

const HomeScreen = () => {
    const navigation = useNavigation();
    const [searchQuery, setSearchQuery] = useState('');
    const { width } = useWindowDimensions();

    // Filter movies based on search query
    const filteredMovies = useMemo(() => {
        if (!searchQuery.trim()) {
            return movies;
        }

        const searchTerms = searchQuery.toLowerCase().trim().split(' ');

        return movies.filter(movie => {
            const title = movie.title.toLowerCase();
            const genre = movie.genre.toLowerCase();

            // Check if all search terms are found in either title or genre
            return searchTerms.every(term =>
                title.includes(term) || genre.includes(term)
            );
        });
    }, [searchQuery]);

    const handleMoviePress = (movie) => {
        navigation.navigate('MovieDetails', {
            movie: movie
        });
    };

    const handleClearSearch = () => {
        setSearchQuery('');
    };

    const handleSearch = (text) => {
        setSearchQuery(text);
    };

    const getNumColumns = useCallback(() => {
        const availableWidth = width - (SPACING.lg * 2);
        const cardWidth = SPACING.cardPoster.width;
        const possibleColumns = Math.floor(availableWidth / cardWidth);
        return Math.max(1, possibleColumns); // Need to have at least 1 column, otherwise FlatList will throw an error
    }, [width]);

    const renderMovieCard = ({ item }) => (
        <View style={styles.cardWrapper}>
            <MovieCard
                movie={item}
                onPress={() => handleMoviePress(item)}
            />
        </View>
    );

    const numColumns = getNumColumns();

    // Calculate the spacing dynamically based on current width
    const calculateSpacing = () => {
        const availableWidth = width - (SPACING.lg * 2);
        const totalCardWidth = SPACING.cardPoster.width * numColumns;
        const remainingSpace = availableWidth - totalCardWidth;
        const spaceBetweenCards = remainingSpace / (numColumns - 1);
        return {
            gap: Math.max(SPACING.md, spaceBetweenCards)
        };
    };

    // Get content container style with dynamic spacing
    const getContentContainerStyle = () => ({
        padding: SPACING.lg,
        alignItems: numColumns === 1 ? 'center' : undefined,
        flexGrow: 1, // Ensures the container takes up all available space
    });

    // This is only needed when there are multiple columns
    const getColumnWrapperStyle = () => {
        if (numColumns === 1) return undefined;
        return {
            justifyContent: 'space-between',
            ...calculateSpacing()
        };
    };

    const renderEmptyResult = () => (
        <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>No movies found matching "{searchQuery}"</Text>
            <TouchableOpacity
                style={styles.clearSearchButton}
                onPress={handleClearSearch}
            >
                <Text style={styles.clearSearchButtonText}>Clear Search</Text>
            </TouchableOpacity>
        </View>
    );

    const renderSearchCount = () => {
        if (!searchQuery.trim()) return null;

        return (
            <View style={styles.searchResultsContainer}>
                <Text style={styles.searchResultsText}>
                    Found {filteredMovies.length} {filteredMovies.length === 1 ? 'movie' : 'movies'}
                </Text>
            </View>
        );
    };

    return (
        <View style={styles.container}>
            <View style={styles.searchContainer}>
                <View style={styles.searchInputContainer}>
                    <TextInput
                        style={styles.searchInput}
                        placeholder="Search movies by title or genre..."
                        value={searchQuery}
                        onChangeText={handleSearch}
                        placeholderTextColor={COLORS.placeholder}
                        returnKeyType="search"
                    />
                    {searchQuery.length > 0 && (
                        <TouchableOpacity
                            style={styles.clearButton}
                            onPress={handleClearSearch}
                        >
                            <X size={20} color={COLORS.text.secondary} />
                        </TouchableOpacity>
                    )}
                </View>
                <TouchableOpacity style={styles.searchButton}>
                    <Search size={24} color={COLORS.text.primary} />
                </TouchableOpacity>
            </View>

            {renderSearchCount()}

            <FlatList
                data={filteredMovies}
                renderItem={renderMovieCard}
                keyExtractor={(item) => item.movieId.toString()}
                numColumns={numColumns}
                contentContainerStyle={getContentContainerStyle()}
                columnWrapperStyle={getColumnWrapperStyle()}
                key={numColumns}
                ListEmptyComponent={renderEmptyResult}
            />
        </View>
    );
};

export default HomeScreen;