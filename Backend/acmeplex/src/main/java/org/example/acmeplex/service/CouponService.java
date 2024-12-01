//CouponService.java
package org.example.acmeplex.service;

import jakarta.persistence.EntityNotFoundException;
import org.example.acmeplex.dto.CouponDTO;
import org.example.acmeplex.model.Coupon;
import org.example.acmeplex.model.Ticket;
import org.example.acmeplex.model.User;
import org.example.acmeplex.repository.CouponRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Calendar;
import java.util.Date;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class CouponService {

    @Autowired
    private CouponRepository couponRepository;

    // Convert Coupon entity to DTO
    private CouponDTO convertToDTO(Coupon coupon) {
        return new CouponDTO(
                coupon.getCouponID(),
                coupon.getEmail(),
                coupon.getValue(),
                coupon.getExpiryDate(),
                coupon.getStatus());
    }

    public List<CouponDTO> getAllCoupons() {
        return couponRepository.findAll().stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    public CouponDTO getCouponById(Long id) {
        return couponRepository.findById(id)
                .map(this::convertToDTO)
                .orElseThrow(() -> new EntityNotFoundException("Coupon not found"));
    }

    public Coupon getCouponEntityById(Long couponID) {
        return couponRepository.findById(couponID)
                .orElseThrow(() -> new EntityNotFoundException("Coupon not found with ID: " + couponID));
    }

    @Transactional
    public Coupon createCoupon(User user, Ticket ticket, Double value) {
        Coupon coupon = new Coupon();
        coupon.setUser(user);
        coupon.setTicket(ticket);
        coupon.setValue(value);
        coupon.setEmail(user.getEmail());
        // Set expiry date to one year from now
        Calendar calendar = Calendar.getInstance();
        calendar.add(Calendar.YEAR, 1);
        coupon.setExpiryDate(calendar.getTime());
        coupon.setStatus("ACTIVE");

        return couponRepository.save(coupon);
    }

    public List<Coupon> getCouponsByUser(User user) {
        return couponRepository.findByUser(user);
    }

    public void deactivateCoupon(Long couponID) {
        Coupon coupon = couponRepository.findById(couponID)
                .orElseThrow(() -> new EntityNotFoundException("Coupon not found"));
        coupon.setStatus("EXPIRED");
        couponRepository.save(coupon);
    }

    @Transactional
    public Coupon applyCoupon(Long couponID, Double amountToDeduct) {
        Coupon coupon = couponRepository.findById(couponID)
                .orElseThrow(() -> new IllegalArgumentException("Coupon not found"));

        // Validate coupon
        if (!"ACTIVE".equals(coupon.getStatus())) {
            throw new IllegalStateException("Coupon is not active");
        }

        if (coupon.getExpiryDate().before(new Date())) {
            throw new IllegalStateException("Coupon is expired");
        }

        // Always deduct the full amount requested
        double currentValue = coupon.getValue();
        if (currentValue <= 0) {
            throw new IllegalStateException("Coupon has no remaining value");
        }

        // Deduct the full amount
        coupon.setValue(0.0);
        coupon.setStatus("USED");

        return couponRepository.save(coupon);
    }

    public Double getRemainingValue(Long couponID) {
        Coupon coupon = couponRepository.findById(couponID)
                .orElseThrow(() -> new IllegalArgumentException("Coupon not found"));
        return coupon.getValue();
    }

    public boolean isValidForUse(Long couponID, Double amount) {
        try {
            Coupon coupon = couponRepository.findById(couponID)
                    .orElseThrow(() -> new IllegalArgumentException("Coupon not found"));

            return "ACTIVE".equals(coupon.getStatus()) &&
                    coupon.getExpiryDate().after(new Date()) &&
                    coupon.getValue() > 0;
        } catch (Exception e) {
            return false;
        }
    }

    public List<Coupon> getCouponsByEmail(String email) {
        return couponRepository.findByEmailAndStatusOrderByExpiryDateAsc(email, "ACTIVE");
    }

    // public Double getRemainingCouponValue(Long couponID) {
    // Coupon coupon = couponRepository.findById(couponID)
    // .orElseThrow(() -> new IllegalArgumentException("Coupon not found"));
    // return coupon.getRemainingValue();
    // }

}
