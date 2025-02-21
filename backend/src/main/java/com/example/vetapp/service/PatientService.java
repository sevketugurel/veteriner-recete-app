package com.example.vetapp.service;

import com.example.vetapp.dto.PatientDTO;
import com.example.vetapp.entity.Patient;
import com.example.vetapp.exception.ResourceNotFoundException;
import com.example.vetapp.repository.PatientRepository;
import org.springframework.beans.BeanUtils;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.util.List;
import java.util.stream.Collectors;

@Service
@Transactional
public class PatientService {
    private final PatientRepository patientRepository;
    
    public PatientService(PatientRepository patientRepository) {
        this.patientRepository = patientRepository;
    }
    
    public List<PatientDTO> getAllPatients() {
        return patientRepository.findAll().stream()
            .map(this::convertToDTO)
            .collect(Collectors.toList());
    }
    
    public PatientDTO getPatientById(String id) {
        Patient patient = patientRepository.findById(id)
            .orElseThrow(() -> new ResourceNotFoundException("Hasta bulunamadı: " + id));
        return convertToDTO(patient);
    }
    
    public PatientDTO createPatient(PatientDTO patientDTO) {
        Patient patient = new Patient();
        BeanUtils.copyProperties(patientDTO, patient);
        Patient savedPatient = patientRepository.save(patient);
        return convertToDTO(savedPatient);
    }
    
    public PatientDTO updatePatient(String id, PatientDTO patientDTO) {
        Patient existingPatient = patientRepository.findById(id)
            .orElseThrow(() -> new ResourceNotFoundException("Hasta bulunamadı: " + id));
        
        BeanUtils.copyProperties(patientDTO, existingPatient, "id", "createdAt");
        Patient updatedPatient = patientRepository.save(existingPatient);
        return convertToDTO(updatedPatient);
    }
    
    public void deletePatient(String id) {
        if (!patientRepository.existsById(id)) {
            throw new ResourceNotFoundException("Hasta bulunamadı: " + id);
        }
        patientRepository.deleteById(id);
    }
    
    private PatientDTO convertToDTO(Patient patient) {
        PatientDTO dto = new PatientDTO();
        BeanUtils.copyProperties(patient, dto);
        return dto;
    }
} 