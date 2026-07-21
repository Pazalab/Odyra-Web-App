import { useEffect } from "react"
import BookingBody from "../../components/clientside/booking/BookingBody"
import Navbar from "../../components/clientside/common/navigation/Navbar"
import "../../css/clientside/booking.css"
import { useGetPlatformSettingsForClientQuery } from "../../redux/slices/client/clientApiSlice"
import { useDispatch } from "react-redux"
import { setGeneralSettings } from "../../redux/slices/client/clientActionsSlice"

const NewBooking = () => {
  const { data } = useGetPlatformSettingsForClientQuery()
  const dispatch = useDispatch();
  
  useEffect(() => {
        if(data){
             dispatch(setGeneralSettings(data.settings))
        }
  }, [data, dispatch])
  return (
    <>
          <Navbar />
          <BookingBody />
    </>
  )
}

export default NewBooking