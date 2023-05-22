package com.example.server.service;

import com.example.server.model.CartItem;
import com.example.server.model.PurchaseHistory;
import com.example.server.repository.PurchaseHistoryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class PurchaseService {
    @Autowired
    PurchaseHistoryRepository purchaseHistoryRepository;

    public PurchaseHistory addToPurchase(PurchaseHistory purchaseHistory){
        return purchaseHistoryRepository.save(purchaseHistory);
    }
}
