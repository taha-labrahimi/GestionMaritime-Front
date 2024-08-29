import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from "react-router-dom";
import Swal from 'sweetalert2';
import axios from 'axios';

function Login() {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isSaving, setIsSaving] = useState(false);

    useEffect(() => {
        if (localStorage.getItem('token') != null) {
            navigate("/dashboard");
        }
        // Apply background color to the entire body
        document.body.style.backgroundColor = '#323232';
        document.body.style.overflowY = 'hidden';
        return () => {
            // Cleanup to avoid side effects
            document.body.style.backgroundColor = null;
        };
    }, [navigate]);

    const handleSave = (event) => {
        event.preventDefault(); // Prevent default form submission
        setIsSaving(true);

        axios.post('http://localhost:3001/api/auth/login', {
            username: email,
            password: password
        })
            .then(function (response) {
                localStorage.setItem("user", JSON.stringify(response.data.user));
                localStorage.setItem("token", response.data.token);
                Swal.fire({
                    icon: 'success',
                    title: 'Login successfully!',
                    showConfirmButton: false,
                    timer: 1500
                });
                navigate("/dashboard");
                setIsSaving(false);
                setEmail('');
                setPassword('');
            })
            .catch(function (error) {
                Swal.fire({
                    icon: 'error',
                    title: 'An Error Occurred!',
                    text: error.response?.data?.errorMessage || 'Invalid username or password',
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
                            <h5 className="card-title text-center mb-5 fw-light fs-5">Sign In</h5>
                            <form onSubmit={handleSave}>
                                <div className="form-floating mb-3">
                                    <input
                                        value={email}
                                        onChange={(event) => { setEmail(event.target.value) }}
                                        type="text"
                                        className="form-control"
                                        id="floatingInput"
                                        placeholder="Username"
                                    />
                                    <label htmlFor="floatingInput">Username</label>
                                </div>
                                <div className="form-floating mb-3">
                                    <input
                                        value={password}
                                        onChange={(event) => { setPassword(event.target.value) }}
                                        type="password"
                                        className="form-control"
                                        id="floatingPassword"
                                        placeholder="Password"
                                    />
                                    <label htmlFor="floatingPassword">Password</label>
                                </div>

                                <div className="d-grid">
                                    <button
                                        disabled={isSaving}
                                        type="submit"
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
                                        }}>
                                        Sign in
                                    </button>
                                </div>
                              
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Login;
