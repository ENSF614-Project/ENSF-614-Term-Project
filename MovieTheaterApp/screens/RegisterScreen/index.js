// screens/RegisterScreen/index.js
import React, { useState } from 'react';
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    ScrollView,
    Alert,
} from 'react-native';
import { styles } from './styles';
import CreditCardForm from '../../components/CreditCardForm';
import RegisteredUserForm from '../../components/RegisteredUserForm';
import { registerService } from '../../services/registerService';
import { paymentService } from '../../services/paymentService';
const RegisterScreen = ({ navigation }) => {
    const [userValues, setUserValues] = useState({});
    const [userErrors, setUserErrors] = useState({});
    const [isUserFormValid, setIsUserFormValid] = useState(false);

    const [formValues, setFormValues] = useState({});
    const [formErrors, setFormErrors] = useState({});
    const [isFormValid, setIsFormValid] = useState(false);

    const handleRegister = async () => {
        // Ensure forms are valid
        if (!isUserFormValid) {
            Alert.alert('Error', 'Please fix the errors in the user details');
            return;
        }
        if (!isFormValid) {
            Alert.alert('Error', 'Please check all card details are correct');
            return;
        }

        // Construct user data
        const userData = {
            name: userValues.name,
            email: userValues.email,
            username: userValues.username,
            password: userValues.password,
            address: userValues.address,
            isRU: true,
        };

        // Construct user data
        const cardData = {
            cardHolderName: formValues.cardHolderName,
            cw: formValues.cvv,
            cardNumber: formValues.cardNumber,
            expiryMonth: formValues.expiryDate.slice(0, 2), //check this well year really
            expiryYear: formValues.expiryDate.slice(2),
            cardType: 'credit',
            billingAddress: formValues.billingAddress 

        };

        try {
            // Call the API
            const registeredUser = await registerService.createRU(
                userData.name,
                userData.email,
                userData.username,
                userData.password,
                userData.address,
                userData.isRU
            );

            console.log('Registered user:', registeredUser);

            const payment = await paymentService.savePayment(
                cardData.cardHolderName,
                cardData.cw,
                cardData.cardNumber,
                cardData.expiryMonth,
                cardData.expiryYear,
                cardData.cardType,
                // {userId: registeredUser.userId}, // Pass the registered user object here
                registeredUser,
                cardData.billingAddress
            );

            console.log('Payment successful:', payment);

            // Navigate to payment or login
            Alert.alert(
                'Success',
                'Account created successfully! You can now log in.',
                [{ text: 'OK', onPress: () => navigation.navigate('Login') }]
            );
        } catch (error) {
            console.error('Error registering user or payment:', error);
            Alert.alert('Error', 'Failed to compelete registration. Please try again.');
        }
    };

    const handleLogin = () => {
        navigation.navigate('Login');
    };

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <View style={styles.formContainer}>
                <Text style={styles.title}>Create an Account</Text>

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

                <View style={styles.section}>
                    <View style={styles.membershipContainer}>
                        <Text style={styles.membershipTitle}>Annual Membership Fee</Text>
                        <Text style={styles.membershipAmount}>$20.00</Text>
                    </View>
                    <Text style={styles.membershipInfo}>
                        Your membership includes early access to movie tickets and no cancellation fees.
                    </Text>
                </View>

                <View style={styles.section}>
                    <CreditCardForm
                        onValuesChange={setFormValues}
                        onValidationChange={(isValid, errors) => {
                            setIsFormValid(isValid);
                            setFormErrors(errors);
                        }}
                        errors={formErrors}
                        includeBillingAddress={true} // Required for registering
                    />
                </View>

                <TouchableOpacity
                    style={[styles.registerButton, (!isUserFormValid || !isFormValid) && styles.registerButtonDisabled]}
                    onPress={handleRegister}
                    disabled={!isUserFormValid || !isFormValid} // Disable button if any form is invalid
                >
                    <Text style={styles.registerButtonText}>Register & Pay $20.00</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={styles.loginButton}
                    onPress={handleLogin}
                >
                    <Text style={styles.loginButtonText}>Already have an account? Login</Text>
                </TouchableOpacity>
            </View>
        </ScrollView>
    );
};

export default RegisterScreen;
