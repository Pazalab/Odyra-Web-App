import { Link, useNavigate } from "react-router-dom"
import logo from "../../../assets/logo.png"
import { BsEnvelopeAt } from "react-icons/bs";
import { SlLock } from "react-icons/sl";
import { LiaEye, LiaEyeSlash } from "react-icons/lia";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useLoginAdminMutation } from "../../../redux/slices/admin/adminApiSlice";
import BtnSpinner from "../../../components/clientside/common/BtnSpinner";
import { useDispatch } from "react-redux";
import { setAdminCredentials } from "../../../redux/slices/admin/adminActionsSlice";

const AdminLogin = () => {
 const [ passwordStatus, setPasswordStatus ] = useState(false);
 const { register, handleSubmit, formState: { errors}} = useForm();
 const dispatch = useDispatch();
 const navigate = useNavigate();

 const [ loginUser, { isLoading }] = useLoginAdminMutation();

 const submitLogin = async(data) => {
       try {
            const res = await loginUser(data).unwrap();
            dispatch(setAdminCredentials({...res}));
            navigate(`/admin/auth/stage`)
       } catch (error) {
            alert("Error occured");
            console.log(error)
       }
 }

  return (
       <div className="auth-wrapper">
             <div className="inner-row">
                       <div className="auth-header admin">
                                 <Link to={"/"} className="logo">
                                           <img src={logo} alt="" />
                                 </Link>
                       </div>

                       <div className="auth-wrap-body">
                                   <div className="auth-form-body">
                                               <div className="auth-form-intro">
                                                         <h2>Welcome Back</h2>
                                                         <p>Enter your details to access your account and manage the platform.</p>
                                               </div>
                                               <form onSubmit={handleSubmit(submitLogin)}>
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
                                                                 <button type="submit">{ isLoading ? <BtnSpinner /> : "Sign In" }</button>
                                                         </div>
                                               </form>
                                   </div>
                       </div>
             </div>
    </div>
  )
}

export default AdminLogin