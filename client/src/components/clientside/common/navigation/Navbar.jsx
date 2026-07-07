import { useState } from "react"
// eslint-disable-next-line no-unused-vars
import { sidebarContext } from "./navcontext"
import Header from "./Header";
import Sidebar from "./Sidebar";
import GeneralNotification from "../notifications/GeneralNotification";
import { useLocation } from "react-router-dom";
import Header2 from "./Header2";
const Navbar = () => {
    const [ sidebarStatus, setSidebarStatus ] = useState(false);
    const { pathname } = useLocation();
    
  return (
    <sidebarContext.Provider value={[sidebarStatus, setSidebarStatus]}>
            <GeneralNotification />
            { pathname === "/" ? (
                  <>
                       <Header2 />
                       <Sidebar />
                  </>
            ): (
                 <>
                      <Header />
                      <Sidebar />
                 </>
            )}
    </sidebarContext.Provider>
  )
}

export default Navbar