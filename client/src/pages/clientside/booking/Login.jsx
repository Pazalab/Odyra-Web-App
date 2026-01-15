import { Link, useLocation, useNavigate } from "react-router-dom"
import logo from "../../../assets/logo.png"
import { BsEnvelopeAt } from "react-icons/bs";
import { SlLock } from "react-icons/sl";
import { LiaEye, LiaEyeSlash } from "react-icons/lia";
import { useState } from "react";
import "../../../css/clientside/auth.css"
import Footer from "../../../components/clientside/common/Footer";
import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import { useLoginCustomerMutation } from "../../../redux/slices/client/clientApiSlice";
import { setCustomerCredentials } from "../../../redux/slices/client/clientActionsSlice";
import { setAuthNotification } from "../../../redux/slices/util/utilActionsSlice";
import AuthNotification from "../../../components/clientside/common/notifications/AuthNotification";
import BtnSpinner from "../../../components/clientside/common/BtnSpinner";

const Login = () => {
    const [ passwordStatus, setPasswordStatus ] = useState(false);
     const { register, handleSubmit, formState: { errors}} = useForm();
     const dispatch = useDispatch();
     const navigate = useNavigate();
     const location = useLocation();
     
     const path = location.state?.from || "/";

     const [ InitiateLogin, { isLoading }] = useLoginCustomerMutation();
     const LoginClientUser = async(data) => {
           try {
                const res = await InitiateLogin(data).unwrap();
                dispatch(setCustomerCredentials({...res}))
                navigate("/auth/stage", {
                       state: { from: path}
                })
           } catch (error) {
                dispatch(setAuthNotification({ status: true, message: error.data.message, type: "error"}))
           }
     }
  return (
         <>
             <div className="auth-wrapper">
                  <div className="inner-row">
                            <div className="auth-header">
                                      <Link to={"/"} className="logo">
                                                <img src={logo} alt="" />
                                      </Link>
                                      <div className="header-actions">
                                                <div className="auth-action-link">
                                                          <Link to={"/new-booking"}>Book a ride</Link>
                                                </div>
                                      </div>
                            </div>

                            <div className="auth-wrap-body">
                                        <div className="auth-form-body">
                                                    <div className="auth-form-intro">
                                                              <h2>Welcome Back</h2>
                                                              <p>Enter your details to access your account and book rides conveniently.</p>
                                                    </div>
                                                    <AuthNotification />
                                                    <form onSubmit={handleSubmit(LoginClientUser)} >
                                                              <div className="auth-form-row">
                                                                        <div className="auth-form-inner">
                                                                             <span><BsEnvelopeAt /></span>
                                                                             <input {...register("email", { required: "Email input is required"})} type="email" placeholder="Enter your email" />
                                                                       </div>
                                                                       { errors.email && <span className="error">{errors.email.message}</span>}
                                                              </div>
                                                              <div className="auth-form-row">
                                                                        <div className="auth-password-input">
                                                                                <div className="input-left">
                                                                                          <span><SlLock /></span>
                                                                                          <input {...register("password", { required: "Password input is required"})}  type={ passwordStatus ? "text" : "password"} placeholder="Password"/>
                                                                                </div>
                                                                                <div className="password-toggle" onClick={() => setPasswordStatus(!passwordStatus)}>
                                                                                          { passwordStatus ? <span><LiaEyeSlash /></span> : <span><LiaEye /></span>}
                                                                                </div>
                                                                      </div>
                                                                      { errors.password && <span className="error">{errors.password.message}</span>}
                                                              </div>
                                                              <div className="auth-form-forgot">
                                                                        <p>Forgot your password?</p>
                                                              </div>
                                                              <div className="auth-form-btn">
                                                                      <button type="submit">{ isLoading ? <BtnSpinner /> : "Sign in" }</button>
                                                              </div>
                                                    </form>

                                                    <div className="form-extras">
                                                              <Link to={"/auth/signup"}>Don't have an account yet? <span>Sign up</span></Link>
                                                    </div>
                                        </div>
                            </div>
                  </div>
          </div>
          <Footer />
         </>
  )
}

export default Login