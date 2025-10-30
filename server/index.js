import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import connectToDatabase from "./config/dbConfig.js";
import ClientRoutes from "./routes/clientRoutes.js"
import { errorHandler, notFound } from "./middlewares/errorMiddleware.js";

//initialize express app
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//initialize env variables
dotenv.config();

const port = process.env.PORT || 4000;

//set up cookies
app.use(cookieParser());

// //set up cors
app.use(cors({
       credentials: true,
       origin: true
}))

//Routes
app.use("/api/v1/client", ClientRoutes);


//Error handling middleware
app.use(notFound);
app.use(errorHandler);

app.listen(port, () => console.log(`Server listening at port ${port}`));

//check DB connection
connectToDatabase();