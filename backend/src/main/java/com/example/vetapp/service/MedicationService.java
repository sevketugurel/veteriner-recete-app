package com.example.vetapp.service;

import com.example.vetapp.entity.Medication;
import com.example.vetapp.repository.MedicationRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.util.List;

@Service
@RequiredArgsConstructor
public class MedicationService {
    private final MedicationRepository medicationRepository;

    @Transactional
    public Medication createMedication(Medication medication) {
        if (medicationRepository.existsByNameAndManufacturerAndBatchNumber(
                medication.getName(), medication.getManufacturer(), medication.getBatchNumber())) {
            throw new RuntimeException("Medication with same name, manufacturer and batch number already exists");
        }
        return medicationRepository.save(medication);
    }

    @Transactional(readOnly = true)
    public Page<Medication> searchMedications(String name, Pageable pageable) {
        return medicationRepository.findByNameContainingIgnoreCase(name, pageable);
    }

    @Transactional(readOnly = true)
    public List<Medication> getLowStockMedications() {
        return medicationRepository.findLowStockMedications();
    }

    @Transactional(readOnly = true)
    public List<Medication> getExpiringMedications(LocalDate thresholdDate) {
        return medicationRepository.findByExpirationDateBeforeAndActive(thresholdDate, true);
    }

    @Transactional
    public Medication updateStock(Long id, Integer quantity) {
        Medication medication = medicationRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Medication not found"));
        
        if (medication.getStockQuantity() + quantity < 0) {
            throw new RuntimeException("Insufficient stock");
        }
        
        medication.setStockQuantity(medication.getStockQuantity() + quantity);
        return medicationRepository.save(medication);
    }

    @Transactional
    public Medication updateMedication(Long id, Medication medicationDetails) {
        Medication medication = medicationRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Medication not found"));

        medication.setName(medicationDetails.getName());
        medication.setManufacturer(medicationDetails.getManufacturer());
        medication.setUnit(medicationDetails.getUnit());
        medication.setUnitPrice(medicationDetails.getUnitPrice());
        medication.setExpirationDate(medicationDetails.getExpirationDate());
        medication.setBatchNumber(medicationDetails.getBatchNumber());
        medication.setType(medicationDetails.getType());
        medication.setDescription(medicationDetails.getDescription());
        medication.setMinimumStockLevel(medicationDetails.getMinimumStockLevel());
        medication.setActive(medicationDetails.isActive());

        return medicationRepository.save(medication);
    }

    @Transactional
    public void deleteMedication(Long id) {
        Medication medication = medicationRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Medication not found"));
        medication.setActive(false);
        medicationRepository.save(medication);
    }
} 