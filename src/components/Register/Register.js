import React, { useState } from 'react';
import { Link, useNavigate } from "react-router-dom"; // useNavigate to redirect after registration
import Swal from 'sweetalert2';
import axios from 'axios';
import './Register.css';

function Registration() {
    const navigate = useNavigate();
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [password_confirmation, setPasswordConfirmation] = useState('');
    const [isSaving, setIsSaving] = useState(false);

    const handleSave = () => {
        setIsSaving(true);
        axios.post('http://localhost:3001/api/auth/register', { 
            username: name,
            email: email,
            password: password,
            password_confirmation: password_confirmation
        })
        .then(function (response) {
            localStorage.setItem("user", JSON.stringify(response.data.user)); 
            localStorage.setItem("token", response.data.token);
            
            Swal.fire({
                icon: 'success',
                title: 'Account created successfully!',
                showConfirmButton: false,
                timer: 1500
            });
            navigate("/dashboard"); 
            setIsSaving(false);
            setName('');
            setEmail('');
            setPassword('');
            setPasswordConfirmation('');
        })
        .catch(function (error) {
            Swal.fire({
                icon: 'error',
                title: 'An Error Occurred!',
                text: error.response?.data?.errorMessage || 'Failed to create account, please try again.',
                showConfirmButton: true,
            });
            setIsSaving(false);
        });
    };

    return (
        <div
            className="container"
            style={{
                display: 'fixed',
                marginTop: '10%',
                minHeight: '100vh',
                justifyContent: 'center',
                alignItems: 'center'
            }}
        >
            <div className="row">
                <div className="col-sm-9 col-md-7 col-lg-5 mx-auto">
                    <div className="card border-0 shadow rounded-3 my-5">
                        <div
                         className="card-body p-4 p-sm-5"
                         >
                            <h5 className="card-title text-center mb-5 fw-light fs-5">Create new account</h5>
                            <form onSubmit={(e) => e.preventDefault()}>
                                <div className="form-floating mb-3">
                                    <input 
                                        value={name}
                                        onChange={(event) => setName(event.target.value)}
                                        type="text" 
                                        className="form-control"
                                        id="floatingInput"
                                        placeholder="Jhon Joe" 
                                    />
                                    <label htmlFor="floatingInput">Name</label>
                                </div>
                                <div className="form-floating mb-3">
                                    <input 
                                        value={email}
                                        onChange={(event) => setEmail(event.target.value)}
                                        type="email" 
                                        className="form-control" 
                                        id="floatingemail" 
                                        placeholder="name@example.com" 
                                    />
                                    <label htmlFor="floatingemail">Email address</label>
                                </div>
                                <div className="form-floating mb-3">
                                    <input 
                                        value={password}
                                        onChange={(event) => setPassword(event.target.value)}
                                        type="password" 
                                        className="form-control" 
                                        id="floatingPassword" 
                                        placeholder="Password" 
                                    />
                                    <label htmlFor="floatingPassword">Password</label>
                                </div>
                                <div className="form-floating mb-3">
                                    <input 
                                        value={password_confirmation}
                                        onChange={(event) => setPasswordConfirmation(event.target.value)}
                                        type="password" 
                                        className="form-control" 
                                        id="password_confirmation" 
                                        name='password_confirmation'
                                        placeholder="Password Confirmation" 
                                    />
                                    <label htmlFor="password_confirmation">Password Confirmation</label>
                                </div>

                                <div className="d-grid">
                                    <button 
                                        disabled={isSaving}
                                        onClick={handleSave} 
                                        className="btn btn-primary text-uppercase fw-bold"
                                        style={{
                                            backgroundColor: '#e1311a',
                                            borderColor: '#e1311a',
                                            color: 'white',
                                            transition: 'background-color 0.3s, border-color 0.3s'
                                        }}
                                        onMouseEnter={e => {
                                            e.target.style.backgroundColor = '#d02b17';
                                            e.target.style.borderColor = '#d02b17';
                                        }}
                                        onMouseLeave={e => {
                                            e.target.style.backgroundColor = '#e1311a';
                                            e.target.style.borderColor = '#e1311a';
                                        }}
                                        type="button">
                                        Sign Up
                                    </button>
                                </div>
                                <hr className="my-4"></hr>

                                <div className="d-grid">
                                    <Link
                                        className="btn btn-outline-primary text-uppercase fw-bold"
                                        to="/"
                                        style={{
                                            borderColor: '#e1311a',
                                            color: '#e1311a',
                                            transition: 'background-color 0.3s, color 0.3s'
                                        }}
                                        onMouseEnter={e => {
                                            e.target.style.backgroundColor = '#e1311a';
                                            e.target.style.color = 'white';
                                        }}
                                        onMouseLeave={e => {
                                            e.target.style.backgroundColor = 'transparent';
                                            e.target.style.color = '#e1311a';
                                        }}>
                                        Log in
                                    </Link>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Registration;
