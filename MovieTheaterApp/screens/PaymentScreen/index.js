// screens/PaymentScreen/index.js
import React, { useState } from 'react';
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    ScrollView,
    ActivityIndicator,
    Alert
} from 'react-native';
import { Ticket } from 'lucide-react-native';
import CreditCardForm from '../../components/CreditCardForm';
import { styles } from './styles';
import { useAuth } from '../../context/AuthContext';
import { paymentFlowService } from '../../services/paymentFlowService';

const PaymentScreen = ({ route, navigation }) => {
    const { total, selectedSeats, showtime, movie } = route.params;
    const { user } = useAuth();

const sendEmail = async (paymentInfo, tickets, total, userEmail, movieDetails) => {
    try {
        const ticketDetails = tickets.map(ticket => `Row: ${ticket.row}, Seat: ${ticket.seatNum}`).join('\n');
        const receipt = `Thank you for your purchase!\n\nTotal Paid: $${total.toFixed(2)}\n\nPayment Info: **** **** **** ${paymentInfo.last4}`;
        const movieInfo = `Movie: ${movieDetails.title}\nDate: ${movieDetails.date}\nTime: ${movieDetails.time}`;

        const response = await fetch('http://localhost:5000/send-email', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                templateParams: {
                    user_email: userEmail,
                    receipt: receipt,
                    ticket_details: `Tickets:\n${ticketDetails}`,
                    movie_info: movieInfo
                },
            }),
        });

        if (response.ok) {
            console.log('Email sent successfully:', await response.text());
        } else {
            console.error('Failed to send email:', await response.text());
        }
    } catch (error) {
        console.error('Error while sending email:', error);
    }
};

    // State management
    const [loading, setLoading] = useState(false);
    const [email, setEmail] = useState('');
    const [emailError, setEmailError] = useState('');
    const [cardFormValues, setCardFormValues] = useState({});
    const [cardFormErrors, setCardFormErrors] = useState({});
    const [isCardFormValid, setIsCardFormValid] = useState(false);
    const [couponCode, setCouponCode] = useState('');
    const [appliedCoupon, setAppliedCoupon] = useState(null);

    const validateEmail = () => {
        if (!user && !email) {
            setEmailError('Email is required for guest checkout');
            return false;
        }
        if (!user && !/^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[\w-]{2,4}$/.test(email)) {
            setEmailError('Please enter a valid email');
            return false;
        }
        setEmailError('');
        return true;
    };

    const handleCouponSubmit = async () => {
        if (!couponCode.trim()) {
            Alert.alert('Error', 'Please enter a coupon code');
            return;
        }

        setLoading(true);
        try {
            const response = await fetch(`http://localhost:8080/api/coupons/${couponCode}`);
            const couponData = await response.json();

            if (couponData && couponData.status === 'ACTIVE') {
                setAppliedCoupon(couponData);
                Alert.alert('Success', 'Coupon applied successfully!');
            } else {
                Alert.alert('Error', 'Invalid or expired coupon');
            }
        } catch (error) {
            Alert.alert('Error', 'Failed to apply coupon');
        } finally {
            setLoading(false);
        }
    };

    const calculateFinalTotal = () => {
        if (!appliedCoupon) return total;
        const discountedTotal = total - appliedCoupon.value;
        return Math.max(0, discountedTotal);
    };

    const handlePayment = async () => {
        if (!isCardFormValid) {
            Alert.alert('Error', 'Please check all card details are correct');
            return;
        }

        if (!validateEmail()) {
            return;
        }

        setLoading(true);
        try {
            const result = await paymentFlowService.purchaseTickets({
                email: user?.email || email,
                userId: user?.userId,
                showtimeId: showtime.showtimeId,
                selectedSeats,
                pricePerSeat: showtime.price,
                couponId: appliedCoupon?.couponId
            });

            // Log the showtime object to see its structure
            console.log('Showtime object:', showtime);

        // Call backend to send email after successful payment
await sendEmail(
    {
        ...cardFormValues,
        last4: cardFormValues.cardNumber.slice(-4)
    },
    selectedSeats.map(seat => ({
        row: seat.row,
        seatNum: seat.seatNum
    })),
    calculateFinalTotal(),
    user?.email || email,
    {
        title: movie.title,
        date: showtime.startTime
            ? new Date(showtime.startTime).toLocaleDateString()
            : showtime.date,
        time: showtime.startTime
            ? new Date(showtime.startTime).toLocaleTimeString()
            : showtime.time
    }
);



            // Create a formatted showtime object for the confirmation screen
            const formattedShowtime = {
                date: showtime.startTime ? new Date(showtime.startTime).toLocaleDateString() : showtime.date,
                time: showtime.startTime ? new Date(showtime.startTime).toLocaleTimeString() : showtime.time,
                // Handle different possible theater data structures
                theatre: typeof showtime.theatre === 'object'
                    ? showtime.theatre.theatreName
                    : (showtime.theatre || showtime.theatreName || 'Theater information unavailable')
            };

            navigation.replace('TicketConfirmation', {
                tickets: result.tickets,
                selectedSeats,
                movie,
                showtime: formattedShowtime,
                total: calculateFinalTotal(),
                paymentInfo: {
                    ...cardFormValues,
                    last4: cardFormValues.cardNumber.slice(-4)
                }
            });
        } catch (error) {
            console.error('Payment error:', error);
            Alert.alert('Error', 'Payment failed: ' + error.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <ScrollView style={styles.container}>
            {/* Order Summary Section */}
            <View style={styles.summaryContainer}>
                <Text style={styles.sectionTitle}>Order Summary</Text>
                <View style={styles.summaryRow}>
                    <Text style={styles.summaryLabel}>Movie:</Text>
                    <Text style={styles.summaryText}>{movie.title}</Text>
                </View>
                <View style={styles.summaryRow}>
                    <Text style={styles.summaryLabel}>Date:</Text>
                    <Text style={styles.summaryText}>{showtime.date}</Text>
                </View>
                <View style={styles.summaryRow}>
                    <Text style={styles.summaryLabel}>Time:</Text>
                    <Text style={styles.summaryText}>{showtime.time}</Text>
                </View>
                <View style={styles.summaryRow}>
                    <Text style={styles.summaryLabel}>Seats:</Text>
                    <Text style={styles.summaryText}>
                        {selectedSeats.map(seat => `${seat.row}${seat.seatNum}`).join(', ')}
                    </Text>
                </View>
            </View>

            {/* Guest Email Section */}
            {!user && (
                <View style={styles.emailContainer}>
                    <Text style={styles.sectionTitle}>Guest Checkout</Text>
                    <TextInput
                        style={[styles.input, emailError && styles.inputError]}
                        placeholder="Email Address"
                        value={email}
                        onChangeText={(text) => {
                            setEmail(text);
                            setEmailError('');
                        }}
                        keyboardType="email-address"
                        autoCapitalize="none"
                    />
                    {emailError ? <Text style={styles.errorText}>{emailError}</Text> : null}
                </View>
            )}

            {/* Coupon Section */}
            <View style={styles.couponContainer}>
                <Text style={styles.sectionTitle}>Apply Coupon</Text>
                <View style={styles.couponInputContainer}>
                    <TextInput
                        style={styles.couponInput}
                        placeholder="Enter coupon code"
                        value={couponCode}
                        onChangeText={setCouponCode}
                    />
                    <TouchableOpacity
                        style={styles.couponButton}
                        onPress={handleCouponSubmit}
                        disabled={loading}
                    >
                        <Text style={styles.couponButtonText}>Apply</Text>
                    </TouchableOpacity>
                </View>

                {appliedCoupon && (
                    <View style={styles.appliedCouponContainer}>
                        <View style={styles.appliedCouponInfo}>
                            <Ticket size={20} color={styles.couponIcon.color} />
                            <Text style={styles.appliedCouponText}>
                                Applied: ${appliedCoupon.value.toFixed(2)} discount
                            </Text>
                        </View>
                    </View>
                )}

                <View style={styles.totalContainer}>
                    <Text style={styles.finalTotalLabel}>Total:</Text>
                    <Text style={styles.finalTotalAmount}>
                        ${calculateFinalTotal().toFixed(2)}
                    </Text>
                </View>
            </View>

            {/* Payment Section */}
            <View style={styles.paymentSection}>
                <Text style={styles.sectionTitle}>Payment Details</Text>
                <CreditCardForm
                    onValuesChange={setCardFormValues}
                    onValidationChange={(isValid, errors) => {
                        setIsCardFormValid(isValid);
                        setCardFormErrors(errors);
                    }}
                    errors={cardFormErrors}
                    showSaveCard={!!user}
                />
            </View>

            {/* Payment Button */}
            <TouchableOpacity
                style={[styles.payButton, (!isCardFormValid || loading) && styles.payButtonDisabled]}
                onPress={handlePayment}
                disabled={!isCardFormValid || loading}
            >
                {loading ? (
                    <ActivityIndicator color={styles.spinner.color} />
                ) : (
                    <Text style={styles.payButtonText}>
                        Pay ${calculateFinalTotal().toFixed(2)}
                    </Text>
                )}
            </TouchableOpacity>
        </ScrollView>
    );
};

export default PaymentScreen;