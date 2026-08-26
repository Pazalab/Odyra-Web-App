import express from "express";
import { 
    ConfirmBookingConfirmation,
    ConfirmRideCreation,
    fullfillStripePayment, 
    GetCustomerBookings, 
    GetCustomerProfile, 
    InitiateStripePayment,
    LoginCustomer,
    LogoutCustomer,
    RegisterCustomer,
    RequestRide,
    ResetCustomerPassword,
    SendResetInstructions,
    UpdateCustomerPassword,
    UpdateCustomerProfile,
    VerifyPasswordResetCode,
    VerifyPaymentLink,
} from "../controllers/ClientController.js";
import { customerProtect } from "../middlewares/authMiddleware.js";
import { GetPlatformSettings } from "../controllers/AdminController.js";
import { upload_pic } from "../utils/chores.js";

const router = express.Router();

router.post("/sign-up", RegisterCustomer);
router.post("/login", LoginCustomer);
router.post("/send-reset-instructions", SendResetInstructions);
router.post("/verify-reset-code", VerifyPasswordResetCode);
router.put("/reset-password", ResetCustomerPassword);
router.post("/logout", customerProtect, LogoutCustomer);
router.get("/profile", customerProtect, GetCustomerProfile);
router.post("/create-booking", RequestRide);
router.post("/initiate-payment", InitiateStripePayment);
router.post("/stripe-webhook", fullfillStripePayment);
router.get("/check-ride/:rideID", ConfirmRideCreation);
router.get("/check-transaction/:rideID", ConfirmBookingConfirmation)
router.get("/customer-bookings", customerProtect, GetCustomerBookings);
router.post("/booking/verify-payment-link", VerifyPaymentLink);
router.get("/settings", GetPlatformSettings);
router.put("/customer-update", customerProtect, upload_pic.single("profilePic"), UpdateCustomerProfile);
router.put("/customer-password-update", customerProtect, UpdateCustomerPassword)

export default router;