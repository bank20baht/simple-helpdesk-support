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
                            multiline
                            minRows={4}
                            maxRows={4}
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
            <div>{isError && <div>{error.message}</div>}</div>
        </div>
    );
};

export default FormCreateTicket;
