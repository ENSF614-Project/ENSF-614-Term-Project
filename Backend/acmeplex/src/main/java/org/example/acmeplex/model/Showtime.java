package org.example.acmeplex.model;

import java.time.*;
import jakarta.persistence.*;
import lombok.Data;

@Entity
@Data
@Table(name = "SHOWTIME")
public class Showtime {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer showtimeId;

    @Column(nullable = false)
    private LocalDateTime showtime;

    @Column(nullable = false)
    private Double price;

    @Column(nullable = false)
    private Boolean earlyAccessOnly = false;

    @ManyToOne
    @JoinColumn(name = "movieId", nullable = false)
    private Movie movie;

    @ManyToOne
    @JoinColumn(name = "theatreId", nullable = false)
    private Theatre theatre;

    //Question: about availableSeats

}
