CREATE DATABASE IF NOT EXISTS ENSF614PROJECT;
USE ENSF614PROJECT;

CREATE TABLE IF NOT EXISTS USER (
    userID INT PRIMARY KEY AUTO_INCREMENT,
    email VARCHAR(255) NOT NULL UNIQUE,
    isRU BOOLEAN NOT NULL
);

CREATE TABLE IF NOT EXISTS REGISTEREDUSER (
    ruID INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(255) NOT NULL,
    address TEXT NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    registrationDate DATE NOT NULL,
    annualFeeDueDate DATE,
    credits DOUBLE DEFAULT 0.0,
    username VARCHAR(50) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    FOREIGN KEY (email) REFERENCES User(email),
    hasPaymentInfo BOOLEAN DEFAULT FALSE
);

CREATE TABLE IF NOT EXISTS THEATRE (
    theatreID INT PRIMARY KEY AUTO_INCREMENT,
    theatreName VARCHAR(255) NOT NULL,
    theatreAddress TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS MOVIE (
    movieID INT PRIMARY KEY AUTO_INCREMENT,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    genre VARCHAR(50) NOT NULL,
    releaseDate DATE NOT NULL,
    duration INT NOT NULL
);

CREATE TABLE IF NOT EXISTS SHOWTIME (
    showtimeID INT PRIMARY KEY AUTO_INCREMENT,
    movieID INT NOT NULL,
    theatreID INT NOT NULL,
    startTime TIME NOT NULL,
    date DATE NOT NULL,
    seats JSON NOT NULL, -- Store seat availability in JSON format
    earlyAccessOnly BOOLEAN NOT NULL DEFAULT FALSE,
    totalSeatsForRU INT NOT NULL,
    reservedSeatsRU INT DEFAULT 0,
    FOREIGN KEY (movieID) REFERENCES MOVIE(movieID),
    FOREIGN KEY (theatreID) REFERENCES THEATRE(theatreID)
);

CREATE TABLE IF NOT EXISTS SEAT (
    seatID INT PRIMARY KEY AUTO_INCREMENT,
    seatNum INT NOT NULL,
    seatRow INT NOT NULL,
    isAvailable BOOLEAN NOT NULL DEFAULT TRUE,
    showtimeID INT NOT NULL,
    FOREIGN KEY (showtimeID) REFERENCES SHOWTIME(showtimeID)
);

CREATE TABLE IF NOT EXISTS TICKET (
    ticketID INT PRIMARY KEY AUTO_INCREMENT,
    showtimeID INT NOT NULL,
    movieID INT NOT NULL,
    theatreID INT NOT NULL,
    seatIDList TEXT NOT NULL, -- Store as a JSON or comma-separated string
    ticketDate DATE NOT NULL,
    cancellationDeadline DATE NOT NULL,
    status VARCHAR(50) NOT NULL,
    price DOUBLE NOT NULL,
    refund DOUBLE DEFAULT 0.0,
    userID INT NOT NULL,
    FOREIGN KEY (userID) REFERENCES USER(userID),
    FOREIGN KEY (showtimeID) REFERENCES SHOWTIME(showtimeID),
    FOREIGN KEY (movieID) REFERENCES MOVIE(movieID),
    FOREIGN KEY (theatreID) REFERENCES THEATRE(theatreID)
);

CREATE TABLE IF NOT EXISTS PAYMENT (
    paymentID INT PRIMARY KEY AUTO_INCREMENT,
    total DOUBLE NOT NULL,
    paymentMethod VARCHAR(50) NOT NULL, -- E.g., "Credit Card", "Debit Card"
    transactionDate DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS COUPON (
    couponID INT PRIMARY KEY AUTO_INCREMENT,
    ticketID INT NOT NULL,
    email VARCHAR(255) NOT NULL,
    userID INT NOT NULL,
    expiryDate DATE NOT NULL,
    amount DOUBLE NOT NULL,
    status VARCHAR(50) NOT NULL,
    FOREIGN KEY (ticketID) REFERENCES TICKET(ticketID),
    FOREIGN KEY (email) REFERENCES USER(email)
);

CREATE TABLE IF NOT EXISTS MOVIE_THEATRE (
    movieTheatreID INT PRIMARY KEY AUTO_INCREMENT, -- Optional, for unique identification
    movieID INT NOT NULL,
    theatreID INT NOT NULL,
    FOREIGN KEY (movieID) REFERENCES Movie(movieID) ON DELETE CASCADE,
    FOREIGN KEY (theatreID) REFERENCES Theatre(theatreID) ON DELETE CASCADE,
    UNIQUE(movieID, theatreID) -- Prevents duplicate movie-theatre relationships
);

CREATE TABLE IF NOT EXISTS PaymentInfo (
    paymentInfoID INT PRIMARY KEY AUTO_INCREMENT,
    ruID INT NOT NULL,
    cardType VARCHAR(50) NOT NULL,
    cardNumber VARCHAR(16) NOT NULL,
    expiryMonth INT NOT NULL, -- Store the month (1 to 12)
    expiryYear INT NOT NULL,  -- Store the year (e.g., 2025)
    cardHolderName VARCHAR(255) NOT NULL,
    billingAddress TEXT NOT NULL,
    FOREIGN KEY (ruID) REFERENCES RegisteredUser(ruID) ON DELETE CASCADE
);
