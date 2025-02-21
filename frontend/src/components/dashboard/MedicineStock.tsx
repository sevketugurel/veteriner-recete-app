import React, { FC } from 'react';
import { Card } from 'react-bootstrap';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from 'recharts';

interface MedicineChartData {
  name: string;
  stock: number;
  critical: boolean;
}

interface MedicineStockProps {
  data: MedicineChartData[];
}

const MedicineStock: FC<MedicineStockProps> = ({ data }) => {
  return (
    <Card className="shadow-sm mb-4">
      <Card.Header>
        <h5 className="mb-0">İlaç Stoğu</h5>
      </Card.Header>
      <Card.Body>
        <ResponsiveContainer width="100%" height={200}>
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Bar 
              dataKey="stock" 
              fill="#28a745"
              stroke="#dc3545"
              strokeWidth={2}
              strokeOpacity={0.8}
              fillOpacity={0.8}
            />
          </BarChart>
        </ResponsiveContainer>
      </Card.Body>
    </Card>
  );
};

export default MedicineStock; 