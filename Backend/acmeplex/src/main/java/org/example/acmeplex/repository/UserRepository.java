//UserRepository.java
package org.example.acmeplex.repository;

import jakarta.persistence.criteria.CriteriaBuilder;
import org.example.acmeplex.model.RegisteredUser;
import org.example.acmeplex.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepository extends JpaRepository<User, Integer> {
    boolean existsByEmail(String email);
    User findByUserId(Integer id);
}
