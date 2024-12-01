package org.example.acmeplex.service;

import jakarta.persistence.EntityNotFoundException;
import jakarta.transaction.Transactional;
import org.example.acmeplex.model.Coupon;
import org.example.acmeplex.model.Transaction;
import org.example.acmeplex.model.User;
import org.example.acmeplex.repository.TransactionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.Date;
import java.util.List;

@Service
public class TransactionService {
    private final CouponService couponService;
    private final TransactionRepository transactionRepository;

    @Autowired
    public TransactionService(CouponService couponService, TransactionRepository transactionRepository) {
        this.couponService = couponService;
        this.transactionRepository = transactionRepository;
    }

    public List<Transaction> getAllTransactions() {
        return transactionRepository.findAll();
    }

    public Transaction createTransaction(User user, Double amount, Long couponID) {
        Coupon coupon = null;
        double finalAmount = amount;

        if (couponID != null) {
            coupon = couponService.getCouponById(couponID);
            // Apply coupon logic here
        }

        Transaction transaction = new Transaction();
        if (user != null) {
            transaction.setUser(user);
        }
        transaction.setTotal(finalAmount);
        transaction.setCoupon(coupon);
        transaction.setPaymentMethod("Credit");
        transaction.setTransactionDate(new Date());
        transaction.setTransactionSuccessful(true); // Assume success for now
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