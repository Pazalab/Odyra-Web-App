import express from "express";
import { 
    GetAllBookings, 
    GetAllCustomers, 
    LoginUser, 
    LogoutUser, 
    RegisterUser, 
    ResendPaymentLink, 
    SendPaymentLink, 
    UpdateAdminProfile, 
    UpdateBookingStatus,
    
 } from "../controllers/AdminController.js";
import { protect } from "../middlewares/authMiddleware.js";
import { upload_pic } from "../utils/chores.js";

const router = express.Router();

router.post("/register", RegisterUser);
router.post("/login", LoginUser);
router.post("/logout", LogoutUser);
router.get("/all-bookings", protect, GetAllBookings);
router.get("/all-customers", protect, GetAllCustomers);
router.patch("/booking/update-status", protect, UpdateBookingStatus)
router.post("/booking/send-payment-link", protect, SendPaymentLink);
router.post("/booking/resend-payment-link", protect, ResendPaymentLink); 
router.put("/settings/update-profile-settings", protect, upload_pic.single("profilePic"), UpdateAdminProfile);


export default router; 