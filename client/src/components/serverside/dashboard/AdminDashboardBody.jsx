import DashboardNotification from "../common/nofitications/DashboardNotification"
import DashboardSidebar from "../common/DashboardSidebar"
import Topbar from "../common/Topbar"
import AdminSummary from "./AdminSummary"
import RecentBookings from "./RecentBookings"
import {  useGetAllBookingsQuery } from "../../../redux/slices/admin/adminApiSlice"
import { useEffect } from "react"
import { useDispatch } from "react-redux"
import { setRideBookings } from "../../../redux/slices/admin/adminActionsSlice"

const AdminDashboardBody = () => {
  const { data } = useGetAllBookingsQuery();
  const dispatch = useDispatch();
  
  useEffect(() => {
         if(data){
             dispatch(setRideBookings([...data.bookings]))
         }
  }, [data, dispatch])
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