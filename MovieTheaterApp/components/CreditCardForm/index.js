// components\CreditCardForm\index.js
import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
} from 'react-native';
import { CreditCard } from 'lucide-react-native';
import { COLORS } from '../../styles';
import { styles } from './styles';

const CreditCardForm = ({
    initialValues = {
        cardNumber: '',
        expiryDate: '',
        cvv: '',
        cardHolderName: '',
        billingAddress: ''
    },
    onValuesChange,
    onValidationChange,
    showSaveCard = false,
    saveCardInitialValue = false,
    containerStyle,
    errors = {},
    includeBillingAddress = true
}) => {
    const [cardNumber, setCardNumber] = useState(initialValues.cardNumber);
    const [expiryDate, setExpiryDate] = useState(initialValues.expiryDate);
    const [cvv, setCvv] = useState(initialValues.cvv);
    const [cardHolderName, setCardHolderName] = useState(initialValues.cardHolderName);
    const [billingAddress, setBillingAddress] = useState(initialValues.billingAddress);
    const [saveCard, setSaveCard] = useState(saveCardInitialValue);

    // Track which fields have been touched to set errors properly
    const [touched, setTouched] = useState({
        cardNumber: false,
        expiryDate: false,
        cvv: false,
        cardHolderName: false,
        billingAddress: false
    });

    // use to format card number with spaces
    const formatCardNumber = (text) => {
        const cleaned = text.replace(/\s/g, '');
        const groups = cleaned.match(/.{1,4}/g);
        return groups ? groups.join(' ') : cleaned;
    };

    // use to format expiry date with '/'
    const formatExpiryDate = (text) => {
        const cleaned = text.replace(/\D/g, '');
        if (cleaned.length >= 2) {
            return `${cleaned.slice(0, 2)}/${cleaned.slice(2)}`;
        }
        return cleaned;
    };

    const handleBlur = (field) => {
        setTouched(prev => ({
            ...prev,
            [field]: true
        }));
    };

    const validateFields = () => {
        const newErrors = {};

        if (!cardNumber || cardNumber.replace(/\s/g, '').length !== 16 || !/^\d+$/.test(cardNumber.replace(/\s/g, ''))) {
            newErrors.cardNumber = 'Card number must be 16 digits and contain only numbers';
        }

        if (!expiryDate || !/^(0[1-9]|1[0-2])\/\d{2}$/.test(expiryDate)) {
            newErrors.expiryDate = 'Invalid expiry date (month should be between 01 and 12)';
        } else {
            const [month, year] = expiryDate.split('/');
            const now = new Date();
            const cardMonth = parseInt(month);
            const cardYear = 2000 + parseInt(year); // Convert to full year (e.g., '24' -> '2024')
            // Check if the card has expired
            const cardDate = new Date(cardYear, cardMonth - 1); // Set the expiry date to the last day of the month
            // Adjust to the end of the expiry month
            cardDate.setMonth(cardDate.getMonth() + 1);
            cardDate.setDate(0); // Get the last day of the expiry month
            if (cardDate < now) {
                newErrors.expiryDate = 'Card has expired';
            }
        }

        if (!cvv || !/^\d{3,4}$/.test(cvv)) {
            newErrors.cvv = 'CVV must be 3 or 4 digits';
        }


        if (!cardHolderName.trim()) {
            newErrors.cardHolderName = 'Cardholder name is required';
        } else if (!/^[a-zA-Z'][a-zA-Z' ]*[a-zA-Z']$/.test(cardHolderName.trim())) {
            newErrors.cardHolderName = 'Cardholder name can only contain letters, spaces, and apostrophes, must not start or end with a space, and must contain at least one letter.';
        }

        if (includeBillingAddress && (!billingAddress || !billingAddress.trim())) {
            newErrors.billingAddress = 'Billing address is required';
        }

        // Filter errors to only show for touched fields
        const touchedErrors = {};
        Object.keys(newErrors).forEach(key => {
            if (touched[key]) {
                touchedErrors[key] = newErrors[key];
            }
        });

        return { allErrors: newErrors, touchedErrors };
    };

    // Update parent component when values change
    useEffect(() => {
        const formValues = {
            cardNumber,
            expiryDate,
            cvv,
            cardHolderName,
            billingAddress,
            saveCard
        };
        onValuesChange?.(formValues);

        const { allErrors, touchedErrors } = validateFields();
        const isValid = Object.keys(allErrors).length === 0;
        onValidationChange?.(isValid, touchedErrors);
    }, [cardNumber, expiryDate, cvv, cardHolderName, billingAddress, saveCard, touched]);

    const renderError = (field) => {
        if (touched[field] && errors[field]) {
            return <Text style={styles.errorText}>{errors[field]}</Text>;
        }
        return null;
    };

    return (
        <View style={[styles.container, containerStyle]}>
            <View style={styles.cardIconContainer}>
                <CreditCard size={24} color={COLORS.text.primary} />
                <Text style={styles.cardIconText}>Credit Card Details</Text>
            </View>

            <TextInput
                style={[styles.input, touched.cardNumber && errors.cardNumber && styles.inputError]}
                placeholder="Card Number"
                value={cardNumber}
                onChangeText={(text) => setCardNumber(formatCardNumber(text))}
                onBlur={() => handleBlur('cardNumber')}
                keyboardType="numeric"
                maxLength={19}
            />
            {renderError('cardNumber')}

            <View style={styles.row}>
                <View style={styles.halfInputContainer}>
                    <TextInput
                        style={[styles.input, touched.expiryDate && errors.expiryDate && styles.inputError]}
                        placeholder="MM/YY"
                        value={expiryDate}
                        onChangeText={(text) => setExpiryDate(formatExpiryDate(text))}
                        onBlur={() => handleBlur('expiryDate')}
                        keyboardType="numeric"
                        maxLength={5}
                    />
                    {renderError('expiryDate')}
                </View>

                <View style={styles.halfInputContainer}>
                    <TextInput
                        style={[styles.input, touched.cvv && errors.cvv && styles.inputError]}
                        placeholder="CVV"
                        value={cvv}
                        onChangeText={(text) => setCvv(text.replace(/\D/g, ''))}
                        onBlur={() => handleBlur('cvv')}
                        keyboardType="numeric"
                        maxLength={4}
                        secureTextEntry
                    />
                    {renderError('cvv')}
                </View>
            </View>

            <TextInput
                style={[styles.input, touched.cardHolderName && errors.cardHolderName && styles.inputError]}
                placeholder="Cardholder Name"
                value={cardHolderName}
                onChangeText={setCardHolderName}
                onBlur={() => handleBlur('cardHolderName')}
                autoCapitalize="words"
            />
            {renderError('cardHolderName')}

            {includeBillingAddress && (
                <>
                    <TextInput
                        style={[styles.input, touched.billingAddress && errors.billingAddress && styles.inputError]}
                        placeholder="Billing Address"
                        value={billingAddress}
                        onChangeText={setBillingAddress}
                        onBlur={() => handleBlur('billingAddress')}
                        multiline
                    />
                    {renderError('billingAddress')}
                </>
            )}

            {showSaveCard && (
                <TouchableOpacity
                    style={styles.saveCardContainer}
                    onPress={() => setSaveCard(!saveCard)}
                >
                    <View style={[styles.checkbox, saveCard && styles.checkboxChecked]} />
                    <Text style={styles.saveCardText}>Save card for future purchases</Text>
                </TouchableOpacity>
            )}
        </View>
    );
};



export default CreditCardForm;