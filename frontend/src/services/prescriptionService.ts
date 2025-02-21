import api from './api';

export interface PrescriptionMedication {
    name: string;
    dose: string;
    frequency: string;
}

export interface Prescription {
    id?: number;
    patientName: string;
    medications: PrescriptionMedication[];
    status: PrescriptionStatus;
}

export enum PrescriptionStatus {
    ACTIVE = 'Active',
    COMPLETED = 'Completed',
    CANCELLED = 'Cancelled'
}

export const prescriptionService = {
    async createPrescription(prescription: Prescription): Promise<Prescription> {
        try {
            const response = await api.post('/prescriptions', prescription);
            return response.data;
        } catch (error) {
            console.error('Reçete oluşturma hatası:', error);
            throw error;
        }
    },

    async getPrescriptions(): Promise<Prescription[]> {
        try {
            const response = await api.get('/prescriptions');
            return response.data;
        } catch (error) {
            console.error('Reçeteleri getirme hatası:', error);
            throw error;
        }
    },

    async getPrescription(id: number): Promise<Prescription> {
        try {
            const response = await api.get(`/prescriptions/${id}`);
            return response.data;
        } catch (error) {
            console.error('Reçete detayı getirme hatası:', error);
            throw error;
        }
    },

    async updatePrescription(id: number, prescription: Prescription): Promise<Prescription> {
        try {
            const response = await api.put(`/prescriptions/${id}`, prescription);
            return response.data;
        } catch (error) {
            console.error('Reçete güncelleme hatası:', error);
            throw error;
        }
    },

    async deletePrescription(id: number): Promise<void> {
        try {
            await api.delete(`/prescriptions/${id}`);
        } catch (error) {
            console.error('Reçete silme hatası:', error);
            throw error;
        }
    }
}; 