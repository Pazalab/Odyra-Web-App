import dotenv from "dotenv";
import { mailTransport } from "../../config/mailconfig.js";
import ejs from "ejs";
import fs from "fs";

dotenv.config();

export const sendPaymentLinkMail = async(userData) => {
        const { email, name, paymentLink } = userData;

       try {
                const templateString = fs.readFileSync("./mail/views/BookingPaymentLinkMail.ejs", "utf-8");

                const dynamicData = {
                    name: name,
                    paymentLink: paymentLink
                }

                const html = ejs.render(templateString, dynamicData);

                const mailOptions = {
                        from: `Odyra Safaris <${process.env.EMAIL}>`,
                        to: `${email}`,
                        name: "Odyra Safaris",
                        subject: "Ride request confirmation - Payment Link",
                        html: html
                }

                //send mail
             const info =  await mailTransport.sendMail(mailOptions);

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