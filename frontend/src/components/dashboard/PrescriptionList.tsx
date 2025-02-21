import React, { FC } from 'react';
import { Card, Table, Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFilePrescription } from '@fortawesome/free-solid-svg-icons';
import { Prescription } from '../../types';

interface PrescriptionListProps {
  prescriptions: Prescription[];
  patients: any[];
  onAddPrescription: () => void;
}

const PrescriptionList: FC<PrescriptionListProps> = ({
  prescriptions,
  patients,
  onAddPrescription
}) => {
  return (
    <Card className="shadow-sm">
      <Card.Header>
        <h5 className="mb-0">Reçete Listesi</h5>
      </Card.Header>
      <Card.Body>
        <Table striped hover responsive>
          <thead>
            <tr>
              <th>ID</th>
              <th>Hasta</th>
              <th>Tarih</th>
              <th>Tanı</th>
            </tr>
          </thead>
          <tbody>
            {prescriptions.map((p) => (
              <tr key={p.id}>
                <td>{p.id}</td>
                <td>
                  {patients.find((patient) => patient.id === p.patientId)?.name || '-'}
                </td>
                <td>{p.date}</td>
                <td>{p.diagnosis}</td>
              </tr>
            ))}
          </tbody>
        </Table>
        <Button
          variant="primary"
          size="sm"
          onClick={onAddPrescription}
        >
          <FontAwesomeIcon icon={faFilePrescription} className="me-2" />
          Yeni Reçete Oluştur
        </Button>
      </Card.Body>
    </Card>
  );
};

export default PrescriptionList; 