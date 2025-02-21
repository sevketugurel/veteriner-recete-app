import React from 'react';
import { Form, InputGroup } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

interface SearchBarProps {
    placeholder?: string;
    value: string;
    onChange: (value: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ 
    placeholder = 'Ara...', 
    value, 
    onChange 
}) => {
    return (
        <InputGroup className="mb-3">
            <InputGroup.Text>
                <FontAwesomeIcon icon={faSearch} className="text-muted" />
            </InputGroup.Text>
            <Form.Control
                type="text"
                placeholder={placeholder}
                value={value}
                onChange={(e) => onChange(e.target.value)}
            />
        </InputGroup>
    );
};

export default SearchBar; 