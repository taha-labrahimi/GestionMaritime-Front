import React, { useState, useEffect } from 'react';
import { Form, Button } from 'react-bootstrap';

function DynamicForm({ columns, data, onSubmit, actionType, foreignKeyOptions }) {
    const [formData, setFormData] = useState({});

    useEffect(() => {
        if (data) {
            setFormData(data);
        } else {
            const initialData = {};
            columns.forEach(col => {
                initialData[col.field] = '';
            });
            setFormData(initialData);
        }
    }, [columns, data]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(formData);
    };

    return (
        <Form onSubmit={handleSubmit}>
            {columns.map((col, index) => (
                <Form.Group controlId={`form-${col.field}`} key={index}>
                    <Form.Label>{col.label}</Form.Label>
                    {foreignKeyOptions && foreignKeyOptions[col.field] ? (
                        <Form.Control
                            as="select"
                            name={col.field}
                            value={formData[col.field] || ''}
                            onChange={handleChange}
                        >
                            <option value="">Select {col.label}</option>
                            {foreignKeyOptions[col.field].map(option => (
                                <option key={option.id} value={option.id}>
                                    {option.nom}
                                </option>
                            ))}
                        </Form.Control>
                    ) : (
                        <Form.Control
                            type="text"
                            name={col.field}
                            value={formData[col.field] || ''}
                            onChange={handleChange}
                            placeholder={`Enter ${col.label}`}
                        />
                    )}
                </Form.Group>
            ))}
            <Button variant="primary" type="submit">
                {actionType === 'Add' ? 'Add Entry' : 'Save Changes'}
            </Button>
        </Form>
    );
}

export default DynamicForm;
