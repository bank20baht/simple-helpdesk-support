import React, { useState } from "react";
import { useQuery, useQueryClient } from "react-query";
import { Grid, Select, MenuItem } from "@mui/material";
import axios from '../lib/axios';
import FormCreateTicket from './FormCreateTicket';
import StatusCol from './StatusCol';

import useAxiosAuth from '../lib/hooks/useAxiosAuth';

const KanbanBoard = () => {
  const queryClient = useQueryClient();
  const [selectedStatus, setSelectedStatus] = useState('all'); // State to store the selected status
  const [selectedUpload, setSelectedUpload] = useState('latestUpdate'); // State to store the selected upload
  const axiosAuth = useAxiosAuth();
  const fetchTicket = async () => {
    const response = await axiosAuth.get('/ticket');
    return response.data;
  }

  const { data, error, isError, isLoading } = useQuery('ticket', fetchTicket);

  const handleTicketCreate = () => {
    queryClient.invalidateQueries('ticket');
  }

  if (isLoading) {
    return <div>Loading....</div>;
  }

  if (isError) {
    return <div>Error! {error.message}</div>;
  }

  // Group tickets by status
  const groupedTickets = {
    pending: data.filter((ticket) => ticket.status === 'pending'),
    accepted: data.filter((ticket) => ticket.status === 'accepted'),
    resolved: data.filter((ticket) => ticket.status === 'resolved'),
    rejected: data.filter((ticket) => ticket.status === 'rejected'),
  };

  const handleStatusChange = (event) => {
    setSelectedStatus(event.target.value);
  }

  const handleUploadChange = (event) => {
    setSelectedUpload(event.target.value);
  }

  let filteredTickets = data;

  if (selectedStatus !== 'all') {
    filteredTickets = filteredTickets.filter((ticket) => ticket.status === selectedStatus);
  }

  // Apply sorting on the filteredTickets array
  if (selectedUpload === 'latestUpdate') {
    filteredTickets.sort((a, b) => new Date(a.latestUpdate) - new Date(b.latestUpdate));
  } else if (selectedUpload === 'firstUpdate') {
    filteredTickets.sort((a, b) => new Date(b.latestUpdate) - new Date(a.latestUpdate));
  }

  const getColumnSize = (status) => {
    return selectedStatus === status ? 6 : 3; // Increase column size to 6 if selected status matches
  };

  return (
    <div>
      <div style={{ display: 'flex', flexDirection: 'row' }}>
        <FormCreateTicket onSuccess={handleTicketCreate} />
        <Select value={selectedStatus} onChange={handleStatusChange}>
          <MenuItem value="all">All</MenuItem>
          <MenuItem value="pending">Pending</MenuItem>
          <MenuItem value="accepted">Accepted</MenuItem>
          <MenuItem value="resolved">Resolved</MenuItem>
          <MenuItem value="rejected">Rejected</MenuItem>
        </Select>
        <Select value={selectedUpload} onChange={handleUploadChange}>
          <MenuItem value="latestUpdate">Latest Update</MenuItem>
          <MenuItem value="firstUpdate">First Update</MenuItem>
        </Select>
      </div>
      <br />
      <Grid container spacing={2}>
        {selectedStatus === 'all' || selectedStatus === 'pending' ? (
          <Grid item xs={12} sm={getColumnSize('pending')} md={getColumnSize('pending')}>
            <StatusCol title={'Pending'} ticket={groupedTickets.pending} id={'1'} color={'#FFFEC4'} />
          </Grid>
        ) : null}
        {selectedStatus === 'all' || selectedStatus === 'accepted' ? (
          <Grid item xs={12} sm={getColumnSize('accepted')} md={getColumnSize('accepted')}>
            <StatusCol title={'Accepted'} ticket={groupedTickets.accepted} id={'2'} color={'#FFD6A5'} />
          </Grid>
        ) : null}
        {selectedStatus === 'all' || selectedStatus === 'resolved' ? (
          <Grid item xs={12} sm={getColumnSize('resolved')} md={getColumnSize('resolved')}>
            <StatusCol title={'Resolved'} ticket={groupedTickets.resolved} id={'3'} color={'#CBFFA9'} />
          </Grid>
        ) : null}
        {selectedStatus === 'all' || selectedStatus === 'rejected' ? (
          <Grid item xs={12} sm={getColumnSize('rejected')} md={getColumnSize('rejected')}>
            <StatusCol title={'Rejected'} ticket={groupedTickets.rejected} id={'4'} color={'#FF9B9B'} />
          </Grid>
        ) : null}
      </Grid>
    </div>
  );
}

export default KanbanBoard;
