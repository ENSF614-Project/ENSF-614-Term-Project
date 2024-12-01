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
    const { tickets, movie, showtime, total, paymentInfo } = route.params;

    const formatDate = (date) => {
        return new Date(date).toLocaleDateString('en-US', {
            weekday: 'long',
            month: 'long',
            day: 'numeric',
            year: 'numeric'
        });
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
                    <Text style={styles.value}>{movie.title}</Text>
                </View>

                <View style={styles.detailRow}>
                    <Text style={styles.label}>Date:</Text>
                    <Text style={styles.value}>{formatDate(showtime.date)}</Text>
                </View>

                <View style={styles.detailRow}>
                    <Text style={styles.label}>Time:</Text>
                    <Text style={styles.value}>{showtime.time}</Text>
                </View>

                <View style={styles.detailRow}>
                    <Text style={styles.label}>Theatre:</Text>
                    <Text style={styles.value}>{showtime.theatre}</Text>
                </View>

                <View style={styles.detailRow}>
                    <Text style={styles.label}>Seats:</Text>
                    <Text style={styles.value}>
                        {tickets.map(seat => `${seat.row}${seat.seatNum}`).join(', ')}
                    </Text>
                </View>

                <View style={styles.detailRow}>
                    <Text style={styles.label}>Total Paid:</Text>
                    <Text style={styles.total}>${total.toFixed(2)}</Text>
                </View>

                <View style={styles.paymentInfoContainer}>
                    <Text style={styles.sectionTitle}>Payment Information</Text>
                    <Text style={styles.paymentText}>
                        {paymentInfo.last4
                            ? `Card ending in ${paymentInfo.last4}`
                            : `Card ending in ${paymentInfo.cardNumber.slice(-4)}`
                        }
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