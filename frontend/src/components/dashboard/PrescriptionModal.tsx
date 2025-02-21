import React, { FC } from 'react';
import { Modal, Form, Button } from 'react-bootstrap';
import { Prescription, PrescriptionMedicine } from '../../types';

interface PrescriptionModalProps {
  show: boolean;
  onHide: () => void;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  prescription: Prescription;
  setPrescription: (prescription: any) => void;
  patients: any[];
  handleMedicineChange: (index: number, field: keyof PrescriptionMedicine, value: string) => void;
  addMedicineRow: () => void;
  removeMedicineRow: (index: number) => void;
}

const PrescriptionModal: FC<PrescriptionModalProps> = ({
  show,
  onHide,
  onSubmit,
  prescription,
  setPrescription,
  patients,
  handleMedicineChange,
  addMedicineRow,
  removeMedicineRow
}) => {
  return (
    <Modal show={show} onHide={onHide} size="lg" centered>
      <Modal.Header closeButton className="bg-primary text-white">
        <Modal.Title>Yeni Reçete</Modal.Title>
      </Modal.Header>
      <Form onSubmit={onSubmit}>
        <Modal.Body>
          <Form.Group className="mb-3">
            <Form.Label>Hasta Seçin</Form.Label>
            <Form.Select
              value={prescription.patientId}
              onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
                setPrescription({ ...prescription, patientId: e.target.value })
              }
              required
            >
              <option value="">Hasta Seçin</option>
              {patients.map((p) => (
                <option key={p.id} value={p.id}>
                  {p.name} ({p.type})
                </option>
              ))}
            </Form.Select>
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Tanı</Form.Label>
            <Form.Control
              as="textarea"
              rows={2}
              placeholder="Tanıyı girin"
              value={prescription.diagnosis}
              onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
                setPrescription({ ...prescription, diagnosis: e.target.value })
              }
              required
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>İlaçlar</Form.Label>
            {prescription.medicines.map((med, index) => (
              <div key={index} className="d-flex align-items-center mb-2">
                <Form.Control
                  type="text"
                  placeholder="İlaç Adı"
                  value={med.medicineName}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    handleMedicineChange(index, 'medicineName', e.target.value)
                  }
                  required
                />
                <Form.Control
                  type="text"
                  placeholder="Doz"
                  value={med.dosage}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    handleMedicineChange(index, 'dosage', e.target.value)
                  }
                  className="mx-2"
                />
                <Form.Control
                  type="number"
                  placeholder="Kullanım Süresi (Gün)"
                  value={med.duration}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    handleMedicineChange(index, 'duration', e.target.value)
                  }
                  className="me-2"
                />
                {prescription.medicines.length > 1 && (
                  <Button variant="danger" size="sm" onClick={() => removeMedicineRow(index)}>
                    Sil
                  </Button>
                )}
              </div>
            ))}
            <Button variant="outline-secondary" size="sm" onClick={addMedicineRow}>
              İlaç Ekle
            </Button>
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Doktor Adı</Form.Label>
            <Form.Control
              type="text"
              placeholder="Doktor Adı"
              value={prescription.doctorName}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setPrescription({ ...prescription, doctorName: e.target.value })
              }
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Diploma No</Form.Label>
            <Form.Control
              type="text"
              placeholder="Diploma No"
              value={prescription.diplomaNo}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setPrescription({ ...prescription, diplomaNo: e.target.value })
              }
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Tarih</Form.Label>
            <Form.Control type="text" value={prescription.date} disabled />
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={onHide}>
            İptal
          </Button>
          <Button variant="primary" type="submit">
            Kaydet
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
};

export default PrescriptionModal; 
