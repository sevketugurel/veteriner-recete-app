package com.example.vetapp.repository;

import com.example.vetapp.entity.Patient;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PatientRepository extends JpaRepository<Patient, String> {
    // Özel sorgular buraya eklenebilir
} 