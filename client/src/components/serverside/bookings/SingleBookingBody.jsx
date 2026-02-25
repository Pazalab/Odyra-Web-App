import { BsCarFront } from "react-icons/bs";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { ConvertDateToReadable } from "../../../utils/chores";
import { GoCheckCircleFill } from "react-icons/go";

const SingleBookingBody = () => {
  const { bookings } = useSelector(state => state.admin);
  const { book_id } = useParams();
  const currentBooking = bookings.find(item => item.rideID === book_id);
  console.log(bookings)
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
                                   <button>Send Payment Link</button>
                        </div>
               </div>

               <div className="single-booking-timeline">
                          <div className="timeline-step">
                                    <div className="step-indicator">
                                              <span className="block"></span>
                                               {/* <span className="icon"><GoCheckCircleFill /></span> */}
                                    </div>
                                    <h5>Ride requested</h5>
                          </div>
               </div>
    </div>
  )
}

export default SingleBookingBody