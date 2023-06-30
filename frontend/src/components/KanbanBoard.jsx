import React, { useEffect, useState } from 'react'
import axios from '../lib/axios'
import FormCreateTicket from './FormCreateTicket'
const KanbanBoard = () => {
  const [ticket, setTicket] = useState([])
  console.log(ticket)
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('/ticket')
        setTicket(response.data)
      } catch (error) {
        console.error(error);
      }
    }
    fetchData()
  }, [])
  return (
    <>
      <div>KanbanBoard</div>
      <FormCreateTicket />
    </>

  )
}

export default KanbanBoard