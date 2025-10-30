import asyncHandler from "express-async-handler";
import Booking from "../models/bookings.js";

export const CreateNewBooking = asyncHandler(async(req, res) => {
      const {
           bookingId,
           rideType,
           pickupAddress,
           dropoffAddress,
           waitingCharge,
           rideCost,
           rideDuration,
           pickupDateTime,
           passengersNumber,
           bagsNumber,
           customerName,
           customerEmail,
           customerPhone,
           paymentMethod
      } = req.body;

      const bookingExists = await Booking.findOne({ bookingId: bookingId });

      if(bookingExists){
            res.status(503);
            throw new Error("Please wait for the response, you have already booked")
      }

      try {
             const newBooking = await Booking.create({
                    bookingId: bookingId,
                    rideType: rideType,
                    customer: {
                          id: "customer id will go here",
                          name: customerName,
                          phone: customerPhone,
                          email: customerEmail,
                    },
                    pickup: {
                          address: pickupAddress,
                          timeOfPickup: new Date(pickupDateTime)
                    },
                    dropoff: {
                         address: dropoffAddress,
                    },
                    estimatedRideDuration: rideDuration,
                    passengers: passengersNumber,
                    luggageCount: bagsNumber,
                    pricing: {
                         rideFare: parseFloat(rideCost),
                         waitingFee: parseFloat(waitingCharge),
                         totalFare: (parseFloat(rideCost) + parseFloat(waitingCharge)),
                         paymentMethod: paymentMethod
                    }
             })

             if(newBooking){
                     res.status(201).json({ message: "Booking successful"})
             }else{
                    res.status(500).json({ message: "An error while creating your booking"})
             }
      } catch (error) {
             console.log(error)
            res.status(500);
            throw new Error("Technical Error occurance")
      }
})