// KanbanBoard.jsx

import React, { useEffect, useState } from 'react';
import axios from '../lib/axios';
import FormCreateTicket from './FormCreateTicket';
import StatusCol from './StatusCol';

const KanbanBoard = () => {
  const [pending, setPending] = useState([]);
  const [accepted, setAccepted] = useState([]);
  const [resolved, setResolved] = useState([]);
  const [rejected, setRejected] = useState([]);

  const fetchData = async () => {
    try {
      const response = await axios.get('/ticket');
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
        <StatusCol title={'Pending'} ticket={pending} id={'1'} />
        <StatusCol title={'Accepted'} ticket={accepted} id={'2'} />
        <StatusCol title={'Resolved'} ticket={resolved} id={'3'} />
        <StatusCol title={'Rejected'} ticket={rejected} id={'4'} />
      </div>
    </>
  );
};

export default KanbanBoard;
