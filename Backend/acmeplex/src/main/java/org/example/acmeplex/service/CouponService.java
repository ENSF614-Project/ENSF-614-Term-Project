package org.example.acmeplex.service;

import org.example.acmeplex.model.Coupon;
import org.example.acmeplex.repository.CouponRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class CouponService {

    @Autowired
    private CouponRepository couponRepository;

    public Coupon createCoupon(Coupon coupon) {
        return couponRepository.save(coupon);
    }

    public boolean validateCoupon(Coupon coupon) {
        return coupon.getExpiryDate().after(new Date()) && coupon.getStatus().equals("Valid");
    }
}
