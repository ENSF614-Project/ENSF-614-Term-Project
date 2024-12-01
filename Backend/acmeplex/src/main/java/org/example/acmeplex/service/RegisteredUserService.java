//RegisteredUserService.java
package org.example.acmeplex.service;

import org.example.acmeplex.model.RegisteredUser;
import org.example.acmeplex.repository.RegisteredUserRepository;
import org.example.acmeplex.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class RegisteredUserService {
    @Autowired
    private RegisteredUserRepository registeredUserRepository;
    @Autowired
    private UserRepository userRepository;

    public List<RegisteredUser> getAllUsers() {
        return registeredUserRepository.findAll();
    }

    public RegisteredUser createUser(RegisteredUser user) {
        return registeredUserRepository.save(user);
    }

    public RegisteredUser getUserById(Integer id) {
        return registeredUserRepository.findById(id).orElse(null);
    }

    public RegisteredUser getUserByUsername(String username) {
        return registeredUserRepository.findByUsername(username);
    }

    public boolean existsByUsername(String username) {
        return registeredUserRepository.existsByUsername(username);
    }

    public boolean existsByEmail(String email) {
        return registeredUserRepository.existsByEmail(email);
    }

    public boolean existsByEmailAndIsRUTrue(String email) {
        return registeredUserRepository.existsByEmailAndIsRUTrue(email);
    }

    public boolean existByEmailAndIsRUFalse(String email){
        return registeredUserRepository.existsByEmailAndIsRUFalse(email);
    }
}
