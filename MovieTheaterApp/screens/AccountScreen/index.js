// screens/AccountScreen/index.js
import React, { useState } from 'react';
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    Alert,
    ScrollView
} from 'react-native';
import CreditCardForm from '../../components/CreditCardForm';
import RegisteredUserForm from '../../components/RegisteredUserForm';
import { styles } from './styles';
import { CreditCard, Trash2 } from 'lucide-react-native';
import { COLORS } from '../../styles';

const AccountScreen = ({ navigation }) => {
    const [userValues, setUserValues] = useState({});
    const [userErrors, setUserErrors] = useState({});
    const [isUserFormValid, setIsUserFormValid] = useState(false);

    const [formValues, setFormValues] = useState({});
    const [formErrors, setFormErrors] = useState({});
    const [isFormValid, setIsFormValid] = useState(false);
    const [selectedPaymentMethod, setSelectedPaymentMethod] = useState('new');

    // Mock data
    const [savedCards] = useState([
        { id: 1, last4: '4242', expiryDate: '12/25', cardHolderName: 'Test User' },
        { id: 2, last4: '1234', expiryDate: '10/25', cardHolderName: 'Test User' }
    ]);

    const handleRegister = () => {

        // Construct user data
        const userData = { Userinfo: userValues, paymentInfo: formValues };

        console.log('Registration data:', userData);

        //Right now takes you to login, but should take you to payment?

        if (!isUserFormValid) {
            alert('Please fix the errors in the user details');
            return;
        }
        if (!isFormValid) {
            console.log('Form is not valid:', formErrors);
            alert('Error', 'Please check all card details are correct');
            return;
        } else {
            console.log('Form is valid:', formValues);
            navigation.navigate('Login');

        }
    };

    const handleRemoveCard = (cardId) => {
        alert('Are you sure you want to remove this card?');
        // TODO: Add card removal logic here
    };

    //Ideally payment should be its own component and not defined here or in the payment screen. It should also have toggle buttons.
    return (
        <ScrollView contentContainerStyle={styles.container}>
            <View style={styles.formContainer}>
                <Text style={styles.title}>My Account</Text>

                <View style={styles.section}>
                    <RegisteredUserForm
                        onValuesChange={setUserValues}
                        onValidationChange={(isValid, errors) => {
                            setIsUserFormValid(isValid);
                            setUserErrors(errors);
                        }}
                        errors={userErrors}
                    />
                </View>

                <View style={styles.paymentSection}>
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
                                    <CreditCard size={24} color={COLORS.text.primary} />
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
                                        color={COLORS.text.secondary}
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
                                <CreditCard size={24} color={COLORS.text.primary} />
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
                            showSaveCard={false}
                        />
                    )}
                </View>
                {/* Buttons for navigation */}
                <View style={styles.navigationButtonsContainer}>
                    <TouchableOpacity
                        style={styles.navigationButton}
                        onPress={() => navigation.navigate('Ticket')}
                    >
                        <Text style={styles.navigationButtonText}>View/Cancel Tickets</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={styles.navigationButton}
                        onPress={() => navigation.navigate('Coupon')}
                    >
                        <Text style={styles.navigationButtonText}>View Coupons</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={styles.navigationButton}
                        onPress={() => navigation.navigate('News')}
                    >
                        <Text style={styles.navigationButtonText}>View News</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </ScrollView>
    );
};

export default AccountScreen;
