package com.example.vetapp.repository;

import com.example.vetapp.entity.Prescription;
import com.example.vetapp.entity.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PrescriptionRepository extends JpaRepository<Prescription, Long> {
    Page<Prescription> findByVeterinarian(User veterinarian, Pageable pageable);
    Page<Prescription> findByPetOwnerNameContainingIgnoreCase(String petOwnerName, Pageable pageable);
    Page<Prescription> findByPetNameContainingIgnoreCase(String petName, Pageable pageable);
} 