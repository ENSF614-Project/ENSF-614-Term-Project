//Movie.java
package org.example.acmeplex.model;
import java.sql.Date;
import java.time.LocalDate;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Data
@Table(name = "MOVIE")
public class Movie {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer movieId;

    @Column(nullable = false)
    private String title;

    @Column(nullable = false)
    private String genre;

    @Column(nullable = false)
    private Integer duration;

    @Column(nullable = false)
    private String description;

    @Column(nullable = false)
    private Double rating;

    @Column(nullable = false)
    @Temporal(TemporalType.DATE)
    private Date releaseDate;

    @Column(nullable = false)
    private String posterUrl;

    @Transient
    public boolean isEarlyAccessOnly() {
        return releaseDate != null &&
                releaseDate.toLocalDate().isAfter(LocalDate.now());
    }
}
