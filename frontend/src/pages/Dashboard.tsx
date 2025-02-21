import React, { useState, FC } from 'react';
import { Container, Row, Col, Navbar, Nav } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faPaw,
  faFilePrescription,
  faCapsules,
  faHome
} from '@fortawesome/free-solid-svg-icons';
import { toast } from 'react-toastify';
import { mockPatients, mockPrescriptions, mockMedicines, mockAppointments } from '../utils/mockData';
import '../styles/calendar.css';

// Components
import StatsCards from '../components/dashboard/StatsCards';
import AppointmentCalendar from '../components/dashboard/AppointmentCalendar';
import MedicineStock from '../components/dashboard/MedicineStock';
import PrescriptionList from '../components/dashboard/PrescriptionList';
import AppointmentModal from '../components/dashboard/AppointmentModal';
import PrescriptionModal from '../components/dashboard/PrescriptionModal';

// Types
import { Prescription, Appointment, PrescriptionMedicine } from '../types';

const trLocale = {
  code: 'tr',
  week: { dow: 1, doy: 7 },
  buttonText: {
    prev: 'Geri',
    next: 'İleri',
    today: 'Bugün',
    month: 'Ay',
    week: 'Hafta',
    day: 'Gün',
    list: 'Liste'
  },
  weekText: 'Hafta',
  allDayText: 'Tüm Gün',
  moreLinkText: 'Daha Fazla',
  noEventsText: 'Gösterilecek etkinlik yok'
};

