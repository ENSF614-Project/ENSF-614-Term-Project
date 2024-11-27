package org.example.acmeplex.controller;

import org.example.acmeplex.model.Coupon;
import org.example.acmeplex.model.Transaction;
import org.example.acmeplex.model.User;
import org.example.acmeplex.service.TransactionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/transactions")
public class TransactionController {

    @Autowired
    private TransactionService transactionService;

    @PostMapping("/create")
    public ResponseEntity<Transaction> createTransaction(
            @RequestParam Integer userId,
            @RequestParam Double total,
            @RequestParam String paymentMethod,
            @RequestParam(required = false) Long couponId) {
        User user = new User();
        user.setUserId(userId); // Assuming minimal User object for the service
        Coupon coupon = null;
        if (couponId != null) {
            coupon = new Coupon();
            coupon.setCouponID(couponId); // Minimal Coupon object for the service
        }
        Transaction transaction = transactionService.createTransaction(user, total, paymentMethod, coupon);
        return ResponseEntity.status(HttpStatus.CREATED).body(transaction);
    }

    @GetMapping("/user/{userId}")
    public ResponseEntity<List<Transaction>> getTransactionsByUser(@PathVariable Integer userId) {
        User user = new User();
        user.setUserId(userId); // Minimal User object for the service
        List<Transaction> transactions = transactionService.getTransactionsByUser(user);
        return ResponseEntity.ok(transactions);
    }

    @PutMapping("/{transactionId}/status")
    public ResponseEntity<String> updateTransactionStatus(
            @PathVariable Long transactionId,
            @RequestParam Boolean successful) {
        transactionService.updateTransactionStatus(transactionId, successful);
        return ResponseEntity.ok("Transaction status updated successfully");
    }
}

