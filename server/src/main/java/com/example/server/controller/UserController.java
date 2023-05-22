package com.example.server.controller;

import com.example.server.model.Buyer;
import com.example.server.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequestMapping("/api/users")
public class UserController {

    @Autowired
    private UserService userService;

    @Autowired
    private BCryptPasswordEncoder bCryptPasswordEncoder;

    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody Buyer buyer) {
        if (userService.findByEmail(buyer.getEmail()) != null) {
            return new ResponseEntity<>("Email already exists", HttpStatus.BAD_REQUEST);
        }
        buyer.setPassword(bCryptPasswordEncoder.encode(buyer.getPassword()));
        Buyer registeredBuyer = userService.save(buyer);
        return ResponseEntity.ok(registeredBuyer.getBuyerId());
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody Buyer buyer) {
        Buyer dbBuyer = userService.findByEmail(buyer.getEmail());
        if (dbBuyer == null) {
            return new ResponseEntity<>("Invalid email or password", HttpStatus.UNAUTHORIZED);
        }
        if (!bCryptPasswordEncoder.matches(buyer.getPassword(), dbBuyer.getPassword())) {
            return new ResponseEntity<>("Invalid email or password", HttpStatus.UNAUTHORIZED);
        }
        return ResponseEntity.ok(dbBuyer.getBuyerId());
    }

    @GetMapping("/{buyerId}")
    public Optional<Buyer> getUserById(@PathVariable("buyerId") Long buyerId){
        return userService.getUserById(buyerId);
    }
}

