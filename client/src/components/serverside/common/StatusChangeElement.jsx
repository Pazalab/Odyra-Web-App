import { useState } from "react"

const StatusChangeElement = () => {
    const [ status, setStatus ] = useState({ active: false, value: "Requested"})
    const openStatusBar = () => {
           setStatus({ active: !status.active, value: status.value})
    }
    const handleStatusChange = (val) => {
           setStatus({ active: false, value: val})
    } 
  return (
      <div className="booking-status">
                <div className={
                        status.value === "Requested" ? "status requested" :
                        status.value === "Confirmed" ? "status confirmed" :
                        status.value === "Ongoing" ? "status ongoing" :
                        status.value === "Completed" ? "status completed" : "status"
                } onClick={openStatusBar}>
                        <h5>{status.value}</h5>
                </div>
                <div className={ status.active ? "status-options active" : "status-options"}>
                        <ul>
                                <li onClick={() => handleStatusChange("Requested")}>Requested</li>
                               <li onClick={() => handleStatusChange("Confirmed")}>Confirmed</li>
                               <li onClick={() => handleStatusChange("Ongoing")}>Ongoing</li>
                               <li onClick={() => handleStatusChange("Completed")}>Completed</li>
                        </ul>
                </div>
      </div>
  )
}

export default StatusChangeElement