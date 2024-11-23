// screens/NewsScreen/index.js
import React from 'react';
import { View, Text } from 'react-native';
import { styles } from './styles';

const NewsScreen = () => {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Movie News</Text>
        </View>
    );
};

export default NewsScreen;