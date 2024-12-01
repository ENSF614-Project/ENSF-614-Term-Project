//CouponController.java
package org.example.acmeplex.controller;

import org.example.acmeplex.model.Coupon;
import org.example.acmeplex.model.User;
import org.example.acmeplex.service.CouponService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
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
    public ResponseEntity<?> applyCoupon(@RequestParam Long couponID, @RequestParam Double amount) {
        try {
            // First validate the coupon
            if (!couponService.isValidForUse(couponID, amount)) {
                return ResponseEntity.badRequest()
                        .body("Coupon is not valid for use");
            }
            System.out.println("Applying coupon: " + couponID + " with amount: " + amount); // Debug log
            Coupon updatedCoupon = couponService.applyCoupon(couponID, amount);
            System.out.println("Updated coupon value: " + updatedCoupon.getValue()); // Debug log
            HashMap<Object, Object> response = new HashMap<>();
            response.put("coupon", updatedCoupon);
            response.put("remainingValue", updatedCoupon.getValue());
            response.put("message", "Coupon applied successfully");

            return ResponseEntity.ok(response);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest()
                    .body("Invalid coupon: " + e.getMessage());
        } catch (IllegalStateException e) {
            return ResponseEntity.badRequest()
                    .body("Coupon error: " + e.getMessage());
        }
    }

    @GetMapping("/email/{email}")
    public ResponseEntity<Optional<List<Coupon>>> getCouponsByEmail(@PathVariable String email) {
        try {
            Optional<List<Coupon>> coupons = Optional.ofNullable(couponService.getCouponsByEmail(email));
            return ResponseEntity.ok(coupons);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    @GetMapping("/{couponId}/remaining")
    public ResponseEntity<Double> getRemainingValue(@PathVariable Long couponId) {
        try {
            Double remainingValue = couponService.getRemainingValue(couponId);
            return ResponseEntity.ok(remainingValue);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.notFound().build();
        }
    }
}