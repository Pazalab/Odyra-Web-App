import { Link, NavLink } from "react-router-dom"
import logo from "../../../../assets/logo.png"
const Header = () => {
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
                                        <Link to={"/"}>Sign in</Link>
                                        <Link to={"/"}>Book a ride</Link>
                              </div>
                   </div>
           </div>
    </header>
  )
}

export default Header