package com.example.vetapp.dto;

import lombok.Data;
import jakarta.validation.constraints.*;

@Data
public class PatientDTO {
    private String id;
    
    @NotBlank(message = "Hasta adı zorunludur")
    private String name;
    
    @Min(value = 0, message = "Yaş 0'dan küçük olamaz")
    @NotNull(message = "Yaş zorunludur")
    private Integer age;
    
    @NotBlank(message = "Hayvan türü zorunludur")
    private String type;
    
    @NotBlank(message = "Sahip adı zorunludur")
    private String ownerName;
    
    @NotBlank(message = "Telefon numarası zorunludur")
    private String ownerPhone;
    
    @Email(message = "Geçerli bir e-posta adresi giriniz")
    @NotBlank(message = "E-posta adresi zorunludur")
    private String ownerEmail;
} 