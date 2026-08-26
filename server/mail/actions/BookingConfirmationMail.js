import dotenv from "dotenv";
import ejs from "ejs";
import fs from "fs";
import { mailMsg } from "../../config/mailgunConfig.js";
import { generateTransactionPDF } from "../../services/pdfService.js";
import { sanitizeDate } from "../../utils/chores.js";

dotenv.config();

export const sendBookingConfirmationMail = async(userData) => {
    const { 
            email,
            name,
            pickup,
            dropoff,
            duration,
            distance,
            date,
            rideCost,
            bookingId,
       } = userData;

    try {
        const templateString = fs.readFileSync("./mail/views/BookingConfirmationMail.ejs", "utf-8");

        const pdfBuffer = await generateTransactionPDF(userData)

        const dynamicData = {
            name: name,
            pickup: pickup,
            dropoff: dropoff,
            duration: duration,
            distance: distance,
            date: sanitizeDate(date),
            rideCost: rideCost,
            bookingId: bookingId,
        }

        const html = ejs.render(templateString, dynamicData);

        const mailOptions = {
                from: `Odyra Safaris <${process.env.EMAIL}>`,
                to: `${email}`,
                name: "Odyra Safaris",
                subject: "Payment Confirmed - Your Ride with Odyra Safaris is Ready!",
                html: html,
                attachment: {
                    filename: `Receipt-${bookingId}.pdf`,
                    data: pdfBuffer,
                    contentType: "application/pdf"
                }
        }

        //send mail
        await mailMsg.messages.create(process.env.MAILGUN_DOMAIN, mailOptions)

         return { success: true }
       } catch (error) {
            return {
                  success: false,
                  error: error.message
            }
       }

}