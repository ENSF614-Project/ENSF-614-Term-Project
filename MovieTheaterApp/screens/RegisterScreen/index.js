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
import { useAuth } from '../../context/AuthContext';
const RegisterScreen = ({ navigation }) => {
    const [userValues, setUserValues] = useState({});
    const [userErrors, setUserErrors] = useState({});
    const [isUserFormValid, setIsUserFormValid] = useState(false);

    const [formValues, setFormValues] = useState({});
    const [formErrors, setFormErrors] = useState({});
    const [isFormValid, setIsFormValid] = useState(false);

    const [errorMessage, setErrorMessage] = useState(null);

    const { login } = useAuth();

    const handleRegister = async () => {
        // Ensure forms are valid
        if (!isUserFormValid) {
            setErrorMessage('Please fix the errors in the user details.');
            return;
        }
        if (!isFormValid) {
            setErrorMessage('Please check all card details are correct.');
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
    
        // Construct payment data
        const cardData = {
            cardHolderName: formValues.cardHolderName,
            cw: formValues.cvv,
            cardNumber: formValues.cardNumber,
            expiryMonth: parseInt(formValues.expiryDate.slice(0, 2), 10),
            expiryYear: parseInt(formValues.expiryDate.slice(3), 10),
            cardType: 'credit',
            billingAddress: formValues.billingAddress,
        };
    
        try {

            setErrorMessage(null);
            // Step 1: Register the user
            const registeredUser = await registerService.createRU(
                userData.name,
                userData.email,
                userData.username,
                userData.password,
                userData.address,
                userData.isRU
            );
            console.log('Registered user:', registeredUser);
    
            // Step 2: Save the payment information
            const payment = await paymentService.savePayment(
                cardData.cardHolderName,
                cardData.cw,
                cardData.cardNumber,
                cardData.expiryMonth,
                cardData.expiryYear,
                cardData.cardType,
                registeredUser,
                cardData.billingAddress
            );
            console.log('Payment information saved:', payment);
    
            // Step 3: Pay the annual fee
            const feePayment = await paymentService.payAnnualFee(registeredUser, 20);
            console.log('Annual fee payment successful:', feePayment);

            // Calculate the annual fee due date
            const annualFeeDueDate = new Date();
            annualFeeDueDate.setFullYear(annualFeeDueDate.getFullYear() + 1);

            const emailData = {
                templateParams: {
                    user_email: userData.email, // Ensure this is defined and valid
                    receipt: `Welcome to our platform! Your annual membership fee has been successfully paid.\n\nMembership Fee: $20.00\n\nMembership Valid Until: ${annualFeeDueDate.toLocaleDateString()}`,
                },
            };

            const emailResponse = await fetch('http://localhost:5000/send-email', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(emailData),
            });

            if (!emailResponse.ok) {
                console.error('Failed to send registration confirmation email');
            }

            // Notify success and navigate to login
            const isLoggedIn = await login(userData.username, userData.password);
            if (isLoggedIn) {
                // Navigate to the home screen
                navigation.navigate('Home');
            } else {
                setErrorMessage('Account created, but login failed. Please log in manually.');
            }
        } catch (error) {
            console.error('Error registering user or payment:', error);
            setErrorMessage('Failed to complete registration. Please try again.');
        }
    };

    const handleLogin = () => {
        navigation.navigate('Login');
    };

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <View style={styles.formContainer}>
                <Text style={styles.title}>Create an Account</Text>

                {errorMessage && (
                <View style={styles.errorContainer}>
                    <Text style={styles.errorText}>{errorMessage}</Text>
                </View>
            )}

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
