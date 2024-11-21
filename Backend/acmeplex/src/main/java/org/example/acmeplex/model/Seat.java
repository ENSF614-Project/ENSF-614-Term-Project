package org.example.acmeplex.model;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Data
@Table(name = "SEAT", uniqueConstraints = {@UniqueConstraint(columnNames = {"showtimeId", "seatRow", "seatNum"})})
public class Seat {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer seatId;

    @ManyToOne
    @JoinColumn(name = "showtimeId", nullable = false)
    private Showtime showtime;

    @Column(nullable = false)
    private Integer seatRow;

    @Column(nullable = false)
    private Integer seatNum;

    @Column(nullable = false)
    private Boolean isAvailable = true;
}