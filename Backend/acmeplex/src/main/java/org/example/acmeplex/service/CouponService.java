package org.example.acmeplex.service;

import jakarta.persistence.EntityNotFoundException;
import jakarta.transaction.Transactional;
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
        coupon.setOriginalValue(refundAmount);
        coupon.setRemainingValue(refundAmount);
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
        coupon.setStatus("EXPIRED");
        couponRepository.save(coupon);
    }

    @Transactional
    public Coupon applyCoupon(Long couponID, Double amountToDeduct) {
        Coupon coupon = couponRepository.findById(couponID)
                .orElseThrow(() -> new IllegalArgumentException("Coupon not found"));

        if (coupon.getRemainingValue() <= 0) {
            throw new IllegalStateException("Coupon has no remaining value");
        }

        if (coupon.getExpiryDate().before(new Date())) {
            throw new IllegalStateException("Coupon is expired");
        }

        double newRemainingValue = coupon.getRemainingValue() - amountToDeduct;
        if (newRemainingValue < 0) {
            throw new IllegalArgumentException("Coupon does not have enough value to cover this amount");
        }

        coupon.setRemainingValue(newRemainingValue);

        // Update the status if the coupon is fully used
        if (newRemainingValue == 0) {
            coupon.setStatus("USED");
        }

        return couponRepository.save(coupon);
    }

    public Double getRemainingCouponValue(Long couponID) {
        Coupon coupon = couponRepository.findById(couponID)
                .orElseThrow(() -> new IllegalArgumentException("Coupon not found"));
        return coupon.getRemainingValue();
    }
}


