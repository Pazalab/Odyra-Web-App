import { Link, NavLink } from "react-router-dom"
import logo from "../../../../assets/logo.png"
import { CgMenuRight } from "react-icons/cg";
import { useContext} from "react";
import { sidebarContext } from "./navcontext";

const Header = () => {
   // eslint-disable-next-line no-unused-vars
   const [ sidebarStatus, setSidebarStatus ] = useContext(sidebarContext);
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
                                                 <Link to={"/auth/login"}>Sign in</Link>
                                                  <Link to={"/new-booking"}>Book a ride</Link>
                                         </div>
                                        <span className="menu-btn" onClick={() => setSidebarStatus(true)}><CgMenuRight /></span>
                              </div>
                   </div>
           </div>
    </header>
  )
}

export default Header