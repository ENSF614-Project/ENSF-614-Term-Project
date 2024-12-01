//Coupon.java
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
    private Long couponID;

    @ManyToOne
    @JoinColumn(name = "userId", nullable = false)
    private User user;

    @ManyToOne
    @JoinColumn(name = "ticketId", nullable = false)
    private Ticket ticket;

    @Column(name = "value", nullable = false)
    private Double value;

    //@Column(name = "remainingValue", nullable = false)
    //private Double remainingValue;

    @Column(name = "email", nullable = false)
    private String email;

    @Temporal(TemporalType.DATE)
    @Column(name = "expiryDate", nullable = false)
    private Date expiryDate;

    @Column(name = "status", nullable = false, length = 50)
    private String status;
}
