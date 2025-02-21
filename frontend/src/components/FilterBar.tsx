import React from 'react';
import { Row, Col, Form } from 'react-bootstrap';

interface FilterOption {
    value: string;
    label: string;
}

interface FilterBarProps {
    filters: {
        [key: string]: {
            label: string;
            options: FilterOption[];
            value: string;
        };
    };
    onChange: (filterKey: string, value: string) => void;
}

const FilterBar: React.FC<FilterBarProps> = ({ filters, onChange }) => {
    return (
        <Row className="mb-3 g-3">
            {Object.entries(filters).map(([key, filter]) => (
                <Col key={key} xs={12} sm={6} md={4} lg={3}>
                    <Form.Group>
                        <Form.Label className="text-muted small mb-1">{filter.label}</Form.Label>
                        <Form.Select
                            size="sm"
                            value={filter.value}
                            onChange={(e) => onChange(key, e.target.value)}
                        >
                            <option value="">Tümü</option>
                            {filter.options.map((option) => (
                                <option key={option.value} value={option.value}>
                                    {option.label}
                                </option>
                            ))}
                        </Form.Select>
                    </Form.Group>
                </Col>
            ))}
        </Row>
    );
};

export default FilterBar; 