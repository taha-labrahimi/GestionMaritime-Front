import React, { useEffect, useState } from 'react';
import ReusableTable from '../Reusable/ReusableTable';
import axios from 'axios';
import Swal from 'sweetalert2';

function ManageArmateurs() {
    const [armateurs, setArmateurs] = useState([]);
    
    const columns = [
        { label: 'Name', field: 'nom' },
        { label: 'Address', field: 'adresse' },
        { label: 'Phone', field: 'numTel' },
        { label: 'Email', field: 'email' }
    ];

    useEffect(() => {
        fetchArmateurs();
    }, []);

    const fetchArmateurs = () => {
        const token = localStorage.getItem('token');
    
        axios.get('http://localhost:3001/api/armateurs', {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
        .then(response => {
            setArmateurs(response.data);
        })
        .catch(error => {
            console.error('There was an error fetching the armateurs!', error);
        });
    };

    const handleSave = () => {
        fetchArmateurs(); // Refresh the list after saving (adding or editing)
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
                axios.delete(`http://localhost:3001/api/armateurs/${id}`,{
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                })
                    .then(() => {
                        Swal.fire('Deleted!', 'Armateur has been deleted.', 'success');
                        fetchArmateurs();
                    })
                    .catch(error => {
                        console.error('There was an error deleting the armateur!', error);
                    });
            }
        });
    };

    return (
        <div className="manage-armateurs">
            <h2>Manage Armateurs</h2>
            <ReusableTable 
                columns={columns} 
                data={armateurs} 
                onDelete={handleDelete} 
                onSave={handleSave} 
                tableName="Armateurs"  
            />
        </div>
    );
}

export default ManageArmateurs;
