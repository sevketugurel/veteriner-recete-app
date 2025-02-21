import { Patient, Medicine, Prescription, Appointment, Diagnosis, User } from '../types';

export const mockPatients: Patient[] = [
    {
        id: '1',
        name: 'Pamuk',
        age: 3,
        type: 'Kedi',
        ownerName: 'Ahmet Yılmaz',
        ownerPhone: '555-0001',
        ownerEmail: 'ahmet@email.com'
    },
    {
        id: '2',
        name: 'Karabaş',
        age: 5,
        type: 'Köpek',
        ownerName: 'Ayşe Demir',
        ownerPhone: '555-0002',
        ownerEmail: 'ayse@email.com'
    }
];

export const mockMedicines: Medicine[] = [
    {
        id: '1',
        name: 'Antibiyotik A',
        stock: 100,
        unit: 'tablet',
        price: 50,
        description: 'Geniş spektrumlu antibiyotik',
        category: 'Antibiyotik',
        supplier: 'İlaç A.Ş.'
    },
    {
        id: '2',
        name: 'Vitamin B',
        stock: 50,
        unit: 'ampul',
        price: 30,
        description: 'B kompleks vitamin takviyesi',
        category: 'Vitamin',
        supplier: 'İlaç A.Ş.'
    }
];

export const mockDiagnoses: Diagnosis[] = [
    {
        id: '1',
        patientId: '1',
        diagnosis: 'Üst Solunum Yolu Enfeksiyonu',
        description: 'Hafif ateş ve öksürük belirtileri',
        date: '2024-03-20'
    }
];

export const mockPrescriptions: Prescription[] = [
    {
        id: '1',
        patientId: '1',
        diagnosis: 'Üst solunum yolu enfeksiyonu',
        diagnosisId: '1',
        medicines: [
            {
                medicineId: '1',
                medicineName: 'Antibiyotik A',
                dosage: '1',
                frequency: 'Günde 2 kez',
                duration: '7',
                instructions: 'Yemeklerden sonra'
            }
        ],
        doctorName: 'Dr. Mehmet Yılmaz',
        diplomaNo: '12345',
        date: '2024-03-15',
        status: 'active',
        notes: 'Özel notlar'
    }
];

export const mockAppointments: Appointment[] = [
    {
        id: '1',
        patientId: '1',
        title: 'Kontrol',
        start: new Date('2024-03-20T10:00:00'),
        end: new Date('2024-03-20T10:30:00'),
        description: 'Rutin kontrol',
        status: 'scheduled',
        type: 'checkup'
    }
];

export const mockUsers: User[] = [
    {
        id: '1',
        name: 'Dr. Mehmet Yılmaz',
        email: 'mehmet@vet.com',
        role: 'veterinarian'
    },
    {
        id: '2',
        name: 'Admin User',
        email: 'admin@vet.com',
        role: 'admin'
    }
]; 