import mongoose from "mongoose";

const bookingsSchema = mongoose.Schema({
       rideID: { type: String, unique: true },
       rideType: {
             type: String,
             enum: [ "Airport Transfer", "Point to Point", "By the Hour",],
             required: true,
       },
       customer: {
             id: { type: String, required: true},
             name: { type: String, required: true },
             phone: { type: String, required: true },
             email: { type: String, required: true}
       },
       rideStatus: {
             type: String,
             enum: ['Ride Requested',"Awaiting Confirmation", "Payment Made", "Customer Picked", "Ride Completed", "Cancelled"],
             default: "Ride Requested"
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
       stopOver: {
           address: { type: String }
       },
       flightNumber: { type: String },
       estimatedRideDuration: { type: String, required: true },
       passengers: { type: String, required: true },
       luggageCount: { type: String, required: true },
       ridePackage: { type: String },
       rideCost: {
              rideFare: Number,
              taxes: Number,
              platinumExtraCost: { type: Number, default: 0},
              waitingFee: { type: Number, default: 0},
              discounts: Number,
              totalFare: Number,
              paymentStatus: {
                    type: String,
                    default: "Not paid"
              },
       },
       isConfirmed: {
             type: Boolean,
             default: false,
       },
       paymentLink: {
             sent: Boolean,
             expiresAt: Date,
             paidAt: Date
       },
       isRideCompleteEmailSent: { type: Boolean, default: false }
}, { timestamps: true });

const Booking = mongoose.model("Booking", bookingsSchema);

export default Booking;