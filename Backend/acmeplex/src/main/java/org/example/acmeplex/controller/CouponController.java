package org.example.acmeplex.controller;

import org.example.acmeplex.model.Coupon;
import org.example.acmeplex.service.CouponService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/coupons")
public class CouponController {

    private final CouponService couponService;

    public CouponController(CouponService couponService) {
        this.couponService = couponService;
    }

    @GetMapping("/user/{userId}")
    public List<Coupon> getValidCoupons(@PathVariable Integer userId) {
        return couponService.getValidCouponsByUserId(userId);
    }
}
