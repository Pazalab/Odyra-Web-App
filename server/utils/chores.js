import multer from "multer";
import multerS3 from "multer-s3"
import { s3Client } from "../config/s3Config.js";

export const generateRideID = () => {
       const prefix = "ODYRA";

       const numbers = Math.floor(10 + Math.random()*90);

       const characters =  'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
       let letters = "";
       for(let i = 0; i < 3; i++){
            letters += characters.charAt(Math.floor(Math.random() * characters.length));
       }

       return `${prefix}${numbers}${letters}`
}


export const generateCustomerId = () => {
  const chars = 'abcdefghijklmnopqrstuvwxyz0123456789';
  let result = '';
  for (let i = 0; i < 32; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
};


export const upload_pic= multer({
      storage: multerS3({
           s3: s3Client,
          bucket: process.env.CLOUDFLARE_R2_BUCKET,
          contentType: multerS3.AUTO_CONTENT_TYPE,
          key: function(req, file, cb) {
               const uniqueSuffix = Math.round(Math.random() * 1E9);
               const filename = `profile-pictures/${uniqueSuffix}${file.originalname}`;
               cb(null, filename)
          }
      })
})

export const sanitizeDate = (rawDate) => {
       const dateObj = new Date(rawDate);

       const readable = dateObj.toLocaleString("en-US", {
              dateStyle: "long",
              timeStyle: "short"
       })

       return readable;
}