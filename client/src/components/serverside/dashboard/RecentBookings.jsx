import { IoCalendarClearOutline } from "react-icons/io5";
import StatusChangeElement from "../common/StatusChangeElement";
const RecentBookings = () => {
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

                       <div className="booking-table-row">
                                  <div className="booking-col">
                                            <h4>OD-12NMTI94</h4>
                                  </div>
                                  <div className="booking-col">
                                             <h4>Point to Point</h4>
                                  </div>
                                  <div className="booking-col">
                                            <div className="col-profile">
                                                     <img src="" alt="" />
                                                     <h4>Graham Bell</h4>
                                            </div>
                                  </div>
                                  <div className="booking-col">
                                             <h4>200 AU$</h4>
                                  </div>
                                  <div className="booking-col status">
                                           <StatusChangeElement />
                                  </div>
                                  <div className="booking-col">
                                            <h4>12 Nov, 2025</h4>
                                  </div>
                       </div>
              </div>
    </div>
  )
}

export default RecentBookings