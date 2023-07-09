import { Response, Request } from "express";

import db from "../utils/db";

export interface TicketRequest extends Request {
  body: {
    title: string;
    description: string;
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

export const createTicket = async (req: any, res: Response) => {
  try {
    console.log(req.user);
    const { title, description } = req.body;
    const addTicket = await db.ticket.create({
      data: {
        title: title,
        description: description,
        status: "pending",
        latestUpdate: new Date(),
        createdBy: {
          connect: { username: req.user.username },
        },
      },
    });
    res.status(200).send({ message: "Ticket created successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).send("Internal server error");
  }
};

export const updateTicket = async (req: any, res: Response) => {
  try {
    const { title, description, status } = req.body;
    console.log(req.user);
    if (req.user.role === "user") {
      const updateTicket = await db.ticket.update({
        where: {
          id: Number(req.params.id),
        },
        data: {
          title: title,
          description: description,
          latestUpdate: new Date(),
        },
      });
      if (updateTicket) {
        res.status(200).send({ message: "Ticket updated successfully" });
      } else {
        res.status(404).send({ message: "Ticket not found" });
      }
    } else if (req.user.role === "admin") {
      const updateTicket = await db.ticket.update({
        where: {
          id: Number(req.params.id),
        },
        data: {
          status: status,
          latestUpdate: new Date(),
        },
      });
      if (updateTicket) {
        res.status(200).send({ message: "Ticket updated successfully" });
      } else {
        res.status(404).send({ message: "Ticket not found" });
      }
    } else {
      res.status(403).send({ message: "Access denied" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).send("Internal server error");
  }
};
