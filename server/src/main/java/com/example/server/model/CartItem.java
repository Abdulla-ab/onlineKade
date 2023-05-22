package com.example.server.model;

import com.example.server.enums.Category;
import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
public class CartItem {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long cartId;

    @Column(nullable = false)
    private String name;

    @Column(nullable = false)
    private String image;

    @Column(nullable = false)
    private String description;

    @Column(nullable = false)
    private double price;

    @Enumerated(EnumType.STRING)
    private Category category;

    private int quantity;

    @ManyToOne(cascade = CascadeType.MERGE)
    @JoinColumn(name = "buyerId", referencedColumnName = "buyerId")
    @JsonBackReference
    private Buyer buyer;
}
