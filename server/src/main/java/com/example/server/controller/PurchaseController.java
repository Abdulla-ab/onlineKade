package com.example.server.controller;

import com.example.server.model.PurchaseHistory;
import com.example.server.service.PurchaseService;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/purchase")
public class PurchaseController {

    @Autowired
    PurchaseService purchaseService;

    @PostMapping
    public PurchaseHistory addToPurchase(@RequestBody PurchaseHistory purchaseHistory, HttpServletRequest httpServletRequest){
        return purchaseService.addToPurchase(purchaseHistory);
    }
}
