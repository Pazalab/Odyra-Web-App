import express from "express";
import { CreateNewBooking } from "../controllers/ClientController.js";

const router = express.Router();

router.post("/new-booking", CreateNewBooking);

export default router;