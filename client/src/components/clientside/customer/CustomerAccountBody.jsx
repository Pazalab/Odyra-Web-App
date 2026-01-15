import { useState } from "react";
import { HiChevronDoubleRight } from "react-icons/hi";
import { Link, useLocation } from "react-router-dom";
import pointToPoint from "../../../assets/distance.png"
import airportTransfer from "../../../assets/airport.png"
import byTheHour from "../../../assets/hourglass.png"
import { useGetCustomerBookingsQuery } from "../../../redux/slices/client/clientApiSlice";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addBookingsToProfile } from "../../../redux/slices/client/clientActionsSlice";
import DataLoader from "../common/spinners/DataLoader";

const CustomerAccountBody = () => {
    const { pathname } = useLocation();
    const activePath = pathname.slice(10, pathname.length);
    const [ panel, setPanel ] = useState("All Rides");
    const { profile } = useSelector(state => state.client);
    const dispatch = useDispatch();
    const { data, isLoading } = useGetCustomerBookingsQuery({ refetchOnMountOrArgChange: true });

    useEffect(() => {
        if(data){
                  dispatch(addBookingsToProfile([...data.bookings]))
         }
    }, [data, dispatch])

  return (
    <div className="customer-body">
             <div className="customer-body-navigation">
                       <div className="inner-row">
                                 <div className="customer-body-header">
                                            <Link to={"/"}>Home  </Link>
                                            <span><HiChevronDoubleRight /></span>
                                            <h4>{activePath.replaceAll("-", " ")}</h4>
                                 </div>
                       </div>
             </div>
             <div className="customer-body-content">
                      <div className="inner-row">
                              <div className="customer-body-grid">
                                       <div className="customer-body-nav">
                                                <h3>Account management</h3>
                                                <ul>
                                                         <li><Link className={activePath === "account" ? "active" : ""} to={"/customer/account"}>My ride</Link></li>
                                                         <li><Link className={activePath === "personal-information"? "active" : ""} to={"/customer/personal-information"}>Personal information</Link></li>
                                                </ul>
                                       </div>
                                       <div className="customer-body-wrap">
                                                <div className="customer-body-inner">
                                                          <div className="customer-content-header">
                                                                     <ul>
                                                                            <li onClick={() => setPanel("All Rides")} className={ panel === "All Rides" ? "active" : ""}>All Rides</li>
                                                                            <li onClick={() => setPanel("Upcoming")} className={ panel === "Upcoming" ? "active" : ""}>Upcoming</li>
                                                                            <li onClick={() => setPanel("Completed")} className={ panel === "Completed" ? "active" : ""}>Completed</li>
                                                                            <li onClick={() => setPanel("Cancelled")} className={ panel === "Cancelled" ? "active" : ""}>Cancelled</li>
                                                                     </ul>
                                                          </div>

                                                          {
                                                                isLoading ?
                                                                     <div className="customer-data-loader">
                                                                                 <DataLoader size={"big"} />
                                                                     </div>
                                                                     :
                                                          <div className="customer-content-wrapper">
                                                                  { profile && profile.bookings && profile.bookings.length > 0 ? (
                                                                         profile.bookings.map(item =>  
                                                                  <div className="customer-ride-block" key={item._id}>
                                                                            <div className="ride-block-header">
                                                                                      <h4>Ride date: <span>28/11/2025 15:14:28</span></h4>
                                                                                      <h4>Ride ID: <span>{item.rideID}</span></h4>
                                                                            </div>
                                                                            <div className="ride-block-content">
                                                                                       <div className="ride-block-grid">
                                                                                                 <div className="ride-details-block flex">
                                                                                                          <div className="ride-type-icon">
                                                                                                                    { item.rideType === "Point to Point" ? <img src={pointToPoint} alt="ride type icon" /> :
                                                                                                                      item.rideType === "Airport Transfer" ? <img src={airportTransfer} alt="ride type icon" /> :
                                                                                                                      <img src={byTheHour} alt="ride type icon" />}
                                                                                                          </div>
                                                                                                          <div className="ride-details-texts">
                                                                                                                  <h3><span>Ride from</span> {item.pickup.address} <span>to</span> { item.dropoff.address }</h3>
                                                                                                                  <p>Estimated duration: {item.estimatedRideDuration}</p>
                                                                                                          </div>
                                                                                                </div>
                                                                                                <div className="ride-details-block">
                                                                                                          <h5>Qty</h5>
                                                                                                          <h4><span>x</span>1</h4>
                                                                                                </div>
                                                                                                <div className="ride-details-block">
                                                                                                          <h5>Price</h5>
                                                                                                          <h4>{item.rideCost.rideFare} <span className="aud">AUD $</span></h4>
                                                                                                </div>
                                                                                       </div>
                                                                                       {
                                                                                             item.rideCost.waitingFee &&
                                                                                                <div className="waiting-charge-arena">
                                                                                                                <h3>Waiting charge</h3>
                                                                                                                <div className="ride-details-block">
                                                                                                                        <h4>{item.rideCost.waitingFee} <span className="aud">AUD $</span></h4>
                                                                                                                </div>
                                                                                                </div>
                                                                                       }
                                                                                       <div className="total-ride-cost-block">
                                                                                                 <div></div>
                                                                                                 <div className="total-ride-block-item">
                                                                                                         <h4>Total: <span className="cost">{ item.rideCost.totalFare } </span><span className="aud">AUD $</span></h4>

                                                                                                         <Link to={"/"}>View ride</Link>
                                                                                                 </div>
                                                                                       </div>
                                                                            </div>
                                                                   </div>
                                                                         )
                                                                  ):
                                                                  "No data to show "
                                                                }
                                                          </div>
                                                          }

                                                </div>
                                       </div>
                              </div>
                      </div>
             </div>
    </div>
  )
}

export default CustomerAccountBody