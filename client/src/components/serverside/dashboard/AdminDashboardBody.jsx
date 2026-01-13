import DashboardNotification from "../common/nofitications/DashboardNotification"
import DashboardSidebar from "../common/DashboardSidebar"
import Topbar from "../common/Topbar"
import AdminSummary from "./AdminSummary"
import RecentBookings from "./RecentBookings"


const AdminDashboardBody = () => {
  return (
    <div className="admin-dashboard-wrap">
              <DashboardNotification />
             <DashboardSidebar />
             <div className="dashboard-wrapper">
                        <Topbar />
                        <AdminSummary />
                        <RecentBookings />
             </div>
    </div>
  )
}

export default AdminDashboardBody