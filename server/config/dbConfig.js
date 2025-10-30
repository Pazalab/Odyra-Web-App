import mongoose from "mongoose";

const connectToDatabase = async() => {
     try {
           const connect = await mongoose.connect(process.env.MONGO_URL);
           console.log(`MongoDB connected successfully at: ${connect.connection.host}`)
     } catch (error) {
           console.log(`Error: ${error.message}`);
           process.exit();
     }
}
export default connectToDatabase;