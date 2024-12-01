//ShowtimeRepository.java
package org.example.acmeplex.repository;

import org.example.acmeplex.model.Showtime;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ShowtimeRepository extends JpaRepository<Showtime, Integer> {

    List<Showtime> findByMovie_MovieId(Integer movieId);

    List<Showtime> findByTheatre_TheatreId(Integer theatreId);

    //List<Showtime> findByEarlyAccessOnlyTrue();

    List<Showtime> findByMovie_MovieIdAndTheatre_TheatreId(Integer movieId, Integer theatreId);

    Showtime findByShowtimeId(Integer showtimeId);
}
