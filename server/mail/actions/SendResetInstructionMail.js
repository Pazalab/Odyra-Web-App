import dotenv from "dotenv";
import ejs from "ejs";
import fs from "fs";
import { mailMsg } from "../../config/mailgunConfig.js";

dotenv.config();

export const sendResetPasswordInstructions = async(userData) => {
    const { email, name, code } = userData;

    try {
        const templateString = fs.readFileSync("./mail/views/ResetPasswordInstruction.ejs", "utf-8");

        const dynamicData = {
            name: name,
            code: code,
        }
        
        const html = ejs.render(templateString, dynamicData);

        const mailOptions = {
            from: `Odyra Safaris <${process.env.EMAIL}>`,
            to: `${email}`,
            name: "Odyra Safaris",
            subject: "Reset Password Verification Code",
            html: html
      }

      
        await mailMsg.messages.create(process.env.MAILGUN_DOMAIN, mailOptions);

        return true
    } catch (error) {
                //    console.error("Failed to send ride completion email", error);
           return false
    }
}