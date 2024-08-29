import React, { useState } from 'react';
import { Button, Modal } from 'react-bootstrap';
import { FaEye, FaEdit, FaTrash } from 'react-icons/fa';
import axios from 'axios';
import Swal from 'sweetalert2';
import DynamicForm from './DynamicForm';
import './ReusableTable.css';

function ReusableTable({ columns, data, onDelete, onSave, tableName }) {
    const [showModal, setShowModal] = useState(false);
    const [currentAction, setCurrentAction] = useState('');
    const [selectedRow, setSelectedRow] = useState(null);

    const apiEndpoint = tableName ? `http://localhost:3001/api/${tableName.toLowerCase()}` : '';
    console.log('API Endpoint:', apiEndpoint);

    if (!tableName) {
        console.error('tableName is undefined');
        return null; 
    }

    const handleClose = () => setShowModal(false);

    const handleShow = (action, row = null) => {
        setCurrentAction(action);
        setSelectedRow(row);
        setShowModal(true);
    };

    const handleFormSubmit = async (formData) => {
        const token = localStorage.getItem('token');
    
        try {
            if (currentAction === 'Add') {
                await axios.post(apiEndpoint, formData, {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json'
                    }
                });
    
                Swal.fire({
                    icon: 'success',
                    title: `${tableName} added successfully!`,
                    showConfirmButton: false,
                    timer: 1500
                });
    
            } else if (currentAction === 'Edit') {
                await axios.put(`${apiEndpoint}/${selectedRow.id}`, formData, {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json'
                    }
                });
    
                Swal.fire({
                    icon: 'success',
                    title: `${tableName} updated successfully!`,
                    showConfirmButton: false,
                    timer: 1500
                });
            }
    
            if (onSave) {
                onSave(formData, currentAction); // Ensure this line is correctly triggering the parent component's onSave function
            }
            handleClose();
        } catch (error) {
            console.error('Error saving data:', error);
            Swal.fire({
                icon: 'error',
                title: 'Error saving data!',
                text: 'There was an issue saving the data. Please try again.',
                showConfirmButton: true
            });
        }
    };
        

    const renderModalContent = () => {
        switch (currentAction) {
            case 'Show':
                return (
                    <>
                        <Modal.Header closeButton>
                            <Modal.Title>Show Details</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            {columns.map((col, index) => (
                                <p key={index}>
                                    <strong>{col.label}:</strong> {selectedRow[col.field]}
                                </p>
                            ))}
                        </Modal.Body>
                    </>
                );
            case 'Edit':
            case 'Add':
                return (
                    <>
                        <Modal.Header closeButton>
                            <Modal.Title>{currentAction} {tableName}</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <DynamicForm
                                columns={columns}
                                data={currentAction === 'Edit' ? selectedRow : null}
                                onSubmit={handleFormSubmit}
                                actionType={currentAction}
                            />
                        </Modal.Body>
                    </>
                );
            default:
                return null;
        }
    };

    return (
        <>
            <Button
                variant="success"
                onClick={() => handleShow('Add')}
                className="mb-3 add-entry-button"
            >
                Add {tableName}
            </Button>

            <table className="table table-bordered">
                <thead>
                    <tr>
                        {columns.map((col, index) => (
                            <th key={index}>{col.label}</th>
                        ))}
                        <th width="240px">Action</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((row, key) => (
                        <tr key={key}>
                            {columns.map((col, index) => (
                                <td key={index}>
                                    {col.render ? col.render(row) : row[col.field]} {/* Use custom render function if available */}
                                </td>
                            ))}
                            <td>
                                <Button variant="info" className="mx-1" onClick={() => handleShow('Show', row)}>
                                    <FaEye />
                                </Button>
                                <Button variant="success" className="mx-1" onClick={() => handleShow('Edit', row)}>
                                    <FaEdit />
                                </Button>
                                <Button variant="danger" className="mx-1" onClick={() => onDelete(row.id)}>
                                    <FaTrash />
                                </Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            <Modal show={showModal} onHide={handleClose}>
                {renderModalContent()}
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default ReusableTable;
