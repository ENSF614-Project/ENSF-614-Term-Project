//SeatService.java
package org.example.acmeplex.service;

import org.example.acmeplex.model.Seat;
import org.example.acmeplex.repository.SeatRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class SeatService {
    private final SeatRepository seatRepository;

    @Autowired
    public SeatService(SeatRepository seatRepository){
        this.seatRepository = seatRepository;
    }

    public List<Seat> getAllSeats(){
        return seatRepository.findAll();
    }

    public Optional<Seat> getSeatById(Integer seatId){
        return seatRepository.findById(seatId);
    }

    public List<Seat> getSeatsByShowtime(Integer showtimeId){
        return seatRepository.findByShowtime_ShowtimeId(showtimeId);
    }

    public Seat createSeat(Seat seat){
        if(seat.getSeatRow() == null || seat.getSeatNum() == null){
            throw new IllegalArgumentException("Seat Row and SeatNum are required");
        }
        char row = seat.getSeatRow();
        if(row <'A' || row > 'J'){
            throw new IllegalArgumentException("Seat Row out of range");
        }
        int number = seat.getSeatNum();
        if(number <1 || number > 10){
            throw new IllegalArgumentException("Seat Row out of range");
        }
        return seatRepository.save(seat);
    }

    public Optional<Seat> markSeatUnavailable(Integer seatID) {
        Optional<Seat> seatOptional = seatRepository.findById(seatID);
        if (seatOptional.isPresent()) {
            Seat seat = seatOptional.get();
            seat.setIsAvailable(false); // Update the field
            seatRepository.save(seat); // Persist the changes
            return Optional.of(seat);
        }
        return Optional.empty();
    }

    public Optional<Seat> markSeatAvailable(Integer seatID) {
        Optional<Seat> seatOptional = seatRepository.findById(seatID);
        if (seatOptional.isPresent()) {
            Seat seat = seatOptional.get();
            seat.setIsAvailable(true); // Update the field
            seatRepository.save(seat); // Persist the changes
            return Optional.of(seat);
        }
        return Optional.empty();
    }

    public List<Seat> getAvailableSeatsByShowTime(Integer showtimeId){
        return seatRepository.findByShowtime_ShowtimeIdAndIsAvailableTrue(showtimeId);
    }

}
