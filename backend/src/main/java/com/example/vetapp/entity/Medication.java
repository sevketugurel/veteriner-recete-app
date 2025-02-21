package com.example.vetapp.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.time.LocalDate;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "medications")
public class Medication {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String name;

    @Column(nullable = false)
    private String manufacturer;

    @Column(nullable = false)
    private String unit;

    @Column(nullable = false)
    private BigDecimal unitPrice;

    @Column(nullable = false)
    private Integer stockQuantity;

    @Column(nullable = false)
    private LocalDate expirationDate;

    @Column(nullable = false, unique = true)
    private String batchNumber;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private MedicationType type;

    @Column(length = 1000)
    private String description;

    private Integer minimumStockLevel;

    private boolean active = true;

    public enum MedicationType {
        TABLET,
        LIQUID,
        INJECTION,
        CREAM,
        POWDER,
        OTHER
    }
} 