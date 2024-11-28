// screens/TicketScreen/index.js
import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    ScrollView,
    ActivityIndicator
} from 'react-native';
import { Ticket, AlertCircle } from 'lucide-react-native';
import { styles } from './styles';
import { getUserTickets, getTicketById } from '../../MockData';

const TicketScreen = () => {
    // need to connect to API
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [userId, setUserId] = useState(null);
    const [ticketNumber, setTicketNumber] = useState('');
    const [searchedTicket, setSearchedTicket] = useState(null);
    const [userTickets, setUserTickets] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    // use this toggle to test different user states
    const toggleLogin = () => {
        setIsLoggedIn(!isLoggedIn);
        setUserId(isLoggedIn ? null : 1); // set to user 1 (with tickets) when logging in
    };

    useEffect(() => {
        if (isLoggedIn && userId) {
            fetchUserTickets();
        }
    }, [isLoggedIn, userId]);

    const fetchUserTickets = async () => {
        setLoading(true);
        try {
            await new Promise(resolve => setTimeout(resolve, 1000));
            const tickets = getUserTickets(userId);
            setUserTickets(tickets);
            setError(null);
        } catch (err) {
            setError('Failed to fetch tickets. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    const handleTicketSearch = async () => {
        if (!ticketNumber.trim()) {
            setError('Please enter a ticket number');
            return;
        }

        setLoading(true);
        try {
            await new Promise(resolve => setTimeout(resolve, 1000));
            const ticket = getTicketById(ticketNumber);
            if (ticket) {
                setSearchedTicket(ticket);
                setError(null);
            } else {
                setError('Ticket not found');
                setSearchedTicket(null);
            }
        } catch (err) {
            setError('Failed to search ticket. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    const handleCancelTicket = async (ticketId) => {
        alert('Cancel ticket functionality will be implemented soon.');
    };

    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleString('en-US', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    const renderTicketCard = (ticket) => {
        const isActive = new Date(ticket.showtime) > new Date();
        const canCancel = new Date(ticket.cancellationDeadline) > new Date();

        return (
            <View key={ticket.ticketID} style={styles.ticketCard}>
                <View style={styles.ticketHeader}>
                    <Text style={styles.movieTitle}>{ticket.movieTitle}</Text>
                    <View style={[
                        styles.statusBadge,
                        isActive ? styles.activeBadge : styles.pastBadge
                    ]}>
                        <Text style={styles.statusText}>
                            {isActive ? 'Complete' : 'Cancelled'}
                        </Text>
                    </View>
                </View>

                <View style={styles.ticketInfo}>
                    <View style={styles.infoRow}>
                        <Text style={styles.infoLabel}>Theatre:</Text>
                        <Text style={styles.infoValue}>{ticket.theatre}</Text>
                    </View>
                    <View style={styles.infoRow}>
                        <Text style={styles.infoLabel}>Seat:</Text>
                        <Text style={styles.infoValue}>{ticket.seatInfo}</Text>
                    </View>
                    <View style={styles.infoRow}>
                        <Text style={styles.infoLabel}>Showtime:</Text>
                        <Text style={styles.infoValue}>{formatDate(ticket.showtime)}</Text>
                    </View>
                    <View style={styles.infoRow}>
                        <Text style={styles.infoLabel}>Price:</Text>
                        <Text style={styles.infoValue}>${ticket.price.toFixed(2)}</Text>
                    </View>
                    {canCancel && (
                        <View style={styles.infoRow}>
                            <Text style={styles.infoLabel}>Cancel By:</Text>
                            <Text style={styles.infoValue}>{formatDate(ticket.cancellationDeadline)}</Text>
                        </View>
                    )}
                </View>

                {canCancel && isActive && (
                    <TouchableOpacity
                        style={styles.cancelButton}
                        onPress={() => handleCancelTicket(ticket.ticketID)}
                    >
                        <Text style={styles.cancelButtonText}>Cancel Ticket</Text>
                    </TouchableOpacity>
                )}
            </View>
        );
    };

    if (loading) {
        return (
            <View style={styles.centered}>
                <ActivityIndicator size="large" color={styles.spinner.color} />
                <Text style={styles.loadingText}>Loading tickets...</Text>
            </View>
        );
    }

    return (
        <ScrollView style={styles.container}>
            {/* Demo login toggle */}
            <TouchableOpacity
                style={styles.toggleButton}
                onPress={toggleLogin}
            >
                <Text style={styles.toggleButtonText}>
                    {isLoggedIn ? 'Logout (Demo)' : 'Login (Demo)'}
                </Text>
            </TouchableOpacity>

            {!isLoggedIn ? (
                <View style={styles.searchContainer}>
                    <View style={styles.searchHeader}>
                        <Ticket color={styles.searchHeader.iconColor} size={24} />
                        <Text style={styles.searchTitle}>Find Your Ticket</Text>
                    </View>

                    {error && (
                        <View style={styles.errorContainer}>
                            <AlertCircle color={styles.errorContainer.iconColor} size={20} />
                            <Text style={styles.errorText}>{error}</Text>
                        </View>
                    )}

                    <View style={styles.inputContainer}>
                        <TextInput
                            style={styles.input}
                            value={ticketNumber}
                            onChangeText={setTicketNumber}
                            placeholder="Enter ticket number"
                            placeholderTextColor={styles.input.placeholderTextColor}
                            keyboardType="numeric"
                        />
                        <TouchableOpacity
                            style={styles.searchButton}
                            onPress={handleTicketSearch}
                        >
                            <Text style={styles.buttonText}>Search</Text>
                        </TouchableOpacity>
                    </View>

                    {searchedTicket && renderTicketCard(searchedTicket)}
                </View>
            ) : (
                <View style={styles.ticketsContainer}>
                    <Text style={styles.screenTitle}>Your Tickets</Text>
                    {userTickets.length > 0 ? (
                        userTickets.map(renderTicketCard)
                    ) : (
                        <View style={styles.emptyContainer}>
                            <Ticket size={48} color={styles.emptyContainer.textColor} />
                            <Text style={styles.emptyText}>No tickets found</Text>
                        </View>
                    )}
                </View>
            )}
        </ScrollView>
    );
};

export default TicketScreen;