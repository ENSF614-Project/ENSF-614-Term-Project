//RegisteredUserService.java
package org.example.acmeplex.service;

import org.example.acmeplex.model.RegisteredUser;
import org.example.acmeplex.repository.RegisteredUserRepository;
import org.example.acmeplex.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.example.acmeplex.dto.UserDTO;

import java.util.Calendar;
import java.util.Date;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class RegisteredUserService {
    @Autowired
    private RegisteredUserRepository registeredUserRepository;
    @Autowired
    private UserRepository userRepository;

    public List<UserDTO> getAllUsers() {
        List<RegisteredUser> users = registeredUserRepository.findAll();
        return users.stream()
                .map(user -> new UserDTO(user.getUserId(), user.getEmail(), true))
                .collect(Collectors.toList());
    }

    public RegisteredUser createRegisteredUser(RegisteredUser user) {
        user.setRegistrationDate(new Date());

        Calendar calendar = Calendar.getInstance();
        calendar.setTime(user.getRegistrationDate());
        calendar.add(Calendar.YEAR, 1);
        user.setAnnualFeeDueDate(calendar.getTime());

        return registeredUserRepository.save(user);
    }

    public UserDTO getUserById(Integer id) {
        return registeredUserRepository.findById(id)
                .map(user -> new UserDTO(user.getUserId(), user.getEmail(), true))
                .orElse(null);
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
