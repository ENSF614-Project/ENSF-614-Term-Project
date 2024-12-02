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
import { useAuth } from '../../context/AuthContext';
import { ticketService } from '../../services/ticketService'
import { showtimeService } from '../../services/showtimeService'
import { seatService } from '../../services/seatService'

const TicketScreen = () => {
    const { user } = useAuth();
    const [ticketNumber, setTicketNumber] = useState('');
    const [searchedTicket, setSearchedTicket] = useState(null);
    const [userTickets, setUserTickets] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (user) {
            fetchUserTickets();
        }
    }, [user]);

    const fetchUserTickets = async () => {
        setLoading(true);
        try {
            const tickets = await ticketService.getUserTickets(user.userId);

            // Fetch additional details for each ticket
            const ticket = await Promise.all(
                tickets.map(async (ticket) => {
                try {
                    const showtime = await showtimeService.getShowtimeById(ticket.showtimeID);
                    const seat = await seatService.getSeatById(ticket.seatID);

                    return {
                        ...ticket,
                        showtimeDetails: showtime,
                        seatDetails: seat,
                    };
                } catch (error) {
                    console.error(`Error fetching details for ticket ID ${ticket.ticketID}:`, error);
                    return { ...ticket, showtimeDetails: null, seatDetails: null };
                }
            })
        );
        console.log('test');
        setUserTickets(ticket);
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
            const ticket = await ticketService.getTicketById(ticketNumber);
            if (ticket) {
                try{
                    const showtime = await showtimeService.getShowtimeById(ticket.showtimeID);
                    const seat = await seatService.getSeatById(ticket.seatID);

                    setSearchedTicket({
                        ...ticket,
                        showtimeDetails: showtime,
                        seatDetails: seat,
                    });
                    setError(null);
                }catch (error) {
                    console.error('Error enriching ticket details:', error);
                    setSearchedTicket(ticket); // Use the ticket as is if enrichment fails
                }
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

    // const handleCancelTicket = async (ticketId) => {
    //     //link to cancel button
    //     Alert.alert(
    //         'Confirm Cancellation',
    //         'Are you sure you want to cancel this ticket?',
    //         [
    //             { text: 'No', style: 'cancel' },
    //             {
    //                 text: 'Yes',
    //                 onPress: async () => {
    //                     setLoading(true);
    //                     try {
    //                         await ticketService.cancelTicketById(ticketId);
    //                         setUserTickets((prev) =>
    //                             prev.filter((ticket) => ticket.ticketID !== ticketId)
    //                         );
    //                         Alert.alert('Success', 'Ticket canceled successfully.');
    //                     } catch (err) {
    //                         Alert.alert('Error', 'Failed to cancel ticket. Please try again.');
    //                     } finally {
    //                         setLoading(false);
    //                     }
    //                 }
    //             }
    //         ]
    //     );
    // };

    const handleCancelTicket = async (ticketId) => {
        setLoading(true);
        try {
            await ticketService.cancelTicketById(ticketId);
            setUserTickets((prev) =>
                prev.filter((ticket) => ticket.ticketID !== ticketId)
            );
            console.log('Ticket canceled successfully.');
        } catch (err) {
            console.error('Failed to cancel ticket. Please try again.', err);
        } finally {
            setLoading(false);
        }
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
        const isActive = new Date(ticket.showtimeDetails.startTime) > new Date(); //Change for showtime need to create api
        const canCancel = new Date(ticket.cancellationDeadline) > new Date();

        return (
            <View key={ticket.ticketID} style={styles.ticketCard}>
                <View style={styles.ticketHeader}>
                    <Text style={styles.movieTitle}>{ticket.showtimeDetails.movie.title}</Text>
                    <View style={[
                        styles.statusBadge,
                        isActive ? styles.activeBadge : styles.pastBadge
                    ]}>
                        <Text style={styles.statusText}>
                            {isActive ? 'Active' : 'Past'}
                        </Text>
                    </View>
                </View>

                <View style={styles.ticketInfo}>
                    <View style={styles.infoRow}>
                        <Text style={styles.infoLabel}>Theatre:</Text>
                        <Text style={styles.infoValue}>{ticket.showtimeDetails.theatre.theatreName}</Text>
                    </View>
                    <View style={styles.infoRow}>
                        <Text style={styles.infoLabel}>Seat:</Text>
                        <Text style={styles.infoValue}>
                            {[ticket.seatDetails.seatRow, ticket.seatDetails.seatNum].join(' ')}
                        
                        </Text>
                    </View>
                    <View style={styles.infoRow}>
                        <Text style={styles.infoLabel}>Showtime:</Text>
                        <Text style={styles.infoValue}>{formatDate(ticket.showtimeDetails.startTime)}</Text>
                    </View>
                    <View style={styles.infoRow}>
                        <Text style={styles.infoLabel}>Price:</Text>
                        <Text style={styles.infoValue}>${ticket.price.toFixed(2)}</Text>
                    </View>
                    {canCancel && (
                        <View style={styles.infoRow}>
                            <Text style={styles.infoLabel}>Cancel By:</Text>
                            <Text style={styles.infoValue}>
                                {formatDate(ticket.cancellationDeadline)}
                            </Text>
                        </View>
                    )}
                </View>

                {canCancel && isActive && user && (
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
            <View style={styles.searchContainer}>
                <View style={styles.searchHeader}>
                    <Ticket color={styles.searchHeader.iconColor} size={24} />
                    <Text style={styles.searchTitle}>Find Ticket by ID</Text>
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

            {user && (
                <View style={styles.ticketsContainer}>
                    <Text style={styles.sectionTitle}>Your Tickets</Text>
                    {userTickets.length > 0 ? (
                        userTickets.map(renderTicketCard)
                    ) : (
                        <View style={styles.emptyContainer}>
                            <Ticket size={48} color={styles.emptyContainer.iconColor} />
                            <Text style={styles.emptyText}>No tickets found</Text>
                        </View>
                    )}
                </View>
            )}
        </ScrollView>
    );
};

export default TicketScreen;