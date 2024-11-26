// screens/PaymentScreen/index.js
import React, { useState } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    ScrollView
} from 'react-native';
import { CreditCard, Trash2 } from 'lucide-react-native';
import CreditCardForm from '../../components/CreditCardForm';
import { styles } from './styles';

const PaymentScreen = ({ route, navigation }) => {
    const { total, selectedSeats, showtime, movie } = route.params;
    const [selectedPaymentMethod, setSelectedPaymentMethod] = useState('new');
    const [formValues, setFormValues] = useState({});
    const [formErrors, setFormErrors] = useState({});
    const [isFormValid, setIsFormValid] = useState(false);

    // Mock data
    const [savedCards] = useState([
        { id: 1, last4: '4242', expiryDate: '12/25', cardHolderName: 'Test User' },
        { id: 2, last4: '1234', expiryDate: '10/25', cardHolderName: 'Test User' }
    ]);

    const formatDate = (date) => {
        return date.toLocaleDateString('en-US', {
            weekday: 'long',
            month: 'long',
            day: 'numeric',
            year: 'numeric'
        });
    };

    const handlePayment = () => {
        if (selectedPaymentMethod === 'new' && !isFormValid) {
            alert('Please check all card details are correct');
            return;
        }

        alert('Your payment is being processed...');
        // Use short delay to simulate payment processing
        setTimeout(() => {
            const paymentInfo = selectedPaymentMethod === 'new'
                ? formValues
                : savedCards.find(card => card.id === selectedPaymentMethod);

            navigation.replace('TicketConfirmation', {
                tickets: selectedSeats,
                movie,
                showtime,
                total,
                paymentInfo
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
                        {selectedSeats.map(seat => `${seat.row}${seat.seat}`).join(', ')}
                    </Text>
                </View>
                <View style={styles.summaryRow}>
                    <Text style={styles.summaryLabel}>Total:</Text>
                    <Text style={styles.totalText}>${total.toFixed(2)}</Text>
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
                    Pay ${total.toFixed(2)}
                </Text>
            </TouchableOpacity>
        </ScrollView>
    );
};

export default PaymentScreen;