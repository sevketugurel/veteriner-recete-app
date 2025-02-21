package com.example.vetapp.repository;

import com.example.vetapp.entity.Medication;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.time.LocalDate;
import java.util.List;

public interface MedicationRepository extends JpaRepository<Medication, Long> {
    Page<Medication> findByNameContainingIgnoreCase(String name, Pageable pageable);
    
    List<Medication> findByStockQuantityLessThanEqualAndActive(Integer quantity, boolean active);
    
    List<Medication> findByExpirationDateBeforeAndActive(LocalDate date, boolean active);
    
    @Query("SELECT m FROM Medication m WHERE m.stockQuantity <= m.minimumStockLevel AND m.active = true")
    List<Medication> findLowStockMedications();
    
    boolean existsByNameAndManufacturerAndBatchNumber(String name, String manufacturer, String batchNumber);
} 