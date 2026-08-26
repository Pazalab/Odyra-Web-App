import { Link, useNavigate } from "react-router-dom"
import logo from "../../../assets/logo.png"
import AuthNotification from "../../../components/clientside/common/notifications/AuthNotification"
import { useForm } from "react-hook-form"
import BtnSpinner from "../../../components/clientside/common/BtnSpinner"
import { useResetPasswordCustomerMutation, useSendResetInstructionsMutation, useVerifyResetCodeMutation } from "../../../redux/slices/client/clientApiSlice"
import { useDispatch } from "react-redux"
import { setAuthNotification } from "../../../redux/slices/util/utilActionsSlice"
import { HiOutlineSquare3Stack3D } from "react-icons/hi2";
import { useState } from "react"
import WorkingLoader from "../../../components/clientside/common/spinners/WorkingLoader"
import { SlLock } from "react-icons/sl";
import { LiaEye, LiaEyeSlash } from "react-icons/lia";

const ResetPassword = () => {
 const dispatch = useDispatch();
  const { register, handleSubmit, formState: { errors}} = useForm();
  const [ resetStatus, setResetStatus ] = useState(false);
  const [ isSending, setIsSending ] = useState(false);

  const [ VerifyCode, { isLoading }] = useVerifyResetCodeMutation();

  const VerifyPasswordReset = async(data) => {
      const email = sessionStorage.getItem("UserEmail") ? JSON.parse(sessionStorage.getItem("UserEmail")) : null;
       
      const payload = {
           email: email,
           code: data.code,
      }
        if(email){
           try {
               const res = await VerifyCode(payload).unwrap();
               if(res){
                    setResetStatus(true)
               }
           } catch (error) {
               console.log(error)
               dispatch(setAuthNotification({status: true, message: error.data.message, type: "error"}))
           }
        }else{
               dispatch(setAuthNotification({ status: true, message: "Reset session expired. Please start the reset password process from the login page", type: "error"}))
        }
  }

  const [ SendResetInstructions ] = useSendResetInstructionsMutation();

  const ResendResetInstructions = async() => {
        setIsSending(true);
        const email = sessionStorage.getItem("UserEmail") ? JSON.parse(sessionStorage.getItem("UserEmail")) : null;
        if(email){
               try {
                    const res = await SendResetInstructions({ email: email }).unwrap();
                    if(res){
                         setIsSending(false);
                         dispatch(setAuthNotification({ status: true, message: "We have resent the reset instructions to your account email", type: "success"}))
                    }
               } catch (error) {
                    dispatch(setAuthNotification({ status: true, message: error.data.message, type: "error"}))
               }
        }else{
           setIsSending(false)
            dispatch(setAuthNotification({ status: true, message: "Reset session expired. Please start the reset password process from the login page", type: "error"}))
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

                           { resetStatus ? <ResetPasswordForm /> : (
                                   <div className="auth-wrap-body">
                                             <div className="auth-form-body">
                                                  <div className="auth-form-intro">
                                                            <h2>Reset Password</h2>
                                                            <p>We have sent you reset instructions to your account email. Check your inbox for a new message</p>
                                                  </div>
                                                  <AuthNotification />
                                                       <form onSubmit={handleSubmit(VerifyPasswordReset)} >
                                                            <div className="auth-form-row">
                                                                      <div className="auth-form-inner">
                                                                                <span><HiOutlineSquare3Stack3D /></span>
                                                                                <input {...register("code", { required: "Email input is required"})} type="text" placeholder="Enter the code" />
                                                                      </div>
                                                                      { errors.code && <span className="error">{errors.code.message}</span>}
                                                                 </div>
                                                                 <div className="auth-form-resend">
                                                                                <p>Didn't receive the code? <span onClick={ResendResetInstructions}>Resend</span></p>
                                                                                { isSending && <WorkingLoader />}
                                                                 </div>
                                                                 <div className="auth-form-btn">
                                                                      <button type="submit">{ isLoading ? <BtnSpinner /> : "Verify Code" }</button>
                                                                 </div>
                                                       </form>

                                                       <div className="form-extras">
                                                                 <Link to={"/auth/login"}><span>Back to Login</span></Link>
                                                  </div>
                                             </div>
                               </div>
                           )}
                </div>
         </div>
    </>
  )
}

export default ResetPassword

const ResetPasswordForm = () => {
     const [ passwordStatus, setPasswordStatus ] = useState(false);
     const [ confirmPasswordStatus, setConfirmPasswordStatus ] = useState(false);
     const { register, handleSubmit, formState: { errors}, watch} = useForm();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const password = watch("password");

   const [ ResetPassword, { isLoading } ] = useResetPasswordCustomerMutation();

   const handleResetPassword = async(data) => {
        const email = sessionStorage.getItem("UserEmail") ? JSON.parse(sessionStorage.getItem("UserEmail")) : null;

        if(email){
          const payload = {
               email: email,
               password: data.password
          }
           try {
               const res = await ResetPassword(payload).unwrap();
               if(res){
                    navigate("/auth/login")
                    dispatch(setAuthNotification({ status: true, message: res.message, type: "success"}));
                    sessionStorage.removeItem("UserEmail")
               }
            } catch (error) {
                 console.log(error)
                  dispatch(setAuthNotification({ status: true, message: error.data.message, type: "error"}))
             }
        }else{
            dispatch(setAuthNotification({ status: true, message: "Reset session expired. Please start the reset password process from the login page", type: "error"}))
        }
   }
     return(
        <div className="auth-form-body">
                <div className="auth-form-intro">
                         <h2>Create A New Password</h2>
                         <p>Set a strong, secure password for your account. Use a combination of letters, numbers, and special characters to help keep your account protected.</p>
                         <form onSubmit={handleSubmit(handleResetPassword)}>
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
                                             <button type="submit">{ isLoading ? <BtnSpinner /> : "Reset Password" }</button>
                                   </div>
                         </form>
                </div>
        </div>
     )
}