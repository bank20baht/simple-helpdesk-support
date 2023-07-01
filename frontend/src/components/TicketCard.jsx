import React, { useState } from 'react';
import { Card, Dialog, DialogTitle, DialogContent, DialogActions, Button } from '@mui/material';

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
                <div>
                    <h1>{props.ticket.title}</h1>
                    <h2>{props.ticket.contact}</h2>
                </div>
            </Card>
            <Dialog open={openDialog} onClose={handleDialogClose}>
                <DialogTitle>Ticket Details</DialogTitle>
                <DialogContent>
                    <h1>{props.ticket.title}</h1>
                    <h2>{props.ticket.contact}</h2>
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