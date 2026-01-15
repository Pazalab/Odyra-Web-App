import { Link, NavLink } from "react-router-dom"
import logo from "../../../../assets/logo.png"
import { CgMenuRight } from "react-icons/cg";
import { useContext, useState} from "react";
import { sidebarContext } from "./navcontext";
import { useDispatch, useSelector } from "react-redux";
import { useLogoutCustomerMutation } from "../../../../redux/slices/client/clientApiSlice";
import DataLoader from "../spinners/DataLoader";
import { clearCustomerCredentials, clearCustomerProfile, clearProfileBookings } from "../../../../redux/slices/client/clientActionsSlice";
import { setGeneralNotification } from "../../../../redux/slices/util/utilActionsSlice";

const Header = () => {
   // eslint-disable-next-line no-unused-vars
   const [ sidebarStatus, setSidebarStatus ] = useContext(sidebarContext);
   const { profile } = useSelector(state => state.client);
   const [ profileStatus, setProfileStatus ] = useState(false);
   const [ LogoutCustomer, { isLoading } ] = useLogoutCustomerMutation();
   const dispatch = useDispatch();

   const handleCustomerLogout = async() => {
        try {
              const res = await LogoutCustomer().unwrap();
              if(res){
                   dispatch(clearCustomerCredentials());
                   dispatch(clearCustomerProfile());
                   dispatch(clearProfileBookings());
              }
        } catch (error) { 
             //  console.log(error)
               dispatch(setGeneralNotification({ status: true, message: "Failed to lgout", type: "error"}))
        }
   }
  return (
    <header>
           <div className="inner-row">
                   <div className="header-content">
                             <Link to={"/"} className="logo">
                                     <img src={logo} alt="" />
                              </Link>
                              <nav>
                                       <ul>
                                              <li><NavLink to={"/"}>Home</NavLink></li>
                                              <li><NavLink to={"/about"}>About</NavLink></li>
                                              <li><NavLink to={"/services"}>Services</NavLink></li>
                                              <li><NavLink to={"/contact"}>Contact</NavLink></li>
                                       </ul>
                              </nav>
                              <div className="header-actions">
                                         <div className="action-links">
                                                    { profile ? 
                                                          <div className="action-profile"  onMouseOver={() => setProfileStatus(true)} onMouseLeave={() =>setProfileStatus(false)}>
                                                               <div className="action-profile-image">
                                                                             <img src={profile.profilePicture} alt=""  crossOrigin="anonymous" />
                                                               </div>

                                                                 <div className={ profileStatus ? "action-profile-box active" : "action-profile-box"}>
                                                                            <h3>{profile.name}</h3>
                                                                            <ul>
                                                                                    <li><Link to={"/customer/account"}>My ride</Link></li>
                                                                                    <li><Link to={"/customer/personal-information"}>Personal information</Link></li>
                                                                            </ul>
                                                                            <button onClick={handleCustomerLogout}>Logout { isLoading ? <DataLoader size={"small"}/> : "" }</button>
                                                                 </div>
                                                          </div> :
                                                          <Link to={"/auth/login"} className="login-link">Sign in</Link>
                                                     }
                                                  <Link to={"/new-booking"} className="booking-link">Book a ride</Link>
                                         </div>
                                        <span className="menu-btn" onClick={() => setSidebarStatus(true)}><CgMenuRight /></span>
                              </div>
                   </div>
           </div>
    </header>
  )
}

export default Header