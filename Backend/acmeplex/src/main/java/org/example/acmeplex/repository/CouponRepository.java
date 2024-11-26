package org.example.acmeplex.repository;

import org.example.acmeplex.model.Coupon;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface CouponRepository extends JpaRepository<Coupon, Integer> {
    List<Coupon> findByUserID(Integer userID);
    Coupon findByTicketID(Integer ticketID);
}
