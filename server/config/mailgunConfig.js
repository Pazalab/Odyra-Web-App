import formData from "form-data";
import Mailgun from "mailgun.js";
import dotenv from "dotenv";

dotenv.config();

const MAIL_API_KEY = process.env.MAILGUN_API_KEY;

const mailgun = new Mailgun(formData);

export const mailMsg = mailgun.client({
     username: "api",
     key: MAIL_API_KEY
})
