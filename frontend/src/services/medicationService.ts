import api from './api';

export enum MedicationType {
    TABLET = 'TABLET',
    LIQUID = 'LIQUID',
    INJECTION = 'INJECTION',
    CREAM = 'CREAM',
    POWDER = 'POWDER',
    OTHER = 'OTHER'
}

export interface Medication {
    id?: number;
    name: string;
    manufacturer: string;
    unit: string;
    unitPrice: number;
    stockQuantity: number;
    expirationDate: string;
    batchNumber: string;
    type: MedicationType;
    description?: string;
    active: boolean;
}

export const medicationService = {
    async getAllMedications(): Promise<Medication[]> {
        try {
            const response = await api.get('/medications/search', {
                params: { name: '' }
            });
            return response.data.content;
        } catch (error) {
            console.error('İlaçları getirme hatası:', error);
            throw error;
        }
    },

    async createMedication(medication: Medication): Promise<Medication> {
        try {
            const response = await api.post('/medications', medication);
            return response.data;
        } catch (error) {
            console.error('İlaç oluşturma hatası:', error);
            throw error;
        }
    },

    async updateMedication(id: number, medication: Medication): Promise<Medication> {
        try {
            const response = await api.put(`/medications/${id}`, medication);
            return response.data;
        } catch (error) {
            console.error('İlaç güncelleme hatası:', error);
            throw error;
        }
    },

    async deleteMedication(id: number): Promise<void> {
        try {
            await api.delete(`/medications/${id}`);
        } catch (error) {
            console.error('İlaç silme hatası:', error);
            throw error;
        }
    }
}; 