import { useForm } from "@tanstack/react-form"
import { useState } from "react";
import { SlLock } from "react-icons/sl";
import { LiaEyeSlash, LiaEye } from "react-icons/lia";
import ActionLoader from "../../common/spinners/ActionLoader";
import { useUpdateAdminCredentialsMutation } from "../../../../redux/slices/admin/adminApiSlice";
import { useDispatch } from "react-redux";
import { setDashboardNotification } from "../../../../redux/slices/util/utilActionsSlice";

const AccountSecurityTab = () => {
    const [ passwordStatus, setPasswordStatus ] = useState(false);
    const [ confirmNewPasswordStatus, setConfirmNewPasswordStatus ] = useState(false);
    const [ newPasswordStatus, setNewPasswordStatus ] = useState(false);
    const [ UpdateAdminPassword ] = useUpdateAdminCredentialsMutation();
    const dispatch = useDispatch();

  const form = useForm({
        defaultValues :{
              currentPassword: "",
              newPassword: "",
              confirmNewPassword: "",
        }, 
        onSubmit: async({ value }) => {
              try {
                   const res = await UpdateAdminPassword(value).unwrap();
                   if(res){
                        form.setFieldValue("currentPassword", "");
                        form.setFieldValue("newPassword", "");
                        form.setFieldValue("confirmNewPassword", "")
                   }
                   dispatch(setDashboardNotification({ status: true, message: res.message, type: "success"}))
              } catch (error) {
                    dispatch(setDashboardNotification({ status: true, message: error.data.message, type: "error"}))
              }

        }
  })

  return (
    <div className="settings-tab-wrap">
              <p className="intro">Manage your account security settings to help protect your account and keep your information secure.</p>

               <form className="account-form" onSubmit={(e) => { 
                     e.preventDefault();
                     e.stopPropagation();
                     form.handleSubmit();
               }}>
                        <div className="form-texts">
                                  <h5>Change Password</h5>
                                  <p>Update your password to keep your account secure. Choose a strong password that you haven't used before.</p>
                          </div>
                          <form.Field name="currentPassword"
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
                                                  <label>Current Password</label>
                                                  <div className="auth-password-input">
                                                          <div className="input-left">
                                                                      <span><SlLock /></span>
                                                                      <input value={field.state.value} onChange={(e) => field.handleChange(e.target.value)} type={ passwordStatus ? "text" : "password"} placeholder="Current Password"/>
                                                          </div>
                                                          <div className="password-toggle" onClick={() => setPasswordStatus(!passwordStatus)}>
                                                                      { passwordStatus ? <span><LiaEyeSlash /></span> : <span><LiaEye /></span>}
                                                          </div>
                                                  </div>
                                                       {field.state.meta.errors.length > 0 && (
                                                          <span className="error">{field.state.meta.errors.join(', ')}</span>
                                                        )}
                                          </div>
                                 )}
                          </form.Field>
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
                                                          <div className="password-toggle" onClick={() => setNewPasswordStatus(!passwordStatus)}>
                                                                      { passwordStatus ? <span><LiaEyeSlash /></span> : <span><LiaEye /></span>}
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
  )
}

export default AccountSecurityTab