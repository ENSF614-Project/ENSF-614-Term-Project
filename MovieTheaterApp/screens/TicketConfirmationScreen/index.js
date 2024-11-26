import React from 'react';
import {
    View,
    Text,
    ScrollView,
    TouchableOpacity
} from 'react-native';
import { Check } from 'lucide-react-native';
import { COLORS, SPACING, TYPOGRAPHY } from '../../styles';
import { styles } from './styles';

const TicketConfirmationScreen = ({ route, navigation }) => {
    const { tickets, movie, showtime, total, paymentInfo } = route.params;

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
                    <Check size={48} color={COLORS.background} />
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
                    <Text style={styles.label}>Showtime:</Text>
                    <Text style={styles.value}>{showtime.time}</Text>
                </View>

                <View style={styles.detailRow}>
                    <Text style={styles.label}>Seats:</Text>
                    <Text style={styles.value}>
                        {tickets.map(seat => `${seat.row}${seat.seat}`).join(', ')}
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