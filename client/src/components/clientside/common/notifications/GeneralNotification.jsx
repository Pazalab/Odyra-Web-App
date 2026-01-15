import { IoCheckbox, IoCloseOutline } from "react-icons/io5";
import { AiFillCloseSquare } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { clearGeneralNotification } from "../../../../redux/slices/util/utilActionsSlice";

const GeneralNotification = () => {
    const dispatch = useDispatch();
    const { generalNotification } = useSelector(state => state.utils);

    useEffect(()=> {
          setTimeout(() => {
               dispatch(clearGeneralNotification());
          }, 7500)
    })

    const closeGeneralNotification = () => {
          dispatch(clearGeneralNotification());
    }
  return (
    <div className={ generalNotification.status ? `general-notification-bar active ${generalNotification.type}` : "general-notification-bar"}>
            <p>
                  { generalNotification.type === "success" ? <span ><IoCheckbox /></span> :
                    generalNotification.type === "error" ? <span className="error"><AiFillCloseSquare /></span> : ""}
                 { generalNotification.message}
               </p> 
            <div className="notification-close" onClick={closeGeneralNotification}>
                    <span><IoCloseOutline /></span>
            </div>
    </div>
  )
}

export default GeneralNotification