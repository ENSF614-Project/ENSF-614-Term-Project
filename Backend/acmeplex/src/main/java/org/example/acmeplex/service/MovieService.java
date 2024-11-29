//MovieService.java
package org.example.acmeplex.service;

import org.example.acmeplex.model.Movie;
import org.example.acmeplex.repository.MovieRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class MovieService {

    private final MovieRepository movieRepository;

    @Autowired
    public MovieService(MovieRepository movieRepository) {
        this.movieRepository = movieRepository;
    }

    public List<Movie> getAllMovies() {
        return movieRepository.findAll();
    }

    public Optional<Movie> getMovieById(int id) {
        return movieRepository.findById(id);
    }

    public List<Movie> getEarlyAccessMovies() {
        return movieRepository.findAll().stream()
                .filter(Movie::isEarlyAccessOnly)
                .collect(java.util.stream.Collectors.toList());
    }

    public Movie createMovie(Movie movie) {
        return movieRepository.save(movie);
    }

}
