//TicketCard.jsx

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
            <Card
                sx={{
                    justifyContent: 'center',
                    alignItems: 'center',
                    textAlign: 'center',
                    height: 150,
                    borderRadius: 3,
                }}
                onClick={handleDialogOpen}
            >
                <div
                    style={{
                        padding: 5,
                        whiteSpace: "pre-wrap",
                        overflowWrap: "break-word",
                        justifyContent: 'center',
                        alignItems: 'center'
                    }}
                >
                    <h3>{props.ticket.title}</h3>
                    <h4>{props.ticket.contact}</h4>
                </div>
            </Card>
            <Dialog open={openDialog} onClose={handleDialogClose} sx={{ minWidth: '600px' }} >
                <div style={{ border: `4px solid #ff9770` }}>
                    <DialogTitle style={{ textAlign: 'center', backgroundColor: '#ff9770', color: 'white' }}>Ticket Details</DialogTitle>
                    <DialogContent style={{ whiteSpace: "pre-wrap", overflowWrap: "break-word" }}>
                        <h1 style={{ color: '#ff9770' }}>{props.ticket.status.toUpperCase() + '#' + props.ticket.id}</h1>
                        <h2>title :</h2>
                        <p>{props.ticket.title}</p>
                        <h2>description : </h2>
                        <p>{props.ticket.description}</p>
                        <h2>contact :</h2>
                        <p>{props.ticket.contact}</p>
                        <h3>latest Update at : {props.ticket.latestUpdate ? props.ticket.latestUpdate : 'No update before'}</h3>
                        <h3>create at : {props.ticket.createdAt}</h3>
                    </DialogContent>
                    <DialogActions style={{ padding: 5 }}>
                        <FormUpdateTicket ticket={props.ticket} />
                        <Button style={{
                            color: '#ff9770',
                        }} onClick={handleDialogClose}>Close</Button>

                    </DialogActions>
                </div>

            </Dialog>
        </>
    );
}
export default TicketCard