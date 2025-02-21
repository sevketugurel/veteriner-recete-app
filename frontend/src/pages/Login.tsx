import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Card, Form, Button, Row, Col } from 'react-bootstrap';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { toast } from 'react-toastify';
import { useAuth } from '../context/AuthContext';

const loginSchema = Yup.object().shape({
    username: Yup.string()
        .required('Kullanıcı adı zorunludur'),
    password: Yup.string()
        .min(6, 'Şifre en az 6 karakter olmalıdır')
        .required('Şifre zorunludur'),
});

const registerSchema = Yup.object().shape({
    username: Yup.string()
        .required('Kullanıcı adı zorunludur')
        .min(3, 'Kullanıcı adı en az 3 karakter olmalıdır'),
    password: Yup.string()
        .min(6, 'Şifre en az 6 karakter olmalıdır')
        .required('Şifre zorunludur'),
    fullName: Yup.string()
        .required('Ad Soyad zorunludur'),
    email: Yup.string()
        .email('Geçerli bir e-posta adresi giriniz')
        .required('E-posta zorunludur'),
});

const Login: React.FC = () => {
    const navigate = useNavigate();
    const { login, register } = useAuth();
    const [isRegisterMode, setIsRegisterMode] = useState(false);

    const handleLogin = async (values: { username: string; password: string }, { setSubmitting }: { setSubmitting: (isSubmitting: boolean) => void }) => {
        try {
            await login(values);
            toast.success('Giriş başarılı!');
            navigate('/', { replace: true });
        } catch (error) {
            toast.error('Kullanıcı adı veya şifre hatalı!');
        } finally {
            setSubmitting(false);
        }
    };

    const handleRegister = async (values: { username: string; password: string; fullName: string; email: string }, { setSubmitting }: { setSubmitting: (isSubmitting: boolean) => void }) => {
        try {
            await register({
                ...values,
                roles: ['USER']
            });
            toast.success('Kayıt başarılı! Şimdi giriş yapabilirsiniz.');
            setIsRegisterMode(false);
        } catch (error) {
            toast.error('Kayıt sırasında bir hata oluştu!');
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <Container className="d-flex align-items-center justify-content-center min-vh-100">
            <Card className="shadow-sm" style={{ maxWidth: '500px', width: '100%' }}>
                <Card.Body className="p-4">
                    <h2 className="text-center mb-4">Veteriner Reçete Sistemi</h2>
                    <div className="text-center mb-4">
                        <Button
                            variant="link"
                            onClick={() => setIsRegisterMode(!isRegisterMode)}
                            className="text-decoration-none"
                        >
                            {isRegisterMode ? 'Giriş Yap' : 'Yeni Hesap Oluştur'}
                        </Button>
                    </div>

                    {isRegisterMode ? (
                        <Formik
                            initialValues={{ username: '', password: '', fullName: '', email: '' }}
                            validationSchema={registerSchema}
                            onSubmit={handleRegister}
                        >
                            {({
                                values,
                                errors,
                                touched,
                                handleChange,
                                handleBlur,
                                handleSubmit,
                                isSubmitting
                            }) => (
                                <Form noValidate onSubmit={(e) => {
                                    e.preventDefault();
                                    handleSubmit(e);
                                }}>
                                    <Row>
                                        <Col md={12}>
                                            <Form.Group className="mb-3">
                                                <Form.Label>Ad Soyad</Form.Label>
                                                <Form.Control
                                                    type="text"
                                                    name="fullName"
                                                    value={values.fullName}
                                                    onChange={handleChange}
                                                    onBlur={handleBlur}
                                                    isInvalid={touched.fullName && !!errors.fullName}
                                                />
                                                <Form.Control.Feedback type="invalid">
                                                    {errors.fullName}
                                                </Form.Control.Feedback>
                                            </Form.Group>
                                        </Col>
                                    </Row>

                                    <Row>
                                        <Col md={12}>
                                            <Form.Group className="mb-3">
                                                <Form.Label>E-posta</Form.Label>
                                                <Form.Control
                                                    type="email"
                                                    name="email"
                                                    value={values.email}
                                                    onChange={handleChange}
                                                    onBlur={handleBlur}
                                                    isInvalid={touched.email && !!errors.email}
                                                />
                                                <Form.Control.Feedback type="invalid">
                                                    {errors.email}
                                                </Form.Control.Feedback>
                                            </Form.Group>
                                        </Col>
                                    </Row>

                                    <Row>
                                        <Col md={12}>
                                            <Form.Group className="mb-3">
                                                <Form.Label>Kullanıcı Adı</Form.Label>
                                                <Form.Control
                                                    type="text"
                                                    name="username"
                                                    value={values.username}
                                                    onChange={handleChange}
                                                    onBlur={handleBlur}
                                                    isInvalid={touched.username && !!errors.username}
                                                />
                                                <Form.Control.Feedback type="invalid">
                                                    {errors.username}
                                                </Form.Control.Feedback>
                                            </Form.Group>
                                        </Col>
                                    </Row>

                                    <Row>
                                        <Col md={12}>
                                            <Form.Group className="mb-4">
                                                <Form.Label>Şifre</Form.Label>
                                                <Form.Control
                                                    type="password"
                                                    name="password"
                                                    value={values.password}
                                                    onChange={handleChange}
                                                    onBlur={handleBlur}
                                                    isInvalid={touched.password && !!errors.password}
                                                />
                                                <Form.Control.Feedback type="invalid">
                                                    {errors.password}
                                                </Form.Control.Feedback>
                                            </Form.Group>
                                        </Col>
                                    </Row>

                                    <Button 
                                        variant="primary" 
                                        type="submit" 
                                        className="w-100"
                                        disabled={isSubmitting}
                                    >
                                        {isSubmitting ? 'Kaydediliyor...' : 'Kayıt Ol'}
                                    </Button>
                                </Form>
                            )}
                        </Formik>
                    ) : (
                        <Formik
                            initialValues={{ username: '', password: '' }}
                            validationSchema={loginSchema}
                            onSubmit={handleLogin}
                        >
                            {({
                                values,
                                errors,
                                touched,
                                handleChange,
                                handleBlur,
                                handleSubmit,
                                isSubmitting
                            }) => (
                                <Form noValidate onSubmit={(e) => {
                                    e.preventDefault();
                                    handleSubmit(e);
                                }}>
                                    <Form.Group className="mb-3">
                                        <Form.Label>Kullanıcı Adı</Form.Label>
                                        <Form.Control
                                            type="text"
                                            name="username"
                                            value={values.username}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            isInvalid={touched.username && !!errors.username}
                                        />
                                        <Form.Control.Feedback type="invalid">
                                            {errors.username}
                                        </Form.Control.Feedback>
                                    </Form.Group>

                                    <Form.Group className="mb-4">
                                        <Form.Label>Şifre</Form.Label>
                                        <Form.Control
                                            type="password"
                                            name="password"
                                            value={values.password}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            isInvalid={touched.password && !!errors.password}
                                        />
                                        <Form.Control.Feedback type="invalid">
                                            {errors.password}
                                        </Form.Control.Feedback>
                                    </Form.Group>

                                    <Button 
                                        variant="primary" 
                                        type="submit" 
                                        className="w-100"
                                        disabled={isSubmitting}
                                    >
                                        {isSubmitting ? 'Giriş Yapılıyor...' : 'Giriş Yap'}
                                    </Button>
                                </Form>
                            )}
                        </Formik>
                    )}
                </Card.Body>
            </Card>
        </Container>
    );
};

export default Login; 