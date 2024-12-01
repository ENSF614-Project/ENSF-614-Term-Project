package org.example.acmeplex.controller;

import org.example.acmeplex.model.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.example.acmeplex.model.PaymentInfo;
import org.example.acmeplex.service.PaymentInfoService;

import java.util.List;

@RestController
@RequestMapping("/api/paymentinfo")
public class PaymentInfoController {

    @Autowired
    private PaymentInfoService paymentInfoService;

    // Create or Update PaymentInfo
    @PostMapping
    public PaymentInfo savePaymentInfo(@RequestBody PaymentInfo paymentInfo) {
        return paymentInfoService.savePaymentInfo(paymentInfo);
    }

    // Get all PaymentInfo records
    @GetMapping
    public List<PaymentInfo> getAllPaymentInfo() {
        return paymentInfoService.getAllPaymentInfo();
    }

    // Get a PaymentInfo by ID
    @GetMapping("/{id}")
    public PaymentInfo getPaymentInfoById(@PathVariable Long id) {
        return paymentInfoService.getPaymentInfoById(id).orElse(null);
    }

    // Delete PaymentInfo by ID
    @DeleteMapping("/{id}")
    public String deletePaymentInfo(@PathVariable Long id) {
        paymentInfoService.deletePaymentInfo(id);
        return "PaymentInfo with ID " + id + " deleted successfully.";
    }

    // Get payment info by user
    @GetMapping("/user/{userId}")
    public ResponseEntity<List<PaymentInfo>> getPaymentInfoByUser(@PathVariable Integer userId) {
        User user = new User();
        user.setUserId(userId);
        List<PaymentInfo> paymentInfoList = paymentInfoService.getPaymentInfoByUser(user);
        return ResponseEntity.ok(paymentInfoList);
    }
}
