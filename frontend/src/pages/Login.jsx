import React from 'react';
import { useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from '@mui/material';

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
                // Display success message
                Swal.fire({
                    title: 'Success',
                    text: response.data.message,
                    icon: 'success',
                    confirmButtonText: 'OK',
                }).then((value) => {
                    navigate('/');
                });
                // Redirect to the home page
            })
            .catch((error) => {
                // Display error message
                Swal.fire({
                    title: 'Error',
                    text: 'Login failed',
                    icon: 'error',
                    confirmButtonText: 'OK',
                });
            });
    };

    return (
        <div>
            <Formik
                initialValues={{
                    username: '',
                    password: '',
                }}
                validationSchema={validationSchema}
                onSubmit={handleSubmit}
            >
                <Form>
                    <div>
                        <label htmlFor="username">Username:</label>
                        <Field type="text" id="username" name="username" />
                        <ErrorMessage name="username" component="div" />
                    </div>
                    <div>
                        <label htmlFor="password">Password:</label>
                        <Field type="password" id="password" name="password" />
                        <ErrorMessage name="password" component="div" />
                    </div>
                    <Button type="submit">Submit</Button>
                </Form>
            </Formik>
        </div>
    );
};

export default Login;
