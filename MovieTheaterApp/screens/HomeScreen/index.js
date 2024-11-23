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
    });

    // This is only needed when there are multiple columns
    const getColumnWrapperStyle = () => {
        if (numColumns === 1) return undefined;
        return {
            justifyContent: 'space-between',
            ...calculateSpacing()
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