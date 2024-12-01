package org.example.acmeplex.service;

import org.example.acmeplex.dto.PaymentInfoDTO;
import org.example.acmeplex.model.PaymentInfo;
import org.example.acmeplex.repository.PaymentInfoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class PaymentInfoService {

    @Autowired
    private PaymentInfoRepository paymentInfoRepository;

    // Convert PaymentInfo to PaymentInfoDTO
    private PaymentInfoDTO convertToDTO(PaymentInfo paymentInfo) {
        return new PaymentInfoDTO(
                paymentInfo.getPaymentInfoID(),
                paymentInfo.getCardType(),
                paymentInfo.getCardHolderName(),
                paymentInfo.getBillingAddress(),
                paymentInfo.getExpiryMonth(),
                paymentInfo.getExpiryYear()
        );
    }

    // Create or Update PaymentInfo
    public PaymentInfoDTO savePaymentInfo(PaymentInfo paymentInfo) {
        PaymentInfo savedPaymentInfo = paymentInfoRepository.save(paymentInfo);
        return convertToDTO(savedPaymentInfo);
    }

    // Get all PaymentInfo records
    public List<PaymentInfoDTO> getAllPaymentInfo() {
        return paymentInfoRepository.findAll().stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    // Get a PaymentInfo by ID
    public Optional<PaymentInfoDTO> getPaymentInfoById(int id) {
        return paymentInfoRepository.findById(id)
                .map(this::convertToDTO);
    }

    // Delete PaymentInfo by ID
    public void deletePaymentInfo(int id) {
        paymentInfoRepository.deleteById(id);
    }
}
