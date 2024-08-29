import React, { useEffect, useState } from 'react';
import ReusableTable from '../Reusable/ReusableTable';
import axios from 'axios';
import Swal from 'sweetalert2';
import { Modal, Button } from 'react-bootstrap';
import { FaEye } from 'react-icons/fa';

function ManageNavires() {
    const [navires, setNavires] = useState([]);
    const [ports, setPorts] = useState([]);
    const [selectedPort, setSelectedPort] = useState(null);
    const [showPortModal, setShowPortModal] = useState(false);

    const columns = [
        { label: 'Name', field: 'nom' },
        { label: 'Capacity', field: 'capacite' },
        { label: 'State', field: 'etat' },
        { 
            label: 'Port', 
            field: 'portId',
            render: (row) => (
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span>{getPortNameById(row.portId)}</span>
                    <FaEye 
                        onClick={() => handleShowPortDetails(row.portId)} 
                        style={{ cursor: 'pointer', color: '#007bff', marginLeft: '8px' }}
                    />
                </div>
            )
        },
    ];

    useEffect(() => {
        fetchNavires();
        fetchPorts();
    }, []);

    const fetchNavires = () => {
        const token = localStorage.getItem('token');
        axios.get('http://localhost:3001/api/navires', {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
        .then(response => {
            setNavires(response.data);
        })
        .catch(error => {
            console.error('There was an error fetching the navires!', error);
        });
    };

    const fetchPorts = () => {
        const token = localStorage.getItem('token');
        axios.get('http://localhost:3001/api/ports', {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
        .then(response => {
            setPorts(response.data);
        })
        .catch(error => {
            console.error('There was an error fetching the ports!', error);
        });
    };

    const handleSave = (formData, actionType) => {
        fetchNavires();
    };

    const handleDelete = (id) => {
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
            if (result.isConfirmed) {
                const token = localStorage.getItem('token');
                axios.delete(`http://localhost:3001/api/navires/${id}`,{
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                })
                    .then(() => {
                        Swal.fire('Deleted!', 'Navire has been deleted.', 'success');
                        fetchNavires();
                    })
                    .catch(error => {
                        console.error('There was an error deleting the navire!', error);
                    });
            }
        });
    };

    const getPortNameById = (portId) => {
        const port = ports.find(p => p.id === portId);
        return port ? port.nom : 'Unknown';
    };

    const handleShowPortDetails = (portId) => {
        const port = ports.find(p => p.id === portId);
        setSelectedPort(port);
        setShowPortModal(true);
    };

    return (
        <div className="manage-navires">
            <h2>Manage Navires</h2>
            <ReusableTable 
                columns={columns} 
                data={navires} 
                onDelete={handleDelete} 
                onSave={handleSave}
                tableName="Navires"  
            />

            {selectedPort && (
                <Modal show={showPortModal} onHide={() => setShowPortModal(false)}>
                    <Modal.Header closeButton>
                        <Modal.Title>Port Details</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <p><strong>Name:</strong> {selectedPort.nom}</p>
                        <p><strong>Location:</strong> {selectedPort.localisation}</p>
                        <p><strong>Capacity:</strong> {selectedPort.capacite}</p>
                        <p><strong>Country:</strong> {selectedPort.pays}</p>
                        <p><strong>Opening Hours:</strong> {selectedPort.heuresOuverture}</p>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={() => setShowPortModal(false)}>
                            Close
                        </Button>
                    </Modal.Footer>
                </Modal>
            )}
        </div>
    );
}

export default ManageNavires;


