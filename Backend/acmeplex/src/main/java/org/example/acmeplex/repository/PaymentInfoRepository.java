package org.example.acmeplex.repository;

import org.example.acmeplex.model.PaymentInfo;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PaymentInfoRepository extends JpaRepository<PaymentInfo, Integer> {
}
