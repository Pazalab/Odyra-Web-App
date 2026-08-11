import mongoose from "mongoose";

const transactionsSchema = mongoose.Schema({
    charge_id: {
         type: String,
         required: true,
         unique: true,
         trim: true,
         index: true,
    },
    payment_intent_id: {
          type: String,
          required: true,
    },
    booking_id: {
        type: String,
        required: true,
    },
    grossAmount: {
         type: Number,
         required: true,
         min: 0
    },
    stripeFee: {
        type: Number,
        default: 0,
        min: 0
    },
    netAmount: {
        type: Number,
        required: true,
        min: 0
    },
    currency: {
         type: String,
         required: true,
         uppercase: true,
         trim: true,
         default: "AUD",
    },
    customerEmail: {
          type: String,
          required: true,
          lowercase: true,
          trim: true,
    },
    customerName: {
        type: String,
        required: true,
    },
    paymentStatus: {
         type: String,
         required: true,
         enum: ["succeeded", "failed", "on hold", "refunded"],
         default: "on hold",
         index: true,
    },
    paidAt: {
         type: Date,
         default: Date.now,
         required: true,
    }
}, { timestamps: true });

const Transaction = mongoose.model("Transaction", transactionsSchema);

export default Transaction;