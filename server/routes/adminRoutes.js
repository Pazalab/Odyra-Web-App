import express from "express";
import { GetAllBookings, GetAllCustomers, LoginUser, LogoutUser, RegisterUser } from "../controllers/AdminController.js";
import { protect } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post("/register", RegisterUser);
router.post("/login", LoginUser);
router.post("/logout", LogoutUser);
router.get("/all-bookings", protect, GetAllBookings);
router.get("/all-customers", protect, GetAllCustomers);


export default router; 