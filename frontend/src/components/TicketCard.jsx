import React, { useState } from 'react';
import { Card, Dialog, DialogTitle, DialogContent, DialogActions, Button } from '@mui/material';
import FormUpdateTicket from './FormUpdateTicket'
const TicketCard = (props) => {
    const [openDialog, setOpenDialog] = useState(false);

    const handleDialogOpen = () => {
        setOpenDialog(true);
    };

    const handleDialogClose = () => {
        setOpenDialog(false);
    };


    return (
        <>
            <Card onClick={handleDialogOpen}>
                <div style={{
                    padding: 10
                }}>
                    <h1>{props.ticket.title}</h1>
                    <h2>{props.ticket.contact}</h2>
                </div>
            </Card>
            <Dialog open={openDialog} onClose={handleDialogClose}>
                <DialogTitle>Ticket Details</DialogTitle>
                <DialogContent>
                    <h1>{props.ticket.status.toUpperCase()}</h1>
                    <h2>title : {props.ticket.title}</h2>
                    <h2>contact :{props.ticket.contact}</h2>
                    <h2>description: </h2>
                    <p>{props.ticket.description}</p>
                    <h3>latest Update at : {props.ticket.latestUpdate ? props.ticket.latestUpdate : 'No update'}</h3>
                    <h3>create at : {props.ticket.createdAt}</h3>
                    <FormUpdateTicket ticket={props.ticket} />
                    {/* Add more ticket details here */}
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleDialogClose}>Close</Button>
                </DialogActions>
            </Dialog>
        </>
    );
}
export default TicketCard