package org.example.acmeplex.repository;

import org.example.acmeplex.model.PaymentInfo;
import org.example.acmeplex.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface PaymentInfoRepository extends JpaRepository<PaymentInfo, Long> {
    List<PaymentInfo> findByUser(User user);
}
