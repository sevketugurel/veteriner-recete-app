# Veteriner Reçete Yönetim Sistemi

Bu proje, veteriner klinikleri için geliştirilmiş kapsamlı bir reçete ve hasta yönetim sistemidir. Sistem, hasta kayıtları, ilaç stok yönetimi ve reçete düzenleme işlemlerini dijital ortamda yönetmeyi sağlar.

## 🚀 Özellikler

- 👥 Hasta kayıt ve takip sistemi
- 💊 İlaç stok yönetimi
- 📋 Dijital reçete oluşturma ve yönetimi
- 📊 Dashboard ile genel durum takibi
- 🔐 Kullanıcı yetkilendirme sistemi
- 📱 Responsive tasarım

## 🛠 Teknoloji Stack

### Backend
- Java 17
- Spring Boot 3.2.3
- Spring Security
- MySQL
- JPA/Hibernate
- JWT Authentication

### Frontend
- React
- TypeScript
- Bootstrap 5
- Formik & Yup
- Axios
- React Router
- FontAwesome

## 🏗 Sistem Mimarisi

Proje, modern bir mikroservis mimarisi kullanılarak geliştirilmiştir:

```
veteriner-recete-sistemi/
├── backend/                # Spring Boot Backend
│   ├── src/
│   ├── pom.xml
│   └── Dockerfile
└── frontend/              # React Frontend
    ├── src/
    ├── package.json
    └── Dockerfile
```

## 🚀 Kurulum

### Ön Gereksinimler
- Java 17
- Node.js 16+
- MySQL 8+
- Docker (opsiyonel)

### Backend Kurulum

```bash
cd backend
mvn clean install
mvn spring-boot:run
```

### Frontend Kurulum

```bash
cd frontend
npm install
npm start
```

### Docker ile Kurulum

```bash
docker-compose up -d
```

## 🔑 API Endpoints

### Hasta Yönetimi

```http
# Hasta Listesi
GET /api/patients

# Hasta Detayı
GET /api/patients/{id}

# Yeni Hasta Ekleme
POST /api/patients
Content-Type: application/json

{
    "name": "Pamuk",
    "age": 3,
    "type": "Kedi",
    "ownerName": "Ahmet Yılmaz",
    "ownerPhone": "555-0001",
    "ownerEmail": "ahmet@email.com"
}

# Hasta Güncelleme
PUT /api/patients/{id}

# Hasta Silme
DELETE /api/patients/{id}
```

### İlaç Yönetimi

```http
# İlaç Listesi
GET /api/medicines

# İlaç Detayı
GET /api/medicines/{id}

# Yeni İlaç Ekleme
POST /api/medicines
Content-Type: application/json

{
    "name": "Amoksisilin",
    "manufacturer": "İlaç A.Ş.",
    "unit": "tablet",
    "unitPrice": 25.50,
    "stockQuantity": 100,
    "expirationDate": "2025-12-31",
    "batchNumber": "BATCH123",
    "type": "TABLET"
}

# İlaç Güncelleme
PUT /api/medicines/{id}

# İlaç Silme
DELETE /api/medicines/{id}
```

### Reçete Yönetimi

```http
# Reçete Listesi
GET /api/prescriptions

# Reçete Detayı
GET /api/prescriptions/{id}

# Yeni Reçete Oluşturma
POST /api/prescriptions
Content-Type: application/json

{
    "patientId": "1",
    "medications": [
        {
            "medicineId": "1",
            "dose": "2x1",
            "frequency": "Günde 2 kez"
        }
    ],
    "notes": "Yemeklerden sonra kullanılmalı"
}
```

### Kimlik Doğrulama

```http
# Giriş
POST /api/auth/login
Content-Type: application/json

{
    "username": "kullanici",
    "password": "sifre123"
}

# Kayıt
POST /api/auth/register
Content-Type: application/json

{
    "username": "yenikullanici",
    "password": "sifre123",
    "fullName": "Ahmet Yılmaz",
    "email": "ahmet@email.com"
}
```

## 🔐 Güvenlik

- JWT tabanlı kimlik doğrulama
- Role-based yetkilendirme (USER, ADMIN)
- CORS yapılandırması
- Password encryption

## ⚙️ Konfigürasyon

Temel konfigürasyon `application.properties` dosyasında yapılmaktadır:

```properties
# Server
server.port=8081
server.servlet.context-path=/api

# Database
spring.datasource.url=jdbc:mysql://localhost:3306/vetdb
spring.datasource.username=vetapp
spring.datasource.password=vetapp123

# JWT
jwt.secret=your-secret-key-here
jwt.expiration=86400000
```

## 📝 Swagger Dokümantasyonu

API dokümantasyonuna aşağıdaki URL'den erişilebilir:
```
http://localhost:8081/api/swagger-ui.html
```

## 🌐 CORS Yapılandırması

Sistem, cross-origin istekleri için yapılandırılmıştır. Varsayılan olarak tüm originlere izin verilmektedir. Üretim ortamında güvenlik için özelleştirilmelidir.
