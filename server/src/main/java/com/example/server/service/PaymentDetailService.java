package com.example.server.service;

import com.example.server.model.PaymentDetail;
import com.example.server.repository.PaymentDetailRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class PaymentDetailService {
    @Autowired
    PaymentDetailRepository paymentDetailRepository;

    public PaymentDetail pay(PaymentDetail paymentDetail){
        return paymentDetailRepository.save(paymentDetail);
    }
}
