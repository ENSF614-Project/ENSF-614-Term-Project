package org.example.acmeplex.config;

import org.example.acmeplex.model.Movie;
import org.example.acmeplex.model.RegisteredUser;
import org.example.acmeplex.model.Theatre;
import org.example.acmeplex.service.MovieService;
import org.example.acmeplex.service.RegisteredUserService;
import org.example.acmeplex.service.TheatreService;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.util.Date;

@Configuration
public class DataSeeder {

    @Bean
    public CommandLineRunner demo(RegisteredUserService userService, MovieService movieService, TheatreService theatreService) {
        return (args) -> {
            //Create users:
            RegisteredUser user1 = new RegisteredUser();
            user1.setUsername("testuser1");
            user1.setEmail("test1@example.com");
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

            userService.createUser(user1);
            userService.createUser(user2);

            // Create movies
            Movie movie1 = new Movie();
            movie1.setTitle("Avengers: Endgame");
            movie1.setGenre("Action/Sci-Fi");
            movie1.setDuration(180);
            movie1.setDescription("Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.");
            movie1.setRating(8.5);
            movie1.setReleaseDate(java.sql.Date.valueOf("2025-04-26"));
            movie1.setPosterUrl("https://image.tmdb.org/t/p/w500/ulzhLuWrPK07P1YkdWQLZnQh1JL.jpg");

            Movie movie2 = new Movie();
            movie2.setTitle("Inception");
            movie2.setGenre("Sci-Fi/Thriller");
            movie2.setDuration(148);
            movie2.setDescription("Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.");
            movie2.setRating(8.8);
            movie2.setReleaseDate(java.sql.Date.valueOf("2010-07-16"));
            movie2.setPosterUrl("https://www.themoviedb.org/t/p/w600_and_h900_bestv2/edv5CZvWj09upOsy2Y6IwDhK8bt.jpg");

            Movie movie3 = new Movie();
            movie3.setTitle("The Dark Knight");
            movie3.setGenre("Action/Drama");
            movie3.setDuration(152);
            movie3.setDescription("Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.");
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

            Theatre theatre3 = new Theatre();
            theatre3.setTheatreName("Theatre 3");
            theatre3.setTheatreAddress("789 Ave NW");

            theatreService.createTheatre(theatre1);
            theatreService.createTheatre(theatre2);
            theatreService.createTheatre(theatre3);
        };

    }
}
