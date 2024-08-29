import React, { useEffect, useState } from 'react';
import ReusableTable from '../Reusable/ReusableTable';
import axios from 'axios';
import Swal from 'sweetalert2';
import { Modal, Button } from 'react-bootstrap';
import { FaEye } from 'react-icons/fa';

function ManageConteneurs() {
    const [conteneurs, setConteneurs] = useState([]);
    const [navires, setNavires] = useState([]);
    const [armateurs, setArmateurs] = useState([]);
    const [ports, setPorts] = useState([]);
    const [clients, setClients] = useState([]);
    const [selectedEntity, setSelectedEntity] = useState(null);
    const [entityType, setEntityType] = useState('');
    const [showModal, setShowModal] = useState(false);

    const columns = [
        { label: 'Type', field: 'type' },
        { label: 'Size', field: 'taille' },
        { label: 'State', field: 'etat' },
        { label: 'Weight', field: 'poids' },
        { label: 'Content', field: 'contenu' },
        { 
            label: 'Ship', 
            field: 'navireId',
            render: (row) => (
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span>{getEntityNameById(navires, row.navireId)}</span>
                    <FaEye 
                        onClick={() => handleShowEntityDetails('Navire', row.navireId)} 
                        style={{ cursor: 'pointer', color: '#007bff', marginLeft: '8px' }}
                    />
                </div>
            )
        }, 
        { 
            label: 'Owner', 
            field: 'armateurId',
            render: (row) => (
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span>{getEntityNameById(armateurs, row.armateurId)}</span>
                    <FaEye 
                        onClick={() => handleShowEntityDetails('Armateur', row.armateurId)} 
                        style={{ cursor: 'pointer', color: '#007bff', marginLeft: '8px' }}
                    />
                </div>
            )
        },
        { 
            label: 'Port', 
            field: 'portId',
            render: (row) => (
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span>{getEntityNameById(ports, row.portId)}</span>
                    <FaEye 
                        onClick={() => handleShowEntityDetails('Port', row.portId)} 
                        style={{ cursor: 'pointer', color: '#007bff', marginLeft: '8px' }}
                    />
                </div>
            )
        }, 
        { 
            label: 'Client', 
            field: 'clientId',
            render: (row) => (
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span>{getEntityNameById(clients, row.clientId)}</span>
                    <FaEye 
                        onClick={() => handleShowEntityDetails('Client', row.clientId)} 
                        style={{ cursor: 'pointer', color: '#007bff', marginLeft: '8px' }}
                    />
                </div>
            )
        } 
    ];

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        await fetchConteneurs();
        await fetchNavires();
        await fetchArmateurs();
        await fetchPorts();
        await fetchClients();
    };

    const fetchConteneurs = async () => {
        const token = localStorage.getItem('token');
        try {
            const response = await axios.get('http://localhost:3001/api/conteneurs', {
                headers: { 'Authorization': `Bearer ${token}` }
            });
            setConteneurs(response.data);
        } catch (error) {
            console.error('There was an error fetching the conteneurs!', error);
        }
    };

    const fetchNavires = async () => {
        const token = localStorage.getItem('token');
        try {
            const response = await axios.get('http://localhost:3001/api/navires', {
                headers: { 'Authorization': `Bearer ${token}` }
            });
            setNavires(response.data);
        } catch (error) {
            console.error('There was an error fetching the navires!', error);
        }
    };

    const fetchArmateurs = async () => {
        const token = localStorage.getItem('token');
        try {
            const response = await axios.get('http://localhost:3001/api/armateurs', {
                headers: { 'Authorization': `Bearer ${token}` }
            });
            setArmateurs(response.data);
        } catch (error) {
            console.error('There was an error fetching the armateurs!', error);
        }
    };

    const fetchPorts = async () => {
        const token = localStorage.getItem('token');
        try {
            const response = await axios.get('http://localhost:3001/api/ports', {
                headers: { 'Authorization': `Bearer ${token}` }
            });
            setPorts(response.data);
        } catch (error) {
            console.error('There was an error fetching the ports!', error);
        }
    };

    const fetchClients = async () => {
        const token = localStorage.getItem('token');
        try {
            const response = await axios.get('http://localhost:3001/api/clients', {
                headers: { 'Authorization': `Bearer ${token}` }
            });
            setClients(response.data);
        } catch (error) {
            console.error('There was an error fetching the clients!', error);
        }
    };

    const getEntityNameById = (entities, id) => {
        const entity = entities.find(e => e.id === id);
        return entity ? entity.nom : 'Unknown';
    };

    const handleShowEntityDetails = (type, id) => {
        let entity = null;
        switch (type) {
            case 'Navire':
                entity = navires.find(n => n.id === id);
                break;
            case 'Armateur':
                entity = armateurs.find(a => a.id === id);
                break;
            case 'Port':
                entity = ports.find(p => p.id === id);
                break;
            case 'Client':
                entity = clients.find(c => c.id === id);
                break;
            default:
                break;
        }
        setEntityType(type);
        setSelectedEntity(entity);
        setShowModal(true);
    };

    const renderEntityDetails = () => {
        if (!selectedEntity) return null;
        switch (entityType) {
            case 'Navire':
                return (
                    <>
                        <p><strong>Name:</strong> {selectedEntity.nom}</p>
                        <p><strong>Capacity:</strong> {selectedEntity.capacite}</p>
                        <p><strong>State:</strong> {selectedEntity.etat}</p>
                        <p><strong>Port:</strong> {getEntityNameById(ports, selectedEntity.portId)}</p>
                    </>
                );
            case 'Armateur':
                return (
                    <>
                        <p><strong>Name:</strong> {selectedEntity.nom}</p>
                        <p><strong>Address:</strong> {selectedEntity.adresse}</p>
                        <p><strong>Email:</strong> {selectedEntity.email}</p>
                        <p><strong>Contact:</strong> {selectedEntity.numTel}</p>
                    </>
                );
            case 'Port':
                return (
                    <>
                        <p><strong>Name:</strong> {selectedEntity.nom}</p>
                        <p><strong>Location:</strong> {selectedEntity.localisation}</p>
                        <p><strong>Capacity:</strong> {selectedEntity.capacite}</p>
                        <p><strong>Country:</strong> {selectedEntity.pays}</p>
                        <p><strong>Opening Hours:</strong> {selectedEntity.heuresOuverture}</p>
                    </>
                );
            case 'Client':
                return (
                    <>
                        <p><strong>Name:</strong> {selectedEntity.nom}</p>
                        <p><strong>Address:</strong> {selectedEntity.adresse}</p>
                        <p><strong>Email:</strong> {selectedEntity.email}</p>
                        <p><strong>Contact:</strong> {selectedEntity.numTel}</p>
                    </>
                );
            default:
                return null;
        }
    };

    const handleSave = () => {
        fetchConteneurs(); // Refresh the list after saving (adding or editing)
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
                axios.delete(`http://localhost:3001/api/conteneurs/${id}`, {
                    headers: { 'Authorization': `Bearer ${token}` }
                })
                    .then(() => {
                        Swal.fire('Deleted!', 'Conteneur has been deleted.', 'success');
                        fetchConteneurs();
                    })
                    .catch(error => {
                        console.error('There was an error deleting the conteneur!', error);
                    });
            }
        });
    };

    return (
        <div className="manage-conteneurs">
            <h2>Manage Conteneurs</h2>
            <ReusableTable 
                columns={columns} 
                data={conteneurs} 
                onDelete={handleDelete} 
                onSave={handleSave} 
                tableName="Conteneurs"  
            />

            {selectedEntity && (
                <Modal show={showModal} onHide={() => setShowModal(false)}>
                    <Modal.Header closeButton>
                        <Modal.Title>{`${entityType} Details`}</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        {renderEntityDetails()}
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={() => setShowModal(false)}>
                            Close
                        </Button>
                    </Modal.Footer>
                </Modal>
            )}
        </div>
    );
}

export default ManageConteneurs;
