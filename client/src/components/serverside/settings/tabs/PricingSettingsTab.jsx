import { useForm } from "react-hook-form"
import { useUpdatePricingSettingsMutation } from "../../../../redux/slices/admin/adminApiSlice"
import ActionLoader from "../../common/spinners/ActionLoader";
import { useDispatch, useSelector } from "react-redux";
import { setDashboardNotification } from "../../../../redux/slices/util/utilActionsSlice";
import { setAdminPlatformSettings } from "../../../../redux/slices/admin/adminActionsSlice";
const PricingSettingsTab = () => {
  const { platformSettings } = useSelector(state => state.admin);
  const { register, handleSubmit, formState: { errors }} = useForm({
       defaultValues: {
                baseFare: platformSettings?.pricingSettings.baseFare || 0,
                cancellationFee: platformSettings?.pricingSettings.cancellationFee || 0,
                luggageCost: platformSettings?.pricingSettings.luggageCost || 0,
                luggageThreshold: platformSettings?.pricingSettings.luggageThreshold || 0,
                perHourRate: platformSettings?.pricingSettings.perHourRate || 0,
                perKilometreRate: platformSettings?.pricingSettings.perKilometerRate || 0,
                waitingFee: platformSettings?.pricingSettings.waitingFee || 0,
                tenKilometreRate: platformSettings?.pricingSettings.perKilometerRate.tenKilometreRate || 0,
                twentyKilometreRate: platformSettings?.pricingSettings.perKilometerRate.twentyKilometreRate || 0,
                beyondTwentyKilometreRate: platformSettings?.pricingSettings.perKilometerRate.beyondTwentyKilometreRate || 0
       }
  })
  const dispatch = useDispatch();

  const [ UpdateSettings, { isLoading }] = useUpdatePricingSettingsMutation();

  const SubmitPricingSettings = async (data) => {
         try {
                const res = await UpdateSettings(data).unwrap();
                dispatch(setAdminPlatformSettings({...res.settings}))
                dispatch(setDashboardNotification({ status: true, message: res.message, type: "success"}))
         } catch (error) {
                dispatch(setDashboardNotification({ status: true, message: error.data.message, type: "error"}))
         }
  }
  return (
    <div className="settings-tab-wrap">
            <h3>Pricing Options</h3>

            <div className="pricing-information">
                    <form onSubmit={handleSubmit(SubmitPricingSettings)}>
                            <div className="input-row">
                                    <label htmlFor="fullname">Base Fare($)<span className="required">*</span></label>
                                    <input type="text" {...register("baseFare", { required: "Please enter the base fare"})} className="form-control" placeholder="240"/>
                                    { errors.baseFare && <span className="error">{errors.baseFare.message}</span>}
                            </div>
                            <div className="input-row">
                                    <label htmlFor="fullname">Per Hour Rate($)<span className="required">*</span></label>
                                    <input type="text" {...register("perHourRate", { required: "Please enter your rate per hour"})} className="form-control" placeholder="2.5"/>
                                    { errors.perHourRate && <span className="error">{errors.perHourRate.message}</span>}
                            </div>
                             <div className="input-row">
                                    <label htmlFor="fullname">Per Kilometre Rate($)<span className="required">*</span></label>
                            </div>
                            <div className="input-grid-row-3">
                                     <div className="input-row">
                                            <label htmlFor="0-10kms">From 0 - 10 Kilometres Rate <span className="required">*</span></label>
                                            <input type="text" {...register("tenKilometreRate", { required: "Enter your rate for the first 10 kilometres"})} className="form-control" placeholder="1.85"/>
                                            { errors.tenKilometreRate && <span className="error">{errors.tenKilometreRate.message}</span>}
                                     </div>
                                      <div className="input-row">
                                            <label htmlFor="0-10kms">From 0 - 10 Kilometres Rate <span className="required">*</span></label>
                                            <input type="text" {...register("twentyKilometreRate", { required: "Enter your rate for the first 20 kilometres"})} className="form-control" placeholder="1.85"/>
                                            { errors.twentyKilometreRate && <span className="error">{errors.twentyKilometreRate.message}</span>}
                                     </div>
                                      <div className="input-row">
                                            <label htmlFor="0-10kms">From 0 - 10 Kilometres Rate <span className="required">*</span></label>
                                            <input type="text" {...register("beyondTwentyKilometreRate", { required: "Enter your rate for beyond 20 kilometres"})} className="form-control" placeholder="1.85"/>
                                            { errors.beyondTwentyKilometreRate && <span className="error">{errors.beyondTwentyKilometreRate.message}</span>}
                                     </div>
                            </div>
                             <div className="input-row">
                                    <label htmlFor="fullname">Waiting Fee($)<span className="required">*</span></label>
                                    <input type="text" {...register("waitingFee", { required: "Please enter your waiting fee"})} className="form-control" placeholder="1.85"/>
                                    { errors.waitingFee && <span className="error">{errors.waitingFee.message}</span>}
                            </div>
                            <span className="luggage-title">Luggage</span>
                            <div className="input-grid-row">
                                      <div className="input-row">
                                                <label htmlFor="fullname">Luggage Threshold<span className="required">*</span></label>
                                                <input type="text" {...register("luggageThreshold", { required: "Please enter the luggage threshold"})} className="form-control" placeholder="3"/>
                                                { errors.luggageThreshold && <span className="error">{errors.luggageThreshold.message}</span>}
                                        </div>
                                        <div className="input-row">
                                                <label htmlFor="fullname">Luggage Cost($)<span className="required">*</span></label>
                                                <input type="text" { ...register("luggageCost", { required: "Please enter the luggage cost"})} className="form-control" placeholder="30"/>
                                                { errors.luggageCost && <span className="error">{errors.luggageCost.message}</span>}
                                        </div>
                            </div>
                             <div className="input-row">
                                    <label htmlFor="fullname">Cancellation Fee($)<span className="required">*</span></label>
                                    <input type="text" { ...register("cancellationFee", { required: "Please enter the cancellation fee"})} className="form-control" placeholder="25"/>
                                    { errors.cancellationFee && <span className="error">{errors.cancellationFee.message}</span>}
                            </div>
                           <div className="form-submit-btn">
                                    <button type="submit">
                                             { isLoading ? <ActionLoader /> : "Save Changes"}
                                    </button>
                            </div>
                    </form>
            </div>
    </div>
  )
}

export default PricingSettingsTab