import { Link } from "react-router-dom"
import logo from "../../../assets/logo.png"
import { GrFacebookOption } from "react-icons/gr";
import { IoLogoInstagram, IoLogoTiktok } from "react-icons/io5";
import { FaXTwitter } from "react-icons/fa6";


const Footer = () => {
  return (
    <footer>
             <div className="inner-row">
                  <div className="footer-content">
                        <div className="footer-content-grid">
                                        <div className="footer-col">
                                                <div className="logo">
                                                <img src={logo} alt="" />
                                        </div>
                                                <p>Odyra Safaris is a premium mobility company delivering safe, reliable, and seamless transportation for individuals, businesses, and travelers. Every journey is driven by professionalism, comfort, and an unwavering commitment to exceptional service.</p>
                                        </div>
                                        <div className="footer-col">
                                                <h3>Quick Links</h3>
                                                <ul>
                                                        <li><Link to={"/"}>Home</Link></li>
                                                        <li><Link to={"/about"}>About us</Link></li>
                                                        <li><Link to={"/services"}>Services</Link></li>
                                                        <li><Link to={"/new-booking"}>Book Now</Link></li>
                                                        <li><Link to={"/auth/signup"}>Create an Account</Link></li>
                                                        <li><Link to={"/contact"}>Contact Us</Link></li>
                                                </ul>
                                        </div>
                                        <div className="footer-col">
                                                <h3>Services</h3>
                                                <ul>
                                                        <li><Link to={"/service/airport-transfers"}>Airport transfers</Link></li>
                                                        <li><Link to={"/service/fifo-airport-pickup-and-drop-off"}>FIFO</Link></li>
                                                        <li><Link to={"/service/cabin-crew-transfers"}>Cabin Crew Transfers</Link></li>
                                                        <li><Link to={"/service/corporate-events"}>Corporate Events</Link></li>
                                                        <li><Link to={"/service/cruise-transfers"}>Cruise Transfers</Link></li>
                                                        <li><Link to={"/service/wine-tasting-and-scenery-tours"}>Wine Tasting & Scenery Tours</Link></li>
                                                </ul>
                                        </div>
                                <div className="footer-socials">
                                        <h3>Let's Connect</h3>
                                        <ul>
                                                <li><Link to={"/"}><span><GrFacebookOption /></span></Link></li>
                                                <li><Link to={"/"}><span><IoLogoInstagram /></span></Link></li>
                                                <li><Link to={"/"}><span><FaXTwitter /></span></Link></li>
                                                <li><Link to={"/"}><span><IoLogoTiktok /></span></Link></li>
                                        </ul>
                                </div>
                        </div>

                     </div>

                     <div className="copyright">
                             <p>Copyright &copy; { new Date().getFullYear() } Odyra Safaris. All rights reserved.</p>

                             <ul>
                                    <li>Terms of use</li>
                                    <li>Cookie policy</li>
                                    <li>Privacy policy</li>
                                    <li>Safety & Training program</li>
                             </ul>
                     </div>
             </div>
    </footer>
  )
}

export default Footer