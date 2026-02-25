import BookingsBody from "../../components/serverside/bookings/BookingsBody"
import DashboardSidebar from "../../components/serverside/common/DashboardSidebar"
import DashboardNotification from "../../components/serverside/common/nofitications/DashboardNotification"
import Topbar from "../../components/serverside/common/Topbar"
import "../../css/serverside/bookings.css"

const AdminBookings = () => {
  return (
    <div className="admin-dashboard-wrap">
              <DashboardNotification />
              <DashboardSidebar />
              <div className="dashboard-wrapper">
                       <Topbar />
                       <BookingsBody />
              </div>
    </div>
  )
}

export default AdminBookings