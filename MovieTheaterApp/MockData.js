//reduced the number of movies and showtimes to 3 each for testing purposes
export const movies = [
    {
        movieId: 1,
        title: 'Avengers: Endgame',
        genre: 'Action/Sci-Fi',
        duration: 180,
        rating: 8.5,
        releaseDate: '2019-04-26',
        posterUrl: 'https://image.tmdb.org/t/p/w500/ulzhLuWrPK07P1YkdWQLZnQh1JL.jpg'
    },
    {
        movieId: 2,
        title: 'Inception',
        genre: 'Sci-Fi/Thriller',
        duration: 148,
        rating: 8.8,
        releaseDate: '2010-07-16',
        posterUrl: 'https://www.themoviedb.org/t/p/w600_and_h900_bestv2/edv5CZvWj09upOsy2Y6IwDhK8bt.jpg'
    },
    {
        movieId: 3,
        title: 'The Dark Knight',
        genre: 'Action/Drama',
        duration: 152,
        rating: 9.0,
        releaseDate: '2008-07-18',
        posterUrl: 'https://image.tmdb.org/t/p/w500/qJ2tW6WMUDux911r6m7haRef0WH.jpg'
    }
];

// temporary function to generate random occupied seats, will be replaced with actual data
const generateOccupiedSeats = () => {
    const occupiedSeats = [];
    const numOccupied = Math.floor(Math.random() * 80);

    for (let i = 0; i < numOccupied; i++) {
        const row = String.fromCharCode(65 + Math.floor(Math.random() * 10)); // used to generate A-J
        const seat = Math.floor(Math.random() * 10) + 1; // used to generate seat number
        const seatKey = `${row}${seat}`;
        if (!occupiedSeats.includes(seatKey)) {
            occupiedSeats.push(seatKey);
        }
    }

    return occupiedSeats;
};

export const showtimes = {
    1: {
        "2024-12-26": [
            { id: "1-1", time: "10:00 AM", theatre: "Theater One", price: 12.99, occupiedSeats: generateOccupiedSeats() },
            { id: "1-2", time: "2:00 PM", theatre: "Theater Two", price: 14.99, occupiedSeats: generateOccupiedSeats() },
            { id: "1-3", time: "7:00 PM", theatre: "Theater One", price: 16.99, occupiedSeats: generateOccupiedSeats() }
        ],
        "2024-12-27": [
            { id: "1-4", time: "11:00 AM", theatre: "Theater Two", price: 12.99, occupiedSeats: generateOccupiedSeats() },
            { id: "1-5", time: "3:00 PM", theatre: "Theater One", price: 14.99, occupiedSeats: generateOccupiedSeats() },
            { id: "1-6", time: "8:00 PM", theatre: "Theater Two", price: 16.99, occupiedSeats: generateOccupiedSeats() }
        ],
        "2024-12-28": [
            { id: "1-7", time: "1:00 PM", theatre: "Theater One", price: 14.99, occupiedSeats: generateOccupiedSeats() },
            { id: "1-8", time: "6:00 PM", theatre: "Theater Two", price: 16.99, occupiedSeats: generateOccupiedSeats() }
        ]
    },
    2: {
        "2024-12-06": [
            { id: "2-1", time: "11:30 AM", theatre: "Theater Two", price: 12.99, occupiedSeats: generateOccupiedSeats() },
            { id: "2-2", time: "4:30 PM", theatre: "Theater One", price: 14.99, occupiedSeats: generateOccupiedSeats() }
        ],
        "2024-12-07": [
            { id: "2-3", time: "1:30 PM", theatre: "Theater One", price: 14.99, occupiedSeats: generateOccupiedSeats() },
            { id: "2-4", time: "7:30 PM", theatre: "Theater Two", price: 16.99, occupiedSeats: generateOccupiedSeats() }
        ],
        "2024-12-08": [
            { id: "2-5", time: "12:30 PM", theatre: "Theater Two", price: 12.99, occupiedSeats: generateOccupiedSeats() },
            { id: "2-6", time: "5:30 PM", theatre: "Theater One", price: 14.99, occupiedSeats: generateOccupiedSeats() },
            { id: "2-7", time: "9:30 PM", theatre: "Theater Two", price: 16.99, occupiedSeats: generateOccupiedSeats() }
        ]
    },
    3: {
        "2024-12-06": [
            { id: "3-1", time: "12:00 PM", theatre: "Theater One", price: 12.99, occupiedSeats: generateOccupiedSeats() },
            { id: "3-2", time: "5:00 PM", theatre: "Theater Two", price: 14.99, occupiedSeats: generateOccupiedSeats() },
            { id: "3-3", time: "9:00 PM", theatre: "Theater One", price: 16.99, occupiedSeats: generateOccupiedSeats() }
        ],
        "2024-12-17": [
            { id: "3-4", time: "2:00 PM", theatre: "Theater Two", price: 14.99, occupiedSeats: generateOccupiedSeats() },
            { id: "3-5", time: "6:00 PM", theatre: "Theater One", price: 14.99, occupiedSeats: generateOccupiedSeats() }
        ],
        "2024-12-18": [
            { id: "3-6", time: "3:00 PM", theatre: "Theater One", price: 14.99, occupiedSeats: generateOccupiedSeats() },
            { id: "3-7", time: "8:00 PM", theatre: "Theater Two", price: 16.99, occupiedSeats: generateOccupiedSeats() }
        ]
    }
};

export const mockUsers = [
    {
        userId: 1,
        username: "testuser1",
        email: "test1@example.com",
        name: "Test User 1",
        address: "123 Test St",
        registrationDate: "2024-11-15",
        annualFeeDueDate: "2025-11-15",
        credits: 100.0,
        isRU: true
    },
    {
        userId: 2,
        username: "testuser2",
        email: "test2@example.com",
        name: "Test User 2",
        address: "456 Test Ave",
        registrationDate: "2024-11-16",
        annualFeeDueDate: "2025-11-16",
        credits: 50.0,
        isRU: true
    }
];

export const mockTickets = [
    {
        ticketID: 1,
        userID: 1,
        showtimeID: 1,
        seatID: 1,
        purchasedDate: "2024-11-15",
        cancellationDeadline: "2024-11-28",
        status: "active",
        price: 15.00,
        refund: 0.0,
        cancellationFee: 2.25,
        // Additional fields for UI display that will be found by joining with other tables
        movieTitle: "Avengers: Endgame",
        theatre: "Cinema One",
        showtime: "2024-12-01 14:00:00",
        seatInfo: "A12"
    },
    {
        ticketID: 2,
        userID: 1,
        showtimeID: 2,
        seatID: 2,
        purchasedDate: "2024-11-10",
        cancellationDeadline: "2024-11-23",
        status: "completed",
        price: 12.00,
        refund: 0.0,
        cancellationFee: 1.80,
        movieTitle: "Inception",
        theatre: "Star Theater",
        showtime: "2024-11-24 16:30:00",
        seatInfo: "B15"
    }
];

export const getUserTickets = (userId) => {
    return mockTickets.filter(ticket => ticket.userID === userId);
};

export const getTicketById = (ticketId) => {
    return mockTickets.find(ticket => ticket.ticketID.toString() === ticketId.toString());
};