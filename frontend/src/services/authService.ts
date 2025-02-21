import api from './api';

export interface LoginRequest {
    username: string;
    password: string;
}

export interface RegisterRequest {
    username: string;
    password: string;
    fullName: string;
    email: string;
    roles: string[];
}

export interface AuthResponse {
    token: string;
}

export const authService = {
    login: async (data: LoginRequest): Promise<AuthResponse> => {
        const response = await api.post<AuthResponse>('/auth/login', data);
        if (response.data.token) {
            localStorage.setItem('token', response.data.token);
        }
        return response.data;
    },

    register: async (data: RegisterRequest): Promise<void> => {
        await api.post('/auth/register', data);
    },

    logout: () => {
        localStorage.removeItem('token');
        window.location.href = '/login';
    },

    isAuthenticated: (): boolean => {
        return !!localStorage.getItem('token');
    }
}; 