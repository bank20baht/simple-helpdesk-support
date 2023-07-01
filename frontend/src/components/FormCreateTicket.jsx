import React, { useState } from 'react';
import { useMutation, useQueryClient } from 'react-query';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import axios from '../lib/axios';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from '@mui/material';

const createTicket = async (data) => {
    const response = await axios.post('/ticket', data);
    return response.data;
};

const validationSchema = Yup.object().shape({
    title: Yup.string().required('Title is required'),
    description: Yup.string().required('Description is required'),
    contact: Yup.string().required('Contact is required'),
});

const FormCreateTicket = ({ onSuccess }) => {
    const queryClient = useQueryClient();
    const [open, setOpen] = useState(false);

    const { handleSubmit, handleChange, values, touched, errors, resetForm } = useFormik({
        initialValues: {
            title: '',
            description: '',
            contact: '',
        },
        validationSchema,
        onSubmit: (values, { resetForm }) => {
            handleCreateTicket(values);
            resetForm();
            handleClose();
        },
    });

    const { isLoading, isError, error, mutate } = useMutation(createTicket, {
        retry: 3,
        onSuccess: () => {
            queryClient.invalidateQueries('ticket');
            onSuccess();
            resetForm(); // Added line to reset the form after successful submission
        },
    });

    const handleCreateTicket = (values) => {
        mutate(values);
    };

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <div>
            <Button variant="contained" color="primary" onClick={handleOpen}>
                Create a ticket
            </Button>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Create a ticket</DialogTitle>
                <form onSubmit={handleSubmit}>
                    <DialogContent>
                        <TextField
                            autoFocus
                            margin="dense"
                            name="title"
                            label="Title"
                            type="text"
                            fullWidth
                            value={values.title}
                            onChange={handleChange}
                            error={touched.title && Boolean(errors.title)}
                            helperText={touched.title && errors.title}
                        />
                        <TextField
                            margin="dense"
                            name="description"
                            label="Description"
                            type="text"
                            fullWidth
                            value={values.description}
                            onChange={handleChange}
                            error={touched.description && Boolean(errors.description)}
                            helperText={touched.description && errors.description}
                        />
                        <TextField
                            margin="dense"
                            name="contact"
                            label="Contact"
                            type="text"
                            fullWidth
                            value={values.contact}
                            onChange={handleChange}
                            error={touched.contact && Boolean(errors.contact)}
                            helperText={touched.contact && errors.contact}
                        />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleClose} color="primary">
                            Cancel
                        </Button>
                        <Button type="submit" color="primary" disabled={isLoading}>
                            {isLoading ? 'Saving...' : 'Create'}
                        </Button>
                    </DialogActions>
                </form>
            </Dialog>
            <div>
                {isError && <div>{error.message}</div>}
            </div>
        </div>
    );
};

export default FormCreateTicket;



/*import React from 'react';
import { useMutation, useQueryClient } from 'react-query';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import axios from '../lib/axios';

const createTicket = async (data) => {
    const response = await axios.post('/ticket', data);
    return response.data;
};

const validationSchema = Yup.object().shape({
    title: Yup.string().required('Title is required'),
    description: Yup.string().required('Description is required'),
    contact: Yup.string().required('Contact is required'),
});

const FormCreateTicket = ({ onSuccess }) => {
    const queryClient = useQueryClient();
    const { handleSubmit, handleChange, values, touched, errors } = useFormik({
        initialValues: {
            title: '',
            description: '',
            contact: '',
        },
        validationSchema,
        onSubmit: (values) => {
            handleCreateTicket(values);
        },
    });

    const { isLoading, isError, error, mutate } = useMutation(createTicket, {
        retry: 3,
        onSuccess: () => {
            queryClient.invalidateQueries('ticket');
            onSuccess();
        },
    });

    const handleCreateTicket = (values) => {
        mutate(values);
    };

    return (
        <div>
            <h1>Create a ticket</h1>
            <form onSubmit={handleSubmit}>
                <label>Title</label>
                <input type="text" name="title" value={values.title} onChange={handleChange} />
                {touched.title && errors.title && <div>{errors.title}</div>}
                <br />
                <label>Description</label>
                <input type="text" name="description" value={values.description} onChange={handleChange} />
                {touched.description && errors.description && <div>{errors.description}</div>}
                <br />
                <label>Contact</label>
                <input type="text" name="contact" value={values.contact} onChange={handleChange} />
                {touched.contact && errors.contact && <div>{errors.contact}</div>}
                <button type="submit">Create</button>
            </form>
            <div>
                {isLoading ? 'Saving...' : ''}
                {isError ? error.message : ''}
            </div>
        </div>
    );
};

export default FormCreateTicket;
*/

