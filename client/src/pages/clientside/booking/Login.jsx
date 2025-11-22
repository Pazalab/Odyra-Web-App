import { Link } from "react-router-dom"
import logo from "../../../assets/logo.png"
import { BsEnvelopeAt } from "react-icons/bs";
import { SlLock } from "react-icons/sl";
import { LiaEye, LiaEyeSlash } from "react-icons/lia";
import { useState } from "react";
import { FcGoogle } from "react-icons/fc";

const Login = () => {
    const [ passwordStatus, setPasswordStatus ] = useState(false);
  return (
    <div className="auth-wrapper">
             <div className="inner-row">
                       <div className="auth-header">
                                 <Link to={"/"} className="logo">
                                           <img src={logo} alt="" />
                                 </Link>
                                 <div className="header-actions">
                                           <div className="action-links">
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
                                               <form>
                                                         <div className="auth-form-row">
                                                                    <span><BsEnvelopeAt /></span>
                                                                    <input type="email" placeholder="Enter your email" />
                                                         </div>
                                                         <div className="auth-form-row">
                                                                  <div className="auth-password-input">
                                                                            <div className="input-left">
                                                                                       <span><SlLock /></span>
                                                                                       <input type={ passwordStatus ? "text" : "password"} placeholder="Password"/>
                                                                            </div>
                                                                            <div className="password-toggle" onClick={() => setPasswordStatus(!passwordStatus)}>
                                                                                      { passwordStatus ? <span><LiaEyeSlash /></span> : <span><LiaEye /></span>}
                                                                            </div>
                                                                  </div>
                                                         </div>
                                                         <div className="auth-form-forgot">
                                                                  <p>Forgot your password?</p>
                                                         </div>
                                                         <div className="auth-form-btn">
                                                                 <button type="submit">Sign in</button>
                                                         </div>
                                               </form>

                                               <div className="form-extras">
                                                        <div className="form-extras-options">
                                                                   <span className="line"></span>
                                                                   <h5>Or sign in with</h5>
                                                                   <span className="line"></span>
                                                        </div>
                                                        <div className="form-google">
                                                                  <span><FcGoogle /></span>
                                                                   Sign in with Google
                                                        </div>
                                               </div>
                                   </div>
                       </div>
             </div>
    </div>
  )
}

export default Login