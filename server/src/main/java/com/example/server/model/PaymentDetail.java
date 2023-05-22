package com.example.server.model;

import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
public class PaymentDetail {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long paymentId;

    @Column(nullable = false)
    private String Address;

    @Column(nullable = false)
    private String PostalCode;

    @Column(nullable = false)
    private String CardNumber;

    @Column(nullable = false)
    private Integer totalPayment;

    @ManyToOne(cascade = CascadeType.MERGE)
    @JoinColumn(name = "buyerId", referencedColumnName = "buyerId")
    @JsonBackReference
    private Buyer buyer;


}
