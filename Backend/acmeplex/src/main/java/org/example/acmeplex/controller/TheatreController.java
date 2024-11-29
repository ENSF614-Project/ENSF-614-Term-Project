//TheatreController.java
package org.example.acmeplex.controller;

import org.example.acmeplex.model.Theatre;
import org.example.acmeplex.service.TheatreService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/theatres")
public class TheatreController {

    private final TheatreService theatreService;

    public TheatreController(TheatreService theatreService) {
        this.theatreService = theatreService;}

    @GetMapping
    public List<Theatre> getAllTheatre() {
        return theatreService.getAllTheatre();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Theatre> getTheatreById(@PathVariable int id) {
        return theatreService.getTheatreById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.status(HttpStatus.NOT_FOUND).build());
    }

    @PostMapping
    public ResponseEntity<Theatre> createTheatre(@RequestBody Theatre theatre) {
        try {
            Theatre createdTheatre = theatreService.createTheatre(theatre);
            return ResponseEntity.status(HttpStatus.CREATED).body(createdTheatre);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
        }
    }
}
