import { Link, useSearchParams } from "react-router-dom"
import Navbar from "../../../components/clientside/common/navigation/Navbar"
import { useCheckRideStatusQuery } from "../../../redux/slices/client/clientApiSlice";
import DataLoader from "../../../components/clientside/common/spinners/DataLoader";
import successIcon from "../../../assets/order.png"
import Footer from "../../../components/clientside/common/Footer";
import errorIcon from "../../../assets/folder.png"
import { useSelector } from "react-redux";
const BookingSuccessful = () => {
  const [searchParams] = useSearchParams();

  const rideID = searchParams.get("rideID");
  const { data, isLoading, error } = useCheckRideStatusQuery(rideID, {
      skip: !rideID
  })
 const { profile } = useSelector(state => state.client);
  return (
    <>
            <Navbar />
            <div className="booking-confirmation-wrap">
                    <div className="inner-row">
                             <div className="booking-confirmation-content">
                                       <div className="booking-confirm-block">
                                                 { isLoading ? 
                                                        <div className="verifying-booking">
                                                                 <DataLoader size={"big"} />
                                                                 <p>Please wait while we confirm your booking....</p>
                                                        </div> :
                                                        error ? 
                                                        <div className="booking-error-block">
                                                                  <img src={errorIcon} alt="" />
                                                                  <h2>{error.data.message}</h2>
                                                                  <p>We could not fetch your booking at this time. Kindly contact our support at <span> support@odyrasafaris.com.au</span> for further assistance.</p>
                                                        </div>
                                                        :
                                                        <>
                                                               <div className="booking-success">
                                                                      <img src={successIcon} alt="" />
                                                                </div>
                                                                <h2>Booking made successfully!</h2>
                                                                { data && 
                                                                        <div className="booking-data">
                                                                                <p>Hi,{data.ride.customer}. Thank you for booking your ride with Odyra safaris, the driver will give you a call to confirm the booking.</p>
                                                                                <p>Below is a summary of your ride:</p>
                                                                                <div className="booking-data-content">
                                                                                         <div className="booking-data-item">
                                                                                                  <h3>Pickup address</h3>
                                                                                                  <p>{data && data.ride.pickupAddress}</p>
                                                                                         </div>
                                                                                         <div className="booking-data-item">
                                                                                                  <h3>Dropoff address</h3>
                                                                                                  <p>{data && data.ride.dropOff}</p>
                                                                                         </div>
                                                                                         <div className="booking-data-item">
                                                                                                  <h3>Estimated ride duration</h3>
                                                                                                  <p>{data && data.ride.duration}</p>
                                                                                         </div>
                                                                                         <div className="booking-data-item">
                                                                                                  <h3>Total ride cost</h3>
                                                                                                  <p>{data && data.ride.rideCost} <span className="aud">AUD $</span></p>
                                                                                         </div>
                                                                                         <div className="booking-data-item">
                                                                                                  <h3>Payment status</h3>
                                                                                                  <p>{data && data.ride.paymentStatus}</p>
                                                                                         </div>
                                                                                </div>

                                                                                <div className="booking-data-btns">
                                                                                        <Link to={"/new-booking"}>Book another ride</Link>
                                                                                        { profile && <Link to={"/customer/account"}>My rides</Link>}
                                                                                </div>
                                                                        </div>
                                                                }
                                                        </>
                                                  }
                                       </div>
                             </div>
                    </div>
            </div>
            <Footer />
    </>
  )
}

export default BookingSuccessful