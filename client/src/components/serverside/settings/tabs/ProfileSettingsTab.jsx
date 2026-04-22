import { MdOutlineAddPhotoAlternate } from "react-icons/md"
import { useImagePayloadProcessor } from "../../../../hooks/imageUpload"
import { useSelector } from "react-redux"
import { PiCheck } from "react-icons/pi";
import { IoTrashOutline } from "react-icons/io5";

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
  return (
    <div className="settings-tab-wrap">
            <h3>Personal Information</h3>

            <form>
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
                                    <input type="text" className="form-control" placeholder="Fullname"/>
                            </div>

                            <div className="input-row">
                                    <label htmlFor="fullname">Username <span className="required">*</span></label>
                                    <input type="text" className="form-control" placeholder="@username"/>
                            </div>

                             <div className="input-row">
                                    <label htmlFor="fullname">Bio</label>
                                    <textarea className="textarea-control" placeholder="Driver's bio description"></textarea>
                             </div>

                             <div className="input-row adjust">
                                     <div className="toggle-option-moja">
                                            <div className="input-row-col">
                                                    <label htmlFor="availabilty">Availability</label>
                                                    <span>Are you currently available for service</span>
                                            </div>
                                            <div className="option-action">
                                                    <input type="checkbox"  />
                                                    <span className="no-choice">No</span>
                                                    <span className="yes-choice">Yes</span>
                                                    <span className="ball"></span>
                                            </div>
                                    </div>
                             </div>
                     </div>

                     <div className="form-submit-btn">
                               <button type="submit">Save Changes</button>
                     </div>
            </form>
            

    </div>
  )
}

export default ProfileSettingsTab