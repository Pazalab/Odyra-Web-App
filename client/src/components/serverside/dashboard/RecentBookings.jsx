import { IoCalendarClearOutline } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import defaultPhoto from "../../../assets/default_photo.png"
import { ConvertDateToReadable } from "../../../utils/chores";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import { useMemo, useEffect } from "react";
import { useGetAllBookingsQuery } from "../../../redux/slices/admin/adminApiSlice";
import { setRideBookings } from "../../../redux/slices/admin/adminActionsSlice";
import SimpleTable from "../common/utils/SimpleTable";
import PaginationBlock from "../common/utils/PaginationBlock";

const RecentBookings = () => {
  const { bookings } = useSelector(state => state.admin);
  const { adminInfo } = useSelector(state => state.admin);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { data, isLoading } = useGetAllBookingsQuery();
  const [ searchParams ] = useSearchParams();
  const { pathname } = useLocation();
  const sanitizedBookings = [...bookings].reverse();

    useEffect(() => {
            if(data) dispatch(setRideBookings([...data.bookings]))
    }, [data, dispatch])

 const headerTitles = ["Ride Id", "Ride Type", "Customer", "Ride Cost", "Status", "Date"];
const page = Number(searchParams.get("page")) || 1;
const limit = Number(searchParams.get("limit")) || 5;

const moveToTheClickedPage = (newPage, newLimit) => {
        const params = new URLSearchParams(searchParams);
        params.set("page", newPage.toString());
        params.set("limit", newLimit.toString());
        navigate(`${pathname}?${params.toString()}`)
}

const paginatedData = useMemo(() => {
        const startIndex = (page - 1) * limit;
        const endIndex = startIndex + limit;

        return sanitizedBookings.slice(startIndex, endIndex)
}, [page, limit, sanitizedBookings])

const handleRowRedirect = (booking) => {
        navigate(`/admin/${adminInfo.id}/booking/${booking.rideID}`)
        sessionStorage.setItem("Current Booking", JSON.stringify(booking))
}
  return (
          <div className="recent-bookings-table">
                  <div className="recent-bookings">
                        <div className="recent-booking-header">
                                <h3>Recent Bookings</h3>
                                <div className="filters">
                                        <span><IoCalendarClearOutline /></span>
                                        <select>
                                                <option value="">Month</option>
                                                <option value="January">Jan</option>
                                                <option value="February">Feb</option>
                                                <option value="March">Mar</option>
                                                <option value="April">Apr</option>
                                        </select>
                                </div>
                        </div>
                        <div className="table-container">
                                        <div className="table-container-wrap">
                                                <SimpleTable 
                                                                headerTitles={headerTitles}
                                                                gridClass="bookingTable"
                                                                isFetching={isLoading}
                                                                rowData={paginatedData}
                                                                redirectHandler={handleRowRedirect}
                                                                renderRow={(booking) => (
                                                                        <>
                                                                                <div className="booking-col">
                                                                                        <h4>{booking.rideID}</h4>
                                                                                </div>
                                                                                <div className="booking-col">
                                                                                        <h4>{booking.rideType}</h4>
                                                                                </div>
                                                                                <div className="booking-col">
                                                                                        <div className="col-profile">
                                                                                                <img src={defaultPhoto} alt="" />
                                                                                                <h4>{booking.customer.name}</h4>
                                                                                        </div>
                                                                                </div>
                                                                                <div className="booking-col">
                                                                                        <h4>{Math.round(booking.rideCost.totalFare) } <span className="aud">AUD $</span></h4>
                                                                                </div>
                                                                                <div className="booking-col status">
                                                                                        <div className={
                                                                                                booking.rideStatus === "Ride Requested" ? "status requested" :
                                                                                                booking.rideStatus === "Awaiting Confirmation" ? "status confirm" :
                                                                                                booking.rideStatus === "Payment Made" ? "status paid" :
                                                                                                booking.rideStatus === "Customer Picked" ? "status picked" :
                                                                                                booking.rideStatus === "Ride Completed" ? "status completed" : "status"
                                                                                        }>
                                                                                        <h5>{booking.rideStatus}</h5>
                                                                                </div>
                                                                                </div>
                                                                                <div className="booking-col date">
                                                                                        <h4>{ ConvertDateToReadable(booking.createdAt)}</h4>
                                                                                </div>
                                                                        </>
                                                                )}
                                                                />

                                                                <PaginationBlock
                                                                        totalResults={bookings.length}
                                                                        currentPage={page}
                                                                        pageSize={limit}
                                                                        onPageChange={(page) => moveToTheClickedPage(page, limit)}
                                                                        onPageSizeChange={(size) => moveToTheClickedPage(1, size)}
                                                                        pageSizeOptions={[5, 10, 20, 50]}
                                                                />
                                        </div>
                        </div>
                </div>
          </div>
  )
}

export default RecentBookings