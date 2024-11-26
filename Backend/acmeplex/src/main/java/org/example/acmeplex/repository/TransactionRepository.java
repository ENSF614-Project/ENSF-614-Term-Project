package org.example.acmeplex.repository;

import org.example.acmeplex.model.Transaction;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface TransactionRepository extends JpaRepository<Transaction, Integer> {
    List<Transaction> findByUserUserId(Integer userId);
    List<Transaction> findBySuccessful(Boolean successful);
}
