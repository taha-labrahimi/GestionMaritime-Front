import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; // Use `useNavigate` instead of `useHistory`
import Sidebar from '../Sidebar/Sidebar';
import Welcome from '../Dashboard/Welcome';
import './Dashboard.css';

function Dashboard() {
    const [content, setContent] = useState(<Welcome />);
    const navigate = useNavigate(); 

    useEffect(() => {
        const sessionTimeout = setTimeout(() => {
            localStorage.removeItem('token');
            alert('Your session has ended. You will be redirected to the login page.');
            navigate('/'); 
        }, 3600000); 

        return () => clearTimeout(sessionTimeout);
    }, [navigate]); 

    const handleContentChange = (component) => {
        setContent(component);
    };

    return (
        <div className="dashboard-container">
            <Sidebar onChange={handleContentChange} />
            <div className="content">
                {content}
            </div>
        </div>
    );
}

export default Dashboard;
