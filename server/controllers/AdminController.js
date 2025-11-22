import asyncHandler from "express-async-handler";
import User from "../models/userModel.js";
import { generateAuthTokenForAdmin } from "../utils/tokens.js";

//Register user
export const RegisterUser = asyncHandler(async(req, res) => {
       const { name, email, password, role } = req.body;

       //Check if account already exists
      const userExists = await User.findOne({ email });

      if(userExists){
            res.status(400);
            throw new Error("User account already exists.")
       }

       const default_photo = "https://files.pazalab.com/odyra/images/avatar.jpg";

       const user = await User.create({ name, email, password, role, profilePicture: default_photo });

       if(user){
             res.status(201).json({
                  message: "Account created successfully.",
                  name: user.name,
                  email: user.email,
                  id: user._id,
                  role: user.role
             })
       }else{
             res.status(500).json({
                   message: "Account creation failed. Please try again later."
             })
       }
})

//login user
export const LoginUser = asyncHandler(async(req, res) => {
      const { email, password } = req.body;

      const user = await User.findOne({ email: email});

      if(!user){
            res.status(401);
            throw new Error("Invalid account credentials.")
      }

      if(user && (await user.matchPasswords(password))){
             generateAuthTokenForAdmin(res, user._id);
             res.status(201).json({
                    message: "Login successful",
                    role: user.role.toLowerCase(),
                    name: user.name,
                    email: user.email,
                    id: user._id,
                    image: user.profilePicture
             })
      }else{
            res.status(401);
            throw new Error("Invalid Credentials. Please try again with correct ones.")
      }
})

//logout Admin
export const LogoutUser = asyncHandler(async(req, res) => {
       res.cookie("jwt", "", {
            httpOnly: true,
            expires: new Date(0)
       })
       res.status(200).json({ message: "You have logged out of your account."})
})