const Dashboard: FC = () => {
  const [showPrescriptionModal, setShowPrescriptionModal] = useState<boolean>(false);
  const [showAppointmentModal, setShowAppointmentModal] = useState<boolean>(false);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  
  const [prescription, setPrescription] = useState<Prescription>({
    id: '',
    patientId: '',
    diagnosis: '',
    diagnosisId: '',
    medicines: [
      {
        medicineId: '',
        medicineName: '',
        dosage: '',
        frequency: '',
        duration: ''
      }
    ],
    doctorName: '',
    diplomaNo: '',
    date: new Date().toISOString().split('T')[0],
    status: 'active'
  });

  const [newAppointment, setNewAppointment] = useState<{
    patientId: string;
    title: string;
    description: string;
    type: string;
    duration: number;
  }>({
    patientId: '',
    title: '',
    description: '',
    type: 'checkup',
    duration: 30
  });

  const handlePrescriptionSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (
      !prescription.patientId ||
      !prescription.diagnosis ||
      prescription.medicines.some((m) => !m.medicineName)
    ) {
      toast.error('Lütfen gerekli alanları doldurun!');
      return;
    }
    mockPrescriptions.push({
      ...prescription,
      id: Math.random().toString(36).substring(2, 11),
      medicines: prescription.medicines
    });
    toast.success('Reçete başarıyla oluşturuldu!');
    setShowPrescriptionModal(false);
    setPrescription({
      id: '',
      patientId: '',
      diagnosis: '',
      diagnosisId: '',
      medicines: [
        {
          medicineId: '',
          medicineName: '',
          dosage: '',
          frequency: '',
          duration: ''
        }
      ],
      doctorName: '',
      diplomaNo: '',
      date: new Date().toISOString().split('T')[0],
      status: 'active'
    });
  };

  const handleMedicineChange = (
    index: number,
    field: keyof PrescriptionMedicine,
    value: string
  ) => {
    const newMedicines = prescription.medicines.map((med, i) => {
      if (i === index) return { ...med, [field]: value };
      return med;
    });
    setPrescription({ ...prescription, medicines: newMedicines });
  };

  const addMedicineRow = () => {
    setPrescription({
      ...prescription,
      medicines: [
        ...prescription.medicines,
        { medicineId: '', medicineName: '', dosage: '', frequency: '', duration: '' }
      ]
    });
  };

  const removeMedicineRow = (index: number) => {
    const newMedicines = prescription.medicines.filter((_, i) => i !== index);
    setPrescription({ ...prescription, medicines: newMedicines });
  };

  const handleDateSelect = (selectInfo: any) => {
    setSelectedDate(selectInfo.start);
    setShowAppointmentModal(true);
  };

  const handleAppointmentSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (selectedDate && newAppointment.patientId && newAppointment.title) {
      const start = selectedDate;
      const end = new Date(start.getTime() + newAppointment.duration * 60000);
      const appointment: Appointment = {
        id: Math.random().toString(36).substring(2, 11),
        patientId: newAppointment.patientId,
        title: newAppointment.title,
        start,
        end,
        description: newAppointment.description,
        status: 'scheduled',
        type: newAppointment.type as 'checkup' | 'vaccination' | 'surgery' | 'other'
      };
      mockAppointments.push(appointment);
      toast.success('Randevu başarıyla oluşturuldu!');
      setShowAppointmentModal(false);
      setNewAppointment({
        patientId: '',
        title: '',
        description: '',
        type: 'checkup',
        duration: 30
      });
    } else {
      toast.error('Lütfen gerekli alanları doldurun!');
    }
  };

  const lowStockCount = mockMedicines.filter((m) => m.stock < 20).length;
  const activePrescriptionsCount =
    mockPrescriptions.filter((p) => p.status === 'active').length || mockPrescriptions.length;

  const medicineChartData = mockMedicines.map(medicine => ({
    name: medicine.name,
    stock: medicine.stock,
    critical: medicine.stock < 20
  }));

  return (
    <>
      <Navbar expand="lg" className="navbar fixed-top">
        <Container>
          <Link to="/" className="navbar-brand me-4">Veteriner Reçete Sistemi</Link>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav>
              <Link to="/" className="nav-link me-3">
                <FontAwesomeIcon icon={faHome} className="me-1" /> Ana Sayfa
              </Link>
              <Link to="/patients" className="nav-link me-3">
                <FontAwesomeIcon icon={faPaw} className="me-1" /> Hastalar
              </Link>
              <Link to="/prescriptions" className="nav-link me-3">
                <FontAwesomeIcon icon={faFilePrescription} className="me-1" /> Reçeteler
              </Link>
              <Link to="/medicines" className="nav-link me-3">
                <FontAwesomeIcon icon={faCapsules} className="me-1" /> İlaçlar
              </Link>
            </Nav>
            <Nav className="ms-auto">
              <Link to="/logout" className="nav-link">Çıkış</Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <Container fluid className="mt-5 pt-3">
        <StatsCards
          patientsCount={mockPatients.length}
          activePrescriptionsCount={activePrescriptionsCount}
          medicinesCount={mockMedicines.length}
          lowStockCount={lowStockCount}
        />

        <Row className="mb-4">
          <Col lg={8}>
            <AppointmentCalendar
              appointments={mockAppointments}
              onDateSelect={handleDateSelect}
              onAddAppointment={() => setShowAppointmentModal(true)}
              locale={trLocale}
            />
          </Col>

          <Col lg={4}>
            <MedicineStock data={medicineChartData} />
            <PrescriptionList
              prescriptions={mockPrescriptions}
              patients={mockPatients}
              onAddPrescription={() => setShowPrescriptionModal(true)}
            />
          </Col>
        </Row>
      </Container>

      <AppointmentModal
        show={showAppointmentModal}
        onHide={() => setShowAppointmentModal(false)}
        onSubmit={handleAppointmentSubmit}
        appointment={newAppointment}
        setAppointment={setNewAppointment}
        patients={mockPatients}
      />

      <PrescriptionModal
        show={showPrescriptionModal}
        onHide={() => setShowPrescriptionModal(false)}
        onSubmit={handlePrescriptionSubmit}
        prescription={prescription}
        setPrescription={setPrescription}
        patients={mockPatients}
        handleMedicineChange={handleMedicineChange}
        addMedicineRow={addMedicineRow}
        removeMedicineRow={removeMedicineRow}
      />
    </>
  );
};

export default Dashboard;
