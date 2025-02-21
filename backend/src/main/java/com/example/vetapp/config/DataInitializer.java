package com.example.vetapp.config;

import com.example.vetapp.entity.Patient;
import com.example.vetapp.repository.PatientRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.time.LocalDateTime;
import java.util.Arrays;

@Configuration
public class DataInitializer {

    @Bean
    CommandLineRunner initDatabase(PatientRepository patientRepository) {
        return args -> {
            // Eğer veritabanı boşsa verileri ekle
            if (patientRepository.count() == 0) {
                Patient pamuk = new Patient();
                pamuk.setName("Pamuk");
                pamuk.setAge(3);
                pamuk.setType("Kedi");
                pamuk.setOwnerName("Ahmet Yılmaz");
                pamuk.setOwnerPhone("555-0001");
                pamuk.setOwnerEmail("ahmet@email.com");
                pamuk.setCreatedAt(LocalDateTime.now());
                pamuk.setUpdatedAt(LocalDateTime.now());

                Patient karabas = new Patient();
                karabas.setName("Karabaş");
                karabas.setAge(5);
                karabas.setType("Köpek");
                karabas.setOwnerName("Ayşe Demir");
                karabas.setOwnerPhone("555-0002");
                karabas.setOwnerEmail("ayse@email.com");
                karabas.setCreatedAt(LocalDateTime.now());
                karabas.setUpdatedAt(LocalDateTime.now());

                Patient mavis = new Patient();
                mavis.setName("Maviş");
                mavis.setAge(2);
                mavis.setType("Kuş");
                mavis.setOwnerName("Mehmet Kaya");
                mavis.setOwnerPhone("555-0003");
                mavis.setOwnerEmail("mehmet@email.com");
                mavis.setCreatedAt(LocalDateTime.now());
                mavis.setUpdatedAt(LocalDateTime.now());

                patientRepository.saveAll(Arrays.asList(pamuk, karabas, mavis));
            }
        };
    }
} 