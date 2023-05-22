package com.example.server.repository;

import com.example.server.model.Buyer;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepository extends JpaRepository<Buyer, Long> {

    Buyer findByEmail(String email);

}


