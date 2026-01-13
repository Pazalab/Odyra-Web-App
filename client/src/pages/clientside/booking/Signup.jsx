import { Link, useNavigate } from "react-router-dom"
import logo from "../../../assets/logo.png"
import { useForm } from "react-hook-form"
import { HiOutlineUser } from "react-icons/hi2";
import { BsEnvelopeAt } from "react-icons/bs";
import { SlLock } from "react-icons/sl";
import { LiaEye, LiaEyeSlash } from "react-icons/lia";
import { useState } from "react";
import { PiPhoneCallLight } from "react-icons/pi";
import Footer from "../../../components/clientside/common/Footer";
import { useCreateNewAccountMutation } from "../../../redux/slices/client/clientApiSlice";
import AuthNotification from "../../../components/clientside/common/notifications/AuthNotification";
import { useDispatch } from "react-redux";
import BtnSpinner from "../../../components/clientside/common/BtnSpinner";
import { setAuthNotification } from "../../../redux/slices/util/utilActionsSlice";
import { setCustomerCredentials } from "../../../redux/slices/client/clientActionsSlice";
const Signup = () => {
    const [ passwordStatus, setPasswordStatus ] = useState(false);
    const [ confirmPasswordStatus, setConfirmPasswordStatus ] = useState(false);
    const { register, handleSubmit, formState: { errors}, watch} = useForm();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const password = watch("password");

    const [ InitiateRegistration, { isLoading }] = useCreateNewAccountMutation();
    const RegisterCustomer = async(data) => {
         try {
              const res = await InitiateRegistration(data).unwrap();
               dispatch(setCustomerCredentials({...res}))
               navigate("/auth/stage")
         } catch (error) {
              //console.log(error)
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
                                                            <h2>Create your Account</h2>
                                                           <p>Enter your details to create your account and start booking rides conveniently.</p>
                                                </div>
                                                <AuthNotification />
                                                <form onSubmit={handleSubmit(RegisterCustomer)}>
                                                          <div className="auth-form-row">
                                                                    <div className="auth-form-inner">
                                                                              <span><HiOutlineUser /></span>
                                                                              <input {...register("name", { required: "Name input is required"})} type="text" placeholder="Enter your full name" />
                                                                    </div>
                                                                    { errors.name && <span className="error">{errors.name.message}</span>}
                                                          </div>
                                                          <div className="auth-form-row">
                                                                        <div className="auth-form-inner">
                                                                             <span><BsEnvelopeAt /></span>
                                                                             <input {...register("email", { required: "Email input is required"})} type="email" placeholder="Enter your email" />
                                                                       </div>
                                                                       { errors.email && <span className="error">{errors.email.message}</span>}
                                                            </div>
                                                        <div className="auth-form-row">
                                                                <div className="auth-form-inner">
                                                                        <span><PiPhoneCallLight /></span>
                                                                        <input {...register("phone", { required: "Phone number input is required"})} type="number" placeholder="Enter your phone number" pattern="+[0,9]" />
                                                                </div>
                                                                { errors.phone && <span className="error">{errors.phone.message}</span>}
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
                                                          <div className="auth-form-row">
                                                                <div className="auth-password-input">
                                                                        <div className="input-left">
                                                                                    <span><SlLock /></span>
                                                                                    <input {...register("confirmPassword", { required: "Confirm password input is required", 
                                                                                            validate: val => val === password || "The passwords do not match"
                                                                                    })}  type={ confirmPasswordStatus ? "text" : "password"} placeholder="Confirm password"/>
                                                                        </div>
                                                                        <div className="password-toggle" onClick={() => setConfirmPasswordStatus(!confirmPasswordStatus)}>
                                                                                    { confirmPasswordStatus ? <span><LiaEyeSlash /></span> : <span><LiaEye /></span>}
                                                                        </div>
                                                                </div>
                                                                { errors.confirmPassword && <span className="error">{errors.confirmPassword.message}</span>}
                                                        </div>
                                                        <div className="auth-form-btn">
                                                                <button type="submit">{ isLoading ? <BtnSpinner /> : "Sign up" }</button>
                                                        </div>
                                                </form>

                                                <div className="form-extras">
                                                            <Link to={"/auth/login"}>Already have an account yet? <span>Sign in</span></Link>
                                                </div>
                                       </div>
                            </div>
                   </div>
           </div>

           <Footer />
    </>
  )
}

export default Signup