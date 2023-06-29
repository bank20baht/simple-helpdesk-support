import { getAllTicket, createTicket, updateTicket } from "../controller/ticket";

import express from "express";

const router = express.Router();

router.get("/", getAllTicket);
router.post("/", createTicket);
router.put("/edit/:id", updateTicket);

export default router;
