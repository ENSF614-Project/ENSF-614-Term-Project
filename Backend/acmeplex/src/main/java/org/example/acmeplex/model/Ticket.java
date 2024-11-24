package org.example.acmeplex.model;

import jakarta.persistence.*;
import lombok.Data;
import java.util.Date;

@Entity
@Data
@Table(name = "TICKET")
public class Ticket {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "ticketID", nullable = false)
    private Integer ticketID;

    @Column(name = "showtimeID", nullable = false)
    private Integer showtimeID;

    @Column(name = "seatID", nullable = false)
    private Integer seatID;

    @Column(name = "purchasedDate", nullable = false)
    @Temporal(TemporalType.DATE)
    private Date purchasedDate;

    @Column(name = "cancellationDeadline", nullable = false)
    @Temporal(TemporalType.DATE)
    private Date cancellationDeadline;

    @Column(name = "status", nullable = false, length = 50)
    private String status;

    @Column(name = "price", nullable = false)
    private Double price;

    @Column(name = "refund", nullable = false, columnDefinition = "DOUBLE DEFAULT 0.0")
    private Double refund = 0.0;

    @Column(name = "cancellationFee", nullable = false)
    private Double cancellationFee;

    @ManyToOne
    @JoinColumn(name = "userID", insertable = false, updatable = false)
    private User user;

    @ManyToOne
    @JoinColumn(name = "transactionID", insertable = false, updatable = false)
    private Transaction transaction;
}
