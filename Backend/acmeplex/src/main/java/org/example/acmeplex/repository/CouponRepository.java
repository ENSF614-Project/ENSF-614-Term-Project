package org.example.acmeplex.repository;

import org.example.acmeplex.model.Coupon;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CouponRepository extends JpaRepository<Coupon, Integer> {}
