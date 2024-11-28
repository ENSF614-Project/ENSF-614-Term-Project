package org.example.acmeplex.controller;

import org.example.acmeplex.model.Showtime;
import org.example.acmeplex.service.ShowtimeService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/showtime")
@CrossOrigin(origins = "*")
public class ShowtimeController {

    private final ShowtimeService showtimeService;

    public ShowtimeController(ShowtimeService showtimeService){
        this.showtimeService = showtimeService;
    }

    @GetMapping
    public List<Showtime> getAllShowtime(){
        return showtimeService.getAllShowtimes();
    }

    @GetMapping("/movie/{movieId}")
    public List<Showtime> getShowtimeByMovie(@PathVariable Integer movieId){
        return showtimeService.getShowtimesByMovie(movieId);
    }

    @GetMapping("/theatre/{theatreId}")
    public List<Showtime> getShowtimeByTheatre(@PathVariable Integer theatreId){
        return showtimeService.getShowtimesByTheater(theatreId);
    }
}
