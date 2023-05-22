package com.example.server.service;

import com.example.server.model.Buyer;
import com.example.server.repository.CartItemRepository;
import com.example.server.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private CartItemRepository cartItemRepository;

    public Buyer findByEmail(String email) {
        return userRepository.findByEmail(email);
    }

    public List<Buyer> getAllUsers(){
        return userRepository.findAll();
    }

    public Buyer save(Buyer buyer) {
        return userRepository.save(buyer);
    }

    public Optional<Buyer> getUserById(Long buyerId){
        return userRepository.findById(buyerId);
    }

}
