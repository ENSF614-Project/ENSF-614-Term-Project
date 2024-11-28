package org.example.acmeplex.repository;

import org.example.acmeplex.model.Coupon;
import org.example.acmeplex.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;


public interface CouponRepository extends JpaRepository<Coupon, Long> {
    List<Coupon> findByUser(User user);
}