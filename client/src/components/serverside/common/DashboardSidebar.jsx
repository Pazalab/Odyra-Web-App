import { Link, NavLink, useNavigate } from "react-router-dom"
import logo from "../../../assets/logo.png"
import { RxDashboard } from "react-icons/rx";
import { BsJournalBookmark } from "react-icons/bs";
import { AiOutlineBank } from "react-icons/ai";
import { MdOutlineAnalytics } from "react-icons/md";
import { IoSettingsOutline } from "react-icons/io5";
import { LuCircleHelp } from "react-icons/lu";
import { PiPowerBold } from "react-icons/pi";
import { useDispatch, useSelector } from "react-redux";
import { useLogoutAdminMutation } from "../../../redux/slices/admin/adminApiSlice";
import { clearAdminCredentials, clearEverything, closeMobileSidebar } from "../../../redux/slices/admin/adminActionsSlice";
import { FiChevronLeft } from "react-icons/fi";

const DashboardSidebar = () => {
   const [ logout ] = useLogoutAdminMutation();
   const { adminInfo, isSidebarActive, profile } = useSelector(state => state.admin);
   const dispatch = useDispatch();
   const navigate = useNavigate();

   const handleUserLogout = async() => {
          try {
                 await logout().unwrap();
                dispatch(clearAdminCredentials());
                dispatch(clearEverything());
                navigate("/admin/auth/login")
          } catch (error) {
                console.log(error)
          }
   }

   const handleCloseMobileSidebar = () => {
          dispatch(closeMobileSidebar())
   }

   const identifier = (profile?.username  && profile?.username.trim() !== "") ? profile.username : adminInfo.id;

  return (
    <div className={`${ isSidebarActive ? "dashboard-sidebar mobile-active" : "dashboard-sidebar"}`}>
            <div className="dashboard-logo">
                    <Link to={`/admin/${identifier}/dashboard`} >
                            <img src={logo} alt="" />
                    </Link>
                    <div className="mobile-close-btn" onClick={handleCloseMobileSidebar}>
                                <span ><FiChevronLeft /></span>
                    </div>
            </div>
            <div className="dashboard-nav">
                     <ul>
                              <li><NavLink to={`/admin/${identifier}/dashboard`}><span><RxDashboard /></span> Dashboard</NavLink></li>
                              <li><NavLink to={`/admin/${identifier}/bookings`}><span><BsJournalBookmark /></span> Bookings</NavLink></li>
                              <li><NavLink to={`/admin/${identifier}/analytics`}><span><MdOutlineAnalytics  /></span> Analytics</NavLink></li>
                              <li><NavLink to={`/admin/${identifier}/transactions`}><span><AiOutlineBank /></span> Transactions</NavLink></li>
                              <li><NavLink to={`/admin/${identifier}/settings`}><span><IoSettingsOutline /></span> Settings</NavLink></li>
                     </ul>

                     <div className="dashboard-bottom">
                              <p><span><LuCircleHelp /></span> Help & support</p>
                              <button onClick={handleUserLogout}><span><PiPowerBold /></span>Logout</button>
                     </div>
            </div>
    </div>
  )
}

export default DashboardSidebar