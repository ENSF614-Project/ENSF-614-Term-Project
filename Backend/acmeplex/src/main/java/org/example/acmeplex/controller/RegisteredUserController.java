//RegisteredUserController.java
package org.example.acmeplex.controller;

import org.example.acmeplex.model.RegisteredUser;
import org.example.acmeplex.service.RegisteredUserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/registered-users")
@CrossOrigin(origins = "*")
public class RegisteredUserController {

    @Autowired
    private RegisteredUserService registeredUserService;

    @GetMapping("/test")
    public String testEndpoint() {
        return "Backend is working!";
    }

    @GetMapping
    public List<RegisteredUser> getAllUsers() {
        return registeredUserService.getAllUsers();
    }

    @PostMapping
    public ResponseEntity<?> createUser(@RequestBody RegisteredUser user) {
        // Basic validation
        if (registeredUserService.existsByUsername(user.getUsername())) {
            return ResponseEntity.badRequest().body("Username already exists");
        }
        if (registeredUserService.existsByEmail(user.getEmail())) {
            return ResponseEntity.badRequest().body("Email already exists");
        }

        RegisteredUser newUser = registeredUserService.createUser(user);
        return ResponseEntity.ok(newUser);
    }

    @GetMapping("/{id}")
    public ResponseEntity<RegisteredUser> getUserById(@PathVariable Integer id) {
        RegisteredUser user = registeredUserService.getUserById(id);
        if (user != null) {
            return ResponseEntity.ok(user);
        }
        return ResponseEntity.notFound().build();
    }

    @GetMapping("/username/{username}")
    public ResponseEntity<RegisteredUser> getUserByUsername(@PathVariable String username) {
        RegisteredUser user = registeredUserService.getUserByUsername(username);
        if (user != null) {
            return ResponseEntity.ok(user);
        }
        return ResponseEntity.notFound().build();
    }
}