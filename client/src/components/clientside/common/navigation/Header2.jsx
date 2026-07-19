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


const Header2 = () => {
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
                dispatch(setGeneralNotification({ status: true, message: error.data.message, type: "error"}))
        }
    }
  return (
    <div className="header-v2">
             <div className="inner-row">
                       <div className="header-v2-content">
                                 <div className="header-extra">
                                          <span> ABN 41 145 418 931</span>
                                           <span>|</span>
                                           <span>ODBS 1011773</span>
                                           <span>|</span>
                                          <Link to={"/auth/signup"}>Create an Account</Link>
                                 </div>
                                <div className="header-content-block">
                                          <Link to={"/"} className="logo">
                                                <img src={logo} alt="" />
                                          </Link>
                                            <nav>
                                                        <ul>
                                                            <li><NavLink to={"/"}>Home</NavLink></li>
                                                            <li><NavLink to={"/about"}>About</NavLink></li>
                                                            <li><NavLink to={"/services"}>Services</NavLink></li>
                                                            <li><NavLink to={"/contact"}>Contact</NavLink></li>
                                                             <li><Link to={"https://odyrasafaris.com.au"} target="_blank" >Safaris</Link></li>
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
             </div>
    </div>
  )
}

export default Header2