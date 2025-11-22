import DashboardSidebar from "../common/DashboardSidebar"
import Topbar from "../common/Topbar"


const AdminDashboardBody = () => {
  return (
    <div className="admin-dashboard-wrap">
             <DashboardSidebar />
             <div className="dashboard-wrapper">
                        <Topbar />
             </div>
    </div>
  )
}

export default AdminDashboardBody