import { HiChevronDoubleRight } from "react-icons/hi";
import { Link, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from '@tanstack/react-form'
import { useImagePayloadProcessor } from "../../../hooks/imageUpload";
import Navbar from "../../../components/clientside/common/navigation/Navbar";
import { MdOutlineAddPhotoAlternate } from "react-icons/md"
import { IoTrashOutline } from "react-icons/io5";
import ActionLoader from "../../../components/serverside/common/spinners/ActionLoader";
import { PiCheck } from "react-icons/pi";
import { setGeneralNotification } from "../../../redux/slices/util/utilActionsSlice";
import { useUpdateCustomerProfileMutation } from "../../../redux/slices/client/clientApiSlice";
import { setCustomerProfile } from "../../../redux/slices/client/clientActionsSlice";

const PersonalInfoEdit = () => {
    const { pathname } = useLocation();
    const dispatch = useDispatch();
    const activePath = pathname.slice(10, pathname.length);
    const { profile } = useSelector(state => state.client);
    const { 
        fileList,
        previewUrl,
        clearSelectedImage,
        uploadStatus,
        setUploadStatus,
        handleFileChange,
        fileError
    } = useImagePayloadProcessor();

 const getImageSource = () => {
        if(previewUrl) return previewUrl;
        if(profile.profilePicture && profile.profilePicture !== ""){
            return profile.profilePicture;
        }
 }

 const [ EditCustomerProfile ] = useUpdateCustomerProfileMutation();

    const form = useForm({
         defaultValues: {
               name: profile ? profile.name : "",
               email: profile ? profile.email : "",
               phone: profile ? profile.phone : "",
         },
         onSubmit: async({ value }) => {
               const formData = new FormData();
               formData.append("data", JSON.stringify(value));
               formData.append("profilePic", fileList[0]);

               try {
                   const res = await EditCustomerProfile(formData).unwrap();
                   dispatch(setCustomerProfile(res.profile));
                   setUploadStatus(false);
                   dispatch(setGeneralNotification({ status: true, message: res.message, type: "success"}))
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
                                                                    <h3>Edit Your Personal Information</h3>
                                                            </div>
                                                            <div className="customer-content-wrapper adjust">
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
                                                                    <form onSubmit={(e) => {
                                                                            e.preventDefault();
                                                                            e.stopPropagation();
                                                                            form.handleSubmit();
                                                                    } }>
                                                                            <form.Field name="name"
                                                                                    validators={{
                                                                                            onChange: ({ value }) => !value ? 'Please enter your full name' : undefined,
                                                                                        }}
                                                                            >
                                                                                    { (field) => (
                                                                                            <div className="input-row">
                                                                                                    <label htmlFor="fullname">Full Name <span className="required">*</span></label>
                                                                                                    <input type="text" value={field.state.value} onChange={(e) => field.handleChange(e.target.value)} className="form-control" placeholder="Fullname" required/>
                                                                                                {field.state.meta.isTouched && field.state.meta.errors.length > 0 && (
                                                                                                        <span className="error">{field.state.meta.errors.join(', ')}</span>
                                                                                                    )}
                                                                                            </div>
                                                                                    )}
                                                                            </form.Field>
                                                                            <form.Field name="email"
                                                                                    validators={{
                                                                                            onChange: ({ value }) => !value ? 'Please enter your email address' : undefined,
                                                                                        }}
                                                                                >
                                                                                    { (field) => (
                                                                                            <div className="input-row">
                                                                                                    <label htmlFor="fullname">Email Address<span className="required">*</span></label>
                                                                                                    <input type="text" value={field.state.value} onChange={(e) => field.handleChange(e.target.value)} className="form-control" placeholder="Your email address" required/>
                                                                                                {field.state.meta.isTouched && field.state.meta.errors.length > 0 && (
                                                                                                        <span className="error">{field.state.meta.errors.join(', ')}</span>
                                                                                                    )}
                                                                                            </div>
                                                                                    )}
                                                                            </form.Field>
                                                                            <form.Field name="phone"
                                                                                    validators={{
                                                                                            onChange: ({ value }) => !value ? 'Please enter your phone number' : undefined,
                                                                                        }}
                                                                            >
                                                                                    { (field) => (
                                                                                            <div className="input-row">
                                                                                                    <label htmlFor="phone">Phone Number <span className="required">*</span></label>
                                                                                                    <input type="text" value={field.state.value} onChange={(e) => field.handleChange(e.target.value)} className="form-control" placeholder="+61 1234 58680" required/>
                                                                                                {field.state.meta.isTouched && field.state.meta.errors.length > 0 && (
                                                                                                        <span className="error">{field.state.meta.errors.join(', ')}</span>
                                                                                                    )}
                                                                                            </div>
                                                                                    )}
                                                                            </form.Field>

                                                                            <div className="form-submit-btn">
                                                                                    <form.Subscribe selector={(state) => [state.canSubmit, state.isSubmitting]}>
                                                                                            {([canSubmit, isSubmitting]) => (
                                                                                            <button 
                                                                                                type="submit" 
                                                                                                disabled={!canSubmit || isSubmitting}
                                                                                            >
                                                                                                { isSubmitting ? <ActionLoader /> : "Save Changes"}
                                                                                            </button>
                                                                                            )}
                                                                                        </form.Subscribe>
                                                                            </div>
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

export default PersonalInfoEdit