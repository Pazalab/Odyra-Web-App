import { IoHelpCircleSharp } from "react-icons/io5";
import contact from "../../../assets/contact.jpg"
import { BsEnvelopeAt } from "react-icons/bs";
import { HiOutlinePhone } from "react-icons/hi2";
import { SlLocationPin } from "react-icons/sl";

const ContactDetails = () => {
  return (
        <div className="contact-details">
               <div className="inner-row">
                          <div className="contact-details-grid">
                                   <div className="contact-texts">
                                             <h3><span><IoHelpCircleSharp /></span> Help & Support</h3>
                                             <p>Our support team is here to help you every step of the way. Reach out anytime and trust that your questions will always be handled with clarity, professionalism, and prompt care.</p>

                                               <h4><span><BsEnvelopeAt /></span> info@odyra.com.au</h4>

                                               <h4><span><HiOutlinePhone /></span> +61 4944 38812</h4>

                                               <h4><span><SlLocationPin /></span> Winton Rd, Joondalup WA 6027, Australia</h4>
                                   </div>
                                   <div className="contact-image">
                                           <img src={contact} alt="" />
                                   </div>
                          </div>
               </div>
    </div>
  )
}

export default ContactDetails