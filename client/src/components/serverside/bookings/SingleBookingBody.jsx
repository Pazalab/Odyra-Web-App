import { BsCarFront } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { ConvertDateToReadable } from "../../../utils/chores";
import { GoCheckCircleFill } from "react-icons/go";
import { IoCloseCircle } from "react-icons/io5";
import StatusUpdate from "./StatusUpdate";
import { useEffect, useState } from "react";
import RideDetails from "./RideDetails";
import { useSendPaymentLinkMutation } from "../../../redux/slices/admin/adminApiSlice";
import ActionLoader from "../common/spinners/ActionLoader";
import { setDashboardNotification } from "../../../redux/slices/util/utilActionsSlice";
import ResendPaymentLinkBtn from "./ResendPaymentLinkBtn";

const SingleBookingBody = () => {
  const { adminInfo } = useSelector(state => state.admin);
  const navigate = useNavigate();
  const [ currentBooking, setCurrentBooking] = useState(() => {
        if(typeof window !== "undefined"){
             const savedData = sessionStorage.getItem("Current Booking");
             return savedData ? JSON.parse(savedData) : null
        }
        return null;
  })
  const dispatch = useDispatch();

  useEffect(() => {
        if(!currentBooking) {
             navigate(`/admin/${adminInfo.id}/bookings`)
        }
  }, [navigate, currentBooking, adminInfo])


  const [ sendPaymentLinkToCustomer, { isLoading } ] = useSendPaymentLinkMutation();

  const sendPaymentLink = async() => {
         const payload = {
               bookingID: currentBooking.rideID
         }
         try {
              const res = await sendPaymentLinkToCustomer(payload).unwrap();
              sessionStorage.setItem("Current Booking", JSON.stringify(res.data));
              setCurrentBooking(res.data)
              dispatch(setDashboardNotification({ status: true, message: res.message, type: "success"}))
         } catch (error) {
               dispatch(setDashboardNotification({ status: true, message: error.data.message, type: "error"}))
         }
  }


  return (
    <div className="single-booking-body">
               <div className="single-booking-header">
                        <div className="single-booking-col">
                                 <span className="icon"><BsCarFront /></span>
                                 <div className="single-booking-col-texts">
                                           <h2>{currentBooking.rideID}</h2>
                                           <span>{currentBooking.rideType}</span>
                                 </div>
                        </div>
                        <div className="single-booking-col right">
                                   <div className="single-booking-item">
                                            <h4>Ride Date</h4>
                                            <span>{ ConvertDateToReadable(currentBooking.pickup.scheduledTimeofPickup)}</span>
                                   </div>
                                   <div className="single-booking-item">
                                              <h4>Payment Status</h4>
                                              <span>Awaiting payment</span>
                                   </div>
                                   <button>
                                              { isLoading ? <ActionLoader /> : <>
                                                     { currentBooking.paymentLink && currentBooking.paymentLink.sent ?
                                                            <ResendPaymentLinkBtn  
                                                                     bookingID={currentBooking.rideID}
                                                                     statusChange={setCurrentBooking}
                                                                /> :
                                                           <span onClick={sendPaymentLink}>Send Payment Link</span>
                                                    }
                                              </>}
                                   </button>
                        </div>
               </div>

               <div className="single-booking-timeline">
                          <div className="timeline-step">
                                    <div className={ currentBooking.rideStatus === "Ride Requested" ? "step-indicator active": "step-indicator"}>
                                               <span className="icon"><GoCheckCircleFill /></span>
                                    </div>
                                    <h5>Ride requested</h5>
                          </div>
                          { currentBooking.rideStatus === "Cancelled" ? 
                               <div className="timeline-step">
                                    <div className={ currentBooking.rideStatus === "Cancelled" ? "step-indicator active": "step-indicator"}>
                                               { currentBooking.rideStatus === "Cancelled" ? 
                                                   <span className="icon"><IoCloseCircle /></span>
                                                   :
                                                  <span className="block"></span>
                                              }
                                    </div>
                                    <h5>Ride cancelled</h5>
                              </div>
                              :
                              <div className="timeline-step">
                                    <div className={ currentBooking.rideStatus === "Awaiting Confirmation" ? "step-indicator active": "step-indicator"}>
                                               { currentBooking.rideStatus === "Payment Made" ||
                                                 currentBooking.rideStatus === "Customer Picked" ||
                                                 currentBooking.rideStatus === "Ride Completed" ? 
                                                  <span className="icon"><GoCheckCircleFill /></span> :
                                                  <span className="block"></span> 
                                               }
                                    </div>
                                    <h5>Awaiting Confirmation</h5>
                          </div>
                         }
                          <div className="timeline-step">
                                    <div  className={ currentBooking.rideStatus === "Payment Made" ? "step-indicator active": "step-indicator"}>
                                               { 
                                                  currentBooking.rideStatus === "Customer Picked" ||
                                                  currentBooking.rideStatus === "Ride Completed" ? 
                                                    <span className="icon"><GoCheckCircleFill /></span>
                                                  :
                                                    <span className="block"></span>
                                              }
                                               
                                    </div>
                                    <h5>Payment Made</h5>
                          </div>
                          <div className="timeline-step">
                                    <div  className={ currentBooking.rideStatus === "Customer Picked" ? "step-indicator active": "step-indicator"}>
                                              { currentBooking.rideStatus === "Ride Completed"  ?
                                               <span className="icon"><GoCheckCircleFill /></span> :
                                                <span className="block"></span>
                                                }
                                    </div>
                                    <h5>Customer Picked</h5>
                          </div>
                          <div className="timeline-step">
                                    <div  className={ currentBooking.rideStatus === "Ride Completed" ? "step-indicator active": "step-indicator"}>
                                              { currentBooking.rideStatus === "Ride Completed" ? 
                                                 <span className="icon"><GoCheckCircleFill /></span> :
                                                 <span className="block"></span>
                                              }
                                    </div>
                                    <h5>Ride Completed</h5>
                          </div>
               </div>

               <div className="single-booking-grid">
                        <div className="single-booking-extra">
                               <h3>Update Ride Status</h3>

                               <StatusUpdate 
                                       currentStatus={currentBooking.rideStatus} 
                                       booking_id={currentBooking.rideID} 
                                       statusChange={setCurrentBooking}
                               />

                               <div className="customer-block">
                                        <h4>Customer Information</h4>
                                        
                                        <div className="customer-simple-box">
                                                 <span>Customer Name</span>
                                                 <p>{currentBooking.customer.name}</p>
                                        </div>
                                         <div className="customer-simple-box">
                                                 <span>Customer Email</span>
                                                 <p>{currentBooking.customer.email}</p>
                                        </div>
                                         <div className="customer-simple-box">
                                                 <span>Customer Phone</span>
                                                 <p>{currentBooking.customer.phone}</p>
                                        </div>
                               </div>
                        </div>
                        <div className="single-booking-information">
                                 <RideDetails
                                         data={currentBooking}
                                 />
                        </div>

               </div>
    </div>
  )
}

export default SingleBookingBody