//ShowtimeService.java
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

    public List<Showtime> getAllShowtime(){
        return showtimeRepository.findAll();
    }

    public Optional<Showtime> getShowtimeById(int id) {
        return showtimeRepository.findById(id);
    }

    public List<Showtime> getShowtimeByMovie(Integer movieId) {
        return showtimeRepository.findByMovie_MovieId(movieId);
    }

    public List<Showtime> getShowtimeByTheater(Integer theaterId) {
        return showtimeRepository.findByTheatre_TheatreId(theaterId);
    }

    public List<Showtime> getByMovieAndTheatre(Integer movieId, Integer theaterId) {
        return showtimeRepository.findByMovie_MovieIdAndTheatre_TheatreId(movieId, theaterId);
    }

    public List<Showtime> getEarlyAccessShowtimeForMovieAndTheatre(Integer movieId, Integer theaterId) {
        List<Showtime> showtime = showtimeRepository.findByMovie_MovieIdAndTheatre_TheatreId(movieId, theaterId);

        return showtime.stream().filter(Showtime::isEarlyAccessOnly).toList();
     }

}
