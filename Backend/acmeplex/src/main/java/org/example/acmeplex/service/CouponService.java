package org.example.acmeplex.service;

import jakarta.persistence.EntityNotFoundException;
import org.example.acmeplex.model.Coupon;
import org.example.acmeplex.model.Ticket;
import org.example.acmeplex.model.User;
import org.example.acmeplex.repository.CouponRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.Date;
import java.util.List;

@Service
public class CouponService {

    @Autowired
    private CouponRepository couponRepository;

    public Coupon createCoupon(User user, Ticket ticket, Double refundAmount) {
        Coupon coupon = new Coupon();
        coupon.setUser(user);
        coupon.setTicket(ticket);
        coupon.setValue(refundAmount);
        coupon.setEmail(user.getEmail());
        coupon.setExpiryDate(new Date(System.currentTimeMillis() + (365L * 24 * 60 * 60 * 1000))); // One year
        coupon.setStatus("ACTIVE");
        return couponRepository.save(coupon);
    }

    public List<Coupon> getCouponsByUser(User user) {
        return couponRepository.findByUser(user);
    }

    public void deactivateCoupon(Long couponID) {
        Coupon coupon = couponRepository.findById(couponID)
                .orElseThrow(() -> new EntityNotFoundException("Coupon not found"));
        coupon.setStatus("INACTIVE");
        couponRepository.save(coupon);
    }
}


