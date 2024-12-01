//CouponController.java
package org.example.acmeplex.controller;

import org.example.acmeplex.model.Coupon;
import org.example.acmeplex.model.User;
import org.example.acmeplex.service.CouponService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/coupons")
public class CouponController {

    @Autowired
    private CouponService couponService;

    @GetMapping
    public ResponseEntity<List<Coupon>> getAllCoupons() {
        List<Coupon> coupons = couponService.getAllCoupons();
        return new ResponseEntity<>(coupons, HttpStatus.OK);
    }
    @GetMapping("/{couponId}")
    public ResponseEntity<Coupon> getCouponById(@PathVariable long couponId) {
        Coupon coupon = couponService.getCouponById(couponId);
        return new ResponseEntity<>(coupon, HttpStatus.OK);
    }

    // Get all coupons by user
    @GetMapping("/user/{userId}")
    public ResponseEntity<List<Coupon>> getCouponsByUser(@PathVariable Integer userId) {
        User user = new User();
        user.setUserId(userId);
        List<Coupon> coupons = couponService.getCouponsByUser(user);
        return ResponseEntity.ok(coupons);
    }

    // Deactivate a coupon
    @PutMapping("/{couponId}/deactivate")
    public ResponseEntity<String> deactivateCoupon(@PathVariable Long couponId) {
        couponService.deactivateCoupon(couponId);
        return ResponseEntity.ok("Coupon deactivated successfully.");
    }

    // Apply a coupon to a transaction
    @PostMapping("/apply")
    public ResponseEntity<Coupon> applyCoupon(
            @RequestParam Long couponID,
            @RequestParam Double amount) {
        Coupon updatedCoupon = couponService.applyCoupon(couponID, amount);
        return ResponseEntity.ok(updatedCoupon);
    }

    @GetMapping("/email/{email}")
    public Optional<List<Coupon>> getCouponByEmail(@PathVariable String email) {
        return couponService.getCouponsByEmail(email);
    }

    // Get remaining value of a coupon
    //@GetMapping("/{couponID}/remaining-value")
    //public ResponseEntity<Double> getRemainingCouponValue(@PathVariable Long couponID) {
    //    Double remainingValue = couponService.getRemainingCouponValue(couponID);
    //    return ResponseEntity.ok(remainingValue);
    //}

}