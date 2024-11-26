package org.example.acmeplex.service;

import org.example.acmeplex.model.Transaction;
import org.example.acmeplex.repository.TransactionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class TransactionService {

    @Autowired
    private TransactionRepository transactionRepository;

    public Transaction createTransaction(Transaction transaction) {
        transaction.setTransactionDate(new java.util.Date());
        return transactionRepository.save(transaction);
    }

    public List<Transaction> getTransactionsByUser(Integer userID) {
        return transactionRepository.findByUserID(userID);
    }

    public Transaction getTransactionById(Integer transactionID) {
        return transactionRepository.findById(transactionID).orElse(null);
    }
}
