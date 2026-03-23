import express from "express";
import { 
    GetAllBookings, 
    GetAllCustomers, 
    LoginUser, 
    LogoutUser, 
    RegisterUser, 
    SendPaymentLink, 
    UpdateBookingStatus,
    
 } from "../controllers/AdminController.js";
import { protect } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post("/register", RegisterUser);
router.post("/login", LoginUser);
router.post("/logout", LogoutUser);
router.get("/all-bookings", protect, GetAllBookings);
router.get("/all-customers", protect, GetAllCustomers);
router.patch("/booking/update-status", protect, UpdateBookingStatus)
router.post("/booking/send-payment-link", protect, SendPaymentLink);


export default router; 