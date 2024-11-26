//UserService.java
package org.example.acmeplex.service;

import org.example.acmeplex.model.RegisteredUser;
import org.example.acmeplex.model.User;
import org.example.acmeplex.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserService {
    @Autowired
    private UserRepository userRepository;

    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    public User getUserById(Integer id) {
        return userRepository.findById(id).orElse(null);
    }
}
