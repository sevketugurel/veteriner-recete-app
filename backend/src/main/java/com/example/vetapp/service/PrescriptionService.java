package com.example.vetapp.service;

import com.example.vetapp.entity.Prescription;
import com.example.vetapp.entity.PrescriptionItem;
import com.example.vetapp.entity.User;
import com.example.vetapp.repository.PrescriptionRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class PrescriptionService {
    private final PrescriptionRepository prescriptionRepository;
    private final MedicationService medicationService;

    @Transactional
    public Prescription createPrescription(Prescription prescription) {
        // Check and update stock for each prescription item
        for (PrescriptionItem item : prescription.getPrescriptionItems()) {
            medicationService.updateStock(item.getMedication().getId(), -item.getQuantity());
        }
        
        prescription.setPrescriptionDate(java.time.LocalDateTime.now());
        return prescriptionRepository.save(prescription);
    }

    @Transactional(readOnly = true)
    public Page<Prescription> getPrescriptionsByVeterinarian(User veterinarian, Pageable pageable) {
        return prescriptionRepository.findByVeterinarian(veterinarian, pageable);
    }

    @Transactional(readOnly = true)
    public Page<Prescription> searchByPetOwnerName(String petOwnerName, Pageable pageable) {
        return prescriptionRepository.findByPetOwnerNameContainingIgnoreCase(petOwnerName, pageable);
    }

    @Transactional(readOnly = true)
    public Page<Prescription> searchByPetName(String petName, Pageable pageable) {
        return prescriptionRepository.findByPetNameContainingIgnoreCase(petName, pageable);
    }

    @Transactional(readOnly = true)
    public Prescription getPrescriptionById(Long id) {
        return prescriptionRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Prescription not found"));
    }

    @Transactional
    public Prescription updatePrescription(Long id, Prescription prescriptionDetails) {
        Prescription prescription = getPrescriptionById(id);
        
        // Restore old stock quantities
        for (PrescriptionItem item : prescription.getPrescriptionItems()) {
            medicationService.updateStock(item.getMedication().getId(), item.getQuantity());
        }
        
        // Update prescription details
        prescription.setPetOwnerName(prescriptionDetails.getPetOwnerName());
        prescription.setPetName(prescriptionDetails.getPetName());
        prescription.setPetSpecies(prescriptionDetails.getPetSpecies());
        prescription.setPetBreed(prescriptionDetails.getPetBreed());
        prescription.setDiagnosis(prescriptionDetails.getDiagnosis());
        prescription.setPrescriptionItems(prescriptionDetails.getPrescriptionItems());
        prescription.setNotes(prescriptionDetails.getNotes());
        prescription.setStatus(prescriptionDetails.getStatus());

        // Apply new stock quantities
        for (PrescriptionItem item : prescriptionDetails.getPrescriptionItems()) {
            medicationService.updateStock(item.getMedication().getId(), -item.getQuantity());
        }

        return prescriptionRepository.save(prescription);
    }

    @Transactional
    public void deletePrescription(Long id) {
        Prescription prescription = getPrescriptionById(id);
        
        // Restore stock quantities if prescription is deleted
        for (PrescriptionItem item : prescription.getPrescriptionItems()) {
            medicationService.updateStock(item.getMedication().getId(), item.getQuantity());
        }
        
        prescriptionRepository.deleteById(id);
    }
} 