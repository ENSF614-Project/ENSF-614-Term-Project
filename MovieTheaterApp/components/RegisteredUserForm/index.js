// components/RegisteredUserForm/index.js
import React, { useState, useEffect } from 'react';
import { View, Text, TextInput } from 'react-native';
import { User } from 'lucide-react-native'; // Importing user icon
import { styles } from './styles';
import { COLORS } from '../../styles';

const RegisteredUserForm = ({
    initialValues = {
        name: '',
        email: '',
        username: '',
        password: '',
        confirmPassword: '',
        address: '',
    },
    onValuesChange,
    onValidationChange,
    containerStyle,
    errors = {},
}) => {
    const [name, setName] = useState(initialValues.name);
    const [email, setEmail] = useState(initialValues.email);
    const [username, setUsername] = useState(initialValues.username);
    const [password, setPassword] = useState(initialValues.password);
    const [confirmPassword, setConfirmPassword] = useState(initialValues.confirmPassword);
    const [address, setAddress] = useState(initialValues.address);

    const [touched, setTouched] = useState({
        name: false,
        email: false,
        username: false,
        password: false,
        confirmPassword: false,
        address: false,
    });

    const handleBlur = (field) => {
        setTouched((prev) => ({
            ...prev,
            [field]: true,
        }));
    };

    const validateFields = () => {
        const newErrors = {};

        if (!name.trim()) {
            newErrors.name = 'Name is required';
        } else if (!/^[a-zA-Z'][a-zA-Z' ]*[a-zA-Z']$/.test(name.trim())) {
            newErrors.name = 'Name can only contain letters, spaces, and apostrophes, must not start or end with a space, and must contain at least one letter.';
        }

        if (!email.trim() || !/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email)) {
            newErrors.email = 'Valid email is required';
        }

        if (!username.trim()) {
            newErrors.username = 'Username is required';
        } else if (username.length < 3 || username.length > 15) {
            newErrors.username = 'Username must be 3-15 characters long';
        } else if (!/^[a-zA-Z0-9._-]+$/.test(username)) {
            newErrors.username = 'Username can only contain letters, numbers, dots, underscores, and hyphens';
        }

        if (!password) {
            newErrors.password = 'Password is required';
        } else if (password.length < 8) {
            newErrors.password = 'Password must be at least 8 characters';
        }

        if (password !== confirmPassword) {
            newErrors.confirmPassword = 'Passwords do not match';
        }

        if (!address.trim()) {
            newErrors.address = 'Address is required';
        }

        const touchedErrors = {};
        Object.keys(newErrors).forEach((key) => {
            if (touched[key]) {
                touchedErrors[key] = newErrors[key];
            }
        });

        return { allErrors: newErrors, touchedErrors };
    };

    useEffect(() => {
        const formValues = { name, email, username, password, confirmPassword, address };
        onValuesChange?.(formValues);

        const { allErrors, touchedErrors } = validateFields();
        const isValid = Object.keys(allErrors).length === 0;
        onValidationChange?.(isValid, touchedErrors);
    }, [name, email, username, password, confirmPassword, address, touched]);

    const renderError = (field) => {
        if (touched[field] && errors[field]) {
            return <Text style={styles.errorText}>{errors[field]}</Text>;
        }
        return null;
    };

    return (
        <View style={[styles.container, containerStyle]}>
            <View style={styles.userIconContainer}>
                <User size={24} color={COLORS.text.primary} /> 
                <Text style={styles.userIconText}>User Details</Text>
            </View>

            <TextInput
                style={[styles.input, touched.name && errors.name && styles.inputError]}
                placeholder="Name"
                value={name}
                onChangeText={setName}
                onBlur={() => handleBlur('name')}
            />
            {renderError('name')}

            <TextInput
                style={[styles.input, touched.email && errors.email && styles.inputError]}
                placeholder="Email"
                value={email}
                onChangeText={setEmail}
                onBlur={() => handleBlur('email')}
                keyboardType="email-address"
                autoCapitalize="none"
            />
            {renderError('email')}

            <TextInput
                style={[styles.input, touched.username && errors.username && styles.inputError]}
                placeholder="Username"
                value={username}
                onChangeText={setUsername}
                onBlur={() => handleBlur('username')}
                autoCapitalize="none"
            />
            {renderError('username')}

            <TextInput
                style={[styles.input, touched.password && errors.password && styles.inputError]}
                placeholder="Password"
                value={password}
                onChangeText={setPassword}
                onBlur={() => handleBlur('password')}
                secureTextEntry
            />
            {renderError('password')}

            <TextInput
                style={[styles.input, touched.confirmPassword && errors.confirmPassword && styles.inputError]}
                placeholder="Confirm Password"
                value={confirmPassword}
                onChangeText={setConfirmPassword}
                onBlur={() => handleBlur('confirmPassword')}
                secureTextEntry
            />
            {renderError('confirmPassword')}

            <TextInput
                style={[styles.input, touched.address && errors.address && styles.inputError]}
                placeholder="Address"
                value={address}
                onChangeText={setAddress}
                onBlur={() => handleBlur('address')}
                multiline
            />
            {renderError('address')}
        </View>
    );
};

export default RegisteredUserForm;
