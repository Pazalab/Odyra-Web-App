import { PiPhoneCall } from "react-icons/pi";
import { PiClipboardTextLight } from "react-icons/pi";
import { HiOutlineStatusOnline } from "react-icons/hi";
import { RiMore2Fill } from "react-icons/ri";
import { GoArrowUp, GoArrowDown } from "react-icons/go";

const AdminSummary = () => {

  return (
    <div className="admin-summary">
              <div className="admin-summary-numbers">
                        <div className="summary-block-grid">
                                  <div className="summary-block-moja">
                                           <p><span><HiOutlineStatusOnline /></span>Active</p>
                                           <h2>1</h2>
                                  </div>
                                  <div className="summary-block-moja">
                                           <p><span><PiClipboardTextLight /></span>On order</p>
                                           <h2>30</h2>
                                  </div>
                                  <div className="summary-block-moja">
                                            <p><span><PiPhoneCall /></span>Awaiting</p>
                                            <h2>12</h2>
                                  </div>
                        </div>
                        <div className="bookings-wrap">
                                  <div className="wrap-title">
                                           <h3>Bookings</h3>
                                           <span><RiMore2Fill /></span>
                                  </div>
                                  <div className="wrap-bookings-content">
                                             <div className="wrap-block-item">
                                                       <div className="wrap-block-head">
                                                                 <div className="wrap-block-column">
                                                                        <p>Total bookings</p>
                                                                        <div className="percent">
                                                                                     <span>40%</span>
                                                                                   <span className="icon"><GoArrowUp /></span>
                                                                        </div>
                                                                 </div>
                                                                 <h5>2305</h5>
                                                       </div>
                                                       <div className="wrap-block-range">
                                                             <span className="total"></span>
                                                       </div>
                                             </div>
                                             <div className="wrap-block-item">
                                                       <div className="wrap-block-head">
                                                                 <div className="wrap-block-column">
                                                                        <p>Cancelled bookings</p>
                                                                        <div className="percent cancel">
                                                                                     <span>10%</span>
                                                                                   <span className="icon"><GoArrowDown /></span>
                                                                        </div>
                                                                 </div>
                                                                 <h5>158</h5>
                                                       </div>
                                                       <div className="wrap-block-range">
                                                             <span className="cancel"></span>
                                                       </div>
                                             </div>
                                             <div className="wrap-block-item">
                                                       <div className="wrap-block-head">
                                                                 <div className="wrap-block-column">
                                                                        <p>Happy customers</p>
                                                                        <div className="percent customer">
                                                                                     <span>60%</span>
                                                                                   <span className="icon"><GoArrowUp /></span>
                                                                        </div>
                                                                 </div>
                                                                 <h5>4805</h5>
                                                       </div>
                                                       <div className="wrap-block-range">
                                                             <span className="customer"></span>
                                                       </div>
                                             </div>
                                  </div>
                        </div>
              </div>
              <div className="admin-money-numbers">
                        <div className="admin-money-row">
                                  <div className="admin-money-row-block">
                                            <div className="money-block-head">
                                                        <h3>Total Earnings</h3>
                                                        <span>+40%</span>
                                            </div>
                                            <div className="money-block-column">
                                                      <h2>$324.00</h2>
                                                      <p>From last year</p>
                                            </div>
                                  </div>
                        </div>
              </div>
              <div className="admin-extra-info"></div>
    </div>
  )
}

export default AdminSummary