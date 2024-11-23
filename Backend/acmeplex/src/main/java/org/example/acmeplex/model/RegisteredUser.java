package org.example.acmeplex.model;

import jakarta.persistence.*;
import lombok.Data;
import lombok.EqualsAndHashCode;

import java.util.Date;

@Entity
@Data
@EqualsAndHashCode(callSuper = true)
@DiscriminatorValue("REGISTERED")
public class RegisteredUser extends User {
    @Column(unique = true)
    private String username;

    private String password;

    private String name;

    private String address;
    
    @Temporal(TemporalType.DATE)
    private Date registrationDate;

    @Temporal(TemporalType.DATE)
    private Date annualFeeDueDate;

    private Double credits = 0.0;
}
