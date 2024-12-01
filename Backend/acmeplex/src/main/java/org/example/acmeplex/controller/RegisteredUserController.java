//RegisteredUserController.java
package org.example.acmeplex.controller;

import org.example.acmeplex.dto.UserDTO;
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
    public List<UserDTO> getAllUsers() {
        return registeredUserService.getAllUsers();
    }

    @PostMapping
    public ResponseEntity<?> createRegisteredUser(@RequestBody RegisteredUser user) {
        // Basic validation
        if (registeredUserService.existsByUsername(user.getUsername())) {
            return ResponseEntity.badRequest().body("Username already exists");
        }
        if (registeredUserService.existsByEmailAndIsRUTrue(user.getEmail())) {
            return ResponseEntity.badRequest().body("Email already exists");
        }

        RegisteredUser newUser = registeredUserService.createRegisteredUser(user);
        return ResponseEntity.ok(newUser);
    }

    @GetMapping("/{id}")
    public ResponseEntity<UserDTO> getUserById(@PathVariable Integer id) {
        UserDTO userDTO = registeredUserService.getUserById(id);
        if (userDTO != null) {
            return ResponseEntity.ok(userDTO);
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
