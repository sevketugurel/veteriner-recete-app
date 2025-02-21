import React, { useState, useEffect } from 'react';
import { Container, Card, Table, Button, Modal, Form } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import { Formik, FormikProps } from 'formik';
import * as Yup from 'yup';
import { toast } from 'react-toastify';
import { Medication, MedicationType } from '../services/medicationService';
import { medicationService } from '../services/medicationService';

const medicineSchema = Yup.object().shape({
    name: Yup.string().required('İlaç adı zorunludur'),
    manufacturer: Yup.string().required('Üretici zorunludur'),
    unit: Yup.string().required('Birim zorunludur'),
    unitPrice: Yup.number().required('Birim fiyat zorunludur').min(0, 'Birim fiyat 0\'dan büyük olmalıdır'),
    stockQuantity: Yup.number().required('Stok miktarı zorunludur').min(0, 'Stok miktarı 0\'dan büyük olmalıdır'),
    expirationDate: Yup.date().required('Son kullanma tarihi zorunludur'),
    batchNumber: Yup.string().required('Parti numarası zorunludur'),
    type: Yup.string().required('İlaç tipi zorunludur'),
    description: Yup.string()
});

const defaultValues: Medication = {
    name: '',
    manufacturer: '',
    unit: '',
    unitPrice: 0,
    stockQuantity: 0,
    expirationDate: '',
    batchNumber: '',
    type: MedicationType.TABLET,
    description: '',
    active: true
};

