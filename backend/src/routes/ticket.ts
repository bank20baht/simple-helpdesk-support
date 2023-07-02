import { getAllTicket, createTicket, updateTicket } from "../controller/ticket";
import express, { Request, Response } from "express";

const router = express.Router();

/**
 * @swagger
 * /api/ticket:
 *   get:
 *     summary: Get all tickets
 *     responses:
 *       200:
 *         description: Success
 */
router.get("/", getAllTicket);

/**
 * @swagger
 * /api/ticket:
 *   post:
 *     summary: Create a ticket
 *     responses:
 *       201:
 *         description: Ticket created
 */
router.post("/", createTicket);

/**
 * @swagger
 * /api/ticket/edit/{id}:
 *   put:
 *     summary: Update a ticket
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the ticket to update
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Success
 */
router.put("/edit/:id", updateTicket);

export default router;
