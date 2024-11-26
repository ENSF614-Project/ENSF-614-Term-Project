package org.example.acmeplex.service;

import org.example.acmeplex.model.Coupon;
import org.example.acmeplex.repository.CouponRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.Date;

@Service
public class CouponService {

    @Autowired
    private CouponRepository couponRepository;

    public Coupon createCoupon(Coupon coupon) {
        coupon.setStatus("Active");
        coupon.setExpiryDate(new Date(System.currentTimeMillis() + 365L * 24 * 60 * 60 * 1000)); // 1 year expiry
        return couponRepository.save(coupon);
    }

    public Coupon updateCouponValue(Integer couponID, Double newValue) {
        Coupon coupon = couponRepository.findById(couponID).orElse(null);
        if (coupon != null) {
            coupon.setValue(newValue);
            return couponRepository.save(coupon);
        }
        throw new IllegalArgumentException("Coupon not found");
    }

    public void deactivateCoupon(Integer couponID) {
        Coupon coupon = couponRepository.findById(couponID).orElse(null);
        if (coupon != null) {
            coupon.setStatus("Inactive");
            couponRepository.save(coupon);
        } else {
            throw new IllegalArgumentException("Coupon not found");
        }
    }
}
