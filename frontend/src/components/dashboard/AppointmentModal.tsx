import React, { FC } from 'react';
import { Modal, Form, Button } from 'react-bootstrap';

interface AppointmentModalProps {
  show: boolean;
  onHide: () => void;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  appointment: {
    patientId: string;
    title: string;
    description: string;
    type: string;
    duration: number;
  };
  setAppointment: (appointment: any) => void;
  patients: any[];
}

const AppointmentModal: FC<AppointmentModalProps> = ({
  show,
  onHide,
  onSubmit,
  appointment,
  setAppointment,
  patients
}) => {
  return (
    <Modal show={show} onHide={onHide} centered>
      <Modal.Header closeButton>
        <Modal.Title>Yeni Randevu</Modal.Title>
      </Modal.Header>
      <Form onSubmit={onSubmit}>
        <Modal.Body>
          <Form.Group className="mb-3">
            <Form.Label>Hasta</Form.Label>
            <Form.Select
              value={appointment.patientId}
              onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
                setAppointment({ ...appointment, patientId: e.target.value })
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
            <Form.Label>Randevu Başlığı</Form.Label>
            <Form.Control
              type="text"
              value={appointment.title}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setAppointment({ ...appointment, title: e.target.value })
              }
              required
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Randevu Tipi</Form.Label>
            <Form.Select
              value={appointment.type}
              onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
                setAppointment({ ...appointment, type: e.target.value })
              }
            >
              <option value="checkup">Kontrol</option>
              <option value="vaccination">Aşı</option>
              <option value="surgery">Ameliyat</option>
              <option value="other">Diğer</option>
            </Form.Select>
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Süre (Dakika)</Form.Label>
            <Form.Control
              type="number"
              value={appointment.duration}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setAppointment({ ...appointment, duration: parseInt(e.target.value) })
              }
              min={15}
              step={15}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Açıklama</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              value={appointment.description}
              onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
                setAppointment({ ...appointment, description: e.target.value })
              }
            />
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

export default AppointmentModal; 