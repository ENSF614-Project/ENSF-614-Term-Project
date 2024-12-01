//UserService.java
package org.example.acmeplex.service;

import org.example.acmeplex.model.RegisteredUser;
import org.example.acmeplex.model.User;
import org.example.acmeplex.repository.RegisteredUserRepository;
import org.example.acmeplex.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.example.acmeplex.dto.UserDTO;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class UserService {
    @Autowired
    private UserRepository userRepository;

    @Autowired
    private RegisteredUserRepository registeredUserRepository;

    public UserDTO login(String username, String password) {
        RegisteredUser user = registeredUserRepository.findByUsername(username);
        if (user == null) {
            throw new IllegalArgumentException("User not found");
        }
        if (!user.getPassword().equals(password)) {
            throw new IllegalArgumentException("Invalid credentials");
        }
        return new UserDTO(user.getUserId(), user.getEmail(), user.getIsRU());
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

    public List<UserDTO> getAllUsers() {
        List<User> users = userRepository.findAll();
        return users.stream()
                .map(user -> new UserDTO(user.getUserId(), user.getEmail(), user.getIsRU()))
                .collect(Collectors.toList());
    }

    public UserDTO getUserById(Integer id) {
        return userRepository.findById(id)
                .map(user -> new UserDTO(user.getUserId(), user.getEmail(), user.getIsRU()))
                .orElse(null);
    }}
