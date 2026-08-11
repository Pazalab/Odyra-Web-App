import { useForm } from "@tanstack/react-form"
import ActionLoader from "../../common/spinners/ActionLoader"
import { useDispatch, useSelector } from "react-redux"
import { useUpdateAdminNotificationsMutation } from "../../../../redux/slices/admin/adminApiSlice";
import { setDashboardNotification } from "../../../../redux/slices/util/utilActionsSlice";
import { setAdminNotifications } from "../../../../redux/slices/admin/adminActionsSlice";

const NotificationSettingsTab = () => {
  const dispatch = useDispatch();
  const { platformSettings } = useSelector(state => state.admin);
  const [ UpdateNotifications ]  = useUpdateAdminNotificationsMutation();
  const form = useForm({
          defaultValues: {
                bookingNotification: platformSettings.notificationSettings ?  platformSettings.notificationSettings.bookingNotification : false,
                paymentNotification: platformSettings.notificationSettings ?  platformSettings.notificationSettings.paymentNotification : false,
                customerNotification: platformSettings.notificationSettings ?  platformSettings.notificationSettings.customerNotification : false,
                pickupNotification: platformSettings.notificationSettings ? platformSettings.notificationSettings.pickupNotification : false,
                requestPaymentLinkNotification: platformSettings.notificationSettings ?  platformSettings.notificationSettings.requestPaymentLinkNotification: false,
          },
          onSubmit: async({ value }) => {
                try {
                      const res = await UpdateNotifications(value).unwrap();
                      if(res){
                             dispatch(setAdminNotifications(res.updateNotifs))
                             dispatch(setDashboardNotification({ status: true, message: "Notifications updated successfully", type: "success"}))
                      }
                } catch (error) {
                      dispatch(setDashboardNotification({ status: true, message: error.data.message, type: "error"}))
                }
          }
  })
  return (
    <div className="settings-tab-wrap">
            <p className="intro">Choose which updates and activities you would like to receive by email, so you can stay informed about the events that matter most.</p>

             <form onSubmit={(e) => {
                   e.preventDefault();
                   e.stopPropagation();
                   form.handleSubmit();
             }}>
                       <form.Field name="bookingNotification">
                              { (field) => (
                                     <div className="settings-form-row">
                                              <div className="form-texts">
                                                     <h5>Booking Updates</h5>
                                                      <p>Receive email notifications when bookings are made, created or completed.</p>
                                              </div>
                                               <div className="option-action">
                                                      <input type="checkbox" checked={field.state.value} onChange={(e) => field.handleChange(e.target.checked)}   />
                                                      <span className="no-choice">No</span>
                                                      <span className="yes-choice">Yes</span>
                                                      <span className="ball"></span>
                                              </div>
                                     </div>
                              )}
                       </form.Field>
                        <form.Field name="paymentNotification">
                              { (field) => (
                                     <div className="settings-form-row">
                                              <div className="form-texts">
                                                     <h5>Payment Activity</h5>
                                                      <p>Receive email notifications for successful payments, failed transactions and refunds.</p>
                                              </div>
                                               <div className="option-action">
                                                      <input type="checkbox" checked={field.state.value} onChange={(e) => field.handleChange(e.target.checked)}   />
                                                      <span className="no-choice">No</span>
                                                      <span className="yes-choice">Yes</span>
                                                      <span className="ball"></span>
                                              </div>
                                     </div>
                              )}
                       </form.Field>
                        <form.Field name="customerNotification">
                              { (field) => (
                                     <div className="settings-form-row">
                                              <div className="form-texts">
                                                     <h5>Customer Activity</h5>
                                                      <p>Receive email notifications about new customer registrations, reviews and support requestsca.</p>
                                              </div>
                                               <div className="option-action">
                                                      <input type="checkbox" checked={field.state.value} onChange={(e) => field.handleChange(e.target.checked)}   />
                                                      <span className="no-choice">No</span>
                                                      <span className="yes-choice">Yes</span>
                                                      <span className="ball"></span>
                                              </div>
                                     </div>
                              )}
                       </form.Field>
                        <form.Field name="pickupNotification">
                              { (field) => (
                                     <div className="settings-form-row">
                                              <div className="form-texts">
                                                     <h5>Pickup Notifications</h5>
                                                      <p>Receive email notifications when customers are pickup up and about the scheculed trip.</p>
                                              </div>
                                               <div className="option-action">
                                                      <input type="checkbox" checked={field.state.value} onChange={(e) => field.handleChange(e.target.checked)}   />
                                                      <span className="no-choice">No</span>
                                                      <span className="yes-choice">Yes</span>
                                                      <span className="ball"></span>
                                              </div>
                                     </div>
                              )}
                       </form.Field>
                        <form.Field name="requestPaymentLinkNotification">
                              { (field) => (
                                     <div className="settings-form-row">
                                              <div className="form-texts">
                                                     <h5>Payment Link Requests</h5>
                                                      <p>Receive email notifications whenever a customer requests a payment link for a booking.</p>
                                              </div>
                                               <div className="option-action">
                                                      <input type="checkbox" checked={field.state.value} onChange={(e) => field.handleChange(e.target.checked)}   />
                                                      <span className="no-choice">No</span>
                                                      <span className="yes-choice">Yes</span>
                                                      <span className="ball"></span>
                                              </div>
                                     </div>
                              )}
                       </form.Field>

                        <form.Subscribe selector={(state) => [state.canSubmit, state.isSubmitting]}>
                              { ([canSubmit, isSubmitting ]) => (
                              <div className="form-submit-btn adjust">
                                    <button type="submit" disabled={!canSubmit}>
                                           { isSubmitting ? <ActionLoader /> : "Save Changes"}
                                    </button>
                              </div>
                              )}
                        </form.Subscribe>
             </form>
    </div>
  )
}

export default NotificationSettingsTab