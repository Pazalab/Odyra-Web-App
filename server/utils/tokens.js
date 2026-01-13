import jwt from "jsonwebtoken"

export const generateAuthTokenForAdmin = (res, userId) => {
       const token = jwt.sign({ userId }, process.env.JWT_SECRET, { expiresIn: "30d"});

       res.cookie("jwt", token, {
             httpOnly: true,
             secure: process.env.NODE_ENV == "production",
             sameSite: "strict",
             maxAge: 2592000000 
       })
}

export const generateAuthTokenForCustomers = (res, userId) => {
      const token = jwt.sign({ userId }, process.env.JWT_SECRET, { expiresIn: "30d"});

       res.cookie("cjwt", token, {
             httpOnly: true,
             secure: process.env.NODE_ENV == "production",
             sameSite: "strict",
             maxAge: 2592000000 
       })
}