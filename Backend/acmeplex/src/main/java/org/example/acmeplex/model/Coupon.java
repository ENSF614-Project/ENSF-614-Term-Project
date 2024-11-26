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

    @Column(name = "value", nullable = false)
    private Double value;

    @Column(name = "expiryDate", nullable = false)
    @Temporal(TemporalType.DATE)
    private Date expiryDate;

    @Column(name = "status", nullable = false, length = 50)
    private String status;

    @ManyToOne
    @JoinColumn(name = "userId")
    private User user;
}
