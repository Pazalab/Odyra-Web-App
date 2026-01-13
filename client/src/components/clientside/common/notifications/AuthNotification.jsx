import { IoIosCloseCircle } from "react-icons/io";
import { GoCheckCircleFill } from "react-icons/go";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { clearAuthNotification } from "../../../../redux/slices/util/utilActionsSlice";
const AuthNotification = () => {
    const dispatch = useDispatch();
    const { authNotification } = useSelector(state => state.utils);

    useEffect(() => {
            setTimeout(() => {
                dispatch(clearAuthNotification());
            }, 7500)
    })
  return (
    <div className={ authNotification.status ? `auth-notification-bar active ${authNotification.type}` : 'auth-notification-bar'}>
              <p>
                     {authNotification.type === "success" ? <span><GoCheckCircleFill /></span> : 
                      authNotification.type === "error" ? <span><IoIosCloseCircle /></span> : ""} 
                      { authNotification.message}
                </p>
    </div>
  )
}

export default AuthNotification