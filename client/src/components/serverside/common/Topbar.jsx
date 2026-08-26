import { FiSearch } from "react-icons/fi";
import { IoNotificationsOutline } from "react-icons/io5";
import { IoIosArrowDown } from "react-icons/io";
import { useLogoutAdminMutation } from "../../../redux/slices/admin/adminApiSlice";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { clearAdminCredentials, clearEverything, openMobileSidebar } from "../../../redux/slices/admin/adminActionsSlice";
import { IoCloseOutline } from "react-icons/io5";
import { useCallback, useEffect, useRef, useState } from "react";
import logo from "../../../assets/logo.png"
import { CgMenuLeft } from "react-icons/cg";

const Topbar = () => {
    const [ logoutUser ] = useLogoutAdminMutation();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { adminInfo, profile } = useSelector(state => state.admin)
    const popRef = useRef();
    const [ popStatus, setPopStatus ] = useState(false);

    const handleUserLogout = async() => {
          try {
                 await logoutUser().unwrap();
                navigate("/admin/auth/login")
                dispatch(clearAdminCredentials());
                dispatch(clearEverything());
          } catch (error) {
                console.log(error)
          }
    }

    const handleOutsideClick = useCallback((e) => {
            if(popRef.current && !popRef.current.contains(e.target)){
                 setPopStatus(false);
            }else{
                  setPopStatus(true)
            }
    }, [])


    useEffect(() => {
          document.addEventListener("click", handleOutsideClick, true);

          return () => document.removeEventListener("click", handleOutsideClick, true)
    }, [handleOutsideClick])


    const handleOpenMobileSidebar = () => {
          dispatch(openMobileSidebar());
    }
     const identifier = (profile?.username  && profile?.username.trim() !== "") ? profile.username : adminInfo.id;
  return (
    <div className="dashboard-topbar">
               <div className="search-bar">
                         <span><FiSearch /></span>
                         <input type="text" placeholder="Search here"/>
               </div>
              <div className="dashboard-mobile-items">
                        <span onClick={handleOpenMobileSidebar}><CgMenuLeft /></span>
                        <div className="dashboard-tiny-logo">
                                  <Link to={`/admin/${adminInfo.id}/dashboard`} className="mobile-logo">
                                          <img src={logo} alt="" />
                                   </Link>
                        </div>
              </div>
               <div className="topbar-column">
                         <div className="notification-block">
                                  <span><IoNotificationsOutline /></span>
                         </div>
                         <div className="profile-block">
                                   <div className="profile-block-item" onClick={() => setPopStatus(true)}>
                                             <div className="profile-image">
                                                     <img src={ profile && profile.profilePicture } alt="" />
                                             </div>
                                             <h4>{ profile && profile.name.split(" ")[0]}<span><IoIosArrowDown /></span></h4>
                                   </div>
                                   <div ref={popRef} className={ popStatus ? "profile-block-pop active" : "profile-block-pop" }>
                                              <span className="close-pop" onClick={() => setPopStatus(false)}><IoCloseOutline /></span>
                                             <div className="profile-pop-image">
                                                      <img src={ profile && profile.profilePicture } alt="" />
                                             </div>
                                             <div className="profile-pop-texts">
                                                     <h3>{ profile && profile.name}</h3>
                                                     <p>{ profile && profile.email}</p>
                                             </div>
                                             <ul>
                                                     <li><Link to={`/admin/${identifier}/settings`}>Profile</Link></li>
                                                     <li><Link to={`/admin/${identifier}/settings`}>Pricing settings</Link></li>
                                                     <li><Link to={`/admin/${identifier}/settings`}>Account Security</Link></li>
                                             </ul>
                                             <button onClick={handleUserLogout}>Logout</button>
                                   </div>
                         </div>
               </div>
    </div>
  )
}

export default Topbar