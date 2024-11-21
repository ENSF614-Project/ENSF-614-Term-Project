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
    @Column(name = "couponId", nullable = false)
    private Integer couponId;

    @Column(name = "couponCode", nullable = false, unique = true)
    private String couponCode;

    @Column(name = "couponAmount", nullable = false)
    private Double couponAmount;

    @Column(name = "expiry", nullable = false)
    @Temporal(TemporalType.DATE)
    private Date expiry;
}
