package org.example.acmeplex.controller;

import org.example.acmeplex.model.Transaction;
import org.example.acmeplex.model.Ticket;
import org.example.acmeplex.service.TransactionService;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/transactions")
public class TransactionController {

    private final TransactionService transactionService;

    public TransactionController(TransactionService transactionService) {
        this.transactionService = transactionService;
    }

    @PostMapping
    public Transaction createTransaction(@RequestBody Transaction transaction) {
        return transactionService.createTransaction(transaction);
    }

    @GetMapping("/{transactionID}/tickets")
    public List<Ticket> getTicketsByTransactionId(@PathVariable Integer transactionID) {
        return transactionService.getTicketsByTransactionId(transactionID);
    }
}
