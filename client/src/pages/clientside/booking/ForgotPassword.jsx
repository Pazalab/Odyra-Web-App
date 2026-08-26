import { Link,useNavigate } from "react-router-dom"
import logo from "../../../assets/logo.png"
import AuthNotification from "../../../components/clientside/common/notifications/AuthNotification"
import { useForm } from "react-hook-form"
import BtnSpinner from "../../../components/clientside/common/BtnSpinner"
import { useSendResetInstructionsMutation } from "../../../redux/slices/client/clientApiSlice"
import { useDispatch } from "react-redux"
import { setAuthNotification } from "../../../redux/slices/util/utilActionsSlice"
import { BsEnvelopeAt } from "react-icons/bs"
const ForgotPassword = () => {
 const navigate = useNavigate();
 const dispatch = useDispatch();
  const { register, handleSubmit, formState: { errors}} = useForm();

  const [ SendInstructions, { isLoading }] = useSendResetInstructionsMutation();
  const ValidateEmailAndSendCode = async(data) => {
       try {
           const res = await SendInstructions(data).unwrap();
           sessionStorage.setItem("UserEmail", JSON.stringify(data.email))
           if(res) navigate("/auth/reset-password")
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
                            </div>

                            <div className="auth-wrap-body">
                                   <div className="auth-form-body">
                                            <div className="auth-form-intro">
                                                  <h2>Forgot Password</h2>
                                                  <p>Enter your email address and we'll send you instructions of how to reset your password.</p>
                                            </div>
                                            <AuthNotification />
                                             <form onSubmit={handleSubmit(ValidateEmailAndSendCode)} >
                                                      <div className="auth-form-row">
                                                                <div className="auth-form-inner">
                                                                        <span><BsEnvelopeAt /></span>
                                                                        <input {...register("email", { required: "Email input is required"})} type="email" placeholder="Enter your account email" />
                                                                </div>
                                                                { errors.email && <span className="error">{errors.email.message}</span>}
                                                        </div>
                                                        <div className="auth-form-btn">
                                                                <button type="submit">{ isLoading ? <BtnSpinner /> : "Send Reset Instructions" }</button>
                                                        </div>
                                             </form>

                                              <div className="form-extras">
                                                        <Link to={"/auth/login"}><span>Back to Login</span></Link>
                                            </div>
                                   </div>
                            </div>
                </div>
         </div>
    </>
  )
}

export default ForgotPassword