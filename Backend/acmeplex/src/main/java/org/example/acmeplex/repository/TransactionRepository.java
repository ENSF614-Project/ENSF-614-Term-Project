package org.example.acmeplex.repository;

import org.example.acmeplex.model.Transaction;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TransactionRepository extends JpaRepository<Transaction, Integer> {}
