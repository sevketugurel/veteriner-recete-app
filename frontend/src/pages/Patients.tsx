import React, { useState, useEffect } from 'react';
import { Container, Card, Table, Button, Modal, Form, Row, Col } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { toast } from 'react-toastify';
import { Patient, AnimalType } from '../services/patientService';
import { patientService } from '../services/patientService';

const patientSchema = Yup.object().shape({
    name: Yup.string().required('Hasta adı zorunludur'),
    age: Yup.number().required('Yaş zorunludur').min(0, 'Yaş 0\'dan küçük olamaz'),
    type: Yup.string().required('Hayvan türü zorunludur'),
    ownerName: Yup.string().required('Sahip adı zorunludur'),
    ownerPhone: Yup.string().required('Telefon numarası zorunludur'),
    ownerEmail: Yup.string().email('Geçerli bir e-posta adresi giriniz').required('E-posta adresi zorunludur'),
});

const Patients: React.FC = () => {
    const [patients, setPatients] = useState<Patient[]>([]);
    const [showModal, setShowModal] = useState(false);
    const [selectedPatient, setSelectedPatient] = useState<Patient | null>(null);
    const [loading, setLoading] = useState(true);

    const fetchPatients = async () => {
        try {
            setLoading(true);
            const response = await patientService.getPatients();
            setPatients(response);
            setLoading(false);
        } catch (error: any) {
            const errorMessage = error.response?.data?.message || 'Hastalar yüklenirken bir hata oluştu!';
            toast.error(errorMessage);
            setPatients([]);
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchPatients();
    }, []);

    const handleClose = () => {
        setShowModal(false);
        setSelectedPatient(null);
    };

    const handleShow = (patient?: Patient) => {
        if (patient) {
            setSelectedPatient(patient);
        }
        setShowModal(true);
    };

    const handleSubmit = async (values: Patient) => {
        try {
            if (selectedPatient) {
                await patientService.updatePatient(Number(selectedPatient.id), {
                    ...values,
                    type: values.type as AnimalType
                });
                toast.success('Hasta bilgileri güncellendi!');
            } else {
                await patientService.createPatient({
                    ...values,
                    type: values.type as AnimalType
                });
                toast.success('Yeni hasta eklendi!');
            }
            handleClose();
            fetchPatients();
        } catch (error: any) {
            const errorMessage = error.response?.data?.message || 'İşlem sırasında bir hata oluştu!';
            toast.error(errorMessage);
        }
    };

    const handleDelete = async (id: string) => {
        if (window.confirm('Bu hastayı silmek istediğinizden emin misiniz?')) {
            try {
                await patientService.deletePatient(Number(id));
                toast.success('Hasta silindi!');
                fetchPatients();
            } catch (error: any) {
                const errorMessage = error.response?.data?.message || 'Hasta silinirken bir hata oluştu!';
                toast.error(errorMessage);
            }
        }
    };

    if (loading) {
        return (
            <Container>
                <div className="d-flex justify-content-center align-items-center" style={{ minHeight: '400px' }}>
                    <div className="spinner-border text-primary" role="status">
                        <span className="visually-hidden">Yükleniyor...</span>
                    </div>
                </div>
            </Container>
        );
    }

    return (
        <Container>
            <div className="d-flex justify-content-between align-items-center mb-4">
                <h1>Hastalar</h1>
                <Button variant="primary" onClick={() => handleShow()}>
                    <FontAwesomeIcon icon={faPlus} className="me-2" />
                    Yeni Hasta
                </Button>
            </div>

            <Card className="shadow-sm">
                <Card.Body>
                    <div className="table-responsive">
                        <Table hover>
                            <thead>
                                <tr>
                                    <th>Hasta Adı</th>
                                    <th>Tür</th>
                                    <th>Yaş</th>
                                    <th>Sahip</th>
                                    <th>İletişim</th>
                                    <th>İşlemler</th>
                                </tr>
                            </thead>
                            <tbody>
                                {patients.map(patient => (
                                    <tr key={patient.id}>
                                        <td>{patient.name}</td>
                                        <td>{patient.type}</td>
                                        <td>{patient.age}</td>
                                        <td>{patient.ownerName}</td>
                                        <td>
                                            <div>{patient.ownerPhone}</div>
                                            <div className="text-muted small">{patient.ownerEmail}</div>
                                        </td>
                                        <td>
                                            <Button
                                                variant="outline-primary"
                                                size="sm"
                                                className="me-2"
                                                onClick={() => handleShow(patient)}
                                            >
                                                <FontAwesomeIcon icon={faEdit} />
                                            </Button>
                                            <Button
                                                variant="outline-danger"
                                                size="sm"
                                                onClick={() => handleDelete(patient.id?.toString() || '')}
                                            >
                                                <FontAwesomeIcon icon={faTrash} />
                                            </Button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </Table>
                    </div>
                </Card.Body>
            </Card>

            <Modal show={showModal} onHide={handleClose} size="lg">
                <Modal.Header closeButton>
                    <Modal.Title>
                        {selectedPatient ? 'Hasta Düzenle' : 'Yeni Hasta Ekle'}
                    </Modal.Title>
                </Modal.Header>
                <Formik
                    initialValues={selectedPatient || {
                        name: '',
                        age: 0,
                        type: AnimalType.Kedi,
                        ownerName: '',
                        ownerPhone: '',
                        ownerEmail: '',
                    }}
                    validationSchema={patientSchema}
                    onSubmit={handleSubmit}
                >
                    {({
                        values,
                        errors,
                        touched,
                        handleChange,
                        handleBlur,
                        handleSubmit,
                    }) => (
                        <Form onSubmit={handleSubmit}>
                            <Modal.Body>
                                <Row>
                                    <Col md={6}>
                                        <Form.Group className="mb-3">
                                            <Form.Label>Hasta Adı</Form.Label>
                                            <Form.Control
                                                type="text"
                                                name="name"
                                                value={values.name}
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                                isInvalid={touched.name && !!errors.name}
                                            />
                                            <Form.Control.Feedback type="invalid">
                                                {errors.name}
                                            </Form.Control.Feedback>
                                        </Form.Group>
                                    </Col>
                                    <Col md={6}>
                                        <Form.Group className="mb-3">
                                            <Form.Label>Yaş</Form.Label>
                                            <Form.Control
                                                type="number"
                                                name="age"
                                                value={values.age}
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                                isInvalid={touched.age && !!errors.age}
                                            />
                                            <Form.Control.Feedback type="invalid">
                                                {errors.age}
                                            </Form.Control.Feedback>
                                        </Form.Group>
                                    </Col>
                                </Row>

                                <Form.Group className="mb-3">
                                    <Form.Label>Tür</Form.Label>
                                    <Form.Select
                                        name="type"
                                        value={values.type}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        isInvalid={touched.type && !!errors.type}
                                    >
                                        <option value="">Seçiniz</option>
                                        {Object.values(AnimalType).map(type => (
                                            <option key={type} value={type}>{type}</option>
                                        ))}
                                    </Form.Select>
                                    <Form.Control.Feedback type="invalid">
                                        {errors.type}
                                    </Form.Control.Feedback>
                                </Form.Group>

                                <Form.Group className="mb-3">
                                    <Form.Label>Sahip Adı</Form.Label>
                                    <Form.Control
                                        type="text"
                                        name="ownerName"
                                        value={values.ownerName}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        isInvalid={touched.ownerName && !!errors.ownerName}
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        {errors.ownerName}
                                    </Form.Control.Feedback>
                                </Form.Group>

                                <Row>
                                    <Col md={6}>
                                        <Form.Group className="mb-3">
                                            <Form.Label>Telefon</Form.Label>
                                            <Form.Control
                                                type="text"
                                                name="ownerPhone"
                                                value={values.ownerPhone}
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                                isInvalid={touched.ownerPhone && !!errors.ownerPhone}
                                            />
                                            <Form.Control.Feedback type="invalid">
                                                {errors.ownerPhone}
                                            </Form.Control.Feedback>
                                        </Form.Group>
                                    </Col>
                                    <Col md={6}>
                                        <Form.Group className="mb-3">
                                            <Form.Label>E-posta</Form.Label>
                                            <Form.Control
                                                type="email"
                                                name="ownerEmail"
                                                value={values.ownerEmail}
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                                isInvalid={touched.ownerEmail && !!errors.ownerEmail}
                                            />
                                            <Form.Control.Feedback type="invalid">
                                                {errors.ownerEmail}
                                            </Form.Control.Feedback>
                                        </Form.Group>
                                    </Col>
                                </Row>
                            </Modal.Body>
                            <Modal.Footer>
                                <Button variant="secondary" onClick={handleClose}>
                                    İptal
                                </Button>
                                <Button variant="primary" type="submit">
                                    {selectedPatient ? 'Güncelle' : 'Kaydet'}
                                </Button>
                            </Modal.Footer>
                        </Form>
                    )}
                </Formik>
            </Modal>
        </Container>
    );
};

export default Patients;
