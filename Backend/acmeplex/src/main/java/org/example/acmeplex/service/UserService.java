//UserService.java
package org.example.acmeplex.service;

import org.example.acmeplex.model.RegisteredUser;
import org.example.acmeplex.model.User;
import org.example.acmeplex.repository.RegisteredUserRepository;
import org.example.acmeplex.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserService {
    @Autowired
    private UserRepository userRepository;

    @Autowired
    private RegisteredUserRepository registeredUserRepository;

    public User login(String username, String password) {
        RegisteredUser user = registeredUserRepository.findByUsername(username);
        if (user == null) {
            throw new IllegalArgumentException("User not found");
        }
        if (!user.getPassword().equals(password)) {
            throw new IllegalArgumentException("Invalid credentials");
        }
        user.setPassword(null); // Don't send password back to client for security
        return user;
    }

    public User createRegularUser(User user) {
        // Check if user with email already exists
        if (user.getEmail() != null && userRepository.existsByEmail(user.getEmail())) {
            return userRepository.findByEmail(user.getEmail());
        }

        // Set default values for new user
        user.setIsRU(false);
        return userRepository.save(user);
    }

    public User getUserByEmail(String email) {
        return userRepository.findByEmail(email);
    }

    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    public User getUserById(Integer id) {
        return userRepository.findById(id).orElse(null);
    }
}