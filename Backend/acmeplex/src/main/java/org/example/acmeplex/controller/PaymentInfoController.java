package org.example.acmeplex.controller;

import org.example.acmeplex.dto.PaymentInfoDTO;
import org.example.acmeplex.service.PaymentInfoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.example.acmeplex.model.PaymentInfo;

import java.util.List;

@RestController
@RequestMapping("/api/paymentinfo")
public class PaymentInfoController {

    @Autowired
    private PaymentInfoService paymentInfoService;

    // Create or Update PaymentInfo
    @PostMapping
    public PaymentInfoDTO savePaymentInfo(@RequestBody PaymentInfo paymentInfo) {
        return paymentInfoService.savePaymentInfo(paymentInfo);
    }

    // Get all PaymentInfo records
    @GetMapping
    public List<PaymentInfoDTO> getAllPaymentInfo() {
        return paymentInfoService.getAllPaymentInfo();
    }

    // Get a PaymentInfo by ID
    @GetMapping("/{id}")
    public PaymentInfoDTO getPaymentInfoById(@PathVariable int id) {
        return paymentInfoService.getPaymentInfoById(id).orElse(null);
    }

    // Delete PaymentInfo by ID
    @DeleteMapping("/{id}")
    public String deletePaymentInfo(@PathVariable int id) {
        paymentInfoService.deletePaymentInfo(id);
        return "PaymentInfo with ID " + id + " deleted successfully.";
    }
}
