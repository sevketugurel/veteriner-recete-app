package com.example.vetapp;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import io.swagger.v3.oas.annotations.OpenAPIDefinition;
import io.swagger.v3.oas.annotations.info.Info;

@SpringBootApplication
@OpenAPIDefinition(
    info = @Info(
        title = "Veteriner Reçete Uygulaması API",
        version = "1.0",
        description = "Veteriner Reçete Yönetim Sistemi için REST API"
    )
)
public class VetReceteApplication {
    public static void main(String[] args) {
        SpringApplication.run(VetReceteApplication.class, args);
    }
} 