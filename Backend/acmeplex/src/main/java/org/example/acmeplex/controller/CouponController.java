package org.example.acmeplex.controller;

import org.example.acmeplex.model.Coupon;
import org.example.acmeplex.service.CouponService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/coupons")
public class CouponController {

    @Autowired
    private CouponService couponService;

    @PostMapping("/create")
    public Coupon createCoupon(@RequestBody Coupon coupon) {
        return couponService.createCoupon(coupon);
    }

    @PutMapping("/updateValue/{couponID}")
    public Coupon updateCouponValue(@PathVariable Integer couponID, @RequestParam Double value) {
        return couponService.updateCouponValue(couponID, value);
    }

    @PutMapping("/deactivate/{couponID}")
    public void deactivateCoupon(@PathVariable Integer couponID) {
        couponService.deactivateCoupon(couponID);
    }
}
