import React, { FC } from 'react';
import { Row, Col, Card } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import {
  faPaw,
  faPrescriptionBottle,
  faCapsules,
  faExclamationTriangle,
} from '@fortawesome/free-solid-svg-icons';

interface StatsCardProps {
  title: string;
  count: number;
  icon: IconDefinition;
  bgColor: string;
}

const StatsCard: FC<StatsCardProps> = ({ title, count, icon, bgColor }) => (
  <Card className="shadow-sm mb-3" style={{ background: bgColor, color: '#fff' }}>
    <Card.Body>
      <div className="d-flex justify-content-between align-items-center">
        <div>
          <h6>{title}</h6>
          <h3>{count}</h3>
        </div>
        <FontAwesomeIcon icon={icon} size="2x" />
      </div>
    </Card.Body>
  </Card>
);

interface StatsCardsProps {
  patientsCount: number;
  activePrescriptionsCount: number;
  medicinesCount: number;
  lowStockCount: number;
}

const StatsCards: FC<StatsCardsProps> = ({
  patientsCount,
  activePrescriptionsCount,
  medicinesCount,
  lowStockCount
}) => {
  return (
    <Row className="g-4 mb-4">
      <Col md={3}>
        <StatsCard
          title="Toplam Hasta"
          count={patientsCount}
          icon={faPaw}
          bgColor="linear-gradient(45deg, #1d8cf8, #3358f4)"
        />
      </Col>
      <Col md={3}>
        <StatsCard
          title="Aktif Reçeteler"
          count={activePrescriptionsCount}
          icon={faPrescriptionBottle}
          bgColor="linear-gradient(45deg, #28a745, #218838)"
        />
      </Col>
      <Col md={3}>
        <StatsCard
          title="Toplam İlaç"
          count={medicinesCount}
          icon={faCapsules}
          bgColor="linear-gradient(45deg, #17a2b8, #138496)"
        />
      </Col>
      <Col md={3}>
        <StatsCard
          title="Düşük Stok"
          count={lowStockCount}
          icon={faExclamationTriangle}
          bgColor="linear-gradient(45deg, #ffc107, #e0a800)"
        />
      </Col>
    </Row>
  );
};

export default StatsCards; 