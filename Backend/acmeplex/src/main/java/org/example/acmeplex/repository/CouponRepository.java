package org.example.acmeplex.repository;

import org.example.acmeplex.model.Coupon;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Date;
import java.util.List;

public interface CouponRepository extends JpaRepository<Coupon, Integer> {
    List<Coupon> findByUserUserIdAndExpiryDateAfterAndStatus(Integer userId, Date currentDate, String status);
}
