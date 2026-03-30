import express from "express";
import { 
    ConfirmRideCreation,
    fullfillStripePayment, 
    GetCustomerBookings, 
    GetCustomerProfile, 
    InitiateStripePayment,
    LoginCustomer,
    LogoutCustomer,
    RegisterCustomer,
    RequestRide,
    VerifyPaymentLink,
} from "../controllers/ClientController.js";
import { customerProtect } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post("/sign-up", RegisterCustomer);
router.post("/login", LoginCustomer);
router.post("/logout", customerProtect, LogoutCustomer);
router.get("/profile", customerProtect, GetCustomerProfile);
router.post("/create-booking", RequestRide);
router.post("/initiate-payment", InitiateStripePayment);
router.post("/stripe-webhook", fullfillStripePayment);
router.get("/check-ride/:rideID", ConfirmRideCreation);
router.get("/customer-bookings", customerProtect, GetCustomerBookings);
router.post("/booking/verify-payment-link", VerifyPaymentLink);

export default router;