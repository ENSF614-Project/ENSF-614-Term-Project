// screens/RegisterScreen/index.js
import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView } from 'react-native';
import { styles } from './styles';

const RegisterScreen = ({ navigation }) => {
    const [username, setUsername] = useState(''); //remove if not using username (taken from login page)
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [name, setName] = useState('');
    const [address, setAddress] = useState(''); //Can maybe change out to multiple fields, depends how we are storing address in DB
    const [billingAddress, setBillingAddress] = useState(''); //same as above
    const [cardNumber, setCardNumber] = useState('');
    const [expiryDate, setExpiryDate] = useState('');
    const [cvv, setCvv] = useState('');

    const handleRegister = () => {
        //TODO: Add logic for registration

        //Needs to ensure all fields are filled and shows which aren't

        //Needs to check if passwords are the same

        //Needs to check if email is valid and filled

        //Needs to check if address is valid

        //Needs to check valid card number

        //Needs to check card isn't expired

        //Needs to ensure CVV is valid

        //Needs to ensure billing address is valid

        console.log('Registration attempted:', {
            username,
            email,
            password,
            name,
            address,
            billingAddress,
            cardDetails: { cardNumber, expiryDate, cvv },
        });

        
        //Right now takes you to login, but should take you to payment?
        navigation.navigate('Login');
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

                <Text style={styles.sectionTitle}>Payment Information</Text>

                <TextInput
                    style={styles.input}
                    placeholder="Card Number"
                    value={cardNumber}
                    onChangeText={setCardNumber}
                    keyboardType="numeric"
                />

                <View style={styles.cardDetailsContainer}>
                    <TextInput
                        style={[styles.input, styles.cardExpiryInput]}
                        placeholder="MM/YY"
                        value={expiryDate}
                        onChangeText={setExpiryDate}
                        keyboardType="numeric"
                    />

                    <TextInput
                        style={[styles.input, styles.cardCvvInput]}
                        placeholder="CVV"
                        value={cvv}
                        onChangeText={setCvv}
                        keyboardType="numeric"
                        secureTextEntry
                    />
                </View>

                <TextInput
                    style={styles.input}
                    placeholder="Billing Address"
                    value={billingAddress}
                    onChangeText={setBillingAddress}
                    autoCapitalize="words"
                />

                <TouchableOpacity
                    style={styles.registerButton}
                    onPress={handleRegister}
                >
                    <Text style={styles.registerButtonText}>Register</Text>
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
