//TheatreService.java
package org.example.acmeplex.service;

import org.example.acmeplex.model.Theatre;
import org.example.acmeplex.repository.TheatreRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.swing.text.html.Option;
import java.util.List;
import java.util.Optional;

@Service
public class TheatreService {
    private final TheatreRepository theatreRepository;

    @Autowired
    public TheatreService(TheatreRepository theatreRepository) {
        this.theatreRepository = theatreRepository;
    }

    public List<Theatre> getAllTheatre() {
        return theatreRepository.findAll();
    }

    public Optional<Theatre> getTheatreById(int theatreId) {
        return theatreRepository.findById(theatreId);
    }

    public Theatre createTheatre(Theatre theatre) {return theatreRepository.save(theatre);}
}
