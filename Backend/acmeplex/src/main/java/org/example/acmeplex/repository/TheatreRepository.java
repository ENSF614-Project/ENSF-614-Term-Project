package org.example.acmeplex.repository;

import org.example.acmeplex.model.Theatre;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface TheatreRepository extends JpaRepository<Theatre, Integer> {
    List<Theatre> findByTheatreNameContaining(String theatreName);
}
