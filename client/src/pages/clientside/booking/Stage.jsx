import logo from "../../../assets/logo.png"
import { Link, useLocation } from "react-router-dom"
import DataLoader from "../../../components/clientside/common/spinners/DataLoader"
import { useDispatch, useSelector } from "react-redux"
import { CgDanger } from "react-icons/cg";
import { useGetCustomerProfileQuery } from "../../../redux/slices/client/clientApiSlice";
import { useEffect, useState } from "react";
import { setCustomerProfile } from "../../../redux/slices/client/clientActionsSlice";
import { useNavigate } from "react-router-dom";

const Stage = () => {
  const { clientInfo } = useSelector(state => state.client);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [ customerMessage, setCustomerMessage ] = useState("")
  const { data, isLoading } = useGetCustomerProfileQuery({ refetchOnMountOrArgChange: true })
  const location = useLocation();
  const redirectPath = location.state?.from || "/"

  useEffect(() => {
          if(data) {
                dispatch(setCustomerProfile({...data.customer}));
                navigate(redirectPath, { replace: true})
          }else{ 
                setCustomerMessage("Could not fetch your account at the moment. Please try again later")
          }
  }, [data, dispatch, navigate, redirectPath])
  return (
    <div className="auth-wrapper">
            <div className="inner-row">
                     <div className="auth-wrapper-content">
                               <div className="auth-wrapper-block">
                                      <Link to={"/"} className="logo">
                                                <img src={logo} alt="" />
                                      </Link>
                                     { isLoading ?  <DataLoader size={"big"} /> : <span><CgDanger /></span> }
                                      <div className="">
                                                <h3>{clientInfo && clientInfo.message}</h3>
                                                { isLoading && !data ? <p>{customerMessage}</p> : <p>{`Please wait....redirecting shortly`}</p>}
                                      </div>
                               </div>
                     </div>
            </div>
    </div>
  )
}

export default Stage