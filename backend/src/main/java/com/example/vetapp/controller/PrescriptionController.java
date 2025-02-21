package com.example.vetapp.controller;

import com.example.vetapp.entity.Prescription;
import com.example.vetapp.entity.User;
import com.example.vetapp.service.PrescriptionService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/prescriptions")
@RequiredArgsConstructor
public class PrescriptionController {
    private final PrescriptionService prescriptionService;

    @PostMapping
    public ResponseEntity<Prescription> createPrescription(
            @RequestBody Prescription prescription,
            @AuthenticationPrincipal User veterinarian) {
        prescription.setVeterinarian(veterinarian);
        return ResponseEntity.ok(prescriptionService.createPrescription(prescription));
    }

    @GetMapping
    public ResponseEntity<Page<Prescription>> getPrescriptions(
            @AuthenticationPrincipal User veterinarian,
            Pageable pageable) {
        return ResponseEntity.ok(prescriptionService.getPrescriptionsByVeterinarian(veterinarian, pageable));
    }

    @GetMapping("/search/owner")
    public ResponseEntity<Page<Prescription>> searchByPetOwner(
            @RequestParam String ownerName,
            Pageable pageable) {
        return ResponseEntity.ok(prescriptionService.searchByPetOwnerName(ownerName, pageable));
    }

    @GetMapping("/search/pet")
    public ResponseEntity<Page<Prescription>> searchByPetName(
            @RequestParam String petName,
            Pageable pageable) {
        return ResponseEntity.ok(prescriptionService.searchByPetName(petName, pageable));
    }

    @GetMapping("/{id}")
    public ResponseEntity<Prescription> getPrescription(@PathVariable Long id) {
        return ResponseEntity.ok(prescriptionService.getPrescriptionById(id));
    }

    @PutMapping("/{id}")
    public ResponseEntity<Prescription> updatePrescription(
            @PathVariable Long id,
            @RequestBody Prescription prescription) {
        return ResponseEntity.ok(prescriptionService.updatePrescription(id, prescription));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletePrescription(@PathVariable Long id) {
        prescriptionService.deletePrescription(id);
        return ResponseEntity.ok().build();
    }
} 