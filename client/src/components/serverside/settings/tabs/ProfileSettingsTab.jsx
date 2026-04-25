import { MdOutlineAddPhotoAlternate } from "react-icons/md"
import { useImagePayloadProcessor } from "../../../../hooks/imageUpload"
import { useDispatch, useSelector } from "react-redux"
import { PiCheck } from "react-icons/pi";
import { IoTrashOutline } from "react-icons/io5";
import { useUpdateProfileSettingsMutation } from "../../../../redux/slices/admin/adminApiSlice";
import { useForm } from "react-hook-form"
import ActionLoader from "../../common/spinners/ActionLoader";
import { setDashboardNotification } from "../../../../redux/slices/util/utilActionsSlice";
import { setAdminCredentials } from "../../../../redux/slices/admin/adminActionsSlice";

const ProfileSettingsTab = () => {
  const { adminInfo } = useSelector(state => state.admin)
 const { 
    fileList,
    previewUrl,
    clearSelectedImage,
    uploadStatus,
    handleFileChange,
    fileError
  } = useImagePayloadProcessor();

 const getImageSource = () => {
        if(previewUrl) return previewUrl;
        if(adminInfo.image && adminInfo.image !== ""){
            return adminInfo.image
        }
 }

 const { register, handleSubmit, formState: { errors}} = useForm();
const [ UpdateProfileSettings, { isLoading }] = useUpdateProfileSettingsMutation();
const dispatch = useDispatch();

const SubmitProfileSettings = async (data) => {
     const formData = new FormData();

    formData.append("data", JSON.stringify(data));
    formData.append("profilePic", fileList[0])

    try {
        const res = await UpdateProfileSettings(formData).unwrap();
        dispatch(setAdminCredentials({...res.profile}))
        dispatch(setDashboardNotification({ status: true, message: res.message, type: "success"}))
    } catch (error) {
         console.log(error)
    }
}

  return (
    <div className="settings-tab-wrap">
            <h3>Personal Information</h3>

            <form onSubmit={handleSubmit(SubmitProfileSettings)}>
                     <h4>Profile Picture</h4>
                     <div className="picture-upload">
                             <div className="picture-upload-col">
                                    <img src={getImageSource()} alt="" />
                                    <div className="upload-overlay">
                                            <span><MdOutlineAddPhotoAlternate /></span>
                                            <input type="file" onChange={handleFileChange} />
                                    </div>
                             </div>
                             { uploadStatus && (
                                     <div className="upload-actions">
                                             <span className="status">
                                                        <span><PiCheck /></span>
                                                        Uploaded
                                             </span>
                                             <span className="remove" onClick={clearSelectedImage}>
                                                       <span><IoTrashOutline /></span>
                                                       Remove
                                             </span>
                                     </div>
                             )}
                             { fileError && <span className="upload-error">{fileError}</span>}
                     </div>

                     <div className="profile-information">
                            <div className="input-row">
                                    <label htmlFor="fullname">Full Name <span className="required">*</span></label>
                                    <input type="text" {...register("name", { required: "Please enter your full name"})} className="form-control" placeholder="Fullname"/>
                                    { errors.name && <span className="error">{errors.name.message}</span>}
                            </div>

                            <div className="input-row">
                                    <label htmlFor="fullname">Username <span className="required">*</span></label>
                                    <input type="text" {...register("username", { required: "Please enter your username"})}  className="form-control" placeholder="@username"/>
                                     { errors.username && <span className="error">{errors.username.message}</span>}
                            </div>

                             <div className="input-row">
                                    <label htmlFor="fullname">Bio</label>
                                    <textarea className="textarea-control" { ...register("bio")} placeholder="Driver's bio description"></textarea>
                             </div>

                             <div className="input-row adjust">
                                     <div className="toggle-option-moja">
                                            <div className="input-row-col">
                                                    <label htmlFor="availabilty">Availability</label>
                                                    <span>Are you currently available for service</span>
                                            </div>
                                            <div className="option-action">
                                                    <input type="checkbox" {...register("availability")}  />
                                                    <span className="no-choice">No</span>
                                                    <span className="yes-choice">Yes</span>
                                                    <span className="ball"></span>
                                            </div>
                                    </div>
                             </div>
                     </div>

                     <div className="form-submit-btn">
                               <button type="submit">{ isLoading ? <ActionLoader /> : "Save Changes" }</button>
                     </div>
            </form>
            

    </div>
  )
}

export default ProfileSettingsTab