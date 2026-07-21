import { useState } from "react"
import { IoIosArrowDown } from "react-icons/io";
import ProfileSettingsTab from "./tabs/ProfileSettingsTab";
import PricingSettingsTab from "./tabs/PricingSettingsTab";
import { useGetPlatformSettingsQuery } from "../../../redux/slices/admin/adminApiSlice";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setAdminPlatformSettings } from "../../../redux/slices/admin/adminActionsSlice";
import {useLocation} from 'react-router-dom'

const settingTabs = [
    { id: 0, name: "Profile"},
    { id: 1, name: "Pricing"},
    // { id: 2, name: "Integrations"},
    { id: 3, name: "Notifications"},
    { id: 4, name: "Account Security"}
]
const SettingsBody = () => {
  const [ tab, setTab ] = useState("Profile");
  const [ tabDropdown, setTabDropdown ] = useState(false);
  const { data } = useGetPlatformSettingsQuery()
  const dispatch = useDispatch();
  const location = useLocation();

  const handleTabDropdown = (val) => {
         setTab(val);
         setTabDropdown(false);
  }

  useEffect(() => {
       if(data){
           dispatch(setAdminPlatformSettings({...data.settings}))
       }
  }, [data, dispatch, location])
  return (
    <div className="dashboard-settings">
              <div className="dash-settings-wrapper">
                       <div className="dash-settings-intro">
                                 <h2>Settings</h2>
                                 <p>Manage your account settings and preferences</p>
                       </div>

                       <div className="dash-settings-tabs">
                                <ul className="tabs">
                                       { settingTabs.map(item => <li key={item.id} className={ tab === item.name ? "active" : ""} onClick={() => setTab(item.name)}>{item.name}</li>)}
                                </ul>
                                <div className="dash-mobile-tabs">
                                         <div className="active-tab" onClick={() => setTabDropdown(true)}>
                                                  { tab}
                                                  <span><IoIosArrowDown /></span>
                                         </div>
                                          <div className={ tabDropdown ? "dash-mobile-dropdown active" : "dash-mobile-dropdown"}>
                                                   <ul>
                                                        { settingTabs.map(item => <li key={item.id} onClick={() => handleTabDropdown(item.name)}>{item.name}</li>)}
                                                  </ul>
                                          </div>
                                </div>
                       </div>

                       <div className="dash-settings-wrapper">
                               { tab === "Profile" && <ProfileSettingsTab />}
                               { tab === "Pricing" && <PricingSettingsTab />}
                       </div>
              </div>
    </div>
  )
}

export default SettingsBody