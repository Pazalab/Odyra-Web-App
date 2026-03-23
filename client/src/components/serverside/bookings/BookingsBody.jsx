import { useEffect, useMemo, useState } from "react"
import CustomDropSelection from "../common/utils/CustomDropSelection"
import { CiFilter } from "react-icons/ci";
import SimpleTable from "../common/utils/SimpleTable";
import { useGetAllBookingsQuery } from "../../../redux/slices/admin/adminApiSlice";
import { useDispatch, useSelector } from "react-redux";
import { setRideBookings } from "../../../redux/slices/admin/adminActionsSlice";
import defaultPhoto from "../../../assets/default_photo.png"
import { ConvertDateToReadable } from "../../../utils/chores";
import { useNavigate, useSearchParams, useLocation } from "react-router-dom"
import PaginationBlock from "../common/utils/PaginationBlock";

const BookingsBody = () => {
  const [ statusFilter, setStatusFilter ] = useState("All");
  const [ timeFilter, setTimeFilter ] = useState("All");
  const { data, isLoading } = useGetAllBookingsQuery();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [ searchParams ] = useSearchParams();
  const { pathname } = useLocation();
  const { bookings, adminInfo } = useSelector(state => state.admin)

  useEffect(() => {
          if(data) dispatch(setRideBookings([...data.bookings]))
  }, [data, dispatch])

  const headerTitles = ["Ride Id", "Ride Type", "Customer", "Ride Cost", "Status", "Date"];

  const page = Number(searchParams.get("page")) || 1;
  const limit = Number(searchParams.get("limit")) || 10;

  const moveToTheClickedPage = (newPage, newLimit) => {
          const params = new URLSearchParams(searchParams);
          params.set("page", newPage.toString());
          params.set("limit", newLimit.toString());
          navigate(`${pathname}?${params.toString()}`)
  }

  const paginatedData = useMemo(() => {
          const startIndex = (page - 1) * limit;
          const endIndex = startIndex + limit;

          return bookings.slice(startIndex, endIndex)
  }, [page, limit, bookings])

  const handleRowRedirect = (booking) => {
         navigate(`/admin/${adminInfo.id}/booking/${booking.rideID}`)
         sessionStorage.setItem("Current Booking", JSON.stringify(booking))
  }
  return (
    <div className='admin-bookings-body'>
               <div className="admin-bookings-title">
                       <h2>All Odyra Bookings</h2>
                       <p>View and manage all your ride requests in one place. Track trip details, driver information, and ride status with ease.</p>
               </div>
        
               <div className="table-filters">
                       <span className="filter-icon"><CiFilter /></span>
                        <CustomDropSelection
                                  selected={statusFilter}
                                  title={"Status"}
                                  onSelection={setStatusFilter}
                                  options={["All", "Requested", "Confirmed", "Paid", "Ongoing", "Completed"]}
                        />
                      <CustomDropSelection
                              selected={timeFilter}
                              title={"Timeframe"}
                              onSelection={setTimeFilter}
                              options={["All", "Today", "This month", "This year"]}
                        />
               </div>

               <div className="table-container">
                        <div className="table-container-wrap">
                                     <SimpleTable 
                                                headerTitles={headerTitles}
                                                isFetchingData={isLoading}
                                                gridClass="bookingTable"
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
  )
}

export default BookingsBody