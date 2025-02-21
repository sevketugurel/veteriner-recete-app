import React from 'react';
import { Spinner } from 'react-bootstrap';

interface LoadingSpinnerProps {
    size?: 'sm' | 'md' | 'lg';
    variant?: string;
    text?: string;
}

const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({ 
    size = 'md', 
    variant = 'primary',
    text = 'Yükleniyor...'
}) => {
    const spinnerSize = {
        sm: '1rem',
        md: '2rem',
        lg: '3rem'
    }[size];

    return (
        <div className="d-flex flex-column align-items-center justify-content-center p-4">
            <Spinner
                animation="border"
                variant={variant}
                style={{ width: spinnerSize, height: spinnerSize }}
                role="status"
            />
            {text && <div className="mt-2 text-muted">{text}</div>}
        </div>
    );
};

export default LoadingSpinner; 