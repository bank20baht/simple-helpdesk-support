import React, { useState } from 'react';
import { useMutation, useQueryClient } from 'react-query';
import { useFormik } from 'formik';
import { object, string } from "yup";
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

const validationSchema = object().shape({
    title: string().required('Title is required'),
    description: string().required('Description is required'),
    contact: string().required('Contact is required'),
    status: string().required('Status is required'),
});

const FormUpdateTicket = (props) => {
    const queryClient = useQueryClient();
    const [open, setOpen] = useState(false);

    const formik = useFormik({
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
            formik.resetForm(); // Reset the form after successful submission
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
                <form onSubmit={formik.handleSubmit}>
                    <DialogContent>
                        <TextField
                            autoFocus
                            margin="dense"
                            name="title"
                            label="Title"
                            type="text"
                            fullWidth
                            value={formik.values.title}
                            onChange={formik.handleChange}
                            error={formik.touched.title && Boolean(formik.errors.title)}
                            helperText={formik.touched.title && formik.errors.title}
                        />
                        <TextField
                            margin="dense"
                            name="description"
                            label="Description"
                            multiline
                            minRows={4}
                            maxRows={4}
                            fullWidth
                            value={formik.values.description}
                            onChange={formik.handleChange}
                            error={formik.touched.description && Boolean(formik.errors.description)}
                            helperText={formik.touched.description && formik.errors.description}
                        />
                        <TextField
                            margin="dense"
                            name="contact"
                            label="Contact"
                            type="text"
                            fullWidth
                            value={formik.values.contact}
                            onChange={formik.handleChange}
                            error={formik.touched.contact && Boolean(formik.errors.contact)}
                            helperText={formik.touched.contact && formik.errors.contact}
                        />
                        <FormControl component="fieldset" margin="normal">
                            <FormLabel component="legend">Status</FormLabel>
                            <RadioGroup
                                name="status"
                                value={formik.values.status}
                                onChange={formik.handleChange}
                                error={Boolean(formik.touched.status && formik.errors.status)}
                            >
                                <FormControlLabel value="pending" control={<Radio />} label="Pending" />
                                <FormControlLabel value="accepted" control={<Radio />} label="Accepted" />
                                <FormControlLabel value="resolved" control={<Radio />} label="Resolved" />
                                <FormControlLabel value="rejected" control={<Radio />} label="Rejected" />
                            </RadioGroup>
                            {formik.touched.status && formik.errors.status && (
                                <div className="error">{formik.errors.status}</div>
                            )}
                        </FormControl>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleClose} color="primary">
                            Cancel
                        </Button>
                        <Button type="submit" color="primary" disabled={!formik.dirty || isLoading}>
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
