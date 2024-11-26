// screens\HomeScreen\index.js
import React, { useState, useCallback, useMemo } from 'react';
import { View, FlatList, TextInput, TouchableOpacity, Text, useWindowDimensions, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Search, X } from 'lucide-react-native';
import MovieCard from '../../components/MovieCard';
import { styles } from './styles';
import { SPACING } from '../../styles';
import { movies } from '../../MockData';

const HomeScreen = () => {
    const navigation = useNavigation();
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedGenres, setSelectedGenres] = useState([]);
    const { width } = useWindowDimensions();

    // Extract unique genres from movies
    const allGenres = useMemo(() => {
        const genreSet = new Set();
        movies.forEach(movie => {
            movie.genre.split('/').forEach(genre => {
                genreSet.add(genre.trim());
            });
        });
        return Array.from(genreSet).sort();
    }, []);

    // Filter movies based on search query and selected genres
    const filteredMovies = useMemo(() => {
        let filtered = movies;

        // Apply search filter
        if (searchQuery.trim()) {
            const searchTerms = searchQuery.toLowerCase().trim().split(' ');
            filtered = filtered.filter(movie => {
                const title = movie.title.toLowerCase();
                const genre = movie.genre.toLowerCase();
                // Check if all search terms are found in either title or genre
                return searchTerms.every(term =>
                    title.includes(term) || genre.includes(term)
                );
            });
        }

        // Apply genre filter
        if (selectedGenres.length > 0) {
            filtered = filtered.filter(movie => {
                const movieGenres = movie.genre.split('/').map(g => g.trim());
                return selectedGenres.some(genre => movieGenres.includes(genre));
            });
        }

        return filtered;
    }, [searchQuery, selectedGenres]);

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

    const handleGenrePress = (genre) => {
        setSelectedGenres(prevGenres => {
            if (prevGenres.includes(genre)) {
                return prevGenres.filter(g => g !== genre);
            }
            return [...prevGenres, genre];
        });
    };

    const handleClearFilters = () => {
        setSelectedGenres([]);
        setSearchQuery('');
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

    const renderGenreChip = (genre) => (
        <TouchableOpacity
            key={genre}
            style={[
                styles.genreChip,
                selectedGenres.includes(genre) && styles.genreChipSelected
            ]}
            onPress={() => handleGenrePress(genre)}
        >
            <Text
                style={[
                    styles.genreChipText,
                    selectedGenres.includes(genre) && styles.genreChipTextSelected
                ]}
            >
                {genre}
            </Text>
        </TouchableOpacity>
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
            <Text style={styles.emptyText}>
                No movies found {searchQuery ? `matching "${searchQuery}"` : ''}
                {selectedGenres.length > 0 ?
                    `\nwith selected genres: ${selectedGenres.join(', ')}` :
                    ''
                }
            </Text>
            <TouchableOpacity
                style={styles.clearSearchButton}
                onPress={handleClearFilters}
            >
                <Text style={styles.clearSearchButtonText}>Clear All Filters And Search</Text>
            </TouchableOpacity>
        </View>
    );

    const renderSearchCount = () => {
        if (!searchQuery.trim() && selectedGenres.length === 0) return null;

        return (
            <View style={styles.searchResultsContainer}>
                <Text style={styles.searchResultsText}>
                    Found {filteredMovies.length} {filteredMovies.length === 1 ? 'movie' : 'movies'}
                </Text>
            </View>
        );
    };

    const renderGenreFilters = () => (
        <View style={styles.genreFilterContainer}>
            <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.genreScrollContainer}
            >
                {allGenres.map(renderGenreChip)}
            </ScrollView>
            {(selectedGenres.length > 0 || searchQuery) && (
                <TouchableOpacity
                    style={styles.clearFiltersButton}
                    onPress={handleClearFilters}
                >
                    <X size={16} color={styles.clearFiltersButton.color} />
                </TouchableOpacity>
            )}
        </View>
    );

    return (
        <View style={styles.container}>
            <View style={styles.searchContainer}>
                <View style={styles.searchInputContainer}>
                    <TextInput
                        style={styles.searchInput}
                        placeholder="Search movies by title or genre..."
                        value={searchQuery}
                        onChangeText={handleSearch}
                        placeholderTextColor={styles.searchInput.placeholderTextColor}
                        returnKeyType="search"
                    />
                    {searchQuery.length > 0 && (
                        <TouchableOpacity
                            style={styles.clearButton}
                            onPress={handleClearSearch}
                        >
                            <X size={20} color={styles.clearButton.color} />
                        </TouchableOpacity>
                    )}
                </View>
                <TouchableOpacity style={styles.searchButton}>
                    <Search size={24} color={styles.searchButton.color} />
                </TouchableOpacity>
            </View>

            {renderGenreFilters()}
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