// screens/TicketConfirmationScreen/index.js
import React from 'react';
import {
    View,
    Text,
    ScrollView,
    TouchableOpacity
} from 'react-native';
import { Check } from 'lucide-react-native';
import { styles } from './styles';

const TicketConfirmationScreen = ({ route, navigation }) => {
    const { tickets, selectedSeats, movie, showtime, total, paymentInfo } = route.params;

    // Debug log to see what data we're receiving
    console.log('Confirmation Screen Data:', {
        tickets,
        selectedSeats,
        showtime,
        total,
        paymentInfo
    });

    const formatSeats = () => {
        // If we have selectedSeats from the previous screen, use those
        if (selectedSeats && selectedSeats.length > 0) {
            return selectedSeats.map(seat => `${seat.row}${seat.seatNum}`).join(', ');
        }

        // If we have tickets with seat information
        if (tickets && Array.isArray(tickets)) {
            return tickets.map(ticket => {
                return `Seat ${ticket.seatID}`;
            }).join(', ');
        }

        return 'No seat information available';
    };

    const formatDate = (dateString) => {
        if (!dateString) return 'Date not available';
        try {
            return new Date(dateString).toLocaleDateString('en-US', {
                weekday: 'long',
                month: 'long',
                day: 'numeric',
                year: 'numeric'
            });
        } catch (error) {
            console.error('Date formatting error:', error);
            return dateString;
        }
    };

    const handleDone = () => {
        // Navigate back to home screen, clearing the stack
        navigation.reset({
            index: 0,
            routes: [{ name: 'Home' }],
        });
    };

    return (
        <ScrollView style={styles.container}>
            <View style={styles.successContainer}>
                <View style={styles.checkCircle}>
                    <Check size={48} color={styles.checkCircle.iconColor} />
                </View>
                <Text style={styles.successTitle}>Payment Successful!</Text>
                <Text style={styles.successText}>Your tickets have been booked</Text>
            </View>

            <View style={styles.detailsContainer}>
                <Text style={styles.sectionTitle}>Booking Details</Text>

                <View style={styles.detailRow}>
                    <Text style={styles.label}>Movie:</Text>
                    <Text style={styles.value}>{movie?.title || 'N/A'}</Text>
                </View>

                <View style={styles.detailRow}>
                    <Text style={styles.label}>Date:</Text>
                    <Text style={styles.value}>{showtime?.date || 'N/A'}</Text>
                </View>

                <View style={styles.detailRow}>
                    <Text style={styles.label}>Time:</Text>
                    <Text style={styles.value}>{showtime?.time || 'N/A'}</Text>
                </View>

                <View style={styles.detailRow}>
                    <Text style={styles.label}>Theatre:</Text>
                    <Text style={styles.value}>{showtime?.theatre || 'N/A'}</Text>
                </View>

                <View style={styles.detailRow}>
                    <Text style={styles.label}>Seats:</Text>
                    <Text style={styles.value}>{formatSeats()}</Text>
                </View>

                <View style={styles.detailRow}>
                    <Text style={styles.label}>Total Paid:</Text>
                    <Text style={styles.total}>${total?.toFixed(2) || '0.00'}</Text>
                </View>

                <View style={styles.paymentInfoContainer}>
                    <Text style={styles.sectionTitle}>Payment Information</Text>
                    <Text style={styles.paymentText}>
                        Card ending in {paymentInfo?.last4 || 'XXXX'}
                    </Text>
                </View>
            </View>

            <TouchableOpacity style={styles.doneButton} onPress={handleDone}>
                <Text style={styles.doneButtonText}>Done</Text>
            </TouchableOpacity>
        </ScrollView>
    );
};

export default TicketConfirmationScreen;