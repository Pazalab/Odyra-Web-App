import jwt from "jsonwebtoken"

export const generateAuthTokenForAdmin = (res, userId) => {
       const token = jwt.sign({ userId }, process.env.JWT_SECRET, { expiresIn: "30d"});

       res.cookie("jwt", token, {
             httpOnly: true,
             secure: process.env.NODE_ENV == "production",
             sameSite: "strict",
             maxAge: 86400000
       })
}

export const generateAuthTokenForCustomers = (res, userId) => {
      const token = jwt.sign({ userId }, process.env.JWT_SECRET, { expiresIn: "30d"});

       res.cookie("cjwt", token, {
             httpOnly: true,
             secure: process.env.NODE_ENV == "production",
             sameSite: "strict",
             maxAge: 86400000
       })
}

export const generatePaymentToken = (booking) => {
      return jwt.sign(
             {
                  rideID: booking.rideID,
                  email: booking.customer.email
             },
             process.env.JWT_SECRET,
             { expiresIn: "15min", algorithm: "HS256" }
      )
}

export const VerifyPaymentToken = (token) => {
      try {
             const decoded = jwt.verify(token, process.env.JWT_SECRET, {
                  algorithms: ["HS256"]
             })
             return { success: true, data: decoded }
      } catch (error) {
            if(error.name === "TokenExpiredError"){
                  return { 
                        success: false, 
                        message: "Your payment link has expired. Please request a new one to confirm your booking.",
                        reason: "expired"
                  }
            }
            return { 
                  success: false, 
                  reason: "invalid",
                  message: "This payment link is invalid. Please check the link or request a new one"
            }
      }
}