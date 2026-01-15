import { IoCalendarClearOutline } from "react-icons/io5";
import StatusChangeElement from "../common/StatusChangeElement";
import { useSelector } from "react-redux";
import defaultPhoto from "../../../assets/default_photo.png"

const RecentBookings = () => {
  const { bookings } = useSelector(state => state.admin);
  
  return (
    <div className="recent-bookings">
              <div className="recent-booking-header">
                      <h3>Recent Bookings</h3>
                      <div className="filters">
                               <span><IoCalendarClearOutline /></span>
                               <select>
                                      <option value="">Month</option>
                                      <option value="January">Jan</option>
                                      <option value="February">Feb</option>
                                      <option value="March">Mar</option>
                                      <option value="April">Apr</option>
                               </select>
                      </div>
              </div>
              <div className="booking-table">
                       <div className="booking-table-header">
                                 <div className="booking-col">
                                          <h3>Ride Id</h3>
                                 </div>
                                 <div className="booking-col">
                                           <h3>Ride Type</h3>
                                 </div>
                                 <div className="booking-col">
                                          <h3>Customer</h3>
                                 </div>
                                 <div className="booking-col">
                                           <h3>Ride Cost</h3>
                                 </div>
                                 <div className="booking-col">
                                          <h3>Status</h3>
                                 </div>
                                 <div className="booking-col">
                                           <h3>Date</h3>
                                 </div>
                       </div>
                        {
                             bookings.length > 0 ?
                                   bookings.map(item => 
                                       <div className="booking-table-row" key={item._id}>
                                                <div className="booking-col">
                                                          <h4>{item.rideID}</h4>
                                                </div>
                                                <div className="booking-col">
                                                          <h4>{item.rideType}</h4>
                                                </div>
                                                <div className="booking-col">
                                                          <div className="col-profile">
                                                                  <img src={defaultPhoto} alt="" />
                                                                  <h4>{item.customer.name}</h4>
                                                          </div>
                                                </div>
                                                <div className="booking-col">
                                                          <h4>{item.rideCost.totalFare } <span className="aud">AUD $</span></h4>
                                                </div>
                                                <div className="booking-col status">
                                                        <StatusChangeElement />
                                                </div>
                                                <div className="booking-col">
                                                          <h4>12 Nov, 2025</h4>
                                                </div>
                                    </div>
                                   )
                                   :
                                   <p>No bookings yet</p>
                        }
              </div>
    </div>
  )
}

export default RecentBookings