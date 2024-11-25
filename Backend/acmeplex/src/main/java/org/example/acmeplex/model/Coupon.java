package org.example.acmeplex.model;

import jakarta.persistence.*;
import lombok.Data;
import java.util.Date;

@Entity
@Data
@Table(name = "COUPON")
public class Coupon {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "couponID", nullable = false)
    private Integer couponID;

    @Column(name = "expiryDate", nullable = false)
    @Temporal(TemporalType.DATE)
    private Date expiryDate;

    @Column(name = "amount", nullable = false)
    private Double amount;

    @Column(name = "status", nullable = false, length = 50)
    private String status;

    @Column(name = "email", nullable = false, length = 100)
    private String email;

    @ManyToOne
    @JoinColumn(name = "ticketID", nullable = false)
    private Ticket ticket;

    @ManyToOne
    @JoinColumn(name = "userID", nullable = false)
    private User user;
}
