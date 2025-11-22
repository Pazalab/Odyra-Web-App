import { Link, NavLink, useNavigate } from "react-router-dom"
import logo from "../../../assets/logo.png"
import { RxDashboard } from "react-icons/rx";
import { BsJournalBookmark } from "react-icons/bs";
import { AiOutlineBank } from "react-icons/ai";
import { MdOutlineAnalytics } from "react-icons/md";
import { IoSettingsOutline } from "react-icons/io5";
import { LuCircleHelp } from "react-icons/lu";
import { PiPowerBold } from "react-icons/pi";
import { useDispatch } from "react-redux";
import { useLogoutAdminMutation } from "../../../redux/slices/admin/adminApiSlice";
import { clearAdminCredentials } from "../../../redux/slices/admin/adminActionsSlice";

const DashboardSidebar = () => {
   const [ logout ] = useLogoutAdminMutation();
   const dispatch = useDispatch();
   const navigate = useNavigate();

   const handleUserLogout = async() => {
          try {
                const res = await logout().unwrap();
                dispatch(clearAdminCredentials());
                navigate("/admin/auth/login")
          } catch (error) {
                console.log(error)
          }
   }
  return (
    <div className="dashboard-sidebar">
            <div className="dashboard-logo">
                    <Link to={"/"} >
                            <img src={logo} alt="" />
                    </Link>
            </div>
            <div className="dashboard-nav">
                     <ul>
                              <li><NavLink to={"/"} className="active"><span><RxDashboard /></span> Dashboard</NavLink></li>
                              <li><NavLink to={"/"}><span><BsJournalBookmark /></span> Bookings</NavLink></li>
                              <li><NavLink to={"/"}><span><MdOutlineAnalytics  /></span> Analytics</NavLink></li>
                              <li><NavLink to={"/"}><span><AiOutlineBank /></span> Transactions</NavLink></li>
                              <li><NavLink to={"/"}><span><IoSettingsOutline /></span> Settings</NavLink></li>
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