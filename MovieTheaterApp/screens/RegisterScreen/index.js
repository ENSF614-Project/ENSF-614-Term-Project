// screens/RegisterScreen/index.js
import React, { useState } from 'react';
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    ScrollView
} from 'react-native';
import { styles } from './styles';
import CreditCardForm from '../../components/CreditCardForm';

const RegisterScreen = ({ navigation }) => {
    const [username, setUsername] = useState(''); //remove if not using username (taken from login page)
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [name, setName] = useState('');
    const [address, setAddress] = useState(''); //Can maybe change out to multiple fields, depends how we are storing address in DB

    const [formValues, setFormValues] = useState({});
    const [formErrors, setFormErrors] = useState({});
    const [isFormValid, setIsFormValid] = useState(false);


    const handleRegister = () => {
        //TODO: Add logic for registration

        //Needs to ensure all fields are filled and shows which aren't

        //Needs to check if passwords are the same

        //Needs to check if email is valid and filled

        //Needs to check if address is valid

        /*console.log('Registration attempted:', {
            username,
            email,
            password,
            name,
            address,
            billingAddress,
            cardDetails: { cardNumber, expiryDate, cvv },
        });
        
        navigation.navigate('Login');*/
        // Construct user data
        const userData = {
            username,
            email,
            password,
            name,
            address,
            paymentInfo: formValues
        };

        console.log('Registration data:', userData);

        //Right now takes you to login, but should take you to payment?
        if (!isFormValid) {
            console.log('Form is not valid:', formErrors);
            alert('Error', 'Please check all card details are correct');
            return;
        } else {
            console.log('Form is valid:', formValues);
            navigation.navigate('Login');

        }
    };

    const handleLogin = () => {
        navigation.navigate('Login');
    };

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <View style={styles.formContainer}>
                <Text style={styles.title}>Create an Account</Text>

                <TextInput
                    style={styles.input}
                    placeholder="Name"
                    value={name}
                    onChangeText={setName}
                    autoCapitalize="words"
                />

                <TextInput
                    style={styles.input}
                    placeholder="Username"
                    value={username}
                    onChangeText={setUsername}
                    autoCapitalize="none"
                />

                <TextInput
                    style={styles.input}
                    placeholder="Email"
                    value={email}
                    onChangeText={setEmail}
                    autoCapitalize="none"
                    keyboardType="email-address"
                />

                <TextInput
                    style={styles.input}
                    placeholder="Address"
                    value={address}
                    onChangeText={setAddress}
                    autoCapitalize="words"
                />

                <TextInput
                    style={styles.input}
                    placeholder="Password"
                    value={password}
                    onChangeText={setPassword}
                    secureTextEntry
                />

                <TextInput
                    style={styles.input}
                    placeholder="Confirm Password"
                    value={confirmPassword}
                    onChangeText={setConfirmPassword}
                    secureTextEntry
                />

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
                        includeBillingAddress={false}
                    />
                </View>

                <TouchableOpacity
                    style={styles.registerButton}
                    onPress={handleRegister}
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
