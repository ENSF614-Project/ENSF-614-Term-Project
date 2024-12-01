//UserRepository.java
package org.example.acmeplex.repository;

import org.example.acmeplex.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepository extends JpaRepository<User, Integer> {
    boolean existsByEmail(String email);
    User findByEmail(String email);
    User findByUserId(Integer id);
}