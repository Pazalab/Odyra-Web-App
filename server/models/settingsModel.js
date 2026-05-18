import mongoose from "mongoose";

const settingsSchema = mongoose.Schema({
     _id: {
            type: String,
            default: "platform_settings"
     },
     pricingSettings: {
           baseFare: { type: Number, required: true },
           perHourRate: { type: Number, required: true },
           perKilometerRate: { 
                tenKilometreRate: { type: Number, required: true },
                twentyKilometreRate: { type: Number, required: true },
                beyondTwentyKilometreRate: { type: Number, required: true}
           },
           luggageThreshold: { type: Number, required: true },
           luggageCost: { type: Number, required: true },
           cancellationFee: { type: Number, required: true },
           waitingFee: { type: Number, required: true }
     },
}, { timestamps: true })

const Settings = mongoose.model("Settings", settingsSchema);

export default Settings