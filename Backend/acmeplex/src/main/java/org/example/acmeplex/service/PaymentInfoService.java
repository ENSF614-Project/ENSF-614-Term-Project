package org.example.acmeplex.service;

import org.example.acmeplex.model.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.example.acmeplex.model.PaymentInfo;
import org.example.acmeplex.repository.PaymentInfoRepository;

import java.util.List;
import java.util.Optional;

@Service
public class PaymentInfoService {

    @Autowired
    private PaymentInfoRepository paymentInfoRepository;

    // Create or Update PaymentInfo
    public PaymentInfo savePaymentInfo(PaymentInfo paymentInfo) {
        return paymentInfoRepository.save(paymentInfo);
    }

    // Get all PaymentInfo records
    public List<PaymentInfo> getAllPaymentInfo() {
        return paymentInfoRepository.findAll();
    }

    // Get a PaymentInfo by ID
    public Optional<PaymentInfo> getPaymentInfoById(Long id) {
        return paymentInfoRepository.findById(id);
    }

    // Delete PaymentInfo by ID
    public void deletePaymentInfo(Long id) {
        paymentInfoRepository.deleteById(id);
    }

    //Get PaymentInfo by User
    public List<PaymentInfo> getPaymentInfoByUser(User user) {
        return paymentInfoRepository.findByUser(user);
    }
}
