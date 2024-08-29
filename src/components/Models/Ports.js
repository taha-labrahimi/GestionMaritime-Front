import React, { useEffect, useState } from 'react';
import ReusableTable from '../Reusable/ReusableTable';
import axios from 'axios';
import Swal from 'sweetalert2';

function ManagePorts() {
    const [ports, setPorts] = useState([]);
    
    const columns = [
        { label: 'Name', field: 'nom' },
        { label: 'Location', field: 'localisation' },
        { label: 'Capacity', field: 'capacite' },
        { label: 'Country', field: 'pays' },
        { label: 'Opening Hours', field: 'heuresOuverture' }
    ];

    useEffect(() => {
        fetchPorts();
    }, []);

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

    const handleSave = () => {
        fetchPorts(); // Refresh the list after saving (adding or editing)
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
                axios.delete(`http://localhost:3001/api/ports/${id}`,{
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                })
                    .then(() => {
                        Swal.fire('Deleted!', 'Port has been deleted.', 'success');
                        fetchPorts();
                    })
                    .catch(error => {
                        console.error('There was an error deleting the port!', error);
                    });
            }
        });
    };

    return (
        <div className="manage-ports">
            <h2>Manage Ports</h2>
            <ReusableTable 
                columns={columns} 
                data={ports} 
                onDelete={handleDelete} 
                onSave={handleSave} 
                tableName="Ports"  
            />
        </div>
    );
}

export default ManagePorts;
