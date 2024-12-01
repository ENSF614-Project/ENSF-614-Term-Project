//RegisteredUserRepository.java
package org.example.acmeplex.repository;

import org.example.acmeplex.model.RegisteredUser;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface RegisteredUserRepository extends JpaRepository<RegisteredUser, Integer> {
    RegisteredUser findByUsername(String username);

    boolean existsByUsername(String username);

    boolean existsByEmail(String email);

    boolean existsByEmailAndIsRUFalse(String email);

    boolean existsByEmailAndIsRUTrue(String email);
}