const MedicinesPage: React.FC = () => {
    const [medicines, setMedicines] = useState<Medication[]>([]);
    const [showModal, setShowModal] = useState(false);
    const [selectedMedicine, setSelectedMedicine] = useState<Medication | null>(null);
    const [loading, setLoading] = useState(true);

    const fetchMedicines = async () => {
        try {
            setLoading(true);
            const response = await medicationService.getAllMedications();
            setMedicines(response);
            setLoading(false);
        } catch (error) {
            toast.error('İlaçlar yüklenirken bir hata oluştu!');
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchMedicines();
    }, []);

    const handleClose = () => {
        setShowModal(false);
        setSelectedMedicine(null);
    };

    const handleShow = (medicine?: Medication) => {
        if (medicine) {
            setSelectedMedicine(medicine);
        }
        setShowModal(true);
    };

    const handleSubmit = async (values: Medication) => {
        try {
            if (selectedMedicine) {
                await medicationService.updateMedication(selectedMedicine.id!, values);
                toast.success('İlaç bilgileri güncellendi!');
            } else {
                await medicationService.createMedication(values);
                toast.success('Yeni ilaç eklendi!');
            }
            handleClose();
            fetchMedicines();
        } catch (error) {
            toast.error('İşlem sırasında bir hata oluştu!');
        }
    };

    const handleDelete = async (id: number) => {
        if (window.confirm('Bu ilacı silmek istediğinizden emin misiniz?')) {
            try {
                await medicationService.deleteMedication(id);
                toast.success('İlaç silindi!');
                fetchMedicines();
            } catch (error) {
                toast.error('İlaç silinirken bir hata oluştu!');
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
                <h1>İlaçlar</h1>
                <Button variant="primary" onClick={() => handleShow()}>
                    <FontAwesomeIcon icon={faPlus} className="me-2" />
                    Yeni İlaç
                </Button>
            </div>

            <Card className="shadow-sm">
                <Card.Body>
                    <div className="table-responsive">
                        <Table hover>
                            <thead>
                                <tr>
                                    <th>İlaç Adı</th>
                                    <th>Üretici</th>
                                    <th>Tip</th>
                                    <th>Stok</th>
                                    <th>Birim Fiyat</th>
                                    <th>Son Kullanma</th>
                                    <th>İşlemler</th>
                                </tr>
                            </thead>
                            <tbody>
                                {medicines.length === 0 ? (
                                    <tr>
                                        <td colSpan={7} className="text-center py-4 text-muted">
                                            İlaç bulunamadı
                                        </td>
                                    </tr>
                                ) : (
                                    medicines.map(medicine => (
                                        <tr key={medicine.id}>
                                            <td>{medicine.name}</td>
                                            <td>{medicine.manufacturer}</td>
                                            <td>{medicine.type}</td>
                                            <td>{medicine.stockQuantity} {medicine.unit}</td>
                                            <td>{medicine.unitPrice.toFixed(2)} TL</td>
                                            <td>{new Date(medicine.expirationDate).toLocaleDateString()}</td>
                                            <td>
                                                <Button
                                                    variant="outline-primary"
                                                    size="sm"
                                                    className="me-2"
                                                    onClick={() => handleShow(medicine)}
                                                >
                                                    <FontAwesomeIcon icon={faEdit} />
                                                </Button>
                                                <Button
                                                    variant="outline-danger"
                                                    size="sm"
                                                    onClick={() => handleDelete(medicine.id!)}
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

            <Modal show={showModal} onHide={handleClose} size="lg">
                <Modal.Header closeButton>
                    <Modal.Title>
                        {selectedMedicine ? 'İlaç Düzenle' : 'Yeni İlaç Ekle'}
                    </Modal.Title>
                </Modal.Header>
                <Formik<Medication>
                    initialValues={selectedMedicine || defaultValues}
                    validationSchema={medicineSchema}
                    onSubmit={handleSubmit}
                >
                    {({
                        values,
                        errors,
                        touched,
                        handleChange,
                        handleBlur,
                        handleSubmit,
                    }: FormikProps<Medication>) => (
                        <Form onSubmit={handleSubmit}>
                            <Modal.Body>
                                <div className="row">
                                    <div className="col-md-6">
                                        <Form.Group className="mb-3">
                                            <Form.Label>İlaç Adı</Form.Label>
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
                                    </div>
                                    <div className="col-md-6">
                                        <Form.Group className="mb-3">
                                            <Form.Label>Üretici</Form.Label>
                                            <Form.Control
                                                type="text"
                                                name="manufacturer"
                                                value={values.manufacturer}
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                                isInvalid={touched.manufacturer && !!errors.manufacturer}
                                            />
                                            <Form.Control.Feedback type="invalid">
                                                {errors.manufacturer}
                                            </Form.Control.Feedback>
                                        </Form.Group>
                                    </div>
                                </div>

                                <div className="row">
                                    <div className="col-md-6">
                                        <Form.Group className="mb-3">
                                            <Form.Label>Birim</Form.Label>
                                            <Form.Control
                                                type="text"
                                                name="unit"
                                                value={values.unit}
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                                isInvalid={touched.unit && !!errors.unit}
                                            />
                                            <Form.Control.Feedback type="invalid">
                                                {errors.unit}
                                            </Form.Control.Feedback>
                                        </Form.Group>
                                    </div>
                                    <div className="col-md-6">
                                        <Form.Group className="mb-3">
                                            <Form.Label>Birim Fiyat</Form.Label>
                                            <Form.Control
                                                type="number"
                                                name="unitPrice"
                                                value={values.unitPrice}
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                                isInvalid={touched.unitPrice && !!errors.unitPrice}
                                            />
                                            <Form.Control.Feedback type="invalid">
                                                {errors.unitPrice}
                                            </Form.Control.Feedback>
                                        </Form.Group>
                                    </div>
                                </div>

                                <div className="row">
                                    <div className="col-md-6">
                                        <Form.Group className="mb-3">
                                            <Form.Label>Stok Miktarı</Form.Label>
                                            <Form.Control
                                                type="number"
                                                name="stockQuantity"
                                                value={values.stockQuantity}
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                                isInvalid={touched.stockQuantity && !!errors.stockQuantity}
                                            />
                                            <Form.Control.Feedback type="invalid">
                                                {errors.stockQuantity}
                                            </Form.Control.Feedback>
                                        </Form.Group>
                                    </div>
                                    <div className="col-md-6">
                                        <Form.Group className="mb-3">
                                            <Form.Label>Son Kullanma Tarihi</Form.Label>
                                            <Form.Control
                                                type="date"
                                                name="expirationDate"
                                                value={values.expirationDate}
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                                isInvalid={touched.expirationDate && !!errors.expirationDate}
                                            />
                                            <Form.Control.Feedback type="invalid">
                                                {errors.expirationDate}
                                            </Form.Control.Feedback>
                                        </Form.Group>
                                    </div>
                                </div>

                                <div className="row">
                                    <div className="col-md-6">
                                        <Form.Group className="mb-3">
                                            <Form.Label>Parti Numarası</Form.Label>
                                            <Form.Control
                                                type="text"
                                                name="batchNumber"
                                                value={values.batchNumber}
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                                isInvalid={touched.batchNumber && !!errors.batchNumber}
                                            />
                                            <Form.Control.Feedback type="invalid">
                                                {errors.batchNumber}
                                            </Form.Control.Feedback>
                                        </Form.Group>
                                    </div>
                                    <div className="col-md-6">
                                        <Form.Group className="mb-3">
                                            <Form.Label>İlaç Tipi</Form.Label>
                                            <Form.Select
                                                name="type"
                                                value={values.type}
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                                isInvalid={touched.type && !!errors.type}
                                            >
                                                {Object.values(MedicationType).map(type => (
                                                    <option key={type} value={type}>{type}</option>
                                                ))}
                                            </Form.Select>
                                            <Form.Control.Feedback type="invalid">
                                                {errors.type}
                                            </Form.Control.Feedback>
                                        </Form.Group>
                                    </div>
                                </div>

                                <Form.Group className="mb-3">
                                    <Form.Label>Açıklama</Form.Label>
                                    <Form.Control
                                        as="textarea"
                                        rows={3}
                                        name="description"
                                        value={values.description}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        isInvalid={touched.description && !!errors.description}
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        {errors.description}
                                    </Form.Control.Feedback>
                                </Form.Group>
                            </Modal.Body>
                            <Modal.Footer>
                                <Button variant="secondary" onClick={handleClose}>
                                    İptal
                                </Button>
                                <Button variant="primary" type="submit">
                                    {selectedMedicine ? 'Güncelle' : 'Kaydet'}
                                </Button>
                            </Modal.Footer>
                        </Form>
                    )}
                </Formik>
            </Modal>
        </Container>
    );
};

export default MedicinesPage; 