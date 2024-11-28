package org.example.acmeplex.service;

import org.example.acmeplex.model.Showtime;
import org.example.acmeplex.repository.ShowtimeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ShowtimeService {
    private final ShowtimeRepository showtimeRepository;

    @Autowired
    public ShowtimeService(ShowtimeRepository showtimeRepository){
        this.showtimeRepository = showtimeRepository;
    }

    public List<Showtime> getAllShowtimes(){
        return showtimeRepository.findAll();
    }

    public Optional<Showtime> getShowtimeById(int id) {
        return showtimeRepository.findById(id);
    }

    public List<Showtime> getShowtimesByMovie(Integer movieId) {
        return showtimeRepository.findByMovie_MovieId(movieId);
    }

    public List<Showtime> getShowtimesByTheater(Integer theaterId) {
        return showtimeRepository.findByTheatre_TheatreId(theaterId);
    }

}
