package org.example.acmeplex.repository;

import org.example.acmeplex.model.Transaction;
import org.example.acmeplex.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface TransactionRepository extends JpaRepository<Transaction, Long> {
    List<Transaction> findByUser(User user);
}