package org.example.acmeplex.service;

import org.example.acmeplex.model.Transaction;
import org.example.acmeplex.repository.TransactionRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class TransactionService {

    private final TransactionRepository transactionRepository;

    public TransactionService(TransactionRepository transactionRepository) {
        this.transactionRepository = transactionRepository;
    }

    public Transaction createTransaction(Transaction transaction) {
        return transactionRepository.save(transaction);
    }

    public List<Transaction> getTransactionsByUserId(Integer userId) {
        return transactionRepository.findByUserUserId(userId);
    }

    public void processRefund(Integer transactionID, Double refundAmount) {
        Transaction transaction = transactionRepository.findById(transactionID).orElse(null);
        if (transaction != null && refundAmount > 0) {
            transaction.setTotal(transaction.getTotal() - refundAmount);
            transactionRepository.save(transaction);
        }
    }
}
