package org.example.acmeplex.config;

import org.example.acmeplex.model.*;
import org.example.acmeplex.repository.SeatRepository;
import org.example.acmeplex.repository.ShowtimeRepository;
import org.example.acmeplex.service.*;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.example.acmeplex.service.PaymentInfoService;
import org.example.acmeplex.repository.PaymentInfoRepository;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Configuration
public class DataSeeder {

    @Bean
    public CommandLineRunner demo(UserService userService, RegisteredUserService RegistereduserService, PaymentInfoService paymentInfoService,
            PaymentInfoRepository paymentInfoRepository, MovieService movieService, TheatreService theatreService, ShowtimeRepository showtimeRepository,
            ShowtimeService showtimeService, SeatRepository seatRepository, TicketService ticketService,
            CouponService couponService) {
        return (args) -> {
            // Create registered users:
            RegisteredUser user1 = new RegisteredUser();
            user1.setUsername("testuser1");
            user1.setEmail("mkasgpacc@gmail.com");
            user1.setPassword("password123");
            user1.setName("Test User 1");
            user1.setAddress("123 Test St");
            user1.setRegistrationDate(new Date());
            user1.setAnnualFeeDueDate(new Date());
            user1.setIsRU(true);

            RegisteredUser user2 = new RegisteredUser();
            user2.setUsername("testuser2");
            user2.setEmail("test2@example.com");
            user2.setPassword("password123");
            user2.setName("Test User 2");
            user2.setAddress("456 Test Ave");
            user2.setRegistrationDate(new Date());
            user2.setAnnualFeeDueDate(new Date());
            user2.setIsRU(true);

            RegistereduserService.createRegisteredUser(user1);
            RegistereduserService.createRegisteredUser(user2);

            // Create guest users:
            User user3 = new User();
            user3.setEmail("test3@example.com");
            user3.setIsRU(false);
            userService.createRegularUser(user3);

            User user4 = new User();
            user4.setEmail("test4@example.com");
            user4.setIsRU(false);
            userService.createRegularUser(user4);

            // Payment Info for Registered Users
            PaymentInfo paymentInfo1 = new PaymentInfo();
            paymentInfo1.setUser(user1);
            paymentInfo1.setCardNumber("1234-5678-9012-3456");
            paymentInfo1.setExpiryMonth(12);
            paymentInfo1.setExpiryYear(2024);
            paymentInfo1.setCw(123);
            paymentInfo1.setBillingAddress("sjhdbshj");
            paymentInfo1.setCardHolderName("Test User 1");
            paymentInfo1.setCardType("Visa");

            PaymentInfo paymentInfo2 = new PaymentInfo();
            paymentInfo2.setUser(user2);
            paymentInfo2.setCardNumber("2345-6789-0123-4567");
            paymentInfo2.setExpiryMonth(11);
            paymentInfo2.setExpiryYear(2020);
            paymentInfo2.setCw(456);
            paymentInfo2.setBillingAddress("sdsdjwe");
            paymentInfo2.setCardHolderName("Test User 2");
            paymentInfo2.setCardType("Visa");

            paymentInfoService.savePaymentInfo(paymentInfo1);
            paymentInfoService.savePaymentInfo(paymentInfo2);


            // Create movies
            Movie movie1 = new Movie();
            movie1.setTitle("Avengers: Endgame");
            movie1.setGenre("Action/Sci-Fi");
            movie1.setDuration(180);
            movie1.setDescription(
                    "After Thanos eliminates half of all life, the Avengers struggle with devastating loss. When a chance for redemption appears, they must reunite for one final mission - a desperate time heist to restore what was lost and save the universe.");
            movie1.setRating(8.5);
            movie1.setReleaseDate(java.sql.Date.valueOf("2025-04-26"));
            movie1.setPosterUrl("https://image.tmdb.org/t/p/w500/ulzhLuWrPK07P1YkdWQLZnQh1JL.jpg");

            Movie movie2 = new Movie();
            movie2.setTitle("Inception");
            movie2.setGenre("Sci-Fi/Thriller");
            movie2.setDuration(148);
            movie2.setDescription(
                    "Dom Cobb infiltrates dreams to steal corporate secrets. Offered a chance at redemption, he must now plant an idea in someone's mind. As the team delves deeper into dreams, an enemy predicts their every move.");
            movie2.setRating(8.8);
            movie2.setReleaseDate(java.sql.Date.valueOf("2010-07-16"));
            movie2.setPosterUrl("https://www.themoviedb.org/t/p/w600_and_h900_bestv2/edv5CZvWj09upOsy2Y6IwDhK8bt.jpg");

            Movie movie3 = new Movie();
            movie3.setTitle("The Dark Knight");
            movie3.setGenre("Action/Drama");
            movie3.setDuration(152);
            movie3.setDescription(
                    "When the Joker emerges as a brilliant but psychotic criminal mastermind, Gotham descends into chaos. As Batman fights to restore order, he faces impossible choices that test his dedication to justice and heroism.");
            movie3.setRating(9.0);
            movie3.setReleaseDate(java.sql.Date.valueOf("2008-07-18"));
            movie3.setPosterUrl("https://image.tmdb.org/t/p/w500/qJ2tW6WMUDux911r6m7haRef0WH.jpg");

            // Save movies to the repository
            movieService.createMovie(movie1);
            movieService.createMovie(movie2);
            movieService.createMovie(movie3);

            // Create theatres
            Theatre theatre1 = new Theatre();
            theatre1.setTheatreName("Theatre 1");
            theatre1.setTheatreAddress("123 Ave NW");

            Theatre theatre2 = new Theatre();
            theatre2.setTheatreName("Theatre 2");
            theatre2.setTheatreAddress("456 Ave NW");

            theatreService.createTheatre(theatre1);
            theatreService.createTheatre(theatre2);

            // Generate Showtime
            // Times for showtime
            List<String> times = List.of("10:00:00", "14:00:00", "19:00:00");
            // Dates for showtime
            List<LocalDate> dates = List.of(
                    LocalDate.parse("2024-12-25"),
                    LocalDate.parse("2024-12-26"));
            // Movies
            List<Movie> movies = List.of(movie1, movie2, movie3);
            // Theatres
            List<Theatre> theatres = List.of(theatre1, theatre2);

            // Create Showtime
            int counter = 1;
            List<Showtime> allShowtime = new ArrayList<>();

            for (Movie movie : movies) {
                for (Theatre theatre : theatres) {
                    for (LocalDate date : dates) {
                        for (String time : times) {
                            Showtime showtime = new Showtime();
                            showtime.setMovie(movie);
                            showtime.setTheatre(theatre);
                            showtime.setStartTime(LocalDateTime.parse(date + "T" + time));

                            allShowtime.add(showtime);
                            System.out.println("Created showtime" + counter + ": " +
                                    movie.getTitle() + ", " + theatre.getTheatreName() + ", " +
                                    date + " " + time);
                            counter++;
                        }
                    }
                }
            }
            // Persisting showtime to database
            showtimeRepository.saveAll(allShowtime);

            // Generate seats for each showtime
            List<Seat> allSeats = new ArrayList<>();
            for (Showtime showtime : allShowtime) {
                for (char row = 'A'; row <= 'J'; row++) {
                    for (int seatNum = 1; seatNum <= 10; seatNum++) {
                        Seat seat = new Seat();
                        seat.setShowtime(showtime);
                        seat.setSeatRow(row);
                        seat.setSeatNum(seatNum);
                        seat.setIsAvailable(true);
                        allSeats.add(seat);
                    }
                }
            }
            seatRepository.saveAll(allSeats);
            System.out.println("Seeded seats successfully for each showtime.");

            // Create tickets
            ticketService.purchaseTicket((User) user1, 1, List.of(1, 2, 3), 14.00, null, user1.getEmail());
            ticketService.purchaseTicket((User) user2, 2, List.of(101, 102, 103), 14.00, null, user2.getEmail());

            // Get the created tickets to reference them in coupons
            List<Ticket> user1Tickets = ticketService.getTicketsByUser((User) user1);
            List<Ticket> user2Tickets = ticketService.getTicketsByUser((User) user2);

            // Create test coupons
            couponService.createCoupon(user1, user1Tickets.get(0), 25.00);
            couponService.createCoupon(user2, user2Tickets.get(0), 15.00);

            ticketService.purchaseTicket(user3, 25, List.of(2401, 2402, 2403), 14.00, null, user3.getEmail());
        };
    }
}
