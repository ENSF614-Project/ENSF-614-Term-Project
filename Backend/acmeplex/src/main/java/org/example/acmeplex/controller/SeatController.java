//SeatController.java
package org.example.acmeplex.controller;

import org.example.acmeplex.model.Seat;
import org.example.acmeplex.service.SeatService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/seats")
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

    @PostMapping
    public ResponseEntity<Seat> createSeat(@RequestBody Seat seat) {
        try{
            Seat createdSeat = seatService.createSeat(seat);
            return ResponseEntity.status(HttpStatus.CREATED).body(createdSeat);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
        }
    }

    @PutMapping("/{seatId}/mark-unavailable")
    public ResponseEntity<Seat> markSeatUnavailable(@PathVariable Integer seatId) {
        return seatService.markSeatUnavailable(seatId)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.status(HttpStatus.NOT_FOUND).build());
    }

    @PutMapping("/{seatId}/mark-available")
    public ResponseEntity<Seat> markSeatAvailable(@PathVariable Integer seatId) {
        return seatService.markSeatAvailable(seatId)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.status(HttpStatus.NOT_FOUND).build());
    }

    @GetMapping("/showtime/{showtimeId}/available")
    public List<Seat> getAvailableSeatsByShowtime(@PathVariable Integer showtimeId) {
        return seatService.getAvailableSeatsByShowTime(showtimeId);
    }
}
