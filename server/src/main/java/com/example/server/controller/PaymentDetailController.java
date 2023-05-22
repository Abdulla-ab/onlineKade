package com.example.server.controller;

import com.example.server.model.PaymentDetail;
import com.example.server.service.PaymentDetailService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api")
public class PaymentDetailController {

    @Autowired
    private PaymentDetailService paymentDetailService;

    @PostMapping("/payment")
    public PaymentDetail pay(@RequestBody PaymentDetail paymentDetail){
        return paymentDetailService.pay(paymentDetail);
    }
}
