import React, { useState, useEffect, useCallback } from 'react';
import { Container, Card, Table, Button, Modal, Form } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faEdit, faTrash, faEye } from '@fortawesome/free-solid-svg-icons';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { toast } from 'react-toastify';
import { Prescription, PrescriptionStatus, PrescriptionMedication } from '../services/prescriptionService';
import { prescriptionService } from '../services/prescriptionService';

interface PrescriptionFormValues {
    patientName: string;
    medications: PrescriptionMedication[];
}

const prescriptionSchema = Yup.object().shape({
    patientName: Yup.string().required('Hasta adı zorunludur'),
    medications: Yup.array().of(
        Yup.object().shape({
            name: Yup.string().required('İlaç adı zorunludur'),
            dose: Yup.string().required('Doz bilgisi zorunludur'),
            frequency: Yup.string().required('Kullanım sıklığı zorunludur')
        })
    ).min(1, 'En az bir ilaç eklenmelidir')
});

const Prescriptions: React.FC = () => {
    const [prescriptions, setPrescriptions] = useState<Prescription[]>([]);
    const [showModal, setShowModal] = useState(false);
    const [selectedPrescription, setSelectedPrescription] = useState<Prescription | null>(null);
    const [showViewModal, setShowViewModal] = useState(false);
    const [viewPrescription, setViewPrescription] = useState<Prescription | null>(null);
    const [loading, setLoading] = useState(true);

    const fetchPrescriptions = useCallback(async () => {
        try {
            setLoading(true);
            const response = await prescriptionService.getPrescriptions();
            setPrescriptions(response);
            setLoading(false);
        } catch (error: any) {
            const errorMessage = error.response?.data?.message || 'Reçeteler yüklenirken bir hata oluştu!';
            toast.error(errorMessage);
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchPrescriptions();
    }, [fetchPrescriptions]);

    const handleClose = () => {
        setShowModal(false);
        setSelectedPrescription(null);
    };

    const handleShow = (prescription?: Prescription) => {
        if (prescription) {
            setSelectedPrescription(prescription);
        }
        setShowModal(true);
    };

    const handleViewClose = () => {
        setShowViewModal(false);
        setViewPrescription(null);
    };

    const handleView = (prescription: Prescription) => {
        setViewPrescription(prescription);
        setShowViewModal(true);
    };

    const handleSubmit = async (values: PrescriptionFormValues) => {
        try {
            const prescriptionData: Prescription = {
                ...values,
                status: selectedPrescription ? selectedPrescription.status : PrescriptionStatus.ACTIVE
            };

            if (selectedPrescription) {
                await prescriptionService.updatePrescription(selectedPrescription.id!, prescriptionData);
                toast.success('Reçete güncellendi!');
            } else {
                await prescriptionService.createPrescription(prescriptionData);
                toast.success('Reçete oluşturuldu!');
            }
            handleClose();
            fetchPrescriptions();
        } catch (error: any) {
            const errorMessage = error.response?.data?.message || 'İşlem sırasında bir hata oluştu!';
            toast.error(errorMessage);
        }
    };

    const handleDelete = async (id: number) => {
        if (window.confirm('Bu reçeteyi silmek istediğinizden emin misiniz?')) {
            try {
                await prescriptionService.deletePrescription(id);
                toast.success('Reçete silindi!');
                fetchPrescriptions();
            } catch (error: any) {
                const errorMessage = error.response?.data?.message || 'Reçete silinirken bir hata oluştu!';
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
                <h1>Reçeteler</h1>
                <Button variant="primary" onClick={() => handleShow()}>
                    <FontAwesomeIcon icon={faPlus} className="me-2" />
                    Yeni Reçete
                </Button>
            </div>

            <Card className="shadow-sm">
                <Card.Body>
                    <div className="table-responsive">
                        <Table hover>
                            <thead>
                                <tr>
                                    <th>Hasta Adı</th>
                                    <th>İlaç Sayısı</th>
                                    <th>Durum</th>
                                    <th>İşlemler</th>
                                </tr>
                            </thead>
                            <tbody>
                                {prescriptions.length === 0 ? (
                                    <tr>
                                        <td colSpan={4} className="text-center py-4 text-muted">
                                            Reçete bulunamadı
                                        </td>
                                    </tr>
                                ) : (
                                    prescriptions.map(prescription => (
                                        <tr key={prescription.id}>
                                            <td>{prescription.patientName}</td>
                                            <td>{prescription.medications.length}</td>
                                            <td>
                                                <span className={`badge bg-${prescription.status === PrescriptionStatus.ACTIVE ? 'success' : 'secondary'}`}>
                                                    {prescription.status}
                                                </span>
                                            </td>
                                            <td>
                                                <Button
                                                    variant="outline-info"
                                                    size="sm"
                                                    className="me-2"
                                                    onClick={() => handleView(prescription)}
                                                >
                                                    <FontAwesomeIcon icon={faEye} />
                                                </Button>
                                                <Button
                                                    variant="outline-primary"
                                                    size="sm"
                                                    className="me-2"
                                                    onClick={() => handleShow(prescription)}
                                                >
                                                    <FontAwesomeIcon icon={faEdit} />
                                                </Button>
                                                <Button
                                                    variant="outline-danger"
                                                    size="sm"
                                                    onClick={() => handleDelete(prescription.id!)}
                                                >
                                                    <FontAwesomeIcon icon={faTrash} />
                                                </Button>
                                            </td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </Table>
                    </div>
                </Card.Body>
            </Card>

            <Modal show={showModal} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>
                        {selectedPrescription ? 'Reçete Düzenle' : 'Yeni Reçete'}
                    </Modal.Title>
                </Modal.Header>
                <Formik
                    initialValues={selectedPrescription || {
                        patientName: '',
                        medications: []
                    }}
                    validationSchema={prescriptionSchema}
                    onSubmit={handleSubmit}
                >
                    {({
                        values,
                        errors,
                        touched,
                        handleChange,
                        handleBlur,
                        handleSubmit,
                        setFieldValue
                    }) => (
                        <Form onSubmit={handleSubmit}>
                            <Modal.Body>
                                <Form.Group className="mb-3">
                                    <Form.Label>Hasta Adı</Form.Label>
                                    <Form.Control
                                        type="text"
                                        name="patientName"
                                        value={values.patientName}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        isInvalid={touched.patientName && !!errors.patientName}
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        {errors.patientName}
                                    </Form.Control.Feedback>
                                </Form.Group>

                                <div className="mb-3">
                                    <div className="d-flex justify-content-between align-items-center mb-3">
                                        <h5 className="mb-0">İlaçlar</h5>
                                        <Button
                                            variant="outline-primary"
                                            size="sm"
                                            onClick={() => {
                                                const medications = [...values.medications];
                                                medications.push({
                                                    name: '',
                                                    dose: '',
                                                    frequency: ''
                                                });
                                                setFieldValue('medications', medications);
                                            }}
                                        >
                                            <FontAwesomeIcon icon={faPlus} className="me-2" />
                                            İlaç Ekle
                                        </Button>
                                    </div>

                                    {values.medications.map((_, index) => (
                                        <Card key={index} className="mb-3">
                                            <Card.Body>
                                                <div className="d-flex justify-content-end mb-2">
                                                    <Button
                                                        variant="outline-danger"
                                                        size="sm"
                                                        onClick={() => {
                                                            const medications = [...values.medications];
                                                            medications.splice(index, 1);
                                                            setFieldValue('medications', medications);
                                                        }}
                                                    >
                                                        <FontAwesomeIcon icon={faTrash} />
                                                    </Button>
                                                </div>

                                                <Form.Group className="mb-3">
                                                    <Form.Label>İlaç Adı</Form.Label>
                                                    <Form.Control
                                                        type="text"
                                                        name={`medications.${index}.name`}
                                                        value={values.medications[index].name}
                                                        onChange={handleChange}
                                                        onBlur={handleBlur}
                                                        isInvalid={touched.medications?.[index]?.name && !!(errors.medications?.[index] as any)?.name}
                                                    />
                                                    <Form.Control.Feedback type="invalid">
                                                        {(errors.medications?.[index] as any)?.name}
                                                    </Form.Control.Feedback>
                                                </Form.Group>

                                                <Form.Group className="mb-3">
                                                    <Form.Label>Doz</Form.Label>
                                                    <Form.Control
                                                        type="text"
                                                        name={`medications.${index}.dose`}
                                                        value={values.medications[index].dose}
                                                        onChange={handleChange}
                                                        onBlur={handleBlur}
                                                        isInvalid={touched.medications?.[index]?.dose && !!(errors.medications?.[index] as any)?.dose}
                                                    />
                                                    <Form.Control.Feedback type="invalid">
                                                        {(errors.medications?.[index] as any)?.dose}
                                                    </Form.Control.Feedback>
                                                </Form.Group>

                                                <Form.Group className="mb-3">
                                                    <Form.Label>Kullanım Sıklığı</Form.Label>
                                                    <Form.Control
                                                        type="text"
                                                        name={`medications.${index}.frequency`}
                                                        value={values.medications[index].frequency}
                                                        onChange={handleChange}
                                                        onBlur={handleBlur}
                                                        isInvalid={touched.medications?.[index]?.frequency && !!(errors.medications?.[index] as any)?.frequency}
                                                    />
                                                    <Form.Control.Feedback type="invalid">
                                                        {(errors.medications?.[index] as any)?.frequency}
                                                    </Form.Control.Feedback>
                                                </Form.Group>
                                            </Card.Body>
                                        </Card>
                                    ))}
                                </div>
                            </Modal.Body>
                            <Modal.Footer>
                                <Button variant="secondary" onClick={handleClose}>
                                    İptal
                                </Button>
                                <Button variant="primary" type="submit">
                                    {selectedPrescription ? 'Güncelle' : 'Kaydet'}
                                </Button>
                            </Modal.Footer>
                        </Form>
                    )}
                </Formik>
            </Modal>

            <Modal show={showViewModal} onHide={handleViewClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Reçete Detayı</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {viewPrescription && (
                        <div>
                            <p><strong>Hasta Adı:</strong> {viewPrescription.patientName}</p>
                            <div className="mb-3">
                                <strong>İlaçlar:</strong>
                                <Table striped bordered hover size="sm" className="mt-2">
                                    <thead>
                                        <tr>
                                            <th>İlaç</th>
                                            <th>Doz</th>
                                            <th>Kullanım</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {viewPrescription.medications.map((medication, index) => (
                                            <tr key={index}>
                                                <td>{medication.name}</td>
                                                <td>{medication.dose}</td>
                                                <td>{medication.frequency}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </Table>
                            </div>
                        </div>
                    )}
                </Modal.Body>
            </Modal>
        </Container>
    );
};

export default Prescriptions;