import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:8081/api',
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
    }
});

// Request interceptor - token ekleme
api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Response interceptor - hata yönetimi
api.interceptors.response.use(
    (response) => response,
    async (error) => {
        if (error.response) {
            // Token süresi dolmuş veya geçersiz token
            if (error.response.status === 401) {
                localStorage.removeItem('token');
                window.location.href = '/login';
            } 
            // Yetkilendirme hatası
            else if (error.response.status === 403) {
                console.error('Yetkilendirme hatası:', error.response.data);
                window.location.href = '/login';
            }
            // Diğer API hataları
            else {
                console.error('API Hatası:', error.response.data);
                throw error;
            }
        } else if (error.request) {
            // Sunucuya ulaşılamadı
            console.error('Sunucu hatası:', error.request);
            throw error;
        } else {
            // İstek oluşturulurken hata
            console.error('İstek hatası:', error.message);
            throw error;
        }
        return Promise.reject(error);
    }
);

export default api; 