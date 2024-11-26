package org.example.acmeplex.service;

import org.example.acmeplex.model.Coupon;
import org.example.acmeplex.repository.CouponRepository;
import org.springframework.stereotype.Service;
import java.util.Date;
import java.util.List;

@Service
public class CouponService {

    private final CouponRepository couponRepository;

    public CouponService(CouponRepository couponRepository) {
        this.couponRepository = couponRepository;
    }

    public List<Coupon> getValidCouponsByUserId(Integer userId) {
        return couponRepository.findByUserUserIdAndExpiryDateAfterAndStatus(userId, new Date(), "Valid");
    }
}
