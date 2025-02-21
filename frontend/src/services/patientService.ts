import api from './api';

export enum AnimalType {
    Kedi = 'Kedi',
    Köpek = 'Köpek',
    Kuş = 'Kuş',
    Balık = 'Balık',
    Diğer = 'Diğer'
}

export interface Patient {
    id?: number;
    name: string;
    type: AnimalType;
    age: number;
    ownerName: string;
    ownerPhone: string;
    ownerEmail: string;
    active?: boolean;
    createdAt?: string;
    updatedAt?: string;
}

export const patientService = {
    async createPatient(patient: Patient): Promise<Patient> {
        try {
            const response = await api.post('/api/patients', patient);
            return response.data;
        } catch (error) {
            console.error('Hasta oluşturma hatası:', error);
            throw error;
        }
    },

    async getPatients(): Promise<Patient[]> {
        try {
            const response = await api.get('/api/patients');
            return response.data;
        } catch (error) {
            console.error('Hastaları getirme hatası:', error);
            throw error;
        }
    },

    async updatePatient(id: number, patient: Patient): Promise<Patient> {
        try {
            const response = await api.put(`/api/patients/${id}`, patient);
            return response.data;
        } catch (error) {
            console.error('Hasta güncelleme hatası:', error);
            throw error;
        }
    },

    async deletePatient(id: number): Promise<void> {
        try {
            await api.delete(`/api/patients/${id}`);
        } catch (error) {
            console.error('Hasta silme hatası:', error);
            throw error;
        }
    },

    async searchPatients(query: string): Promise<Patient[]> {
        try {
            const response = await api.get('/api/patients/search', {
                params: { query }
            });
            return response.data;
        } catch (error) {
            console.error('Hasta arama hatası:', error);
            throw error;
        }
    }
}; 