// KanbanBoard.jsx
import React from "react";
import { useQuery, useQueryClient } from "react-query";
import axios from '../lib/axios';
import FormCreateTicket from './FormCreateTicket';

const fetchTicket = async () => {
  const response = await axios.get('/ticket');
  return response.data;
}

const KanbanBoard = () => {
  const queryClient = useQueryClient();
  const { data, error, isError, isLoading } = useQuery('ticket', fetchTicket);

  if (isLoading) {
    return <div>Loading....</div>;
  }

  if (isError) {
    return <div>Error! {error.message}</div>;
  }

  return (
    <div>
      <FormCreateTicket onSuccess={() => queryClient.invalidateQueries('ticket')} />
      {data.map((ticket) => (
        <li key={ticket.id}>{ticket.title}</li>
      ))}
    </div>
  );
}
export default KanbanBoard;

/*
import React, { useEffect, useState } from 'react';
import axios from '../lib/axios';
import FormCreateTicket from './FormCreateTicket';
import StatusCol from './StatusCol';

const KanbanBoard = () => {
  const [pending, setPending] = useState([]);
  const [accepted, setAccepted] = useState([]);
  const [resolved, setResolved] = useState([]);
  const [rejected, setRejected] = useState([]);

  const [ticket, setTicket] = useState([])

  const fetchData = async () => {
    try {
      const response = await axios.get('/ticket');
      setTicket(response.data)
      const json = response.data;
      setPending(json.filter((ticket) => ticket.status === 'pending'));
      setAccepted(json.filter((ticket) => ticket.status === 'accepted'));
      setResolved(json.filter((ticket) => ticket.status === 'resolved'));
      setRejected(json.filter((ticket) => ticket.status === 'rejected'));
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      <div>KanbanBoard</div>
      <FormCreateTicket onTicketCreate={fetchData} />
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          flexDirection: 'row',
        }}
      >
        <StatusCol title={'Pending'} ticket={ticket} id={'1'} />
        <StatusCol title={'Accepted'} ticket={ticket} id={'2'} />
        <StatusCol title={'Resolved'} ticket={ticket} id={'3'} />
        <StatusCol title={'Rejected'} ticket={ticket} id={'4'} />
      </div>
    </>
  );
};

export default KanbanBoard;
*/