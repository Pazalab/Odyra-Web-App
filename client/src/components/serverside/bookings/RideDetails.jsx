import { ConvertDateToReadable } from "../../../utils/chores"
import { BsFillLuggageFill } from "react-icons/bs";
import { IoPeopleOutline } from "react-icons/io5";

const RideDetails = ({ data }) => {
  return (
    <div className="ride-details">
             <h4>Ride Details</h4>

             <div className="ride-journey">
                       <div className="ride-journey-wrap">
                                <div className="ride-pickup">
                                        <h5>Pickup</h5>
                                        <p>{data.pickup.address}</p>
                                        <p><span>Scheduled Time of Pickup:</span>{ConvertDateToReadable(data.pickup.scheduledTimeofPickup)}</p>
                                        <p><span>Customer picked at:</span> N/A</p>
                                </div>
                                <span className="separator"></span>
                                <div className="ride-dropoff">
                                        <h5>Drop off</h5>
                                        <p>{data.dropoff.address}</p>
                                        <p><span>Customer dropped off at: </span> N/A</p>
                                </div>
                       </div>
                       <div className="extra-info">
                                <div className="extra-info-block">
                                          <span><IoPeopleOutline /></span>
                                         <div className="extra-info-col">
                                                  <h5>No. of Passengers</h5>
                                                  <p>{data.passengers}</p>
                                         </div>
                                </div>
                                <div className="extra-info-block">
                                          <span><BsFillLuggageFill /></span>
                                         <div className="extra-info-col">
                                                  <h5>Luggage Count</h5>
                                                  <p>{data.luggageCount}</p>
                                         </div>
                                </div>
                       </div>
             </div>

             <div className="ride-payment">
                     <h4>Ride Payment</h4>

                     <div className="ride-payment-block">
                              <span>Ride Fare</span>
                              <h5><span className="ksh">Ksh.</span>{data.rideCost.rideFare}</h5>
                     </div>

                     { data.rideCost.waitingFee &&
                      <div className="ride-payment-block">
                              <span>Waiting Fee</span>
                              <h5><span className="ksh">Ksh.</span>{data.rideCost.waitingFee}</h5>
                     </div>
                     }
                    <div className="total-block">
                              <span className="dotted"></span>
                              <span className="dotted"></span>
                              <div className="ride-payment-block">
                                        <p>Total</p>
                                        <h5>{ data.rideCost.totalFare }</h5>
                              </div>
                    </div>
             </div>
    </div>
  )
}

export default RideDetails