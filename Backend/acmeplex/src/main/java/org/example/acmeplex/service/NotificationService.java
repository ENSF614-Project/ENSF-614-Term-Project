package org.example.acmeplex.service;

import org.example.acmeplex.model.Movie;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class NotificationService {

    private final MovieService movieService;

    @Autowired
    public NotificationService(MovieService movieService) {
        this.movieService = movieService;
    }

    public List<String> getEarlyAccessNotifications() {
        List<Movie> earlyAccessMovies = movieService.getEarlyAccessMovies();
        return earlyAccessMovies.stream()
                .map(movie -> String.format(
                        "Movie \"%s\", which will be released for the public on \"%s\", is currently available for Registered Users Early Access Booking!",
                        movie.getTitle(),
                        movie.getReleaseDate().toString()
                ))
                .collect(Collectors.toList());
    }
}
