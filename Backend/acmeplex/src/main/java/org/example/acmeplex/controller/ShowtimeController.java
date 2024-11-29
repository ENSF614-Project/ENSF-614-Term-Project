//ShowtimeController.java
package org.example.acmeplex.controller;

import org.example.acmeplex.model.Showtime;
import org.example.acmeplex.service.ShowtimeService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

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
        return showtimeService.getAllShowtime();
    }

    @GetMapping("/movie/{movieId}")
    public List<Showtime> getShowtimeByMovie(@PathVariable Integer movieId){
        return showtimeService.getShowtimeByMovie(movieId);
    }

    @GetMapping("/theatre/{theatreId}")
    public List<Showtime> getShowtimeByTheatre(@PathVariable Integer theatreId){
        return showtimeService.getShowtimeByTheater(theatreId);
    }

    @GetMapping("/movie/{movieId}/theatre/{theatreId}")
    public List<Showtime> getShowtimeByMovieAndTheatre(@PathVariable Integer movieId, @PathVariable Integer theatreId){
        return showtimeService.getByMovieAndTheatre(movieId, theatreId);
    }

    @GetMapping("/movie/{movieId}/theatre/{theatreId}/early-access")
    public ResponseEntity<List<Showtime>> getEarlyAccessShowtimeForMovieAndTheatre(
            @PathVariable Integer movieId, @PathVariable Integer theatreId){
        List<Showtime> showtime = showtimeService.getEarlyAccessShowtimeForMovieAndTheatre(movieId, theatreId);
        if(showtime.isEmpty()){
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.ok(showtime);
    }
}
