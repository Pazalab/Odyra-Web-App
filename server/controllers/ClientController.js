import asyncHandler from "express-async-handler";
import Booking from "../models/bookings.js";
import Stripe from "stripe";
import dotenv from "dotenv"
import { generateCustomerId, generateRideID, sanitizeDate } from "../utils/chores.js";
import { CreateNewRide } from "../services/newBookingService.js";
import User from "../models/userModel.js";
import { generateAuthTokenForCustomers, VerifyPaymentToken } from "../utils/tokens.js";
import { sendBookingSuccessfulMail } from "../mail/actions/BookingSuccessMail.js";
import { sendBookingConfirmationMail } from "../mail/actions/BookingConfirmationMail.js";
import Transaction from "../models/transactions.js";
import { SendCustomerRegistrationNotification } from "../mail/actions/NewCustomerEmailRegistration.js";
import Settings from "../models/settingsModel.js";
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
              const customerEmailPayload = {
                     name: customer.name.split(" ")[0],
                     email: customer.email,
              }

              const setting = await Settings.find({ _id: "platform_settings"}).select("notificationSettings");
       
              const notificationSetting = setting[0].notificationSettings.customerNotification;

              if(notificationSetting){
                     //send email to admin
                     const admins = await User.find({ role: "Admin"}).select("email name");
                     
                     for(const admin of admins){
                            const adminEmailPayload = {
                                   name: customer.name,
                                   adminName: admin.name.split(" ")[0],
                                   adminEmail: admin.email,
                                   email: customer.email,
                                   phone: customer.phone || "N/A",
                                   date: sanitizeDate(customer.createdAt),
                            }
                            await SendCustomerRegistrationNotification(adminEmailPayload);
                     }
              }

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
            stopOverAddress,
            customerName, 
            customerEmail, 
            rideDuration, 
            rideDistance,
            rideCost, 
            waitingCharge,
            pickupDateTime,
            passengersNumber,
            bagsNumber,
            customerPhone,
            customerRideId,
            flightNumber,
            ridePackage,
            platinumCost
      } = req.body;
 
      const rideExists = await Booking.findOne({ rideID: customerRideId });

      if(rideExists){
            return res.status(200).json({
                 rideID: rideExists.rideID,
                 message: "Booking already exists"
            })
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
                    stopOver: {
                           address: stopOverAddress,
                     },
                     flightNumber: flightNumber,
                     estimatedRideDuration: rideDuration,
                     estimatedRideDistance: rideDistance,
                     passengers: passengersNumber,
                     luggageCount: bagsNumber,
                     ridePackage: ridePackage,
                     rideCost: {
                            rideFare: Number(rideCost),
                            waitingFee: Number(waitingCharge),
                            platinumExtraCost: Number(platinumCost),
                            totalFare: (Number(rideCost)+Number(waitingCharge)+Number(platinumCost)),
                     }
              })

              if(!newBooking){
                     res.status(404);
                     throw new Error("Sorry! Your booking was not successful. Please try again later.")
              }

              const payload = {
                     email: customerEmail,
                     name: newBooking.customer.name.split(" ")[0],
                     pickup: newBooking.pickup.address,
                     dropoff: newBooking.dropoff.address,
                     stopOverAddress: newBooking.stopOver.address,
                     rideCost: newBooking.rideCost.totalFare,
                     date: newBooking.pickup.scheduledTimeofPickup
              }
              //send email notification of booking placement
              sendBookingSuccessfulMail(payload).catch(err => {
                      console.error("Email sending failed", err)
              });
              res.json({ rideID: newBooking.rideID })
      } catch (error) {
              //  console.log(error)
               if (error.code === 11000) {
                     // Extremely rare with proper ID generation, but handle gracefully
                     return res.status(409).json({ 
                            message: "Duplicate booking detected. Please try again.",
                            retry: true
                     });
              }
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

       const redirectHost = process.env.NODE_ENV === "production" ? `${process.env.PROD_URL}` :  `${process.env.CLIENT_URL}`;

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
             cancel_url: `${redirectHost}/new-booking`,
             success_url: `/payment-confirmation?rideID=${customerRideId}`
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

       const host = process.env.NODE_ENV === "production" ? `${process.env.STRIPE_WEBHOOK_LIVE_SECRET }` :  `${process.env.STRIPE_WEBHOOK_TEST_SECRET}`;
       try {
            event = stripe.webhooks.constructEvent(req.body, signature, host);
       } catch (error) {
            res.status(400);
            throw new Error(`Webhook error: ${error.message}`)
       }

       if(event.type === `checkout.session.completed`){
              const session = event.data.object;
              //console.log(session)
              const {
                     customer_email,
                     payment_status,
                     payment_intent,
                     client_reference_id,
                     currency,
                     amount_total,
                     customer_details,
              } = session;

              //create the transaction entry and update booking
              try {
                     const paymentIntent = await stripe.paymentIntents.retrieve(payment_intent, {
                            expand: ['latest_charge.balance_transaction']
                     });

                     const ledgerItem = paymentIntent.latest_charge?.balance_transaction;
                     const chargeId = paymentIntent.latest_charge?.id;

                     let stripeFee = 0;
                     let netAmount = amount_total/100;

                     if(ledgerItem){
                            stripeFee = ledgerItem.fee / 100;
                            netAmount = ledgerItem.net / 100;
                     }else{
                            stripeFee = Math.round(((amount_total/100)*0.0175 + 0.30)*100)/100;
                            netAmount = (amount_total/100)-stripeFee;
                     }

                    //Update booking payment status
                    const updateBooking =  await Booking.findOneAndUpdate({ rideID: client_reference_id },
                            {
                                "rideCost.paymentStatus": payment_status,
                                 rideStatus: "Payment Made",
                                 isConfirmed: true
                            },
                            { new: true}
                     );

                     if(!updateBooking){
                            throw new Error(`Booking ${client_reference_id} not found. Rolling back transaction writing`)
                     }

                     //if booking was marked paid, create a transaction entry
                     const newTransaction = await Transaction.create({
                           charge_id: chargeId,
                           payment_intent_id: payment_intent,
                           booking_id: client_reference_id,
                           grossAmount: amount_total/100,
                           stripeFee: stripeFee,
                           netAmount: netAmount,
                           currency: currency,
                           customerEmail: customer_email || customer_details?.email,
                           customerName: customer_details?.name,
                           paidAt: new Date(),
                           paymentStatus: "succeeded"
                     })

                     
                    const payload = {
                            email: updateBooking.customer.email,
                            name: updateBooking.customer.name.split(" ")[0],
                            pickup: updateBooking.pickup.address,
                            dropoff: updateBooking.dropoff.address,
                            duration: updateBooking.estimatedRideDuration,
                            distance: updateBooking.estimatedRideDistance,
                            stopOverAddress: updateBooking.stopOver.address,
                            rideCost: updateBooking.rideCost.totalFare,
                            date: updateBooking.pickup.scheduledTimeofPickup,
                            bookingId: updateBooking.rideID,
                            charge_id: chargeId,
                            rideType: updateBooking.rideType,
                            paidAt: newTransaction.paidAt,
                     }
                     //send confirmation email
                     await sendBookingConfirmationMail(payload).catch(err => {
                            console.error("Payment notification email failed", err);
                     })

                     res.status(200).json({ received: true })
              } catch (error) {
                     //console.log(error)
                     console.error("An error occured. While trying to doing the webhook update operation")
              }
       }

       //If the payment fails
        if (event.type === 'charge.failed') {
              const charge = event.data.object;
         
              const {
                     id,
                     amount,
                     currency,
                     payment_intent,
                     status,
                     metadata,
                     billing_details
              } = charge;
 
              try {
                     let stripeFee = 0;
                     //proceed to create the failed transaction
                     await Transaction.create({
                            charge_id: id,
                            payment_intent_id: payment_intent,
                            booking_id: metadata.ride_id,
                            grossAmount: amount/100,
                            stripeFee: stripeFee,
                            netAmount: amount/100,
                            currency: currency,
                            customerEmail: billing_details.email,
                            customerName: billing_details.name,
                            paymentStatus: status,
                            paidAt: new Date(),
                     })
              } catch (error) {
                     //console.log(error)
                     console.error("An error occured. While trying to doing the webhook update operation")
              }
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
                      stopOverAddress: booking.stopOver.address,
                      dropOff: booking.dropoff.address,
                      duration: booking.estimatedRideDuration,
                      rideCost: booking.rideCost.totalFare,
                      paymentStatus: booking.rideCost.paymentStatus
              }})
      } catch (error) {
             console.log(error)
             res.status(500).json({ message: "Internal server error"})
      }
})

