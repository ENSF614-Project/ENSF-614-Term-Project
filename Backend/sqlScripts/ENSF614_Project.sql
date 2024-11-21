CREATE DATABASE IF NOT EXISTS ENSF614PROJECT;
USE ENSF614PROJECT;

CREATE TABLE IF NOT EXISTS THEATRE (
    theatreId INT NOT NULL AUTO_INCREMENT,
    theatreName VARCHAR(30) NOT NULL,
    PRIMARY KEY(theatreId)
);

CREATE TABLE IF NOT EXISTS MOVIE (
    movieId INT NOT NULL AUTO_INCREMENT,
    title VARCHAR(100) NOT NULL,
    genre VARCHAR(25) NOT NULL,
    duration INT NOT NULL,
    description TEXT NOT NULL,
    rating DOUBLE NOT NULL,
    releaseDate DATE NOT NULL,
    PRIMARY KEY (movieId)
);

CREATE TABLE IF NOT EXISTS SHOWTIME (
    showtimeId INT NOT NULL AUTO_INCREMENT,
    movieId INT NOT NULL,
    theatreId INT NOT NULL,
    showtime DATETIME NOT NULL,
    price DOUBLE NOT NULL,
    earlyAccessOnly BOOLEAN DEFAULT FALSE,
    PRIMARY KEY(showtimeId),
    FOREIGN KEY(movieId) REFERENCES MOVIE(movieId),
    FOREIGN KEY(theatreId) REFERENCES THEATRE(theatreId)
);

CREATE TABLE IF NOT EXISTS TICKET (
    ticketId INT NOT NULL AUTO_INCREMENT,
    showtimeId INT NOT NULL,
    price DOUBLE NOT NULL,
    purchaseDateTime DATETIME NOT NULL,
    PRIMARY KEY(ticketId),
    FOREIGN KEY(showtimeId) REFERENCES SHOWTIME(showtimeId)
);

CREATE TABLE IF NOT EXISTS SEAT (
    seatId INT NOT NULL AUTO_INCREMENT,
    theatreId INT NOT NULL,
    seatRow INT NOT NULL,
    seatNum INT NOT NULL,
    isAvailable boolean default TRUE,
    PRIMARY KEY (seatId),
    UNIQUE (showtimeId, seatRow, seatNum),
    FOREIGN KEY(theatreId) REFERENCES THEATRE(theatreId)
);

CREATE TABLE IF NOT EXISTS THEATRE_TICKET (
    ticketId INT NOT NULL,
    seatId INT NOT NULL,
    PRIMARY KEY(ticketId, seatId),
    FOREIGN KEY(ticketId) REFERENCES TICKET(ticketId),
    FOREIGN KEY(seatId) REFERENCES THEATRE_SEAT(seatId)
);

CREATE TABLE IF NOT EXISTS COUPON (
    couponId INT NOT NULL AUTO_INCREMENT,
    couponCode VARCHAR(255) NOT NULL,
    couponAmount DOUBLE NOT NULL,
    expiry DATE NOT NULL,
    UNIQUE (couponCode),
    PRIMARY KEY(couponId)
);

CREATE TABLE IF NOT EXISTS PAYMENT (
    paymentId INT NOT NULL AUTO_INCREMENT,
    holderName VARCHAR(255) NOT NULL,
    cardNumber VARCHAR(255) NOT NULL,
    expiry DATE NOT NULL,
    PRIMARY KEY(paymentId)
);

CREATE TABLE IF NOT EXISTS REGISTERED_USER (
    userId INT NOT NULL AUTO_INCREMENT,
    username VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    address VARCHAR(255) NOT NULL,
    lastPaid DATE,
    PRIMARY KEY(userId),
    UNIQUE (password),
    UNIQUE (email)
);

CREATE TABLE IF NOT EXISTS USER_PAYMENT (
    userId INT NOT NULL,
    paymentId INT NOT NULL,
    PRIMARY KEY(userId, paymentId),
    FOREIGN KEY(userId) REFERENCES REGISTERED_USER(userId) ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY(paymentId) REFERENCES PAYMENT(paymentId) ON DELETE CASCADE ON UPDATE CASCADE
);

INSERT INTO THEATRE (theatreName) VALUES 
('Cinema One'),
('Star Theater'),
('Premiere Cinemas'),
('City Lights'),
('Skyline Cinema'),
('Mega Movies'),
('Galaxy Cinema'),
('Film House'),
('Grand Plaza'),
('Vista Theater');

INSERT INTO MOVIE (title, genre, duration, description, rating, releaseDate) VALUES
('Avengers', 'Action', 180, 'Superheroes save the world', 8.5, '2019-04-26'),
('Inception', 'Sci-Fi', 148, 'Dream invasion thriller', 8.8, '2010-07-16'),
('Titanic', 'Romance', 195, 'A love story on the Titanic', 7.8, '1997-12-19'),
('The Godfather', 'Crime', 175, 'A crime family epic', 9.2, '1972-03-24'),
('Joker', 'Drama', 122, 'An origin story of the Joker', 8.4, '2019-10-04'),
('Frozen', 'Animation', 102, 'A story of two sisters in a magical land', 7.5, '2013-11-27'),
('Star Wars', 'Sci-Fi', 121, 'Galactic space adventures', 8.6, '1977-05-25'),
('The Matrix', 'Sci-Fi', 136, 'A hacker discovers a shocking truth about reality', 8.7, '1999-03-31'),
('Toy Story', 'Animation', 81, 'Toys come to life', 8.3, '1995-11-22'),
('The Dark Knight', 'Action', 152, 'Batman faces the Joker', 9.0, '2008-07-18');

