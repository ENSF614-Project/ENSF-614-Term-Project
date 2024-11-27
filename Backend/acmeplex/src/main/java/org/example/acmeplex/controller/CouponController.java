package org.example.acmeplex.controller;

import org.example.acmeplex.model.Coupon;
import org.example.acmeplex.model.User;
import org.example.acmeplex.service.CouponService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/coupons")
public class CouponController {

    @Autowired
    private CouponService couponService;

    @GetMapping("/user/{userId}")
    public ResponseEntity<List<Coupon>> getCouponsByUser(@PathVariable Integer userId) {
        User user = new User();
        user.setUserId(userId); // Assuming only the user ID is needed for this lookup
        List<Coupon> coupons = couponService.getCouponsByUser(user);
        return ResponseEntity.ok(coupons);
    }

    @PutMapping("/{couponId}/deactivate")
    public ResponseEntity<String> deactivateCoupon(@PathVariable Long couponId) {
        couponService.deactivateCoupon(couponId);
        return ResponseEntity.ok("Coupon deactivated successfully");
    }
}
