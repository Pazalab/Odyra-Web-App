import asyncHandler from "express-async-handler";
import Booking from "../models/bookings.js";

export const CreateNewBooking = asyncHandler(async(req, res) => {
      console.log(req.body)
})