INSERT INTO SHOWTIME (movieId, theatreId, showtime, price, earlyAccessOnly) VALUES
(1, 1, '2024-12-01 14:00:00', 15.00, FALSE),
(2, 2, '2024-12-01 16:30:00', 18.00, TRUE),
(3, 3, '2024-12-01 19:00:00', 20.00, FALSE),
(4, 4, '2024-12-02 15:00:00', 12.00, FALSE),
(5, 5, '2024-12-02 18:30:00', 10.00, TRUE),
(6, 6, '2024-12-03 20:00:00', 8.00, FALSE),
(7, 7, '2024-12-03 22:00:00', 22.00, FALSE),
(8, 8, '2024-12-04 11:00:00', 7.50, FALSE),
(9, 9, '2024-12-04 13:00:00', 9.00, TRUE),
(10, 10, '2024-12-05 15:30:00', 16.50, FALSE);

INSERT INTO TICKET (showtimeId, price, purchaseDateTime) VALUES
(1, 15.00, '2024-11-10 09:00:00'),
(2, 18.00, '2024-11-11 10:00:00'),
(3, 20.00, '2024-11-12 11:00:00'),
(4, 12.00, '2024-11-13 12:00:00'),
(5, 10.00, '2024-11-14 13:00:00'),
(6, 8.00, '2024-11-15 14:00:00'),
(7, 22.00, '2024-11-16 15:00:00'),
(8, 7.50, '2024-11-17 16:00:00'),
(9, 9.00, '2024-11-18 17:00:00'),
(10, 16.50, '2024-11-19 18:00:00');

INSERT INTO SEAT (theatreId, seatRow, seatNum) VALUES
(1, 1, 1),
(1, 1, 2),
(1, 1, 3),
(2, 2, 1),
(2, 2, 2),
(3, 3, 1),
(3, 3, 2),
(4, 4, 1),
(4, 4, 2),
(5, 5, 1);

INSERT INTO THEATRE_TICKET (ticketId, seatId) VALUES
(1, 1),
(2, 2),
(3, 3),
(4, 4),
(5, 5),
(6, 6),
(7, 7),
(8, 8),
(9, 9),
(10, 10);

INSERT INTO COUPON (couponCode, couponAmount, expiry) VALUES
('DISCOUNT10', 10.00, '2024-12-31'),
('SUMMER15', 15.00, '2024-06-30'),
('WINTER20', 20.00, '2024-01-31'),
('FALL25', 25.00, '2024-10-31'),
('NEWYEAR30', 30.00, '2025-01-01'),
('WELCOME5', 5.00, '2024-12-31'),
('SPRING10', 10.00, '2024-03-31'),
('FLASH50', 50.00, '2024-12-01'),
('WEEKEND15', 15.00, '2024-11-30'),
('HOLIDAY20', 20.00, '2024-12-25');

INSERT INTO PAYMENT (holderName, cardNumber, expiry) VALUES
('John Doe', '1234567812345678', '2025-01-01'),
('Jane Smith', '2345678923456789', '2026-01-01'),
('Alice Johnson', '3456789034567890', '2024-11-30'),
('Bob Brown', '4567890145678901', '2025-12-31'),
('Cathy White', '5678901256789012', '2024-05-31'),
('David Green', '6789012367890123', '2023-11-30'),
('Eve Black', '7890123478901234', '2024-07-31'),
('Frank Grey', '8901234589012345', '2026-03-31'),
('Grace Blue', '9012345690123456', '2025-09-30'),
('Henry Red', '0123456701234567', '2024-12-31');

INSERT INTO REGISTERED_USER (username, password, email, address, lastPaid) VALUES
('johndoe', 'password123', 'john@example.com', '123 Main St', '2024-11-10'),
('janesmith', 'securePass!', 'jane@example.com', '456 Oak St', '2024-11-11'),
('alicej', 'alicePass$', 'alice@example.com', '789 Pine St', '2024-11-12'),
('bobbrown', 'bobPass#', 'bob@example.com', '101 Maple St', '2024-11-13'),
('cathywhite', 'cathy123', 'cathy@example.com', '202 Birch St', '2024-11-14'),
('davidgreen', 'dave@Pass', 'david@example.com', '303 Cedar St', '2024-11-15'),
('eveblack', 'eve%Pass', 'eve@example.com', '404 Elm St', '2024-11-16'),
('frankgrey', 'frank!Pass', 'frank@example.com', '505 Fir St', '2024-11-17'),
('graceblue', 'grace^Pass', 'grace@example.com', '606 Ash St', '2024-11-18'),
('henryred', 'henry&Pass', 'henry@example.com', '707 Beech St', '2024-11-19');

INSERT INTO USER_PAYMENT (userId, paymentId) VALUES
(1, 1),
(2, 2),
(3, 3),
(4, 4),
(5, 5),
(6, 6),
(7, 7),
(8, 8),
(9, 9),
(10, 10);