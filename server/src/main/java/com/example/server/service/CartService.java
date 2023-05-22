package com.example.server.service;

import com.example.server.model.Buyer;
import com.example.server.model.CartItem;
import com.example.server.model.Product;
import com.example.server.repository.CartItemRepository;
import com.example.server.repository.ProductRepository;
import com.example.server.repository.UserRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.crossstore.ChangeSetPersister;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class CartService {
    @Autowired
    private CartItemRepository cartItemRepository;

    @Autowired
    private ProductRepository productRepository;

    @Autowired
    private UserRepository userRepository;

    public CartItem addToCart(CartItem cartItem){
        return cartItemRepository.save(cartItem);
    }

    @Transactional
    public ResponseEntity<?> removeCartItem(Long cartId){
        cartItemRepository.deleteByCartId(cartId);
        return ResponseEntity.ok("Success");
    }
}
