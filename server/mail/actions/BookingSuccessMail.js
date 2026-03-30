import dotenv from "dotenv";
import { mailTransport } from "../../config/mailconfig.js";
import ejs from "ejs";
import fs from "fs";

dotenv.config();

export const sendBookingSuccessfulMail = async(userData) => {
    const { 
            email,
            name,
            pickup,
            dropoff,
            date,
            rideCost
       } = userData;

    try {
        const templateString = fs.readFileSync("./mail/views/BookingSuccessMail.ejs", "utf-8");

        const dynamicData = {
            name: name,
            pickup: pickup,
            dropoff: dropoff,
            date: date,
            rideCost: rideCost,
        }

        const html = ejs.render(templateString, dynamicData);

        const mailOptions = {
                from: `Odyra Safaris <${process.env.EMAIL}>`,
                to: `${email}`,
                name: "Odyra Safaris",
                subject: "Booking Successful",
                html: html
        }

        //send mail
        await mailTransport.sendMail(mailOptions);

            return {
                success: true,
            }
       } catch (error) {
            return {
                  success: false,
                  error: error.message
            }
       }

}