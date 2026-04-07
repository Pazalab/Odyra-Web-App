import dotenv from "dotenv";
import ejs from "ejs";
import fs from "fs";
import { mailMsg } from "../../config/mailgunConfig.js";

dotenv.config();

export const ResendPaymentLinkMail = async (userData) => {
     const { email, name, paymentLink } = userData;

      try {
           const templateString = fs.readFileSync("./mail/views/BookingResendPaymentLinkMail.ejs", "utf-8");

          const dynamicData = {
               name: name,
               paymentLink: paymentLink
          }

          const html = ejs.render(templateString, dynamicData);

          const mailOptions = {
               from: `Odyra Safaris <${process.env.EMAIL}>`,
               to: `${email}`,
               name: "Odyra Safaris",
               subject: "New Payment Link for Ride Confirmation",
               html: html
          }

          //send mail
          await mailMsg.messages.create(process.env.MAILGUN_DOMAIN, mailOptions)

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