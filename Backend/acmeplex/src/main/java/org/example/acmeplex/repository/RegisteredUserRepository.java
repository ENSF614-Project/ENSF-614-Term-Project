package org.example.acmeplex.repository;

import org.example.acmeplex.model.RegisteredUser;
import org.springframework.data.jpa.repository.JpaRepository;

public interface RegisteredUserRepository extends JpaRepository<RegisteredUser, Long> {
    RegisteredUser findByUsername(String username);
    boolean existsByUsername(String username);
    boolean existsByEmail(String email);
}

