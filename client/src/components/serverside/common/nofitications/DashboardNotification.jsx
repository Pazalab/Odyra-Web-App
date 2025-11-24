import { IoIosCheckmarkCircle, IoIosCloseCircle } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { clearDashboardNotification } from "../../../../redux/slices/util/utilActionsSlice";
const DashboardNotification = () => {
    const { dashNotification } = useSelector(state => state.utils);
    const dispatch = useDispatch();

    useEffect(() => {
         setTimeout(() => {
              dispatch(clearDashboardNotification());
         }, 7500)
    })
  return (
    <div className="dashboard-notification">
            <div className={ dashNotification.status ? `dashboard-bar active ${dashNotification.type}` : `dashboard-bar`}>
                      { dashNotification.type === "success" ? <span><IoIosCheckmarkCircle /></span> : <span><IoIosCloseCircle /></span>}
                     <p>{dashNotification.message}</p>
            </div>
    </div>
  )
}

export default DashboardNotification