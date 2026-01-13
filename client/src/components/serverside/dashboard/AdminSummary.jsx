import { PiPhoneCall } from "react-icons/pi";
import { PiClipboardTextLight } from "react-icons/pi";
import { HiOutlineStatusOnline } from "react-icons/hi";
import { RiMore2Fill } from "react-icons/ri";
import { GoArrowUp, GoArrowDown } from "react-icons/go";
import { LuChevronRight } from "react-icons/lu";
import { useSelector } from "react-redux";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import { activity_data } from "../../../data/dummy_data";

const AdminSummary = () => {
 const { adminInfo } =  useSelector(state => state.admin);
 
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
                                  <div className="admin-money-row-block">
                                            <div className="money-block-head">
                                                        <h3>Total Profit</h3>
                                                        <span>+18%</span>
                                            </div>
                                            <div className="money-block-column">
                                                      <h2>$8724.00</h2>
                                                      <p>From last year</p>
                                            </div>
                                  </div>
                                  <div className="admin-money-row-block">
                                            <div className="money-block-head">
                                                        <h3>Total Expenses</h3>
                                                        <span>+40%</span>
                                            </div>
                                            <div className="money-block-column">
                                                      <h2>$324.00</h2>
                                                      <p>From last year</p>
                                            </div>
                                  </div>
                        </div>
              </div>
              <div className="admin-extra-info">
                        <div className="admin-driver-block">
                                  <div className="driver-block-head">
                                           <h3>Active Driver</h3>
                                           <span><LuChevronRight /></span>
                                  </div>
                                  <div className="drivers-block-list">
                                            <div className="driver-block-moja">
                                                     <div className="driver-block-col">
                                                                <img src={adminInfo && adminInfo.image} className="box-profile" alt="" />
                                                                <div className="driver-block-col-texts">
                                                                         <h4>Albert Okundi</h4>
                                                                         <p>+254 7123 45678</p>
                                                                </div>
                                                     </div>
                                                     <div className="driver-block-col-extra">
                                                               <h5>Orders: 5</h5>
                                                               <span className="line"></span>
                                                               <h5>Income: $7600</h5>
                                                     </div>
                                            </div>
                                  </div>

                                  <div className="driver-map-wrapper">
                                            <div className="driver-map-title">
                                                    <h3>Weekly driver activity</h3>
                                            </div>
                                            <div className="driver-activity-map">
                                                     <SimpleBarChart />
                                            </div>
                                  </div>
                        </div>
              </div>
    </div>
  )
}

export default AdminSummary


const SimpleBarChart = () => {
  return (
    <BarChart
      style={{ width: '100%', maxWidth: '700px', maxHeight: '100vh', aspectRatio: 1.618 }}
      responsive
      data={activity_data}
      margin={{
        top: 5,
        right: 0,
        left: 0,
        bottom: 0,
      }}
    >
          <XAxis dataKey="name" stroke="#e0dfdf" tickLine={false} tick={{fill: '#585858ff', fontSize: "12px", }} />
          <YAxis width="auto" stroke="#e0dfdf" tickLine={false} tick={{fill: '#585858ff', fontSize: "12px", }} />
          <Tooltip  cursor={{ fill: 'transparent' }}/>
          <Legend  iconSize={10} wrapperStyle={{ borderRadius: "5px"}}/>
          <Bar dataKey="Rides" fill="rgb(129, 48, 32)"  radius={[6, 6, 0, 0]} />
    </BarChart>
  );
};