package com.example.server.repository;

import com.example.server.model.PurchaseHistory;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PurchaseHistoryRepository extends JpaRepository<PurchaseHistory, Long> {

}
