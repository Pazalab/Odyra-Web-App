import asyncHandler from "express-async-handler";
import Booking from "../models/bookings.js";
import Stripe from "stripe";
import dotenv from "dotenv"
import { generateCustomerId, generateRideID } from "../utils/chores.js";
import { CreateNewRide } from "../services/newBookingService.js";
import User from "../models/userModel.js";
import { generateAuthTokenForCustomers } from "../utils/tokens.js";
dotenv.config()

//Register Customer
export const RegisterCustomer = asyncHandler(async(req, res) => {
        const { name, email, password, phone } = req.body;

        const customerExists = await User.findOne({ email });

        if(customerExists){
               res.status(400);
               throw new Error("User account already exists")
        }

       const default_photo = "https://files.pazalab.com/odyra/images/avatar.jpg";
       const role = "Customer";

       const customer = await User.create({ name, email, password, role, profilePicture: default_photo, phone })

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
       if(customer.role === "Admin"){
              res.status(401);
              throw new Error("Invalid customer account")
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

//
export const LogoutCustomer = asyncHandler(async(req, res) => {
       res.cookie("cjwt", "", {
            httpOnly: true,
            expires: new Date(0)
       })
       res.status(200).json({ message: "You have logged out of your account."})
})


//Get user profile
export const GetCustomerProfile = asyncHandler(async(req, res) => {
       res.status(200).json({
              customer: req.user
       })
})


//Request booking
export const RequestRide = asyncHandler(async(req, res) => {
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
            customerPhone,
            customerRideId,
      } = req.body;
     
      const rideExists = await Booking.findOne({ rideID: customerRideId });
      if(rideExists){
            res.status(503);
            throw new Error("Your ride request has already been sent. Please be patient.");
      }

      try {
           const newBooking = await Booking.create({
                     rideID: customerRideId,
                     rideType: rideType,
                     customer: {
                            id: req.user?._id ?? generateCustomerId(),
                            name: customerName,
                            email: customerEmail,
                            phone: customerPhone
                     },
                     rideStatus: "Ride Requested",
                     pickup: {
                            address: pickupAddress,
                            scheduledTimeofPickup: pickupDateTime
                     },
                     dropoff: {
                            address: dropoffAddress
                     },
                     estimatedRideDuration: rideDuration,
                     passengers: passengersNumber,
                     luggageCount: bagsNumber,
                     rideCost: {
                            rideFare: Number(rideCost),
                            waitingFee: Number(waitingCharge),
                            totalFare: (Number(rideCost)+Number(waitingCharge)),
                     }
              })

              if(!newBooking){
                     res.status(404);
                     throw new Error("Sorry! Your booking was not successful. Please try again later.")
              }

              res.json({ rideID: newBooking.rideID })
      } catch (error) {
               console.log(error)
              res.status(500).json({ message: "An error occured. We are currently resolving it."})
      }
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
             cancel_url: "http://localhost:5174/new-booking",
             success_url: `http://localhost:5174/booking-confirmation?rideID=${customerRideId}`
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

export const ConfirmRideCreation = asyncHandler(async(req, res) => {
      const { rideID } = req.params;
      try {
              const booking = await Booking.findOne({ rideID: rideID });

              if(!booking){
                     return res.status(404).json({ message: "Sorry! Your booking was not found"})
              }

              res.status(200).json({ exists: true, ride: {
                      customer: booking.customer.name.split(" ")[0],
                      pickupAddress: booking.pickup.address,
                      dropOff: booking.dropoff.address,
                      duration: booking.estimatedRideDuration,
                      rideCost: booking.rideCost.totalFare,
                      paymentStatus: booking.rideCost.paymentStatus
              }})
      } catch (error) {
             //console.log(error)
             res.status(500).json({ message: "Internal server error"})
      }
})

export const GetCustomerBookings = asyncHandler(async(req, res) => {
       const customerBookings = await Booking.find({ "customer.email": req.user.email })

       res.status(200).json({ bookings: customerBookings})
})