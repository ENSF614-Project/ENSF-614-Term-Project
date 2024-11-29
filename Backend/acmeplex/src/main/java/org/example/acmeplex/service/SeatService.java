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
}
