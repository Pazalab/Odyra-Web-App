import { LiaCarSideSolid, LiaHourglassHalfSolid } from "react-icons/lia";
import { BsAirplaneEngines } from "react-icons/bs";
import { useState } from "react";
import RideBooking from "./RideBooking";
import AirportTransfer from "./AirportTransfer";
import BytheHour from "./BytheHour";

const BookingBody = () => {
    const [ optionActive, setOptionActive ] = useState(0)
  return (
    <div className="booking-wrapper">
              <div className="inner-row">
                        <div className="booking-body-content">
                                   <div className="booking-options">
                                            <ul>
                                                    <li onClick={() => setOptionActive(0)} className={optionActive === 0 ? "active" : ""}><span><LiaCarSideSolid /></span>Book a ride</li>
                                                    <li onClick={() => setOptionActive(1)} className={optionActive === 1 ? "active" : ""}><span><BsAirplaneEngines /></span>Airport transfer</li>
                                                    <li onClick={() => setOptionActive(2)} className={optionActive === 2 ? "active" : ""}><span><LiaHourglassHalfSolid /></span>By the hour</li>
                                            </ul>
                                   </div>

                                   <div className="booking-body-containers">
                                             { optionActive === 0 && <RideBooking />}
                                             { optionActive === 1 && <AirportTransfer />}
                                             { optionActive === 2 && <BytheHour /> }
                                   </div>
                        </div>
              </div>
    </div>
  )
}

export default BookingBody