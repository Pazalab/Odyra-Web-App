import nodemailer from "nodemailer";
import dotenv from "dotenv"

dotenv.config();

export const mailTransport = nodemailer.createTransport({
       host: "smtp.zoho.com",
       port: 465,
       secure: true,
       auth: {
               user: process.env.EMAIL,
               pass: process.env.PASSWORD
       }
})

// mailTransport.verify((error, success) => {
//     if (error) {
//         console.error("Mail transport verification failed:", error);
//     } else {
//         console.log("Mail transport is ready:", success);
//     }
// });