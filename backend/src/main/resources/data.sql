-- Default admin user (password: admin123)
INSERT INTO users (id, username, password, full_name, email, active) 
VALUES (1, 'admin', '$2a$10$rS.FGqpqmqW61NOGDGAJBuK.lZBaZy5KHMF0zHHGvPxDpGHWm4mHi', 'Admin User', 'admin@example.com', true);

-- Admin role for default user
INSERT INTO user_roles (user_id, role) 
VALUES (1, 'ADMIN');

-- Sample medications
INSERT INTO medications (id, name, manufacturer, stock_quantity, unit, unit_price, expiration_date, batch_number, type, description, minimum_stock_level, active)
VALUES 
(1, 'Amoxicillin', 'Pfizer', 100, 'mg', 25.50, '2025-12-31', 'BATCH001', 'TABLET', 'Broad-spectrum antibiotic', 20, true),
(2, 'Rimadyl', 'Zoetis', 50, 'mg', 35.75, '2025-06-30', 'BATCH002', 'TABLET', 'Pain relief and anti-inflammatory', 15, true),
(3, 'Frontline Plus', 'Boehringer', 75, 'ml', 45.00, '2024-12-31', 'BATCH003', 'LIQUID', 'Flea and tick prevention', 10, true),
(4, 'Heartgard Plus', 'Merck', 200, 'tablet', 15.25, '2025-03-31', 'BATCH004', 'TABLET', 'Heartworm prevention', 25, true);

-- Sample prescriptions
INSERT INTO prescriptions (id, pet_owner_name, pet_name, pet_species, pet_breed, diagnosis, notes, status, prescription_date, veterinarian_id)
VALUES 
(1, 'John Doe', 'Max', 'Dog', 'Golden Retriever', 'Bacterial infection', 'Take with food', 'ACTIVE', NOW(), 1),
(2, 'Jane Smith', 'Luna', 'Cat', 'Persian', 'Joint pain', 'Apply twice daily', 'COMPLETED', NOW(), 1),
(3, 'Mike Johnson', 'Charlie', 'Dog', 'Labrador', 'Flea infestation', 'Monthly application', 'ACTIVE', NOW(), 1);

-- Sample prescription items
INSERT INTO prescription_items (id, prescription_id, medication_id, quantity, dosage, frequency, duration, instructions, medication_type)
VALUES 
(1, 1, 1, 2, '500mg', '2 times daily', '7 days', 'Take with food', 'TABLET'),
(2, 2, 2, 1, '100mg', '1 time daily', '14 days', 'Give with meals', 'TABLET'),
(3, 3, 3, 1, '0.5ml', 'Monthly', '3 months', 'Apply to back of neck', 'LIQUID');

INSERT INTO patients (id, name, age, type, owner_name, owner_phone, owner_email, created_at, updated_at) 
VALUES 
(UUID(), 'Pamuk', 3, 'Kedi', 'Ahmet Yılmaz', '555-0001', 'ahmet@email.com', NOW(), NOW()),
(UUID(), 'Karabaş', 5, 'Köpek', 'Ayşe Demir', '555-0002', 'ayse@email.com', NOW(), NOW()),
(UUID(), 'Maviş', 2, 'Kuş', 'Mehmet Kaya', '555-0003', 'mehmet@email.com', NOW(), NOW()),
(UUID(), 'Boncuk', 4, 'Kedi', 'Fatma Şahin', '555-0004', 'fatma@email.com', NOW(), NOW()),
(UUID(), 'Max', 6, 'Köpek', 'Ali Öztürk', '555-0005', 'ali@email.com', NOW(), NOW());

-- Owners
INSERT INTO owners (first_name, last_name, phone_number, email, address) VALUES
('Ahmet', 'Yılmaz', '5551234567', 'ahmet.yilmaz@email.com', 'Kadıköy, İstanbul'),
('Ayşe', 'Demir', '5559876543', 'ayse.demir@email.com', 'Beşiktaş, İstanbul'),
('Mehmet', 'Kaya', '5552345678', 'mehmet.kaya@email.com', 'Çankaya, Ankara'),
('Fatma', 'Öztürk', '5553456789', 'fatma.ozturk@email.com', 'Karşıyaka, İzmir'),
('Ali', 'Çelik', '5554567890', 'ali.celik@email.com', 'Nilüfer, Bursa');

