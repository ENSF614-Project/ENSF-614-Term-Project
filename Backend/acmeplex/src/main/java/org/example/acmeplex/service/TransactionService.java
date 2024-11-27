package org.example.acmeplex.service;

import jakarta.persistence.EntityNotFoundException;
import org.example.acmeplex.model.Coupon;
import org.example.acmeplex.model.Transaction;
import org.example.acmeplex.model.User;
import org.example.acmeplex.repository.CouponRepository;
import org.example.acmeplex.repository.TransactionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.Date;
import java.util.List;

@Service
public class TransactionService {

    @Autowired
    private TransactionRepository transactionRepository;

    @Autowired
    private CouponRepository couponRepository;

    public Transaction createTransaction(User user, Double total, String paymentMethod, Coupon coupon) {
        Transaction transaction = new Transaction();
        transaction.setUser(user);
        transaction.setTotal(total);
        transaction.setPaymentMethod(paymentMethod);
        transaction.setTransactionDate(new Date());
        transaction.setTransactionSuccessful(true); // Assume success by default
        transaction.setCoupon(coupon);
        return transactionRepository.save(transaction);
    }

    public List<Transaction> getTransactionsByUser(User user) {
        return transactionRepository.findByUser(user);
    }

    public void updateTransactionStatus(Long transactionID, boolean successful) {
        Transaction transaction = transactionRepository.findById(transactionID)
                .orElseThrow(() -> new EntityNotFoundException("Transaction not found"));
        transaction.setTransactionSuccessful(successful);
        transactionRepository.save(transaction);
    }
}