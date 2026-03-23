import { useRef, useState } from "react"
import { useClickOutside } from "../../../hooks/outsideClickHook";
import { LuCheck } from "react-icons/lu";
import ActionLoader from "../common/spinners/ActionLoader";
import { useUpdateBookingStatusMutation } from "../../../redux/slices/admin/adminApiSlice";
import { useDispatch } from "react-redux";
import { setDashboardNotification } from "../../../redux/slices/util/utilActionsSlice";

const StatusUpdate = ({ currentStatus, booking_id, statusChange }) => {
  const [ isOpen, setIsOpen ] = useState(false);
  const [ selectedStatus, setSelectedStatus ] = useState(currentStatus);
  const optionsRef = useRef();
  const statusOptions = ['Ride Requested',"Awaiting Confirmation", "Payment Made", "Customer Picked", "Ride Completed"];
  const [ updateStatus , { isLoading }] = useUpdateBookingStatusMutation();
  const dispatch = useDispatch();

  useClickOutside(optionsRef, () => {
          setIsOpen(false)
  })
  const handleSelection = async(val) => {
        setSelectedStatus(val);
        setIsOpen(false);

        const payload = {
               bookingID: booking_id,
               updateText: val
        }

        try {
                const res = await updateStatus(payload).unwrap();
                sessionStorage.setItem("Current Booking", JSON.stringify(res.data));
                statusChange(res.data)
                dispatch(setDashboardNotification({ status: true, message: res.message, type: "success"}))
        } catch (error) {
                dispatch(setDashboardNotification({ status: true, message: error.data.message, type: "error"}))
        }

  }
  return (
    <div className="status-update">
              <div className="status-current" onClick={() => setIsOpen(!isOpen)}>
                       <span>{selectedStatus}</span>
                       <div className="status-current-action">
                              { isLoading ? <ActionLoader /> : <span className="icon"><LuCheck /></span> }
                       </div>
              </div>
              <div ref={optionsRef} className={ isOpen ? "update-options active" : "update-options"}>
                      <ul>
                               { statusOptions.map(item => <li onClick={() => handleSelection(item)} key={item} className={item === selectedStatus ? "active" : ""}>{item}</li>)}
                      </ul>
              </div>
    </div>
  )
}

export default StatusUpdate