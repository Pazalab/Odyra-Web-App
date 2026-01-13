import asyncHandler from "express-async-handler";
import Booking from "../models/bookings.js";
import Stripe from "stripe";
import dotenv from "dotenv"
import { generateRideID } from "../utils/chores.js";
import { CreateNewRide } from "../services/newBookingService.js";
import User from "../models/userModel.js";
import { generateAuthTokenForCustomers } from "../utils/tokens.js";
dotenv.config()

//Register Customer
export const RegisterCustomer = asyncHandler(async(req, res) => {
        const { name, email, password } = req.body;

        const customerExists = await User.findOne({ email });

        if(customerExists){
               res.status(400);
               throw new Error("User account already exists")
        }

       const default_photo = "https://files.pazalab.com/odyra/images/avatar.jpg";
       const role = "Customer";

       const customer = await User.create({ name, email, password, role, profilePicture: default_photo })

       if(customer){
              generateAuthTokenForCustomers(res, customer._id);
                 res.status(201).json({
                        message: "Account created successfully.",
                        email: customer.email,
                        name: customer.name
                 })
       }else{
                res.status(500).json({
                        message: "Account creation failed. Please try again later."
                })
       }

})

//Login Customer
export const LoginCustomer = asyncHandler(async(req, res) => {
       const { email, password } = req.body;

       const customer = await User.findOne({ email: email });
       if(!customer){
              res.status(401);
              throw new Error("Invalid account credentials");
       }

       if(customer && (await customer.matchPasswords(password))){
              generateAuthTokenForCustomers(res, customer._id);
              res.status(200).json({
                      message: "Login successful",
                      email: customer.email
              })
       }else{
              res.status(401);
              throw new Error("Invalid credentials. Please try again with correct ones")
       }
})

//Get user profile
export const GetCustomerProfile = asyncHandler(async(req, res) => {
       res.status(200).json({
              customer: req.user
       })
})



const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export const InitiateStripePayment = asyncHandler(async(req, res) => {
       const { 
            rideType, 
            pickupAddress, 
            dropoffAddress, 
            customerName, 
            customerEmail, 
            rideDuration, 
            rideCost, 
            waitingCharge,
            pickupDateTime,
            passengersNumber,
            bagsNumber,
            customerPhone
      } = req.body;

       const totalRideCost = Math.round((Number(rideCost)+Number(waitingCharge))*100); // Convert to cents
       
       const customerRideId = generateRideID();

      const session = await stripe.checkout.sessions.create({
            customer_email: customerEmail,
             line_items: [{
                  quantity: 1, 
                  price_data: {
                         currency: "aud",
                         unit_amount: totalRideCost,
                         product_data: {
                               name: `${rideType} booking: ${pickupAddress} to ${dropoffAddress}`,
                               description: `Customer: ${customerName} | Duration: ${rideDuration}`
                         }
                  }
             }],
             client_reference_id: customerRideId,
             metadata: {
                   ride_id: customerRideId,
                   ride_type: rideType,
                   drop_off: dropoffAddress,
                   pickup: pickupAddress,
                   duration: rideDuration,
                   ride_cost: Math.round(Number(rideCost)*100),
                   waiting_fee: Math.round(Number(waitingCharge)*100),
                   full_ride_cost: (totalRideCost/100),
                   c_name: customerName,
                   c_email: customerEmail,
                   c_phone: customerPhone,
                   pickup_time_date: pickupDateTime,
                   passengers: passengersNumber,
                   bags: bagsNumber
             },
             mode: "payment",
             cancel_url: "http://localhost:5174/booking",
             success_url: "http://localhost:5174/booking-successful"
      })
      if(!session){
            res.status(500);
            throw new Error("Internal server error")
      }
      res.status(201).json({ url: session.url }) 
})


//Fulfill payment order
export const fullfillStripePayment = asyncHandler(async(req, res) => {
       const signature = req.headers["stripe-signature"];
       let event;

       try {
            event = stripe.webhooks.constructEvent(req.body, signature, process.env.STRIPE_WEBHOOK_SECRET);
       } catch (error) {
            res.status(400);
            throw new Error(`Webhook error: ${error.message}`)
       }

       res.status(200).json({ received: true })

       if(event.type === `checkout.session.completed`){
              const session = event.data.object;
              const { id, payment_status } = session;
              const booking_payload = {
                      id,
                      payment_status,
                      ...session.metadata
              }

              CreateNewRide(booking_payload).catch(err => {
                     console.log(`Your ride has not been booked`,err)
              })
       }
      
})