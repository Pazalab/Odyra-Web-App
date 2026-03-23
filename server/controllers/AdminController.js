import asyncHandler from "express-async-handler";
import User from "../models/userModel.js";
import { generateAuthTokenForAdmin, generatePaymentToken } from "../utils/tokens.js";
import Booking from "../models/bookings.js";
import { sendPaymentLinkMail } from "../mail/actions/sendPaymentLinkMail.js"

//Register user
export const RegisterUser = asyncHandler(async(req, res) => {
       const { name, email, password, role } = req.body;

       //Check if account already exists
      const userExists = await User.findOne({ email });

      if(userExists){
            res.status(400);
            throw new Error("User account already exists.")
       }

       const default_photo = "https://files.pazalab.com/odyra/images/avatar.jpg";

       const user = await User.create({ name, email, password, role, profilePicture: default_photo });

       if(user){
             res.status(201).json({
                  message: "Account created successfully.",
                  name: user.name,
                  email: user.email,
                  id: user._id,
                  role: user.role
             })
       }else{
             res.status(500).json({
                   message: "Account creation failed. Please try again later."
             })
       }
})

//login user
export const LoginUser = asyncHandler(async(req, res) => {
      const { email, password } = req.body;

      const user = await User.findOne({ email: email});

      if(!user){
            res.status(401);
            throw new Error("Invalid account credentials.")
      }

      if(user && (await user.matchPasswords(password))){
             generateAuthTokenForAdmin(res, user._id);
             res.status(200).json({
                    message: "Login successful",
                    role: user.role.toLowerCase(),
                    name: user.name,
                    email: user.email,
                    id: user._id,
                    image: user.profilePicture
             })
      }else{
            res.status(401);
            throw new Error("Invalid Credentials. Please try again with correct ones.")
      }
})

//logout Admin
export const LogoutUser = asyncHandler(async(req, res) => {
       res.cookie("jwt", "", {
            httpOnly: true,
            expires: new Date(0)
       })
       res.status(200).json({ message: "You have logged out of your account."})
})

//Get all bookings
export const GetAllBookings = asyncHandler(async(req, res) => {
      try {
            const bookings = await Booking.find({})
            
            res.status(200).json({ bookings })
      } catch (error) {
            res.status(500).json({ message: "Internal server error: bookings query"})
      }
})

export const GetAllCustomers = asyncHandler(async(req, res) => {
      try {
            const customers = await User.find({ role: "Customer"})
            
            res.status(200).json({ customers })
      } catch (error) {
            res.status(500).json({ message: "Internal server error: bookings query"})
      }
})

export const UpdateBookingStatus = asyncHandler(async(req, res) => {
       const { bookingID, updateText } = req.body;

       try {
            const updatedBooking = await Booking.findOneAndUpdate({ rideID: bookingID}, {
                    rideStatus: updateText
            }, { new: true})

             if(!updatedBooking){
                    res.status(404).json({ message: "You booking couldn't be updated at this time."})
             }

             res.status(201).json({ 
                  message: "Booking status updated successfully",
                   data: updatedBooking
            })
       } catch (error) {
            res.status(500).json({ message: 'Internal server error: booking status update failed'})
       }
})

//Send out the payment link
export const SendPaymentLink = asyncHandler(async(req, res) => {
       const { bookingID } = req.body;

       const existingBooking = await Booking.findOne({ rideID: bookingID});

       if(!existingBooking){
            res.status(404);
            throw new Error("Booking not found.")
       }

       try {
                  const token = generatePaymentToken(existingBooking);

                  const paymentLink = `${process.env.CLIENT_URL}/payment/${token}`

                  const userData = {
                        name: existingBooking.customer.name,
                        email: existingBooking.customer.email,
                        paymentLink
                  }
                  const emailResult = await sendPaymentLinkMail(userData);

                  if(emailResult.success){
                        const updatedBooking = await Booking.findOneAndUpdate({ rideID: bookingID}, {
                              rideStatus: "Awaiting Confirmation",
                              "paymentLink.sent": true,
                              "paymentLink.expiresAt": new Date(Date.now() + 15 * 60 * 1000)
                        }, { new: true});

                       res.status(201).json({ 
                              message: "Payment link sent successfully",
                              data: updatedBooking
                        })

                  }else{
                        res.status(500).json({
                               message: "Payment link not sent"
                        })
                  }
       } catch (error) {
            res.status(500).json({ message: 'Internal server error: booking status update failed'})
       }

})