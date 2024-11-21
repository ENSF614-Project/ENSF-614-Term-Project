package org.example.acmeplex.model;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Data
@Table(name = "THEATRE")
public class Theatre {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer theatreId;

    @Column(nullable = false)
    private String theatreName;
    
    @Column(nullable = false)
    private String theatreAddress;
}
