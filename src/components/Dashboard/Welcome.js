import React, { useState } from 'react';
import { FaCog } from 'react-icons/fa';
import { Modal, Button, Form } from 'react-bootstrap';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './Welcome.css';
import axios from 'axios';

function Welcome() {
    const [showModal, setShowModal] = useState(false);
    const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')));

    const [username, setUsername] = useState(user.username);
    const [email, setEmail] = useState(user.email);
    const [password, setPassword] = useState('');

    const handleShow = () => setShowModal(true);
    const handleClose = () => setShowModal(false);

    const handleSave = async () => {
        const updatedUser = { username, email };
        if (password) {
            updatedUser.password = password;
        }

        console.log('Updating user:', updatedUser);

        try {
            const response = await axios.put(`http://localhost:3001/api/auth/update/${user.id}`, updatedUser, {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            });
            console.log('User updated successfully:', response.data);

            // Show success toast notification
            toast.success('User information updated successfully!', {
                position: "top-right",  // Corrected position reference
                autoClose: 3000,
            });

            // Update the user in local storage
            localStorage.setItem('user', JSON.stringify(response.data));
            setUser(response.data);

            // Close the modal after saving
            handleClose();
        } catch (error) {
            console.error('Error updating user:', error.response ? error.response.data : error.message);

            // Show error toast notification
            toast.error('Failed to update user information.', {
                position: "top-right",  // Corrected position reference
                autoClose: 3000,
            });
        }
    };

    return (
        <div className="welcome-container">
            <div className="logo">
                <img src="assets/images/logo.png" alt="Logo" />
            </div>
            <div className="settings-icon" onClick={handleShow}>
                <FaCog />
            </div>
            <div className="welcome-message">
                <h2 className="welcome-title">Welcome, {user.username}!</h2>
                <p className="welcome-subtitle">
                    Navigate through your maritime management system with ease.
                    <br /> Select a module from the sidebar to begin.
                </p>
            </div>
            <div className="welcome-background"></div>

            <Modal show={showModal} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Update User Info</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group controlId="formUsername">
                            <Form.Label>Username</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter new username"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                            />
                        </Form.Group>
                        <Form.Group controlId="formEmail" className="mt-3">
                            <Form.Label>Email</Form.Label>
                            <Form.Control
                                type="email"
                                placeholder="Enter new email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </Form.Group>
                        <Form.Group controlId="formPassword" className="mt-3">
                            <Form.Label>Password</Form.Label>
                            <Form.Control
                                type="password"
                                placeholder="Enter new password (optional)"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                            <Form.Text className="text-muted">
                                Leave blank if you don't want to change your password.
                            </Form.Text>
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={handleSave}>
                        Save Changes
                    </Button>
                </Modal.Footer>
            </Modal>

            <ToastContainer />
        </div>
    );
}

export default Welcome;
