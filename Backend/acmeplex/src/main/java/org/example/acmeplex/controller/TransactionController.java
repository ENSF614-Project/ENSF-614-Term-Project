package org.example.acmeplex.controller;

import org.example.acmeplex.model.Transaction;
import org.example.acmeplex.service.TransactionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/transactions")
public class TransactionController {

    @Autowired
    private TransactionService transactionService;

    @PostMapping("/create")
    public Transaction createTransaction(@RequestBody Transaction transaction) {
        return transactionService.createTransaction(transaction);
    }

    @GetMapping("/user/{userID}")
    public List<Transaction> getTransactionsByUser(@PathVariable Integer userID) {
        return transactionService.getTransactionsByUser(userID);
    }

    @GetMapping("/{transactionID}")
    public Transaction getTransactionById(@PathVariable Integer transactionID) {
        return transactionService.getTransactionById(transactionID);
    }
}
