package org.example.acmeplex.service;

import org.example.acmeplex.model.Transaction;
import org.example.acmeplex.repository.TransactionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class TransactionService {

    @Autowired
    private TransactionRepository transactionRepository;

    public Transaction createTransaction(Transaction transaction) {
        return transactionRepository.save(transaction);
    }

    public Transaction getTransactionById(Integer transactionID) {
        return transactionRepository.findById(transactionID).orElse(null);
    }
}
