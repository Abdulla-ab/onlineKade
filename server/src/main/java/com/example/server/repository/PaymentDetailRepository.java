package com.example.server.repository;

import com.example.server.model.PaymentDetail;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PaymentDetailRepository extends JpaRepository<PaymentDetail, Long> {
}
