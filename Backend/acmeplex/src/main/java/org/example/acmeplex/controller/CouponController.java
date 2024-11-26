package org.example.acmeplex.controller;

import org.example.acmeplex.model.Coupon;
import org.example.acmeplex.service.CouponService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/coupons")
public class CouponController {

    @Autowired
    private CouponService couponService;

    @PostMapping
    public Coupon createCoupon(@RequestBody Coupon coupon) {
        return couponService.createCoupon(coupon);
    }

    @GetMapping("/validate/{couponID}")
    public String validateCoupon(@PathVariable Integer couponID) {
        Coupon coupon = couponService.getCouponById(couponID);
        return couponService.validateCoupon(coupon) ? "Coupon is valid" : "Coupon is invalid";
    }
}
