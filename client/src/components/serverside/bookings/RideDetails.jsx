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
                                        <p><span>Customer picked up at:</span> {
                                                 data.pickup.timeOfPickup ? ConvertDateToReadable(data.pickup.timeOfPickup) : "N/A"
                                        }</p>
                                </div>
                                <span className="separator"></span>
                                <div className="ride-dropoff">
                                        <h5>Drop off</h5>
                                        <p>{data.dropoff.address}</p>
                                        <p><span>Customer dropped off at: </span> {
                                                 data.dropoff.timeOfDropoff ? ConvertDateToReadable(data.dropoff.timeOfDropoff) : "N/A"
                                        }</p>
                                </div>
                       </div>
                       <div className="ride-extras">
                               <div className="ride-extra-block package">
                                                <h5>Ride Package</h5>
                                                <p>{data.ridePackage.replace("-", " ")}</p>
                                </div>
                                 { data.stopOver.address && (
                                        <div className="ride-extra-block">
                                                 <h5>Stop Over Address</h5>
                                                 <p>{data.stopOver.address}</p>
                                        </div>
                                )}
                                { data.flightNumber && (
                                         <div className="ride-extra-block">
                                                  <h5>Flight Number</h5>
                                                  <p>{data.flightNumber}</p>
                                         </div>
                                )}
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
                              <h5>{data.rideCost.rideFare} <span className="ksh">AUD</span></h5>
                     </div>

                     { data.rideCost.waitingFee !== 0 &&
                        <div className="ride-payment-block">
                                <span>Waiting Fee</span>
                                <h5>{data.rideCost.waitingFee} <span className="ksh">AUD</span></h5>
                        </div>
                     }
                     { data.ridePackage === "odyra-platinum" && (
                             <div className="ride-payment-block">
                                     <span>Platinum Extra Cost</span>
                                     <h5>{data.rideCost.platinumExtraCost}<span className="ksh">AUD</span></h5>
                             </div>
                     )}
                    <div className="total-block">
                              <span className="dotted"></span>
                              <span className="dotted"></span>
                              <div className="ride-payment-block">
                                        <p>Total</p>
                                        <h5>{ data.rideCost.totalFare } <span className="ksh">AUD</span></h5>
                              </div>
                    </div>
             </div>
    </div>
  )
}

export default RideDetails