package org.example.acmeplex.controller;

import org.example.acmeplex.model.Transaction;
import org.example.acmeplex.service.TransactionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/transactions")
public class TransactionController {

    @Autowired
    private TransactionService transactionService;

    @PostMapping
    public Transaction createTransaction(@RequestBody Transaction transaction) {
        return transactionService.createTransaction(transaction);
    }

    @GetMapping("/{transactionID}")
    public Transaction getTransaction(@PathVariable Integer transactionID) {
        return transactionService.getTransactionById(transactionID);
    }
}
