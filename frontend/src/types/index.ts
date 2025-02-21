export interface Patient {
    id: string;
    name: string;
    age: number;
    type: string;
    ownerName: string;
    ownerPhone: string;
    ownerEmail: string;
    createdAt?: string;
    updatedAt?: string;
}

export interface Diagnosis {
    id: string;
    patientId: string;
    diagnosis: string;
    description: string;
    date: string;
}

export interface Medicine {
    id: string;
    name: string;
    stock: number;
    unit: string;
    price: number;
    description: string;
    category: string;
    supplier: string;
    instructions?: string;
}

export interface Prescription {
    id: string;
    patientId: string;
    diagnosis: string;
    diagnosisId: string;
    medicines: PrescriptionMedicine[];
    doctorName: string;
    diplomaNo: string;
    date: string;
    status: 'active' | 'completed' | 'cancelled';
    notes?: string;
}

export interface PrescriptionMedicine {
    medicineId: string;
    medicineName: string;
    dosage: string;
    frequency: string;
    duration: string;
    instructions?: string;
}

export interface User {
    id: string;
    name: string;
    email: string;
    role: 'admin' | 'veterinarian';
}

export interface Appointment {
    id: string;
    patientId: string;
    title: string;
    start: Date;
    end: Date;
    description: string;
    status: 'scheduled' | 'completed' | 'cancelled';
    type: 'checkup' | 'vaccination' | 'surgery' | 'other';
} 