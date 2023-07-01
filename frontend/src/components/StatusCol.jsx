import React from 'react'
import TicketCard from './TicketCard'
const StatusCol = ({ title, ticket, id }) => {
    return (
        <>
            <div>
                <h1>{title}</h1>
                {ticket.map((ticket, index) => {
                    return (
                        <div style={{
                            padding: 2
                        }}>
                            <TicketCard ticket={ticket} key={ticket.id} />
                        </div>

                    );
                })}
            </div>
        </>
    );
};



export default StatusCol