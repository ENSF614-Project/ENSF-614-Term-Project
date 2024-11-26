package org.example.acmeplex.service;

import org.example.acmeplex.model.Ticket;
import org.example.acmeplex.model.Transaction;
import org.example.acmeplex.repository.TicketRepository;
import org.example.acmeplex.repository.TransactionRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class TransactionService {

    private final TransactionRepository transactionRepository;
    private final TicketRepository ticketRepository;

    public TransactionService(TransactionRepository transactionRepository, TicketRepository ticketRepository) {
        this.transactionRepository = transactionRepository;
        this.ticketRepository = ticketRepository;
    }

    // Create a new transaction
    public Transaction createTransaction(Transaction transaction) {
        return transactionRepository.save(transaction);
    }

    // Get a transaction by ID
    public Transaction getTransactionById(Integer transactionID) {
        return transactionRepository.findById(transactionID).orElse(null);
    }

    // Fetch tickets associated with a specific transaction
    public List<Ticket> getTicketsByTransactionId(Integer transactionID) {
        return ticketRepository.findByTransactionTransactionID(transactionID);
    }
}
