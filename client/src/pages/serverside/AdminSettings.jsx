import DashboardSidebar from "../../components/serverside/common/DashboardSidebar"
import DashboardNotification from "../../components/serverside/common/nofitications/DashboardNotification"
import Topbar from "../../components/serverside/common/Topbar"
import SettingsBody from "../../components/serverside/settings/SettingsBody"
import "../../css/serverside/settings.css"

const AdminSettings = () => {
  return (
    <div className="admin-dashboard-wrap">
             <DashboardNotification />
             <DashboardSidebar />
             <div className="dashboard-wrapper">
                       <Topbar />
                       <SettingsBody />
             </div>
    </div>
  )
}

export default AdminSettings