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
import RegisteredUserForm from '../../components/RegisteredUserForm';

const RegisterScreen = ({ navigation }) => {

    const [userValues, setUserValues] = useState({});
    const [userErrors, setUserErrors] = useState({});
    const [isUserFormValid, setIsUserFormValid] = useState(false);

    const [formValues, setFormValues] = useState({});
    const [formErrors, setFormErrors] = useState({});
    const [isFormValid, setIsFormValid] = useState(false);


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
                        includeBillingAddress={true} //Required for registering
                    />
                </View>

                <TouchableOpacity
                    style={[styles.registerButton, (!isUserFormValid || !isFormValid) && styles.registerButtonDisabled]}
                    onPress={handleRegister}
                    disabled={!isUserFormValid || !isFormValid}  // Disable button if any form is invalid
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
