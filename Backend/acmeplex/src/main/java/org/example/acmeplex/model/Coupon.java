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
    private Integer couponID;

    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @Column(nullable = false)
    private Double value;

    @Temporal(TemporalType.DATE)
    @Column(name = "expiry_date", nullable = false)
    private Date expiryDate;

    @Column(nullable = false, length = 50)
    private String status;
}
