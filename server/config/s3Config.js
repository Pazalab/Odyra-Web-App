import { S3Client } from "@aws-sdk/client-s3"
import dotenv from "dotenv";

dotenv.config();

export const s3Client = new S3Client({
     region: "auto",
     endpoint: process.env.CLOUDFLARE_S3_URL,
     credentials: {
           accessKeyId: process.env.CLOUDFLARE_S3_ACCESS_KEY,
           secretAccessKey: process.env.CLOUDFLARE_S3_API_SECRET
     }
})