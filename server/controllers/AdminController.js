import asyncHandler from "express-async-handler";
import User from "../models/userModel.js";
import { generateAuthTokenForAdmin, generatePaymentToken } from "../utils/tokens.js";
import Booking from "../models/bookings.js";
import { sendPaymentLinkMail } from "../mail/actions/sendPaymentLinkMail.js"
import { ResendPaymentLinkMail } from "../mail/actions/resendPaymentLinkMail.js";
import mongoose from "mongoose";
import Settings from "../models/settingsModel.js";
import Stripe from "stripe";
import dotenv from "dotenv";

dotenv.config();

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
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

//Get Admin Profile
export const GetAdminProfile = asyncHandler(async(req, res) => {
       const { id } = req.params;
       const objectId = new mongoose.Types.ObjectId(id)
       
       const user = await User.findById(objectId).select("-password");

       if(user){
            res.status(200).json({ profile: user})
       }else{
            res.status(500).json({ message: "We could not retrieve your profile at this time. Please try again later."})
       }
})

//Update Admin Profile
export const UpdateAdminProfile = asyncHandler(async(req, res) => {
       const { name, username, bio, availability } = JSON.parse(req.body.data)
       let profileURL = req.user.profilePicture;

       if(req.file){
            profileURL = `https://cdn.odyra.com.au/${req.file.key}`;
       }

       try {
           const updatedProfile = await User.findByIdAndUpdate(req.user._id, {
                  name: name,
                  profilePicture: profileURL,
                  username: username,
                  bio: bio,
                  availableForRides: Boolean(availability)
            }, { new: true, select: "-password" })


            if(updatedProfile){
                    res.status(201).json({profile: updatedProfile, message: "Profile updated successfully"})
            }
       } catch (error) {
            res.status(500).json({ message: "Error occured while updating your profile"})
       }
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

                  const paymentLink = `${process.env.NODE_ENV === 'production' ? `${process.env.PROD_URL}`: `${process.env.CLIENT_URL}`}/booking/initiate-payment/${token}`

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
            res.status(500).json({ message: 'Internal server error: sending payment link failed'})
       }
})

//Resend out the payment link

export const ResendPaymentLink = asyncHandler(async(req, res) => {
       const { bookingID } = req.body;

      const existingBooking = await Booking.findOne({ rideID: bookingID});

       if(!existingBooking){
            res.status(404);
            throw new Error("Booking not found.")
       }

      try {
            const token = generatePaymentToken(existingBooking);

            const paymentLink = `${process.env.NODE_ENV === 'production' ? `${process.env.PROD_URL}`: `${process.env.CLIENT_URL}`}/booking/initiate-payment/${token}`

            const userData = {
                  name: existingBooking.customer.name,
                  email: existingBooking.customer.email,
                  paymentLink
            }

            const emailResult = await ResendPaymentLinkMail(userData);

            if(emailResult.success){
                  const updatedBooking = await Booking.findOneAndUpdate({ rideID: bookingID }, {
                         "paymentLink.expiresAt" : new Date(Date.now() + 15 * 60 * 1000)
                  }, { new: true});

                  res.status(201).json({
                        message: "Payment link resent successfully.",
                        data: updatedBooking
                  })
            }else{
                  res.status(500).json({
                        message: "Payment link couldn't be resent."
                  })
            }

      } catch (error) {
            res.status(500).json({ message: 'Internal server error: resending payment link failed'})
      }
})

//Get all stripe transactions
export const GetStripeTransactions = asyncHandler(async(req, res) => {
     const paymentIntents = await stripe.checkout.sessions.list({
            limit: 100,
            expand: ["data.customer", "data.payment_intent"],
     });

     const transactions = paymentIntents.data.filter(payment => 
           payment.status === "succeeded" ||
           payment.status === "requires_payment_method"
     );

//      console.log(transactions)
     res.status(200).json({ transactions})
})


//Update Pricing Settings
export const UpdatePricingSettings = asyncHandler(async(req, res) => {
       const { 
            baseFare,
            perHourRate, 
            tenKilometreRate,
            twentyKilometreRate,
            beyondTwentyKilometreRate,
            beyondFiftyKilometreRate,
            luggageThreshold, 
            luggageCost, 
            cancellationFee, 
            waitingFee 
      }  = req.body;

       try {
            const updatedPricing = await Settings.findOneAndUpdate(
                  { _id: "platform_settings"},
                  { $set: {
                        'pricingSettings.baseFare': baseFare,
                        'pricingSettings.perHourRate': perHourRate,
                        'pricingSettings.perKilometerRate.tenKilometreRate': tenKilometreRate,
                         'pricingSettings.perKilometerRate.twentyKilometreRate': twentyKilometreRate,
                          'pricingSettings.perKilometerRate.beyondTwentyKilometreRate': beyondTwentyKilometreRate,
                         'pricingSettings.perKilometerRate.beyondFiftyKilometreRate': beyondFiftyKilometreRate,
                        'pricingSettings.luggageThreshold': luggageThreshold,
                        'pricingSettings.luggageCost': luggageCost,
                        'pricingSettings.cancellationFee': cancellationFee,
                        'pricingSettings.waitingFee': waitingFee,
                  }},
                  { upsert: true, new: true, runValidators: true }
            )

            if(updatedPricing){
                   res.status(201).json({ settings: updatedPricing, message: "Pricing settings updated successfully"})
            }
       } catch (error) {
            console.log(error)
            res.status(500).json({ message: "Sorry. Your pricing settings cannot be updated at this time"})
       }
})

//Get Platform settings
export const GetPlatformSettings = asyncHandler(async(req, res) => {
       const settings = await Settings.find({})

       if(settings){
             res.status(200).json({ settings: settings[0] })
       }else{
             res.status(500).json({ message: "Sorry we could not fetch your platform settings at this time"})
       }
})