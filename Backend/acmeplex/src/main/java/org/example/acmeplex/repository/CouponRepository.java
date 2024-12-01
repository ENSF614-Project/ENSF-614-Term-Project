//CouponRepository.java
package org.example.acmeplex.repository;

import org.example.acmeplex.model.Coupon;
import org.example.acmeplex.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;
import java.util.Optional;


public interface CouponRepository extends JpaRepository<Coupon, Long> {
    List<Coupon> findByUser(User user);
    List<Coupon> findByEmailAndStatusOrderByExpiryDateAsc(String email, String status);
    Optional<Coupon> findByUserAndStatus(User user, String status);
    List<Coupon> findByEmail(String email);
}