// screens/SeatSelectionScreen/index.js
import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, ScrollView, ActivityIndicator } from 'react-native';
import { styles } from './styles';
import { seatService } from '../../services/seatService';
import { toLocalTime, toLocalDate } from '../../utils/dateUtils';

const SeatSelectionScreen = ({ route, navigation }) => {
    const { showtime } = route.params;
    const [seats, setSeats] = useState([]);
    const [hoveredSeat, setHoveredSeat] = useState(null);

    const [selectedSeats, setSelectedSeats] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Generate a 10x10 seating layout
    const rows = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J'];
    const seatsPerRow = 10;

    useEffect(() => {
        fetchSeats();
    }, [showtime.showtimeId]);

    const fetchSeats = async () => {
        try {
            setLoading(true);
            setError(null);
            const seatData = await seatService.getSeatsByShowtime(showtime.showtimeId);
            setSeats(seatData);
        } catch (err) {
            setError('Failed to load seats. Please try again later.');
            console.error('Error fetching seats:', err);
        } finally {
            setLoading(false);
        }
    };

    const isSeatOccupied = (row, seatNum) => {
        return seats.some(seat =>
            seat.seatRow === row &&
            seat.seatNum === seatNum &&
            !seat.isAvailable
        );
    };

    const isSeatSelected = (row, seatNum) => {
        return selectedSeats.some(
            seat => seat.row === row && seat.seatNum === seatNum
        );
    };

    const getSeatStyle = (row, seatNum) => {
        const seatStyles = [styles.seat];
        const isHovered = hoveredSeat && hoveredSeat.row === row && hoveredSeat.seatNum === seatNum;

        if (isSeatOccupied(row, seatNum)) {
            seatStyles.push(styles.occupiedSeat);
        } else if (isSeatSelected(row, seatNum)) {
            seatStyles.push(styles.selectedSeat);
        } else if (isHovered) {
            seatStyles.push(styles.hoveredSeat);
        }
        return seatStyles;
    };

    const getSeatTextStyle = (row, seatNum) => {
        const textStyles = [styles.seatText];
        const isHovered = hoveredSeat && hoveredSeat.row === row && hoveredSeat.seatNum === seatNum;

        if (isSeatOccupied(row, seatNum)) {
            textStyles.push(styles.occupiedSeatText);
        } else if (isSeatSelected(row, seatNum)) {
            textStyles.push(styles.selectedSeatText);
        } else if (isHovered) {
            textStyles.push(styles.hoveredSeatText);
        }

        return textStyles;
    };

    const toggleSeat = (row, seatNum) => {
        if (isSeatOccupied(row, seatNum)) return;

        const seatData = seats.find(s => s.seatRow === row && s.seatNum === seatNum);
        if (!seatData) return;

        setSelectedSeats(prev => {
            const seatIndex = prev.findIndex(s => s.row === row && s.seatNum === seatNum);
            if (seatIndex >= 0) {
                return prev.filter((_, i) => i !== seatIndex);
            }
            return [...prev, { row, seatNum, seatId: seatData.seatId }];
        });
    };

    const handleConfirm = () => {
        if (selectedSeats.length === 0) {
            alert('Please select at least one seat');
            return;
        }

        navigation.navigate('Payment', {
            selectedSeats,
            total: selectedSeats.length * showtime.price,
            showtime: {
                ...showtime,
                date: toLocalDate(showtime.startTime),
                time: toLocalTime(showtime.startTime),
                theatre: showtime.theatre.theatreName
            },
            movie: showtime.movie,
            purchaseData: {
                showtimeId: showtime.showtimeId,
                seatIds: selectedSeats.map(seat => seat.seatId),
                price: showtime.price,
            }
        });
    };

    const formatShowtimeInfo = () => {
        try {
            return {
                date: toLocalDate(showtime.startTime),
                time: toLocalTime(showtime.startTime)
            };
        } catch (err) {
            console.error('Error formatting showtime:', err);
            return {
                date: 'Date unavailable',
                time: 'Time unavailable'
            };
        }
    };

    if (loading) {
        return (
            <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color={styles.loadingSpinner.color} />
            </View>
        );
    }

    if (error) {
        return (
            <View style={styles.errorContainer}>
                <Text style={styles.errorText}>{error}</Text>
                <TouchableOpacity
                    style={styles.retryButton}
                    onPress={fetchSeats}
                >
                    <Text style={styles.retryButtonText}>Retry</Text>
                </TouchableOpacity>
            </View>
        );
    }

    const { date, time } = formatShowtimeInfo();

    return (
        <ScrollView style={styles.container}>
            <View style={styles.movieInfo}>
                <Text style={styles.movieTitle}>{showtime.movie.title}</Text>
                <Text style={styles.showtimeInfo}>
                    {date} at {time}
                </Text>
                <Text style={styles.theatreInfo}>
                    {showtime.theatre.theatreName}
                </Text>
            </View>

            <View style={styles.screen}>
                <Text style={styles.screenText}>SCREEN</Text>
            </View>

            <View style={styles.seatingContainer}>
                {rows.map(row => (
                    <View key={row} style={styles.row}>
                        <Text style={styles.rowLabel}>{row}</Text>
                        <View style={styles.seatRow}>
                            {[...Array(seatsPerRow)].map((_, index) => (
                                <TouchableOpacity
                                    key={`${row}${index + 1}`}
                                    style={getSeatStyle(row, index + 1)}
                                    onPress={() => toggleSeat(row, index + 1)}
                                    disabled={isSeatOccupied(row, index + 1)}
                                    onMouseEnter={() => setHoveredSeat({ row, seatNum: index + 1 })}
                                    onMouseLeave={() => setHoveredSeat(null)}
                                >
                                    <Text style={getSeatTextStyle(row, index + 1)}>
                                        {index + 1}
                                    </Text>
                                </TouchableOpacity>
                            ))}
                        </View>
                    </View>
                ))}
            </View>

            <View style={styles.legend}>
                <View style={styles.legendItem}>
                    <View style={[styles.legendSeat, styles.availableSeat]} />
                    <Text style={styles.legendText}>Available</Text>
                </View>
                <View style={styles.legendItem}>
                    <View style={[styles.legendSeat, styles.occupiedSeat]} />
                    <Text style={styles.legendText}>Occupied</Text>
                </View>
                <View style={styles.legendItem}>
                    <View style={[styles.legendSeat, styles.selectedSeat]} />
                    <Text style={styles.legendText}>Selected</Text>
                </View>
            </View>


            <View style={styles.summary}>
                <Text style={styles.summaryTitle}>Selected Seats:</Text>
                <Text style={styles.summaryText}>
                    {selectedSeats.length > 0
                        ? selectedSeats.map(seat => `${seat.row}${seat.seatNum}`).join(', ')
                        : 'None'}
                </Text>
                <Text style={styles.summaryTotal}>
                    Total: ${(selectedSeats.length * showtime.price).toFixed(2)}
                </Text>
            </View>

            <TouchableOpacity
                style={[styles.confirmButton, selectedSeats.length === 0 && styles.confirmButtonDisabled]}
                onPress={handleConfirm}
                disabled={selectedSeats.length === 0}
            >
                <Text style={styles.confirmButtonText}>
                    Confirm Selection ({selectedSeats.length} seats)
                </Text>
            </TouchableOpacity>
        </ScrollView>
    );
};

export default SeatSelectionScreen;