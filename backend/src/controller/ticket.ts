import { Response, Request } from "express";

import db from "../utils/db";

export interface TicketRequest extends Request {
  body: {
    title: string;
    description: string;
    contact: string;
    status: string;
  };
}

export const getAllTicket = async (req: TicketRequest, res: Response) => {
  try {
    const allTicket = await db.ticket.findMany({});
    res.status(200).send(allTicket);
  } catch (error) {
    console.log(error);
    res.status(500).send("Internal server error");
  }
};

export const createTicket = async (req: TicketRequest, res: Response) => {
  try {
    const { title, description, contact } = req.body;
    const addTicket = await db.ticket.create({
      data: {
        title: title,
        description: description,
        contact: contact,
        status: "pending",
        latestUpdate: new Date(),
      },
    });
    res.status(200).send({ message: "Ticket created successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).send("Internal server error");
  }
};

export const updateTicket = async (req: TicketRequest, res: Response) => {
  try {
    const { title, description, contact, status } = req.body;
    const updateTicket = await db.ticket.update({
      where: {
        id: Number(req.params.id),
      },
      data: {
        title: title,
        description: description,
        contact: contact,
        status: status,
        latestUpdate: new Date(),
      },
    });
    if (updateTicket) {
      res.status(200).send({ message: "Ticket updated successfully" });
    } else {
      res.status(404).send({ message: "Ticket not found" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).send("Internal server error");
  }
};
