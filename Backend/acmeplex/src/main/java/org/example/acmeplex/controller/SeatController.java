package org.example.acmeplex.controller;

import org.example.acmeplex.model.Seat;
import org.example.acmeplex.service.SeatService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/seat")
@CrossOrigin(origins = "*")
public class SeatController {
    private final SeatService seatService;

    public SeatController(SeatService seatService) {
        this.seatService = seatService;
    }

    @GetMapping
    public List<Seat> getAllSeats() {
        return seatService.getAllSeats();
    }

    @GetMapping("/{seatId}")
    public ResponseEntity<Seat> getSeatById(@PathVariable Integer seatId) {
        return seatService.getSeatById(seatId)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.status(HttpStatus.NOT_FOUND).build());
    }

    @GetMapping("/showtime/{showtimeId}")
    public List<Seat> getSeatsByShowtime(@PathVariable Integer showtimeId){
        return seatService.getSeatsByShowtime(showtimeId);
    }
}
