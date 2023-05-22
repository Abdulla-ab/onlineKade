package com.example.server.controller;

import com.example.server.model.CartItem;
import com.example.server.service.CartService;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.crossstore.ChangeSetPersister;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api")
public class CartController {
    @Autowired
    private CartService cartService;

    @PostMapping("/cart")
    public CartItem addToCart(@RequestBody CartItem cartItem, HttpServletRequest httpServletRequest){
        return cartService.addToCart(cartItem);
    }

    @DeleteMapping("/cart/{cartId}")
    public ResponseEntity<?> removeCartItem(@PathVariable("cartId") Long cartId){
        return cartService.removeCartItem(cartId);
    }

}