export const ConfirmBookingConfirmation = asyncHandler(async(req, res) => {
       const { rideID } = req.params;

       try {
              const txn = await Transaction.findOne({ booking_id: rideID });

              if(!txn){
                     return res.status(404).json({ message: "Sorry! Your booking was not found"})
              }

              const paymentIntent = await stripe.paymentIntents.retrieve(txn.payment_intent_id);

              if(paymentIntent.status === "succeeded"){
                     const booking = await Booking.findOneAndUpdate({ rideID: txn.booking_id }, {
                             "rideCost.paymentStatus": "Paid",
                             rideStatus: "Payment Made"
                     }, { new: true })

                     if(!booking){
                           return res.status(404).json({ message: "Sorry! Your booking was not found"})
                     }

                     const payload = {
                            email: booking.customer.email,
                            name: booking.customer.name.split(" ")[0],
                            pickup: booking.pickup.address,
                            dropoff: booking.dropoff.address,
                            stopOverAddress: booking.stopOver.address,
                            rideCost: booking.rideCost.totalFare,
                            date: booking.pickup.scheduledTimeofPickup,
                            bookingId: rideID
                     }

                     //if booking has not been confirmed to the customer
                     if(!booking.isConfirmed){
                            sendBookingConfirmationMail(payload).catch(err => {
                                   console.error("Payment notification email failed", err)
                            })
                     }

                     res.status(200).json({ ride: {
                            customer: booking.customer.name.split(" ")[0],
                            pickupAddress: booking.pickup.address,
                            stopOverAddress: booking.stopOver.address,
                            dropOff: booking.dropoff.address,
                            duration: booking.estimatedRideDuration,
                            rideCost: booking.rideCost.totalFare,
                            paymentStatus: booking.rideCost.paymentStatus
                     }})
              }
       } catch (error) {
              console.log(error)
             res.status(500).json({ message: "Internal server error. Our technical team is on site sorting it out"})
       }
})

