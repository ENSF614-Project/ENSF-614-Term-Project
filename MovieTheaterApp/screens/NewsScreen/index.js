// screens/NewsScreen/index.js
import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { styles } from './styles';

const NewsScreen = ({ navigation }) => {
    const [isUserLoggedIn, setIsUserLoggedIn] = useState(true); // Replace with actual login logic

    // Mock data
    const [news] = useState([
        { type: 'Release', news: 'Big movie coming out next week, preorder your tickets now for Spooderman 420!' },
        { type: 'Concession', news: 'Acmeplex is proud to announce that it will now be serving lunchly at all our locations!' }
    ]);

    useEffect(() => {
        // Redirect to login if the user is not logged in
        if (!isUserLoggedIn) {
            navigation.navigate('Login');
        }
    }, [isUserLoggedIn, navigation]);

    return (
        <View style={styles.container}>
            <Text style={styles.title}>News</Text>
            {isUserLoggedIn && (
                <ScrollView style={styles.newsContainer}>
                    {news.map((item, index) => (
                        <View key={index} style={styles.newsItem}>
                            <Text style={styles.newsType}>{item.type}</Text>
                            <Text style={styles.newsText}>{item.news}</Text>
                        </View>
                    ))}
                </ScrollView>
            )}
        </View>
    );
};

export default NewsScreen;
