import { useSelector } from "react-redux";
import { Outlet, Navigate } from "react-router-dom";

const CustomerRoutes = () => {
      const { profile } = useSelector(state => state.client);
      
      return (
             profile ? <Outlet /> : <Navigate to={"/auth/login"} />
      )
}

export default CustomerRoutes;