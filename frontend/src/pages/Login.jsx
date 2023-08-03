import React from 'react';
import { useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { Button, TextField } from '@mui/material';

const validationSchema = Yup.object().shape({
    username: Yup.string().required('Username is required'),
    password: Yup.string().required('Password is required'),
});

const Login = () => {
    const navigate = useNavigate();

    const handleSubmit = (values) => {
        axios
            .post('http://localhost:5000/api/auth/login', values)
            .then((response) => {
                // Store the JWT in localStorage
                localStorage.setItem('token', JSON.stringify(response.data));
                Swal.fire({
                    title: 'Success',
                    text: response.data.message,
                    icon: 'success',
                    confirmButtonText: 'OK',
                }).then((value) => {
                    navigate('/');
                });
            })
            .catch((error) => {
                Swal.fire({
                    title: 'Error',
                    text: 'Login failed',
                    icon: 'error',
                    confirmButtonText: 'OK',
                });
            });
    };

    return (
        <div
            className='w-full h-screen flex justify-center items-center bg-gradient-to-r from-blue-500 to-blue-300'
            style={{ minHeight: '100vh' }}
        >
            <div className='w-[35vw] bg-white' style={{ boxShadow: '10px 10px 2px 0px rgba(0,0,0,0.62)' }}>
                <Formik
                    initialValues={{
                        username: '',
                        password: '',
                    }}
                    validationSchema={validationSchema}
                    onSubmit={handleSubmit}
                >
                    {({ errors, touched }) => (
                        <Form>
                            <div className='mx-5 my-20 flex flex-col gap-5'>
                                <div className='text-center font-bold text-4xl py-10'>
                                    Sign in
                                </div>
                                <div>
                                    <Field
                                        margin="dense"
                                        label="Username"
                                        type="text"
                                        as={TextField}
                                        id="username"
                                        name="username"
                                        variant="outlined"
                                        fullWidth
                                    />
                                    {touched.username && errors.username ? (
                                        <div className="text-red-500 text-sm">{errors.username}</div>
                                    ) : null}
                                    <Field
                                        margin="dense"
                                        label="Password"
                                        type="password"
                                        as={TextField}
                                        id="password"
                                        name="password"
                                        variant="outlined"
                                        fullWidth
                                    />
                                    {touched.password && errors.password ? (
                                        <div className="text-red-500 text-sm">{errors.password}</div>
                                    ) : null}
                                </div>
                                <div className='flex flex-col items-center gap-5'>
                                    <Button type="submit" variant="contained" color="primary">SIGN IN</Button>
                                    <div className='text-blue-400 text-center'>Forgot Password</div>
                                </div>
                                <div className='flex flex-row justify-between text-sm'>
                                    <div>Customer Support</div>
                                    <div>Don’t have an account? Sign Up</div>
                                </div>
                            </div>
                        </Form>
                    )}
                </Formik>
            </div>
        </div>
    );
};

export default Login;
