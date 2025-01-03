//ShowtimeController.java
package org.example.acmeplex.controller;

import org.example.acmeplex.model.Showtime;
import org.example.acmeplex.service.ShowtimeService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/showtime")
@CrossOrigin(origins = "*")
public class ShowtimeController {

    private final ShowtimeService showtimeService;

    public ShowtimeController(ShowtimeService showtimeService) {
        this.showtimeService = showtimeService;
    }

    @GetMapping
    public List<Showtime> getAllShowtime() {
        return showtimeService.getAllShowtime();
    }

    @GetMapping("/movie/{movieId}")
    public List<Showtime> getShowtimeByMovie(@PathVariable Integer movieId) {
        return showtimeService.getShowtimeByMovie(movieId);
    }

    @GetMapping("/theatre/{theatreId}")
    public List<Showtime> getShowtimeByTheatre(@PathVariable Integer theatreId) {
        return showtimeService.getShowtimeByTheater(theatreId);
    }

    @GetMapping("/movie/{movieId}/theatre/{theatreId}")
    public List<Showtime> getShowtimeByMovieAndTheatre(@PathVariable Integer movieId, @PathVariable Integer theatreId) {
        return showtimeService.getByMovieAndTheatre(movieId, theatreId);
    }

    @GetMapping("/movie/{movieId}/theatre/{theatreId}/early-access")
    public ResponseEntity<List<Showtime>> getEarlyAccessShowtimeForMovieAndTheatre(
            @PathVariable Integer movieId, @PathVariable Integer theatreId) {
        List<Showtime> showtime = showtimeService.getEarlyAccessShowtimeForMovieAndTheatre(movieId, theatreId);
        if (showtime.isEmpty()) {
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.ok(showtime);
    }

    @GetMapping("/{showtimeId}")
    public ResponseEntity<Showtime> getShowtimeById(@PathVariable Integer showtimeId){
        return showtimeService.getShowtimeById(showtimeId)
                .map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.status(HttpStatus.NOT_FOUND).build());
    }


    @GetMapping("/{showtimeId}/startTime")
    public ResponseEntity<LocalDateTime> getStartTimeByShowtimeId(@PathVariable Integer showtimeId) {
        try {
            LocalDateTime startTime = showtimeService.getStartTimeByShowtimeId(showtimeId);
            return ResponseEntity.ok(startTime);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.notFound().build();
        }
    }

    @PostMapping
    public ResponseEntity<Showtime> createShowtime(@RequestBody Showtime newShowtime) {
        try {
            Showtime createdShowtime = showtimeService.createShowtime(newShowtime);
            return ResponseEntity.status(HttpStatus.CREATED).body(createdShowtime);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().build();
        }
    }
}