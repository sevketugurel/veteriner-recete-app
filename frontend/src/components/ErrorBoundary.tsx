import React, { Component, ErrorInfo, ReactNode } from 'react';
import { Container, Alert, Button } from 'react-bootstrap';

interface Props {
    children: ReactNode;
}

interface State {
    hasError: boolean;
    error: Error | null;
    errorInfo: ErrorInfo | null;
}

class ErrorBoundary extends Component<Props, State> {
    public state: State = {
        hasError: false,
        error: null,
        errorInfo: null
    };

    public static getDerivedStateFromError(error: Error): State {
        return { hasError: true, error, errorInfo: null };
    }

    public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
        this.setState({
            error: error,
            errorInfo: errorInfo
        });
    }

    public render() {
        if (this.state.hasError) {
            return (
                <Container className="py-5">
                    <Alert variant="danger">
                        <Alert.Heading>Üzgünüz, bir hata oluştu!</Alert.Heading>
                        <p>
                            Uygulama beklenmeyen bir hata ile karşılaştı. Lütfen sayfayı yenileyin veya
                            daha sonra tekrar deneyin.
                        </p>
                        <hr />
                        <div className="d-flex justify-content-between">
                            <Button
                                variant="outline-danger"
                                onClick={() => window.location.reload()}
                            >
                                Sayfayı Yenile
                            </Button>
                            <Button
                                variant="outline-primary"
                                onClick={() => window.history.back()}
                            >
                                Geri Dön
                            </Button>
                        </div>
                        {process.env.NODE_ENV === 'development' && (
                            <div className="mt-3">
                                <details style={{ whiteSpace: 'pre-wrap' }}>
                                    <summary>Hata Detayları</summary>
                                    {this.state.error && this.state.error.toString()}
                                    <br />
                                    {this.state.errorInfo?.componentStack}
                                </details>
                            </div>
                        )}
                    </Alert>
                </Container>
            );
        }

        return this.props.children;
    }
}

export default ErrorBoundary; 