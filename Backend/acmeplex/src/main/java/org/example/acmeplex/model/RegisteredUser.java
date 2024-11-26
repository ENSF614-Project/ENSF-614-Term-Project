//RegisteredUser.java
package org.example.acmeplex.model;

import jakarta.persistence.*;
import lombok.Data;
import lombok.EqualsAndHashCode;

import java.time.LocalDate;
import java.util.Date;

@Entity
@Data
@EqualsAndHashCode(callSuper = true)
public class RegisteredUser extends User {
    @Column(nullable = false, unique = true)
    private String username;

    @Column(nullable = false)
    private String password;

    @Column(nullable = false)
    private String name;

    private String address;

    @Column(nullable = false)
    @Temporal(TemporalType.DATE)
    private Date registrationDate;

    @Column(nullable = false)
    @Temporal(TemporalType.DATE)
    private Date annualFeeDueDate;
}
