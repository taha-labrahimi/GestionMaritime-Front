import React, { useState } from 'react';
import Sidebar from '../Sidebar/Sidebar';
import Welcome from '../Dashboard/Welcome';
import './Dashboard.css';

function Dashboard() {
    const [content, setContent] = useState(<Welcome />);

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
