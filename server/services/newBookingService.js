import Booking from "../models/bookings.js";
import { generateCustomerId } from "../utils/chores.js";

export const CreateNewRide = async(data) => {
     const {
           ride_id,
           ride_type,
           duration,
           passengers,
           pickup_time_date,
           pickup,
           c_name,
           c_email,
           c_phone,
           full_ride_cost,
           bags,
           drop_off,
           payment_status,
           id,
           ride_cost,
           waiting_fee
     } = data;

     try {
           const existing = await Booking.findOne({ stripeSessionId: id });
           if(existing) return;

           const newBooking = await Booking.create({
                 rideID: ride_id,
                 rideType: ride_type,
                 customer: {
                         id: generateCustomerId(),
                         name: c_name,
                         phone: c_phone,
                         email: c_email,
                 },
                 rideStatus: "requested",
                 pickup: {
                        address: pickup,
                        scheduledTimeofPickup: pickup_time_date,
                 },
                 dropoff: {
                      address: drop_off
                 },
                 estimatedRideDuration: duration,
                 passengers: passengers,
                 luggageCount: bags,
                 rideCost: {
                        rideFare: Number(ride_cost)/100,
                        waitingFee: Number(waiting_fee)/100,
                        totalFare: parseFloat(full_ride_cost),
                        paymentStatus: payment_status,
                 },
                 stripeSessionId: id,
           })
      //      if(newBooking){
      //            //Send email to customer
      //          console.log("Ride booked successfully")
      //      }
     } catch (error) {
          console.log(error)
     }
}