import dotenv from "dotenv";
import ejs from "ejs";
import fs from "fs";
import { mailMsg } from "../../config/mailgunConfig.js";

dotenv.config();

export const SendCustomerRegistrationNotification = async(userData) => {
     const {
           name,
           adminName,
           adminEmail,
           email,
           phone,
           date
     } = userData;

    try {
            const templateString = fs.readFileSync("./mail/views/CustomerRegistrationNotification.ejs", "utf-8");

            const dynamicData = {
                name: name,
                email: email,
                admin: adminName,
                phone: phone,
                date: date
            }

            const html = ejs.render(templateString, dynamicData);

            const mailOptions = {
                    from: `Odyra Safaris <${process.env.EMAIL}>`,
                    to: `${adminEmail}`,
                    name: "Odyra Safaris ",
                    subject: "New Customer Registration",
                    html: html
            }

            //send mail
        await mailMsg.messages.create(process.env.MAILGUN_DOMAIN, mailOptions)

        return  true
    } catch (error) {
            console.error(error)
            return  false;
    }
}