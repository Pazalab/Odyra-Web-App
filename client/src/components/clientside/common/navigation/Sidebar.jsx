import { Link, NavLink } from "react-router-dom"
import logo from "../../../../assets/logo.png"
import { CgClose } from "react-icons/cg"
import { useContext, useEffect, useRef } from "react"
import { sidebarContext } from "./navcontext"
import gsap from "gsap"
const Sidebar = () => {
    const [ sidebarStatus, setSidebarStatus ] = useContext(sidebarContext);
    const sidebarRef = useRef();

    useEffect(() => {
           if(sidebarStatus) {
                   sidebarRef.current.classList.add("active");
                   const tl = gsap.timeline();

                   tl.to(sidebarRef.current.querySelector(".sidebar-overlay"), {
                         x: 0,
                         duration: 0.5,
                   })

                   tl.to(sidebarRef.current.querySelector(".sidebar-content"), {
                         y: 0,
                         duration: 0.5
                   })
           }
    }, [sidebarStatus])

    const handleSidebarClose = () => {
          const tl = gsap.timeline();

        tl.to(sidebarRef.current.querySelector(".sidebar-content"), {
              y: "-105%",
              duration: 0.5
        })

        tl.to(sidebarRef.current.querySelector(".sidebar-overlay"), {
              x: "-105%",
             duration: 0.5,
        })

        setTimeout(() => {
               sidebarRef.current.classList.remove("active");
               setSidebarStatus(false);
        }, 1200)
    }
  return (
    <div ref={sidebarRef} className="sidebar-section">
            <div className="sidebar-overlay"></div>
            <div className="sidebar-content">
                       <div className="sidebar-header">
                                <Link to={"/"} className="logo">
                                        <img src={logo} alt="" />
                                </Link>
                                <span onClick={handleSidebarClose}><CgClose /></span>
                       </div>
                       <div className="sidebar-nav">
                                <ul>
                                        <li><NavLink to={"/"}>Home</NavLink></li>
                                        <li><NavLink to={"/about"}>About</NavLink></li>
                                        <li><NavLink to={"/services"}>Services</NavLink></li>
                                        <li><NavLink to={"/contact"}>Contact</NavLink></li>
                                </ul>

                                <div className="sidebar-extra">
                                          <div className="action-links">
                                                 <Link to={"/"} className="login-link">Sign in</Link>
                                                  <Link to={"/"} className="booking-link">Book a ride</Link>
                                         </div>
                                </div>
                       </div>
            </div>
    </div>
  )
}

export default Sidebar