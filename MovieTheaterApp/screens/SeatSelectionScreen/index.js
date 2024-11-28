// screens/SeatSelectionScreen/index.js
import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { styles } from './styles';

const SeatSelectionScreen = ({ route, navigation }) => {
    const { showtime, movie } = route.params;
    const [selectedSeats, setSelectedSeats] = useState([]);
    const [hoveredSeat, setHoveredSeat] = useState(null);

    // Generate a 10x10 seating layout
    const rows = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J'];
    const seatsPerRow = 10;

    const formatDate = (date) => {
        return date.toLocaleDateString('en-US', {
            weekday: 'long',
            month: 'long',
            day: 'numeric',
            year: 'numeric'
        });
    };

    const formatTime = (time) => {
        return time;  // may need to update method depending on how we get the time from the database
    };

    const isSeatOccupied = (row, seat) => {
        const seatKey = `${row}${seat}`;
        return showtime.occupiedSeats?.includes(seatKey);
    };

    const isSeatSelected = (row, seat) => {
        return selectedSeats.some(
            selected => selected.row === row && selected.seat === seat
        );
    };

    const getSeatStyle = (row, seat) => {
        const seatStyles = [styles.seat];
        const isHovered = hoveredSeat && hoveredSeat.row === row && hoveredSeat.seat === seat;

        if (isSeatOccupied(row, seat)) {
            seatStyles.push(styles.occupiedSeat);
        } else if (isSeatSelected(row, seat)) {
            seatStyles.push(styles.selectedSeat);
        } else if (isHovered) {
            seatStyles.push(styles.hoveredSeat);
        }

        return seatStyles;
    };

    const getSeatTextStyle = (row, seat) => {
        const textStyles = [styles.seatText];
        const isHovered = hoveredSeat && hoveredSeat.row === row && hoveredSeat.seat === seat;

        if (isSeatOccupied(row, seat)) {
            textStyles.push(styles.occupiedSeatText);
        } else if (isSeatSelected(row, seat)) {
            textStyles.push(styles.selectedSeatText);
        } else if (isHovered) {
            textStyles.push(styles.hoveredSeatText);
        }

        return textStyles;
    };

    const toggleSeat = (row, seat) => {
        if (isSeatOccupied(row, seat)) return;

        setSelectedSeats(prev => {
            const seatIndex = prev.findIndex(s => s.row === row && s.seat === seat);
            if (seatIndex >= 0) {
                return prev.filter((_, i) => i !== seatIndex);
            }
            return [...prev, { row, seat }];
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
            showtime,
            movie
        });
    };

    return (
        <ScrollView style={styles.container}>
            <View style={styles.movieInfo}>
                <Text style={styles.movieTitle}>{movie.title}</Text>
                <Text style={styles.showtimeInfo}>
                    {formatDate(showtime.date)} at {formatTime(showtime.time)}
                </Text>
                <Text style={styles.theatreInfo}>{showtime.theatre}</Text>
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
                                    onMouseEnter={() => setHoveredSeat({ row, seat: index + 1 })}
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
                        ? selectedSeats.map(seat => `${seat.row}${seat.seat}`).join(', ')
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