import express from "express";
import { 
    fullfillStripePayment, 
    GetCustomerProfile, 
    InitiateStripePayment,
    LoginCustomer,
    RegisterCustomer,
} from "../controllers/ClientController.js";
import { customerProtect } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post("/sign-up", RegisterCustomer);
router.post("/login", LoginCustomer);
router.get("/profile", customerProtect, GetCustomerProfile);
router.post("/initiate-payment", InitiateStripePayment);
router.post("/stripe-webhook", express.raw({ type: "application/json"}), fullfillStripePayment);

export default router;