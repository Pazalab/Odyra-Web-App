import dotenv from "dotenv";
import ejs from "ejs";
import fs from "fs";
import { mailMsg } from "../../config/mailgunConfig.js";
import { sanitizeDate } from "../../utils/chores.js";

dotenv.config();

export const SendRideCompleteMail = async(userData) => {
     const { 
          bookingID,
          service,
          rideType,
          email,
          name,
          pickup,
          dropoff,
          date,
          duration,
          rideCost,
     } = userData;

     try {
            const templateString = fs.readFileSync("./mail/views/BookingCompleteMail.ejs", "utf-8");

            const dynamicData = {
                  booking_id: bookingID,
                  name: name,
                  rideType: rideType,
                  service: service,
                  pickup: pickup,
                  dropoff: dropoff,
                  date:date,
                  duration: duration,
                  rideCost: rideCost
            }
            
            const html = ejs.render(templateString, dynamicData);

            const mailOptions = {
                  from: `Odyra Safaris<${process.env.EMAIL}>`,
                  to: `${email}`,
                  name: "Odyra Safaris",
                  subject: "Your Ride With Odyra Safaris is Now Complete",
                  html: html
            }

            await mailMsg.messages.create(process.env.MAILGUN_DOMAIN, mailOptions);

            return true
     } catch (error) {
           //console.error("Failed to send ride completion email", error);
           return false
     }
}