import express from "express";
import { LoginUser, LogoutUser, RegisterUser } from "../controllers/AdminController.js";

const router = express.Router();

router.post("/register", RegisterUser);
router.post("/login", LoginUser);
router.post("/logout", LogoutUser);


export default router; 