import React, { useState } from 'react';
import { useMutation, useQueryClient } from 'react-query';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import axios from '../lib/axios';
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    FormControl,
    FormControlLabel,
    FormLabel,
    Radio,
    RadioGroup,
    TextField
} from '@mui/material';

const updateTicket = async (data) => {
    const response = await axios.put(`/ticket/edit/${data.id}`, data);
    return response.data;
};

const validationSchema = Yup.object().shape({
    title: Yup.string().required('Title is required'),
    description: Yup.string().required('Description is required'),
    contact: Yup.string().required('Contact is required'),
    status: Yup.string().required('Status is required'),
});

const FormUpdateTicket = (props) => {
    const queryClient = useQueryClient();
    const [open, setOpen] = useState(false);

    const { handleSubmit, handleChange, values, touched, errors, resetForm } = useFormik({
        initialValues: {
            id: props.ticket.id,
            title: props.ticket.title,
            description: props.ticket.description,
            contact: props.ticket.contact,
            status: props.ticket.status,
        },
        validationSchema,
        onSubmit: (values, { resetForm }) => {
            handleUpdateTicket(values);
            resetForm();
            handleClose();
        },
    });

    const { isLoading, isError, error, mutate } = useMutation(updateTicket, {
        retry: 3,
        onSuccess: () => {
            queryClient.invalidateQueries('ticket');
            resetForm(); // Added line to reset the form after successful submission
        },
    });

    const handleUpdateTicket = (values) => {
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
                Update ticket
            </Button>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Edit ticket</DialogTitle>
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
                        <FormControl component="fieldset" margin="normal">
                            <FormLabel component="legend">Status</FormLabel>
                            <RadioGroup
                                name="status"
                                value={values.status}
                                onChange={handleChange}
                                error={touched.status && Boolean(errors.status)}
                            >
                                <FormControlLabel value="pending" control={<Radio />} label="Pending" />
                                <FormControlLabel value="accepted" control={<Radio />} label="Accepted" />
                                <FormControlLabel value="resolved" control={<Radio />} label="Resolved" />
                                <FormControlLabel value="rejected" control={<Radio />} label="Rejected" />
                            </RadioGroup>
                            {touched.status && errors.status && (
                                <div className="error">{errors.status}</div>
                            )}
                        </FormControl>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleClose} color="primary">
                            Cancel
                        </Button>
                        <Button type="submit" color="primary" disabled={isLoading}>
                            {isLoading ? 'Updating...' : 'Update'}
                        </Button>
                    </DialogActions>
                </form>
            </Dialog>
            <div>{isError && <div>{error.message}</div>}</div>
        </div>
    );
};

export default FormUpdateTicket;
