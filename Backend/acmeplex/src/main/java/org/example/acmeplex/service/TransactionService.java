package org.example.acmeplex.service;

import jakarta.persistence.EntityNotFoundException;
import org.example.acmeplex.dto.TransactionDTO;
import org.example.acmeplex.dto.UserDTO;
import org.example.acmeplex.model.Coupon;
import org.example.acmeplex.model.Transaction;
import org.example.acmeplex.model.User;
import org.example.acmeplex.repository.TransactionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.Date;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class TransactionService {
    private final CouponService couponService;
    private final TransactionRepository transactionRepository;

    @Autowired
    public TransactionService(CouponService couponService, TransactionRepository transactionRepository) {
        this.couponService = couponService;
        this.transactionRepository = transactionRepository;
    }

    // Convert Transaction entity to DTO
    private TransactionDTO convertToDTO(Transaction transaction) {
        return new TransactionDTO(
                transaction.getTransactionID(),
                transaction.getTotal(),
                transaction.getPaymentMethod(),
                transaction.getTransactionDate(),
                transaction.getTransactionSuccessful()
        );
    }

    public List<TransactionDTO> getAllTransactions() {
        return transactionRepository.findAll().stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    public TransactionDTO createTransaction(UserDTO userDTO, Double amount, Long couponID) {
        Coupon coupon = null;
        double finalAmount = amount;

        if (couponID != null) {
            // Fetch the Coupon entity directly
            coupon = couponService.getCouponEntityById(couponID);
            // Apply coupon logic here (if any additional processing is needed)
        }

        // Convert UserDTO to User
        User user = null;
        if (userDTO != null) {
            user = new User();
            user.setUserId(userDTO.getUserId());
            user.setEmail(userDTO.getEmail());
            user.setIsRU(userDTO.getIsRU());
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
        transaction = transactionRepository.save(transaction);

        return convertToDTO(transaction);
    }

    public Transaction createTransactionEntity(User user, Double amount, Long couponID) {
        Coupon coupon = null;
        double finalAmount = amount;

        if (couponID != null) {
            coupon = couponService.getCouponEntityById(couponID); // Fetch Coupon entity
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



    public List<TransactionDTO> getTransactionsByUser(User user) {
        return transactionRepository.findByUser(user).stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    public void updateTransactionStatus(Long transactionID, boolean successful) {
        Transaction transaction = transactionRepository.findById(transactionID)
                .orElseThrow(() -> new EntityNotFoundException("Transaction not found"));
        transaction.setTransactionSuccessful(successful);
        transactionRepository.save(transaction);
    }
}
