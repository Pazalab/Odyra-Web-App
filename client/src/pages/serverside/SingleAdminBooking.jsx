import SingleBookingBody from "../../components/serverside/bookings/SingleBookingBody"
import DashboardSidebar from "../../components/serverside/common/DashboardSidebar"
import DashboardNotification from "../../components/serverside/common/nofitications/DashboardNotification"
import Topbar from "../../components/serverside/common/Topbar"

const SingleAdminBooking = () => {
  return (
    <div className="admin-dashboard-wrap">
                 <DashboardNotification />
                 <DashboardSidebar />
                 <div className="dashboard-wrapper">
                             <Topbar />
                             <SingleBookingBody />
                 </div>
    </div>
  )
}

export default SingleAdminBooking