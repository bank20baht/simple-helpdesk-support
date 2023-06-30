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
