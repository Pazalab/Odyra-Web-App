import { useDispatch } from "react-redux";
import { useResendPaymentLinkMutation } from "../../../redux/slices/admin/adminApiSlice"
import ActionLoader from "../common/spinners/ActionLoader";
import { setDashboardNotification } from "../../../redux/slices/util/utilActionsSlice";

const ResendPaymentLinkBtn = ({ bookingID, statusChange }) => {
    const dispatch = useDispatch();

    const [ ResendLink, { isLoading } ] = useResendPaymentLinkMutation();
    const resendPaymentLink = async() => {
        const payload = {
               bookingID: bookingID
        }

        try {
              const res = await ResendLink(payload).unwrap();
              sessionStorage.setItem("Current Booking", JSON.stringify(res.data));
              statusChange(res.data)
              dispatch(setDashboardNotification({ status: true, message: res.message, type: "success"}))
        } catch (error) {
            dispatch(setDashboardNotification({ status: true, message: error.data.message, type: "error"}))
        }

        console.log(payload)
  }
  return (
     <span onClick={resendPaymentLink}>
          { isLoading ? <ActionLoader /> : "Resend Payment Link"}
     </span> 
  )
}

export default ResendPaymentLinkBtn