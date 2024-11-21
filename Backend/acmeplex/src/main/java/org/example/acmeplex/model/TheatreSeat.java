package org.example.acmeplex.model;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Data
@Table(name = "THEATRE_SEAT", uniqueConstraints = {@UniqueConstraint(columnNames = {"theatreId", "seatRow", "seatNum"})})
public class TheatreSeat {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer seatId;

    @ManyToOne
    @JoinColumn(name = "theatreId", nullable = false)
    private Theatre theatre;

    @Column(nullable = false)
    private Integer seatRow;

    @Column(nullable = false)
    private Integer seatNum;

    @Column(nullable = false)
    private Boolean isAvailable;
}