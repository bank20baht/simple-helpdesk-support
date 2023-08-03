// StatusCol.jsx

import React from 'react'
import TicketCard from './TicketCard'
const StatusCol = ({ title, ticket, id, color }) => {
    return (
        <>
            <div
                style={{
                    justifyContent: 'center',
                    alignItems: 'center',
                    backgroundColor: color,
                    padding: 5,
                    borderRadius: 10,
                    border: `5px solid black`

                }}
            >
                <h1 style={{ textAlign: 'center', padding: 5 }}>{title}</h1>
                {ticket.map((ticket, index) => {
                    return (
                        <div style={{ padding: 2 }} key={ticket.id}>
                            <TicketCard ticket={ticket} />
                        </div>
                    );
                })}
            </div>
        </>

    );
};

export default StatusCol