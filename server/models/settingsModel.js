import mongoose from "mongoose";

const settingsSchema = mongoose.Schema({
       profileSettings: {
             fullname: { type: String, required: true },
       }
})