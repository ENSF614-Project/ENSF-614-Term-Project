// screens/PaymentScreen/index.js
import React, { useState } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    ScrollView,
    TextInput
} from 'react-native';
import { CreditCard, Trash2, Ticket } from 'lucide-react-native';
import CreditCardForm from '../../components/CreditCardForm';
import { styles } from './styles';
import { useAuth } from '../../context/AuthContext';

const PaymentScreen = ({ route, navigation }) => {
    const { total, selectedSeats, showtime, movie } = route.params;
    const { user } = useAuth();
    const [selectedPaymentMethod, setSelectedPaymentMethod] = useState('new');
    const [formValues, setFormValues] = useState({});
    const [formErrors, setFormErrors] = useState({});
    const [isFormValid, setIsFormValid] = useState(false);
    const [couponCode, setCouponCode] = useState('');
    const [selectedCoupon, setSelectedCoupon] = useState(null);
    const [couponError, setCouponError] = useState('');

    // Mock data
    //TODO: replace with an API call
    const [savedCards] = useState([
        { id: 1, last4: '4242', expiryDate: '12/25', cardHolderName: 'Test User' },
        { id: 2, last4: '1234', expiryDate: '10/25', cardHolderName: 'Test User' }
    ]);

    // Mock user coupons data
    //TODO: replace with an API call
    const [userCoupons] = useState([
        { id: 1, code: 'USER123', value: 10.00, expiryDate: '2024-12-31' },
        { id: 2, code: 'USER456', value: 15.00, expiryDate: '2024-12-31' }
    ]);

    const formatDate = (date) => {
        return new Date(date).toLocaleDateString('en-US', {
            weekday: 'long',
            month: 'long',
            day: 'numeric',
            year: 'numeric'
        });
    };

    const handleCouponSubmit = () => {
        // Reset previous errors
        setCouponError('');
        setSelectedCoupon(null);

        if (!couponCode.trim()) {
            setCouponError('Please enter a coupon code');
            return;
        }

        //TODO: replace with an API call
        const foundCoupon = userCoupons.find(c => c.code === couponCode);
        if (foundCoupon) {
            setSelectedCoupon(foundCoupon);
            setCouponCode('');
        } else {
            setCouponError('Invalid coupon code');
        }
    };

    const handleCouponSelect = (coupon) => {
        setSelectedCoupon(coupon);
        setCouponCode('');
        setCouponError('');
    };

    const handleRemoveCoupon = () => {
        setSelectedCoupon(null);
    };

    const calculateFinalTotal = () => {
        if (!selectedCoupon) return total;
        const discountedTotal = total - selectedCoupon.value;
        return Math.max(0, discountedTotal);
    };

    const handlePayment = () => {
        if (selectedPaymentMethod === 'new' && !isFormValid) {
            alert('Please check all card details are correct');
            return;
        }

        const finalTotal = calculateFinalTotal();
        alert(`Processing payment of $${finalTotal.toFixed(2)}...`);

        //TODO: replace with an API call
        setTimeout(() => {
            const paymentInfo = selectedPaymentMethod === 'new'
                ? formValues
                : savedCards.find(card => card.id === selectedPaymentMethod);

            navigation.replace('TicketConfirmation', {
                tickets: selectedSeats,
                movie,
                showtime,
                total: finalTotal,
                paymentInfo,
                appliedCoupon: selectedCoupon
            });
        }, 1000);
    };

    const handleRemoveCard = (cardId) => {
        alert('Are you sure you want to remove this card?');
        // TODO: Add card removal logic here
    };

    return (
        <ScrollView style={styles.container}>
            <View style={styles.summaryContainer}>
                <Text style={styles.sectionTitle}>Order Summary</Text>
                <View style={styles.summaryRow}>
                    <Text style={styles.summaryLabel}>Movie:</Text>
                    <Text style={styles.summaryText}>{movie.title}</Text>
                </View>
                <View style={styles.summaryRow}>
                    <Text style={styles.summaryLabel}>Date:</Text>
                    <Text style={styles.summaryText}>{formatDate(showtime.date)}</Text>
                </View>
                <View style={styles.summaryRow}>
                    <Text style={styles.summaryLabel}>Time:</Text>
                    <Text style={styles.summaryText}>{showtime.time}</Text>
                </View>
                <View style={styles.summaryRow}>
                    <Text style={styles.summaryLabel}>Theatre:</Text>
                    <Text style={styles.summaryText}>{showtime.theatre}</Text>
                </View>
                <View style={styles.summaryRow}>
                    <Text style={styles.summaryLabel}>Seats:</Text>
                    <Text style={styles.summaryText}>
                        {selectedSeats.map(seat => `${seat.row}${seat.seatNum}`).join(', ')}
                    </Text>
                </View>
            </View>

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
                    >
                        <Text style={styles.couponButtonText}>Apply</Text>
                    </TouchableOpacity>
                </View>
                {couponError ? (
                    <Text style={styles.errorText}>{couponError}</Text>
                ) : null}

                {user && userCoupons.length > 0 && !selectedCoupon && (
                    <View style={styles.userCouponsContainer}>
                        <Text style={styles.subsectionTitle}>Your Coupons</Text>
                        {userCoupons.map((coupon) => (
                            <TouchableOpacity
                                key={coupon.id}
                                style={styles.userCoupon}
                                onPress={() => handleCouponSelect(coupon)}
                            >
                                <View style={styles.couponInfo}>
                                    <Ticket size={20} color={styles.couponIcon.color} />
                                    <View>
                                        <Text style={styles.couponCode}>{coupon.code}</Text>
                                        <Text style={styles.couponValue}>
                                            Value: ${coupon.value.toFixed(2)}
                                        </Text>
                                    </View>
                                </View>
                                <Text style={styles.couponExpiry}>
                                    Expires: {coupon.expiryDate}
                                </Text>
                            </TouchableOpacity>
                        ))}
                    </View>
                )}

                {selectedCoupon && (
                    <View style={styles.appliedCouponContainer}>
                        <View style={styles.appliedCouponInfo}>
                            <Text style={styles.appliedCouponText}>
                                Applied Coupon: {selectedCoupon.code}
                            </Text>
                            <Text style={styles.discountText}>
                                -${selectedCoupon.value.toFixed(2)}
                            </Text>
                        </View>
                        <TouchableOpacity
                            style={styles.removeCouponButton}
                            onPress={handleRemoveCoupon}
                        >
                            <Text style={styles.removeCouponText}>Remove</Text>
                        </TouchableOpacity>
                    </View>
                )}

                <View style={styles.totalContainer}>
                    <Text style={styles.totalLabel}>Subtotal:</Text>
                    <Text style={styles.totalAmount}>${total.toFixed(2)}</Text>
                </View>
                {selectedCoupon && (
                    <View style={styles.totalContainer}>
                        <Text style={styles.totalLabel}>Discount:</Text>
                        <Text style={styles.discountAmount}>
                            -${selectedCoupon.value.toFixed(2)}
                        </Text>
                    </View>
                )}
                <View style={styles.totalContainer}>
                    <Text style={styles.finalTotalLabel}>Final Total:</Text>
                    <Text style={styles.finalTotalAmount}>
                        ${calculateFinalTotal().toFixed(2)}
                    </Text>
                </View>
            </View>
            <View style={styles.paymentMethodContainer}>
                <Text style={styles.sectionTitle}>Payment Method</Text>
                {savedCards.map(card => (
                    <TouchableOpacity
                        key={card.id}
                        style={[
                            styles.savedCard,
                            selectedPaymentMethod === card.id && styles.selectedCard
                        ]}
                        onPress={() => setSelectedPaymentMethod(card.id)}
                    >
                        <View style={styles.savedCardInfo}>
                            <CreditCard size={24} color={styles.savedCardInfo.cardColor} />
                            <Text style={styles.savedCardText}>
                                **** {card.last4} | {card.expiryDate}
                            </Text>
                        </View>
                        <TouchableOpacity
                            onPress={(e) => {
                                e.stopPropagation();
                                handleRemoveCard(card.id);
                            }}
                        >
                            <Trash2
                                size={20}
                                color={styles.trashIcon.color}
                            />
                        </TouchableOpacity>
                    </TouchableOpacity>
                ))}
                <TouchableOpacity
                    style={[
                        styles.savedCard,
                        selectedPaymentMethod === 'new' && styles.selectedCard
                    ]}
                    onPress={() => setSelectedPaymentMethod('new')}
                >
                    <View style={styles.savedCardInfo}>
                        <CreditCard size={24} color={styles.savedCardInfo.cardColor} />
                        <Text style={styles.savedCardText}>Add New Card</Text>
                    </View>
                </TouchableOpacity>
            </View>
            {selectedPaymentMethod === 'new' && (
                <CreditCardForm
                    onValuesChange={setFormValues}
                    onValidationChange={(isValid, errors) => {
                        setIsFormValid(isValid);
                        setFormErrors(errors);
                    }}
                    errors={formErrors}
                    showSaveCard={true}
                />
            )}
            <TouchableOpacity
                style={[
                    styles.payButton,
                    (!isFormValid && selectedPaymentMethod === 'new') && styles.payButtonDisabled
                ]}
                onPress={handlePayment}
            >
                <Text style={styles.payButtonText}>
                    Pay ${calculateFinalTotal().toFixed(2)}
                </Text>
            </TouchableOpacity>
        </ScrollView>
    );
};

export default PaymentScreen;