-- Species
INSERT INTO species (name) VALUES
('Kedi'),
('Köpek'),
('Kuş'),
('Hamster'),
('Tavşan');

-- Breeds
INSERT INTO breeds (name, species_id) VALUES
('Tekir', 1),
('Scottish Fold', 1),
('British Shorthair', 1),
('Golden Retriever', 2),
('Labrador', 2),
('German Shepherd', 2),
('Muhabbet Kuşu', 3),
('Papağan', 3),
('Suriye Hamsteri', 4),
('Hollanda Lop', 5);

-- Patients (Pets)
INSERT INTO patients (name, birth_date, gender, owner_id, breed_id, notes) VALUES
('Pamuk', '2020-03-15', 'FEMALE', 1, 1, 'Aşıları tam'),
('Duman', '2019-06-22', 'MALE', 1, 2, 'Kronik böbrek rahatsızlığı mevcut'),
('Max', '2021-01-10', 'MALE', 2, 4, 'Alerjik bünyesi var'),
('Luna', '2020-11-05', 'FEMALE', 2, 5, 'Düzenli kontrol gerekiyor'),
('Şans', '2022-02-18', 'MALE', 3, 6, 'Kalça displazisi takibi yapılıyor'),
('Maviş', '2021-09-30', 'FEMALE', 3, 7, 'Sağlıklı'),
('Boncuk', '2020-07-12', 'FEMALE', 4, 3, 'Diyet programı uygulanıyor'),
('Rocky', '2019-12-25', 'MALE', 4, 4, 'Düzenli diş bakımı gerekiyor'),
('Minnoş', '2022-04-01', 'FEMALE', 5, 1, 'Aşı takibi yapılıyor'),
('Charlie', '2021-05-20', 'MALE', 5, 5, 'Alerjik deri rahatsızlığı mevcut');

-- Vaccinations
INSERT INTO vaccinations (patient_id, vaccine_name, application_date, next_application_date, notes) VALUES
(1, 'Karma Aşı', '2023-01-15', '2024-01-15', 'Yıllık tekrar gerekiyor'),
(1, 'Kuduz Aşısı', '2023-02-20', '2024-02-20', 'Düzenli yapıldı'),
(2, 'Karma Aşı', '2023-03-10', '2024-03-10', 'Reaksiyon göstermedi'),
(3, 'Karma Aşı', '2023-04-05', '2024-04-05', 'Normal'),
(4, 'Kuduz Aşısı', '2023-05-12', '2024-05-12', 'Takip gerekiyor');

-- Treatments
INSERT INTO treatments (patient_id, treatment_date, diagnosis, treatment_notes, next_visit_date) VALUES
(1, '2023-06-01', 'Rutin Kontrol', 'Genel durumu iyi', '2023-12-01'),
(2, '2023-06-15', 'Böbrek Değerleri Kontrolü', 'İlaç dozunda değişiklik yapıldı', '2023-07-15'),
(3, '2023-07-01', 'Alerji Kontrolü', 'Yeni diyet programı başlatıldı', '2023-08-01'),
(4, '2023-07-20', 'Diş Bakımı', 'Diş taşları temizlendi', '2023-10-20'),
(5, '2023-08-05', 'Kalça Displazisi Kontrolü', 'Fizik tedavi önerildi', '2023-09-05');

-- Prescriptions
INSERT INTO prescriptions (treatment_id, medication_name, dosage, usage_instructions, duration) VALUES
(1, 'Vitamin D', '1 tablet', 'Günde 1 kez yemekle birlikte', '30 gün'),
(2, 'Renal Diet', '100g', 'Günde 2 öğün', '60 gün'),
(3, 'Antihistamin', '5ml', 'Günde 2 kez', '15 gün'),
(4, 'Antibiyotik', '10ml', 'Günde 2 kez yemekten sonra', '7 gün'),
(5, 'Ağrı Kesici', '1 tablet', 'Günde 1 kez', '10 gün'); 