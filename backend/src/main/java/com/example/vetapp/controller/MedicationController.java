package com.example.vetapp.controller;

import com.example.vetapp.entity.Medication;
import com.example.vetapp.service.MedicationService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;

@RestController
@RequestMapping("/api/medications")
@RequiredArgsConstructor
public class MedicationController {
    private final MedicationService medicationService;

    @PostMapping
    public ResponseEntity<Medication> createMedication(@RequestBody Medication medication) {
        return ResponseEntity.ok(medicationService.createMedication(medication));
    }

    @GetMapping("/search")
    public ResponseEntity<Page<Medication>> searchMedications(
            @RequestParam String name,
            Pageable pageable) {
        return ResponseEntity.ok(medicationService.searchMedications(name, pageable));
    }

    @GetMapping("/low-stock")
    public ResponseEntity<List<Medication>> getLowStockMedications() {
        return ResponseEntity.ok(medicationService.getLowStockMedications());
    }

    @GetMapping("/expiring")
    public ResponseEntity<List<Medication>> getExpiringMedications(
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate thresholdDate) {
        return ResponseEntity.ok(medicationService.getExpiringMedications(thresholdDate));
    }

    @PutMapping("/{id}/stock")
    public ResponseEntity<Medication> updateStock(
            @PathVariable Long id,
            @RequestParam Integer quantity) {
        return ResponseEntity.ok(medicationService.updateStock(id, quantity));
    }

    @PutMapping("/{id}")
    public ResponseEntity<Medication> updateMedication(
            @PathVariable Long id,
            @RequestBody Medication medication) {
        return ResponseEntity.ok(medicationService.updateMedication(id, medication));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteMedication(@PathVariable Long id) {
        medicationService.deleteMedication(id);
        return ResponseEntity.ok().build();
    }
} 