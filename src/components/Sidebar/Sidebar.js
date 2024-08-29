import React from 'react';
import ManageClients from '../Models/Clients';
import ManageNavires from '../Models/Navires';
import ManagePorts from '../Models/Ports';
import ManageArmateurs from '../Models/Armateurs';
import ManageConteneurs from '../Models/Conteneurs';
import Welcome from '../Dashboard/Welcome';  
import './Sidebar.css';
import { FaHome, FaUserFriends, FaShip, FaAnchor, FaUserTie , FaBoxes ,FaSignOutAlt } from 'react-icons/fa';

function Sidebar({ onChange }) {
    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        window.location.href = '/';  
    };

    return (
        <div className="sidebar">
            <div className="top-section">
                <ul className="list-unstyled">
                    <li className="welcome-link">
                        <button onClick={() => onChange(<Welcome />)} className="nav-link">
                            <FaHome /> Home
                        </button>
                    </li>
                </ul>
            </div>
            <div className="middle-section">
                <ul className="list-unstyled">
                    <li>
                        <button onClick={() => onChange(<ManageClients />)} className="nav-link">
                            <FaUserFriends /> Manage Clients
                        </button>
                    </li>
                    <li>
                        <button onClick={() => onChange(<ManageNavires />)} className="nav-link">
                            <FaShip /> Manage Navires
                        </button>
                    </li>
                    <li>
                        <button onClick={() => onChange(<ManagePorts />)} className="nav-link">
                            <FaAnchor /> Manage Ports
                        </button>
                    </li>
                    <li>
                        <button onClick={() => onChange(<ManageArmateurs />)} className="nav-link">
                            <FaUserTie /> Manage Armateurs
                        </button>
                    </li>
                    <li>
                        <button onClick={() => onChange(<ManageConteneurs />)} className="nav-link">
                            <FaBoxes /> Manage Conteneurs
                        </button>
                    </li>
                </ul>
            </div>
            <div className="logout-container">
                <button onClick={handleLogout} className="logout-button">
                    <FaSignOutAlt />
                </button>
            </div>
        </div>
    );
}

export default Sidebar;
