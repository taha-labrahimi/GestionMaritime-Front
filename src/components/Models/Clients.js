import React, { useEffect, useState } from 'react';
import ReusableTable from '../Reusable/ReusableTable';
import axios from 'axios';
import Swal from 'sweetalert2';

function ManageClients() {
    const [clients, setClients] = useState([]);

    const columns = [
        { label: 'Name', field: 'nom' },
        { label: 'Address', field: 'adresse' },
        { label: 'Phone', field: 'numTel' },
        { label: 'Email', field: 'email' },
    ];

    useEffect(() => {
        fetchClients();
    }, []);

    const fetchClients = () => {
        const token = localStorage.getItem('token');
    
        axios.get('http://localhost:3001/api/clients', {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
        .then(response => {
            setClients(response.data);
        })
        .catch(error => {
            console.error('There was an error fetching the clients!', error);
        });
    };

    const handleSave = (formData, actionType) => {
        fetchClients();
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
                axios.delete(`http://localhost:3001/api/clients/${id}`, {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                })
                    .then(() => {
                        Swal.fire('Deleted!', 'Client has been deleted.', 'success');
                        fetchClients(); // Fetch the updated list after deletion
                    })
                    .catch(error => {
                        console.error('There was an error deleting the client!', error);
                    });
            }
        });
    };

    return (
        <div className="manage-clients">
            <h2>Manage Clients</h2>
            <ReusableTable 
                columns={columns} 
                data={clients} 
                onDelete={handleDelete} 
                onSave={handleSave} // Pass the onSave function here
                tableName="clients"
            />
        </div>
    );
}

export default ManageClients;
