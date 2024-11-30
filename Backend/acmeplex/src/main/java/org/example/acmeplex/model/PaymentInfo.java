//paymentInfo.java

package org.example.acmeplex.model;

import lombok.Data;
import jakarta.persistence.*;

@Entity
@Data
@Table(name = "PAYMENTINFO")
public class PaymentInfo {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer paymentInfoID;

    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @Column(nullable = false)
    private String cardType;

    @Column(nullable = false)
    private String cardNumber;

    @Column(nullable = false)
    private Integer expiryMonth;

    @Column(nullable = false)
    private Integer expiryYear;

    @Column(nullable = false)
    private Integer cw;

    @Column(nullable = false)
    private String cardHolderName;

    @Column(nullable = false)
    private String billingAddress;

}
