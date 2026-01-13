import mongoose from "mongoose";

const bookingsSchema = mongoose.Schema({
       rideID: { type: String, },
       rideType: {
             type: String,
             enum: [ "Airport Transfer", "Point to Point", "By the Hour",],
             required: true
       },
       customer: {
             id: { type: String, required: true},
             name: { type: String, required: true },
             phone: { type: String, required: true },
             email: { type: String, required: true}
       },
       rideStatus: {
             type: String,
             enum: ["requested", "accepted", "arrived", "in-progress", "completed", "canceled", "paid"],
             default: "requested"
       },
       cancellationReason: String,
       pickup: {
            address: { type: String, required: true },
            timeOfPickup: Date,
            scheduledTimeofPickup: String
       },
       dropoff: {
             address: { type: String, required: true},
             timeOfDropoff: Date,
       },
       estimatedRideDuration: { type: String, required: true },
       passengers: { type: String, required: true },
       luggageCount: { type: String, required: true },
       rideCost: {
              rideFare: Number,
              taxes: Number,
              waitingFee: Number,
              discounts: Number,
              totalFare: Number,
              paymentStatus: {
                    type: String,
                    enum: [ "paid", "pending", "canceled"],
                    default: "pending"
              },
       },
       stripeSessionId: String
}, { timestamps: true });

const Booking = mongoose.model("Booking", bookingsSchema);

export default Booking;