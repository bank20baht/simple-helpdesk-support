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
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               description:
 *                 type: string
 *               contact:
 *                 type: string
 *             required:
 *               - title
 *               - description
 *               - contact
 *     responses:
 *       200:
 *         description: Ticket created successfully
 *       500:
 *         description: Internal server error
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
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               description:
 *                 type: string
 *               contact:
 *                 type: string
 *               status:
 *                 type: string
 *             required:
 *               - title
 *               - description
 *               - contact
 *               - status
 *     responses:
 *       200:
 *         description: Ticket updated successfully
 *       404:
 *         description: Ticket not found
 *       500:
 *         description: Internal server error
 */

router.put("/edit/:id", updateTicket);

export default router;
