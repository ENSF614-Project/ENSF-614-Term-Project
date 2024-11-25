package org.example.acmeplex;

import org.example.acmeplex.model.RegisteredUser;
import org.example.acmeplex.service.RegisteredUserService;
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

    // Temporary method to create test users
    @Bean
    public CommandLineRunner demo(RegisteredUserService userService) {
        return (args) -> {
            RegisteredUser user1 = new RegisteredUser();
            user1.setUsername("testuser1");
            user1.setEmail("test1@example.com");
            user1.setPassword("password123");
            user1.setName("Test User 1");
            user1.setAddress("123 Test St");
            user1.setRegistrationDate(new Date());
            user1.setAnnualFeeDueDate(new Date());
            user1.setCredits(100.0);
            user1.setIsRU(true);

            RegisteredUser user2 = new RegisteredUser();
            user2.setUsername("testuser2");
            user2.setEmail("test2@example.com");
            user2.setPassword("password123");
            user2.setName("Test User 2");
            user2.setAddress("456 Test Ave");
            user2.setRegistrationDate(new Date());
            user2.setAnnualFeeDueDate(new Date());
            user2.setCredits(50.0);
            user2.setIsRU(true);

            userService.createUser(user1);
            userService.createUser(user2);
        };
    }

}