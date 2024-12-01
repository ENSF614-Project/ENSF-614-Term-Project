package org.example.acmeplex.controller;

import org.example.acmeplex.dto.TransactionDTO;
import org.example.acmeplex.dto.UserDTO;
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
    public ResponseEntity<List<TransactionDTO>> getAllTransactions() {
        List<TransactionDTO> transactions = transactionService.getAllTransactions();
        return ResponseEntity.status(HttpStatus.OK).body(transactions);
    }

    // Create a transaction with optional coupon
    @PostMapping("/create")
    public ResponseEntity<TransactionDTO> createTransaction(
            @RequestParam(required = false) Integer userId,
            @RequestParam Double totalAmount,
            @RequestParam(required = false) Long couponId) {
        try {
            UserDTO userDTO = null;
            if (userId != null) {
                userDTO = new UserDTO(userId, null, null);
            }
            TransactionDTO transaction = transactionService.createTransaction(userDTO, totalAmount, couponId);
            return ResponseEntity.status(HttpStatus.CREATED).body(transaction);
        } catch (Exception e) {
            System.err.println("Error creating transaction: " + e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    // Get all transactions by user
    @GetMapping("/user/{userId}")
    public ResponseEntity<List<TransactionDTO>> getTransactionsByUser(@PathVariable Integer userId) {
        User user = new User();
        user.setUserId(userId);
        List<TransactionDTO> transactions = transactionService.getTransactionsByUser(user);
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
