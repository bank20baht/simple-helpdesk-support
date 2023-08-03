import React from 'react';
import { useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { Button, TextField } from '@mui/material';

const validationSchema = Yup.object().shape({
    firstname: Yup.string().required('Firstname is required'),
    lastname: Yup.string().required('Lastname is required'),
    email: Yup.string().email('Invalid email').required('Email is required'),
    password: Yup.string().required('Password is required'),
    confirmPassword: Yup.string()
        .oneOf([Yup.ref('password'), null], 'Passwords must match')
        .required('Confirm Password is required'),
    companyPosition: Yup.string().required('Company position is required'),
    department: Yup.string().required('Department is required'),
});

const Register = () => {
    const navigate = useNavigate();

    const handleSubmit = (values) => {
        axios
            .post('http://localhost:5000/api/auth/register', values)
            .then((response) => {
                // Store the JWT in localStorage
                Swal.fire({
                    title: 'Success',
                    text: 'Register successfully',
                    icon: 'success',
                    confirmButtonText: 'OK',
                }).then((value) => {
                    navigate('/login');
                });
            })
            .catch((error) => {
                Swal.fire({
                    title: 'Error',
                    text: 'Registration failed',
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
                        firstname: '',
                        lastname: '',
                        email: '',
                        password: '',
                        confirmPassword: '',
                        companyPosition: '',
                        department: '',
                    }}
                    validationSchema={validationSchema}
                    onSubmit={handleSubmit}
                >
                    {({ errors, touched }) => (
                        <Form>
                            <div className='mx-5 my-10 flex flex-col gap-1'>
                                <div className='text-center font-bold text-4xl py-10'>
                                    Sign up
                                </div>
                                <div className='flex flex-row'>
                                    <Field
                                        margin="dense"
                                        label="Firstname"
                                        type="text"
                                        as={TextField}
                                        id="firstname"
                                        name="firstname"
                                        variant="outlined"
                                        fullWidth
                                    />
                                    <Field
                                        margin="dense"
                                        label="Lastname"
                                        type="text"
                                        as={TextField}
                                        id="lastname"
                                        name="lastname"
                                        variant="outlined"
                                        fullWidth
                                    />
                                </div>
                                <ErrorMessage name="firstname" component="div" className="text-red-500 text-sm" />
                                <ErrorMessage name="lastname" component="div" className="text-red-500 text-sm" />

                                <Field
                                    margin="dense"
                                    label="Email"
                                    type="text"
                                    as={TextField}
                                    id="email"
                                    name="email"
                                    variant="outlined"
                                    fullWidth
                                />
                                <ErrorMessage name="email" component="div" className="text-red-500 text-sm" />

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
                                <ErrorMessage name="password" component="div" className="text-red-500 text-sm" />

                                <Field
                                    margin="dense"
                                    label="Confirm password"
                                    type="password"
                                    as={TextField}
                                    id="confirmPassword"
                                    name="confirmPassword"
                                    variant="outlined"
                                    fullWidth
                                />
                                <ErrorMessage name="confirmPassword" component="div" className="text-red-500 text-sm" />

                                <div>about you work</div>
                                <Field
                                    margin="dense"
                                    label="Compony position"
                                    type="text"
                                    as={TextField}
                                    id="companyPosition"
                                    name="companyPosition"
                                    variant="outlined"
                                    fullWidth
                                />
                                <ErrorMessage name="companyPosition" component="div" className="text-red-500 text-sm" />

                                <Field
                                    margin="dense"
                                    label="Department"
                                    type="text"
                                    as={TextField}
                                    id="department"
                                    name="department"
                                    variant="outlined"
                                    fullWidth
                                />
                                <ErrorMessage name="department" component="div" className="text-red-500 text-sm" />

                                <div className='flex flex-col items-center gap-5'>
                                    <Button type="submit" variant="contained" color="primary">SIGN UP</Button>
                                </div>
                                <div className='flex flex-row justify-between text-sm'>
                                    <div>Customer Support</div>
                                    <div>Already have an account? Sign in</div>
                                </div>
                            </div>
                        </Form>
                    )}
                </Formik>
            </div>
        </div>
    );
};

export default Register;
