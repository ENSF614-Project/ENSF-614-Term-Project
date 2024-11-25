// User.java
package org.example.acmeplex.model;
import jakarta.persistence.*;
import lombok.Data;

@Entity
@Data
@Inheritance(strategy = InheritanceType.JOINED)
@DiscriminatorColumn(name = "userType", discriminatorType = DiscriminatorType.STRING)
@Table(name = "USER")
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer userId;

    @Column(nullable = false, unique = true)
    private String email;

    @Column(nullable = false)
    private Boolean isRU = false;

}