/*
// FromCreateTicket.jsx
import React, { useState } from "react";
import { useMutation, useQueryClient } from "react-query";
import axios from '../lib/axios';

const createTicket = async (data) => {
    const response = await axios.post('/ticket', data);
    return response.data;
};

const FormCreateTicket = ({ onSuccess }) => {
    const queryClient = useQueryClient();
    const [title, setTitle] = useState('');
    const [desc, setDesc] = useState('');
    const [contact, setContact] = useState('');

    const { isLoading, isError, error, mutate } = useMutation(createTicket, {
        retry: 3,
        onSuccess: () => {
            queryClient.invalidateQueries('ticket');
            onSuccess();
        },
    });

    const handleCreateTicket = () => {
        const data = {
            title: title,
            description: desc,
            contact: contact,
        };
        mutate(data);
    };

    return (
        <div>
            <h1>Create a ticket</h1>
            <label>Title</label>
            <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
            <br />
            <label>Contact</label>
            <input type="text" value={contact} onChange={(e) => setContact(e.target.value)} />
            <button onClick={handleCreateTicket}>Create</button>
            <div>
                {isLoading ? 'Saving...' : ''}
                {isError ? error.message : ''}
            </div>
        </div>
    );
};

export default FormCreateTicket;
*/
/*
import React, { useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { object, string } from 'yup';
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button,
    TextField,
    TextareaAutosize,
} from '@mui/material';
import axios from '../lib/axios';

const FormCreateTicket = () => {
    const [open, setOpen] = useState(false);

    const initialValues = {
        title: '',
        content: '',
        contact: '',
    };

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const onSubmit = async (values) => {
        try {
            const response = await axios.post('/ticket', {
                title: values.title,
                description: values.description,
                contact: values.contact,
            });
            handleClose();
        } catch (error) {
            console.error(error);
        }
    };

    const validationSchema = object().shape({
        title: string().required('Title field is required'),
        contact: string().required('Contact field is required'),
        description: string().required('Description field is required'),
    });

    return (
        <div>
            <Button onClick={handleOpen} variant="contained" color="primary">
                Create Ticket
            </Button>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Create Ticket</DialogTitle>
                <DialogContent>
                    <Formik
                        initialValues={initialValues}
                        validationSchema={validationSchema}
                        onSubmit={onSubmit}
                    >
                        <Form>
                            <Field
                                as={TextField}
                                type="text"
                                className="input-title"
                                name="title"
                                label="Title"
                                placeholder="Title"
                            />
                            <ErrorMessage
                                className="text-red-500"
                                name="title"
                                component="p"
                            />
                            <Field
                                as={TextareaAutosize}
                                className="textarea-content"
                                rows={4}
                                name="description"
                                label="Description"
                                placeholder="Description"
                            />
                            <ErrorMessage
                                className="text-red-500"
                                name="description"
                                component="p"
                            />
                            <Field
                                as={TextField}
                                type="text"
                                className="input-title"
                                name="contact"
                                label="Contact"
                                placeholder="Contact"
                            />
                            <ErrorMessage
                                className="text-red-500"
                                name="contact"
                                component="p"
                            />
                            <DialogActions>
                                <Button onClick={handleClose}>Cancel</Button>
                                <Button type="submit" variant="contained" color="primary">
                                    Create
                                </Button>
                            </DialogActions>
                        </Form>
                    </Formik>
                </DialogContent>
            </Dialog>
        </div>
    );
};

export default FormCreateTicket;
*/