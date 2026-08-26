import Navbar from "../../../components/clientside/common/navigation/Navbar"
import { HiChevronDoubleRight } from "react-icons/hi";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch} from "react-redux";
import { useState } from "react";
import { useForm } from '@tanstack/react-form'
import { useUpdateCustomerPasswordMutation } from "../../../redux/slices/client/clientApiSlice";
import { SlLock } from "react-icons/sl";
import { LiaEyeSlash, LiaEye } from "react-icons/lia";
import ActionLoader from "../../../components/serverside/common/spinners/ActionLoader";
import { setGeneralNotification } from "../../../redux/slices/util/utilActionsSlice";

const CustomerPasswordReset = () => {
    const { pathname } = useLocation();
    const dispatch = useDispatch();
    const [ confirmNewPasswordStatus, setConfirmNewPasswordStatus ] = useState(false);
    const [ newPasswordStatus, setNewPasswordStatus ] = useState(false);
    const activePath = pathname.slice(10, pathname.length);
    const navigate = useNavigate();

    const [ UpdateCustomerPassword ] = useUpdateCustomerPasswordMutation();

    const form = useForm({
         defaultValues: {
                newPassword: "",
                confirmNewPassword: ""
         },
         onSubmit: async({ value }) => {
               try {
                   const res = await UpdateCustomerPassword(value).unwrap();
                   if(res){
                        dispatch(setGeneralNotification({ status: true, message: res.message, type: "success"}));
                         navigate('/customer/personal-information' );
                   }
               } catch (error) {
                    dispatch(setGeneralNotification({ status: true, message: error.data.message, type: "error"}))
               }
         }
    })
  return (
    <>
          <Navbar />
          <div className="customer-body">
                 <div className="customer-body-navigation">
                        <div className="inner-row">
                                <div className="customer-body-header">
                                        <Link to={"/"}>Home  </Link>
                                        <span><HiChevronDoubleRight /></span>
                                        <h4>{activePath.replaceAll("-", " ")}</h4>
                                </div>
                        </div>   
                 </div>
                   <div className="customer-body-content">
                         <div className="inner-row">
                                 <div className="customer-body-grid">
                                         <div className="customer-body-nav">
                                                    <h3>Account management</h3>
                                                        <ul>
                                                                <li><Link className={activePath === "account" ? "active" : ""} to={"/customer/account"}>My ride</Link></li>
                                                                <li><Link className={activePath === "personal-information"? "active" : ""} to={"/customer/personal-information"}>Personal information</Link></li>
                                                        </ul>
                                         </div>
                                         <div className="customer-body-wrap">
                                                 <div className="customer-body-inner">
                                                         <div className="customer-content-header">
                                                                <h3>Change your Password</h3>
                                                         </div>

                                                         <div className="customer-content-wrapper adjust">
                                                                  <form onSubmit={(e) => {
                                                                        e.preventDefault();
                                                                        e.stopPropagation();
                                                                        form.handleSubmit();
                                                                  }}>
                                                                        <form.Field name="newPassword"
                                                                                validators={{
                                                                                        onChange: ({ value }) => {
                                                                                            if(!value || value.trim() === ""){
                                                                                                    return "Current password field is required."
                                                                                            }
                                                                                            return undefined;
                                                                                        }
                                                                                }}
                                                                        >
                                                                                { (field) => (
                                                                                        <div className="auth-form-row settings">
                                                                                                <label>New Password</label>
                                                                                                <div className="auth-password-input">
                                                                                                        <div className="input-left">
                                                                                                                    <span><SlLock /></span>
                                                                                                                    <input value={field.state.value} onChange={(e) => field.handleChange(e.target.value)} type={ newPasswordStatus ? "text" : "password"} placeholder="New Password"/>
                                                                                                        </div>
                                                                                                        <div className="password-toggle" onClick={() => setNewPasswordStatus(!newPasswordStatus)}>
                                                                                                                    { newPasswordStatus ? <span><LiaEyeSlash /></span> : <span><LiaEye /></span>}
                                                                                                        </div>
                                                                                                </div>
                                                                                                    {field.state.meta.errors.length > 0 && (
                                                                                                        <span className="error">{field.state.meta.errors.join(', ')}</span>
                                                                                                        )}
                                                                                        </div>
                                                                                )}
                                                                        </form.Field>
                                                                        <form.Field name="confirmNewPassword"
                                                                                validators={{
                                                                                    onChange: ({ value, fieldApi}) => {
                                                                                            const passValue = fieldApi.form.getFieldValue("newPassword");
                                                                                            if(value !== passValue){
                                                                                                return "Password entered do not match"
                                                                                            }
                                                                                            return undefined;
                                                                                    }
                                                                                }}
                                                                        >
                                                                                { (field) => (
                                                                                        <div className="auth-form-row settings">
                                                                                                <label>Confirm New Password</label>
                                                                                                <div className="auth-password-input">
                                                                                                        <div className="input-left">
                                                                                                                    <span><SlLock /></span>
                                                                                                                    <input value={field.state.value} 
                                                                                                                            onChange={(e) => field.handleChange(e.target.value)} 
                                                                                                                            type={ confirmNewPasswordStatus ? "text" : "password"} placeholder="Confirm New Password"/>
                                                                                                        </div>
                                                                                                        <div className="password-toggle" onClick={() => setConfirmNewPasswordStatus(!confirmNewPasswordStatus)}>
                                                                                                                    { confirmNewPasswordStatus ? <span><LiaEyeSlash /></span> : <span><LiaEye /></span>}
                                                                                                        </div>
                                                                                                </div>
                                                                                            {field.state.meta.errors.length > 0 && (
                                                                                                <span className="error">{field.state.meta.errors.join(', ')}</span>
                                                                                            )}
                                                                                        </div>
                                                                                )}
                                                                        </form.Field>

                                                                        <form.Subscribe selector={(state) => [state.canSubmit, state.isSubmitting]}>
                                                                                { ([canSubmit, isSubmitting ]) => (
                                                                                <div className="form-submit-btn adjust">
                                                                                    <button type="submit" disabled={!canSubmit}>
                                                                                            { isSubmitting ? <ActionLoader /> : "Update Password"}
                                                                                    </button>
                                                                                </div>
                                                                                )}
                                                                        </form.Subscribe>
                                                                  </form>
                                                         </div>
                                                 </div>
                                         </div>
                                 </div>
                         </div>
                   </div>
          </div>
    </>
  )
}

export default CustomerPasswordReset