export const GetCustomerBookings = asyncHandler(async(req, res) => {
       const customerBookings = await Booking.find({ "customer.email": req.user.email })

       res.status(200).json({ bookings: customerBookings})
})

export const VerifyPaymentLink = asyncHandler(async(req, res) => {
       const { token } =  req.body;

       if(!token){
             return res.status(400).json({
                  success: false,
                   title: "Invalid payment link.",
                   message: "Please make sure have a valid payment link to proceed."
             })
       }

       const verification = VerifyPaymentToken(token);

       if(!verification.success){
             if(verification.reason === "expired"){
                  return res.status(410).json({
                        success: false,
                        error: "PAYMENT_LINK_EXPIRED",
                        title: "Payment Link Expired",
                        message: verification.message,
                  })
             }

             return res.status(400).json({
                  success: false,
                  error: "INVALID_PAYMENT_LINK",
                  title: "Invalid Payment Link",
                  message: verification.message
             })
       }

       const redirectHost = process.env.NODE_ENV === "production" ? `${process.env.PROD_URL}` :  `${process.env.CLIENT_URL}`;

       const booking = await Booking.findOne({ rideID: verification.data.rideID});

       if(!booking){
              return res.status(404).json({
                     success: false,
                     error: "BOOKING_NOT_FOUND",
                     message: "The booking associated with this payment link no longer exists",
                     title: "Booking Not Found"
              })
       }

       if(booking.rideCost.paymentStatus === "Paid" || booking.rideStatus === "Payment Made"){
              return res.status(409).json({
                      success: false,
                      error: "PAYMENT_ALREADY_PROCESSED",
                      title: 'Payment already processed',
                      message: 'This payment has already been processed. Your ride is confirmed'
              })
       }

       const totalRideCost = Math.round(
              (Number(booking.rideCost.rideFare)+
              Number(booking.rideCost.waitingFee)+
              Number(booking.rideCost.platinumExtraCost)
       )*100); //total ride cost

       const session = await stripe.checkout.sessions.create({
            customer_email: booking.customer.email,
             line_items: [{
                  quantity: 1, 
                  price_data: {
                         currency: "aud",
                         unit_amount: totalRideCost,
                         product_data: {
                               name: `${booking.rideType} booking: ${booking.pickup.address} to ${booking.dropoff.address}`,
                               description: `Customer: ${booking.customer.name} | Duration: ${booking.estimatedRideDuration}`
                         }
                  }
             }],
             client_reference_id: booking.rideID,
             payment_intent_data: {
                  metadata: {
                        ride_id: booking.rideID
                  }
             },
             mode: "payment",
             cancel_url: `${redirectHost}/new-booking`,
             success_url: `${redirectHost}/payment-confirmation?rideID=${booking.rideID}`
      })

       if(!session){
               return res.status(500).json({
                      success: "false",
                      error: "PAYMENT_FAILURE",
                      title: "Payment Failed.",
                      message: "Your payment has failed. Please try again later."
               })
       }

       res.status(201).json({ url: session.url })
})