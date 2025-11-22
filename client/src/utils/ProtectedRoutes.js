import { useSelector } from "react-redux"
import { Outlet, Navigate } from "react-router-dom";

const ProtectedRoutes = () => {
    const { adminInfo } = useSelector(state => state.admin);

  return (
        adminInfo && adminInfo.role === "admin" ? <Outlet /> : <Navigate to="/admin/auth/login" />
  )
}

export default ProtectedRoutes