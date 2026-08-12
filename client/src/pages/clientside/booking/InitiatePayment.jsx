import { useEffect } from "react";
import { useLocation } from "react-router-dom"
import { useVerifyPaymentLinkMutation } from "../../../redux/slices/client/clientApiSlice";
import DataLoader from "../../../components/clientside/common/spinners/DataLoader";
import { MdErrorOutline } from "react-icons/md";
import { useState } from "react";
import { IoCheckmarkCircle } from "react-icons/io5";

const InitiatePayment = () => {
    const { pathname } = useLocation();
    const [ VerifyPayment, { isLoading }] = useVerifyPaymentLinkMutation();
    const [ serverMessage, setServerMessage ] = useState({ title: "", message: ""})

    useEffect(() => {
         const token = pathname.split("/").pop();

         const verify = async () => {
              try {
                   const res = await VerifyPayment({ token }).unwrap();
                   setServerMessage({ title: "Payment Link Verified", message: "Payment link verified. Redirecting you to stripe shortly"})
                   window.location.href = res.url;
              } catch (error) {
               //     console.log(error) 
                   setServerMessage({ title:error.data.title, message: error.data.message })
              }
              
         }

         if(token) verify();
    }, [VerifyPayment, pathname])
  return (
    <div className="payment-init-wrapper">
             { isLoading ?
               <div className="verifying-booking">
                    <DataLoader size={"big"} />
                    <p>Please wait while we confirm your payment link....</p>
               </div>
               :
               <div className="verification-failure">
                           { serverMessage.title === "Payment Link Verified" ? <span className="success"><IoCheckmarkCircle /></span> : <span className="error"><MdErrorOutline /></span>}
                           <h2>{serverMessage.title}</h2>
                           <p>{serverMessage.message}</p>

                           {/* <div className="failure-btns">
                                    <button className="request">Request a New Payment Link</button>
                                    <button>Cancel Ride</button>
                           </div> */}
               </div>
          }
    </div>
  )
}

export default InitiatePayment