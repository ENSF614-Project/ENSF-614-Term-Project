package org.example.acmeplex.service;

import org.example.acmeplex.model.RegisteredUser;
import org.example.acmeplex.repository.RegisteredUserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class RegisteredUserService {
    @Autowired
    private RegisteredUserRepository userRepository;

    public List<RegisteredUser> getAllUsers() {
        return userRepository.findAll();
    }

    public RegisteredUser createUser(RegisteredUser user) {
        return userRepository.save(user);
    }

    public RegisteredUser getUserById(Long id) {
        return userRepository.findById(id).orElse(null);
    }

    public RegisteredUser getUserByUsername(String username) {
        return userRepository.findByUsername(username);
    }

    public boolean existsByUsername(String username) {
        return userRepository.existsByUsername(username);
    }

    public boolean existsByEmail(String email) {
        return userRepository.existsByEmail(email);
    }
}
