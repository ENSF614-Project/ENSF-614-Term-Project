package org.example.acmeplex;

import org.example.acmeplex.model.RegisteredUser;
import org.example.acmeplex.model.Movie;
import org.example.acmeplex.model.Theatre;
import org.example.acmeplex.service.MovieService;
import org.example.acmeplex.service.RegisteredUserService;
import org.example.acmeplex.service.TheatreService;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import java.util.Date;

@SpringBootApplication
public class AcmeplexApplication {

    public static void main(String[] args) {
        SpringApplication.run(AcmeplexApplication.class, args);
    }

}