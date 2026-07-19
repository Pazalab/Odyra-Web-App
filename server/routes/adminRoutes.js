import express from "express";
import { 
    GetAdminProfile,
    GetAllBookings, 
    GetAllCustomers, 
    GetPlatformSettings, 
    GetStripeTransactions, 
    LoginUser, 
    LogoutUser, 
    RegisterUser, 
    ResendPaymentLink, 
    SendPaymentLink, 
    UpdateAdminProfile, 
    UpdateBookingStatus,
    UpdatePricingSettings,
 } from "../controllers/AdminController.js";
import { protect } from "../middlewares/authMiddleware.js";
import { upload_pic } from "../utils/chores.js";

const router = express.Router();

router.post("/register", RegisterUser);
router.post("/login", LoginUser);
router.post("/logout", LogoutUser);
router.get("/profile/:id", protect, GetAdminProfile);
router.get("/all-bookings", protect, GetAllBookings);
router.get("/all-customers", protect, GetAllCustomers);
router.patch("/booking/update-status", protect, UpdateBookingStatus)
router.post("/booking/send-payment-link", protect, SendPaymentLink);
router.post("/booking/resend-payment-link", protect, ResendPaymentLink); 
router.put("/settings/update-profile-settings", protect, upload_pic.single("profilePic"), UpdateAdminProfile);
router.put("/settings/update-pricing-settings", protect, UpdatePricingSettings);
router.get("/settings", protect, GetPlatformSettings);
router.get("/all-transactions", protect, GetStripeTransactions);

export default router; 