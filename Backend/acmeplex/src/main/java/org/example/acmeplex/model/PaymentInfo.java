//paymentInfo.java

package org.example.acmeplex.model;

//import java.sql.Date;
//import java.time.LocalDate;

import jakarta.persistence.*;
import lombok.Data;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.JoinColumn;

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



    /*
    private int paymentInfoID;
    private int userID;
    private String cardType;
    private String cardNumber;
    private int expiryMonth;
    private int expiryYear;
    private int cw;
    private String cardHolderName;
    private String billingAddress;
    */

    /*
    // Getters and Setters
    public int getPaymentInfoID() {
        return paymentInfoID;
    }

    public void setPaymentInfoID(int paymentInfoID) {
        this.paymentInfoID = paymentInfoID;
    }

    public int getUserID() {
        return userID;
    }

    public void setUserID(int userID) {
        this.userID = userID;
    }

    public String getCardType() {
        return cardType;
    }

    public void setCardType(String cardType) {
        this.cardType = cardType;
    }

    public String getCardNumber() {
        return cardNumber;
    }

    public void setCardNumber(String cardNumber) {
        this.cardNumber = cardNumber;
    }

    public int getExpiryMonth() {
        return expiryMonth;
    }

    public void setExpiryMonth(int expiryMonth) {
        this.expiryMonth = expiryMonth;
    }

    public int getExpiryYear() {
        return expiryYear;
    }

    public void setExpiryYear(int expiryYear) {
        this.expiryYear = expiryYear;
    }

    public int getCw() {
        return cw;
    }

    public void setCw(int cw) {
        this.cw = cw;
    }

    public String getCardHolderName() {
        return cardHolderName;
    }

    public void setCardHolderName(String cardHolderName) {
        this.cardHolderName = cardHolderName;
    }

    public String getBillingAddress() {
        return billingAddress;
    }

    public void setBillingAddress(String billingAddress) {
        this.billingAddress = billingAddress;
    }
    */
}
