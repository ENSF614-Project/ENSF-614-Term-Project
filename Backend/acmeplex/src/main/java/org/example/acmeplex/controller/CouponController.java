//CouponController.java
package org.example.acmeplex.controller;

import org.example.acmeplex.dto.CouponDTO;
import org.example.acmeplex.model.Coupon;
import org.example.acmeplex.model.User;
import org.example.acmeplex.service.CouponService;
import org.springframework.beans.factory.annotation.Autowired;
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
    public ResponseEntity<List<CouponDTO>> getAllCoupons() {
        List<CouponDTO> coupons = couponService.getAllCoupons();
        return ResponseEntity.ok(coupons);
    }

    @GetMapping("/{couponId}")
    public ResponseEntity<CouponDTO> getCouponById(@PathVariable long couponId) {
        CouponDTO coupon = couponService.getCouponById(couponId);
        return ResponseEntity.ok(coupon);
    }

    // Get all coupons by user
    @GetMapping("/user/{userId}")
    public ResponseEntity<List<CouponDTO>> getCouponsByUser(@PathVariable Integer userId) {
        User user = new User();
        user.setUserId(userId);
        List<CouponDTO> coupons = couponService.getCouponsByUser(user);
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
    public ResponseEntity<List<CouponDTO>> getCouponByEmail(@PathVariable String email) {
        Optional<List<CouponDTO>> coupons = couponService.getCouponsByEmail(email);
        return coupons.map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    // Get remaining value of a coupon
    //@GetMapping("/{couponID}/remaining-value")
    //public ResponseEntity<Double> getRemainingCouponValue(@PathVariable Long couponID) {
    //    Double remainingValue = couponService.getRemainingCouponValue(couponID);
    //    return ResponseEntity.ok(remainingValue);
    //}

}
