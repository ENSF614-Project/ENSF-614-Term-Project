// screens/PaymentScreen/index.js
import React, { useState, useEffect } from 'react';
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
import { couponService } from '../../services/couponService';

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
    //const [appliedCoupon, setAppliedCoupon] = useState(null);
    const [userCoupons, setUserCoupons] = useState([]);
    const [selectedCoupon, setSelectedCoupon] = useState(null);
    const [originalTotal] = useState(total);
    const [discountedTotal, setDiscountedTotal] = useState(total);
    const [selectedCouponOriginalValue, setSelectedCouponOriginalValue] = useState(null);

    // Fetch user's coupons when component mounts
    useEffect(() => {
        const fetchUserCoupons = async () => {
            if (user?.email) {
                try {
                    setLoading(true);
                    const coupons = await couponService.getCouponsByEmail(user.email);
                    // Filter out non-active coupons
                    const activeCoupons = coupons.filter(coupon =>
                        coupon.status === 'ACTIVE' &&
                        new Date(coupon.expiryDate) > new Date()
                    );
                    setUserCoupons(activeCoupons);
                } catch (error) {
                    console.error('Error fetching user coupons:', error);
                    Alert.alert(
                        'Error',
                        'Failed to load your coupons. Please try again later.'
                    );
                } finally {
                    setLoading(false);
                }
            }
        };

        fetchUserCoupons();
    }, [user]);

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

    const handleCouponSelect = async (coupon) => {
        try {
            if (!coupon || typeof coupon.value !== 'number') {
                throw new Error('Invalid coupon data');
            }

            if (selectedCoupon?.couponID === coupon.couponID) {
                // Deselect the coupon if it's already selected
                setSelectedCoupon(null);
                setSelectedCouponOriginalValue(null);
                setDiscountedTotal(originalTotal);
                //setAppliedCoupon(null);
                return;
            }

            // Store the original coupon value before applying it
            const originalCouponValue = coupon.value;
            setSelectedCouponOriginalValue(originalCouponValue);

            // Apply the coupon
            const updatedCoupon = await couponService.applyCoupon(
                coupon.couponID,
                coupon.value
            );

            if (!updatedCoupon) {
                throw new Error('Failed to update coupon');
            }

            // Calculate new total using the original coupon value
            const newTotal = Math.max(0, originalTotal - originalCouponValue);

            //setAppliedCoupon(updatedCoupon);
            setSelectedCoupon({
                ...updatedCoupon,
                displayValue: originalCouponValue // Add displayValue property
            });
            setDiscountedTotal(newTotal);
            Alert.alert('Success', 'Coupon applied successfully!');

        } catch (error) {
            console.error('Error applying coupon:', error);
            Alert.alert('Error', 'Failed to apply coupon');
        }
    };

    const handleCouponSubmit = async () => {
        if (!couponCode.trim()) {
            Alert.alert('Error', 'Please enter a coupon code');
            return;
        }

        setLoading(true);
        try {
            const coupon = await couponService.getCouponById(couponCode);
            if (coupon) {
                const newTotal = Math.max(0, originalTotal - coupon.value);
                //setAppliedCoupon(coupon);
                setSelectedCoupon(coupon);
                setDiscountedTotal(newTotal);
                Alert.alert('Success', 'Coupon applied successfully!');
            } else {
                Alert.alert('Error', 'Invalid coupon code');
            }
        } catch (error) {
            Alert.alert('Error', 'Failed to apply coupon');
            console.error('Error applying coupon:', error);
        } finally {
            setLoading(false);
            setCouponCode('');
        }
    };

    const handlePayment = async () => {
        // Skip card validation for registered users
        if (!user && !isCardFormValid) {
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
                couponId: selectedCoupon?.couponID,
                finalTotal: discountedTotal,
            });
    
            console.log('Showtime data:', showtime);
    
            const formattedShowtime = {
                date: showtime.startTime
                    ? new Date(showtime.startTime).toLocaleDateString()
                    : showtime.date,
                time: showtime.startTime
                    ? new Date(showtime.startTime).toLocaleTimeString()
                    : showtime.time,
                theatre: typeof showtime.theatre === 'object'
                    ? showtime.theatre.theatreName
                    : (showtime.theatre || showtime.theatreName || 'Theater information unavailable'),
            };
    
            // Format the data for the email
            const emailData = {
                templateParams: {
                    user_email: user?.email || email,
                    receipt: `Thank you for your purchase!\n\nTotal Paid: $${discountedTotal.toFixed(2)}\n\nPayment Info: ${
                        user ? 'Registered user (no card details provided)' : `**** **** **** ${cardFormValues.cardNumber.slice(-4)}`
                    }`,
                    ticket_details: `Tickets:\n${selectedSeats
                        .map((seat) => `Row: ${seat.row}, Seat: ${seat.seatNum}`)
                        .join('\n')}`,
                    movie_info: `Movie: ${movie.title}\nDate: ${
                        showtime.startTime
                            ? new Date(showtime.startTime).toLocaleDateString()
                            : showtime.date
                    }\nTime: ${
                        showtime.startTime
                            ? new Date(showtime.startTime).toLocaleTimeString()
                            : showtime.time
                    }`,
                },
            };
    
            // Send email
            const emailResponse = await fetch('http://localhost:5000/send-email', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(emailData),
            });
    
            if (!emailResponse.ok) {
                console.error('Failed to send confirmation email');
                // Don't throw error here - we still want to complete the transaction
            }
    
            // Navigate to confirmation screen
            navigation.replace('TicketConfirmation', {
                tickets: result.tickets,
                selectedSeats,
                movie,
                showtime: formattedShowtime,
                total: discountedTotal,
                paymentInfo: user
                    ? { registeredUser: true }
                    : {
                          ...cardFormValues,
                          last4: cardFormValues.cardNumber.slice(-4),
                      },
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

                {user && userCoupons?.length > 0 && (
                    <View style={styles.userCouponsContainer}>
                        <Text style={styles.subsectionTitle}>Your Available Coupons</Text>
                        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                            {userCoupons.map((coupon) => (
                                <TouchableOpacity
                                    key={coupon.couponID}
                                    style={[
                                        styles.userCoupon,
                                        selectedCoupon?.couponID === coupon.couponID && styles.selectedCoupon
                                    ]}
                                    onPress={() => handleCouponSelect(coupon)}
                                >
                                    <View style={styles.couponInfo}>
                                        <Ticket size={20} color={styles.couponIcon.color} />
                                        <View>
                                            <Text style={styles.couponCode}>Coupon #{coupon.couponID}</Text>
                                            <Text style={styles.couponValue}>
                                                Value: ${coupon.value.toFixed(2)}
                                            </Text>
                                            <Text style={styles.couponExpiry}>
                                                Expires: {new Date(coupon.expiryDate).toLocaleDateString()}
                                            </Text>
                                        </View>
                                    </View>
                                </TouchableOpacity>
                            ))}
                        </ScrollView>
                    </View>
                )}

                {selectedCoupon && (
                    <View style={styles.discountSummary}>
                        <View style={styles.summaryRow}>
                            <Text style={styles.summaryLabel}>Original Total:</Text>
                            <Text style={styles.summaryValue}>${originalTotal.toFixed(2)}</Text>
                        </View>
                        <View style={styles.summaryRow}>
                            <Text style={styles.summaryLabel}>Coupon Discount:</Text>
                            <Text style={styles.discountValue}>
                                -${selectedCouponOriginalValue.toFixed(2)}
                            </Text>
                        </View>
                        <View style={styles.summaryRow}>
                            <Text style={styles.finalTotalLabel}>Final Total:</Text>
                            <Text style={styles.finalTotalAmount}>
                                ${discountedTotal.toFixed(2)}
                            </Text>
                        </View>
                    </View>
                )}
            </View>

            {/* Payment Section */}
            {!user && (
                <View style={styles.paymentSection}>
                    <Text style={styles.sectionTitle}>Payment Details</Text>
                    <CreditCardForm
                        onValuesChange={setCardFormValues}
                        onValidationChange={(isValid, errors) => {
                            setIsCardFormValid(isValid);
                            setCardFormErrors(errors);
                        }}
                        errors={cardFormErrors}
                        showSaveCard={false}
                    />
                </View>
            )}

            {/* Payment Button */}
            <TouchableOpacity
                style={[
                    styles.payButton,
                    ((!user && !isCardFormValid) || loading) && styles.payButtonDisabled
                ]}
                onPress={handlePayment}
                disabled={(!user && !isCardFormValid) || loading}
            >
                {loading ? (
                    <ActivityIndicator color={styles.spinner.color} />
                ) : (
                    <Text style={styles.payButtonText}>
                        Pay ${discountedTotal.toFixed(2)}
                    </Text>
                )}
            </TouchableOpacity>
        </ScrollView>
    );
};


export default PaymentScreen;