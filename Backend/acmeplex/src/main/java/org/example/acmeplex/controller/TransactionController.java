package org.example.acmeplex.controller;

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

    @GetMapping
    public ResponseEntity<List<Transaction>> getAllTransactions() {
        List<Transaction> transactions = transactionService.getAllTransactions();
        return new ResponseEntity<>(transactions, HttpStatus.OK);
    }

    // Create a transaction with optional coupon
    @PostMapping("/create")
    public ResponseEntity<Transaction> createTransaction(
            @RequestParam(required = false) Integer userId,
            @RequestParam Double totalAmount,
            @RequestParam(required = false) Long couponId) {
        try {
            User user = null;
            if (userId != null) {
                user = new User();
                user.setUserId(userId);
            }
            Transaction transaction = transactionService.createTransaction(user, totalAmount, couponId);
            return ResponseEntity.status(HttpStatus.CREATED).body(transaction);
        } catch (Exception e) {
            System.err.println("Error creating transaction: " + e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }
    // Get all transactions by user
    @GetMapping("/user/{userId}")
    public ResponseEntity<List<Transaction>> getTransactionsByUser(@PathVariable Integer userId) {
        User user = new User();
        user.setUserId(userId);
        List<Transaction> transactions = transactionService.getTransactionsByUser(user);
        return ResponseEntity.ok(transactions);
    }

    // Update transaction status
    @PutMapping("/{transactionId}/status")
    public ResponseEntity<String> updateTransactionStatus(
            @PathVariable Long transactionId,
            @RequestParam Boolean successful) {
        transactionService.updateTransactionStatus(transactionId, successful);
        return ResponseEntity.ok("Transaction status updated successfully.");
    }
}
