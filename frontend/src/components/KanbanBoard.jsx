// KanbanBoard.jsx
import React from "react";
import { useQuery, useQueryClient } from "react-query";
import axios from '../lib/axios';
import FormCreateTicket from './FormCreateTicket';
import StatusCol from './StatusCol';

const KanbanBoard = () => {
  const queryClient = useQueryClient();

  const fetchTicket = async () => {
    const response = await axios.get('/ticket');
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

  return (
    <div>
      <FormCreateTicket onSuccess={handleTicketCreate} />
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          flexDirection: 'row',
        }}
      >
        <StatusCol title={'Pending'} ticket={groupedTickets.pending} id={'1'} />
        <StatusCol title={'Accepted'} ticket={groupedTickets.accepted} id={'2'} />
        <StatusCol title={'Resolved'} ticket={groupedTickets.resolved} id={'3'} />
        <StatusCol title={'Rejected'} ticket={groupedTickets.rejected} id={'4'} />
      </div>
    </div>
  );
}

export default KanbanBoard;
