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
                               <div className="footer-column">
                                        <div className="logo">
                                                  <img src={logo} alt="" />
                                        </div>
                                        <div className="footer-content-grid">
                                                  <div className="footer-col">
                                                            <h3>Company</h3>
                                                            <ul>
                                                                    <li><Link to={"/"}>About us</Link></li>
                                                                    <li><Link to={"/"}>Sign up for a ride</Link></li>
                                                                    <li><Link to={"/"}>Contact us</Link></li>
                                                            </ul>
                                                  </div>
                                                  <div className="footer-col">
                                                           <h3>Services</h3>
                                                           <ul>
                                                                    <li><Link to={"/"}>Airport transfers</Link></li>
                                                                    <li><Link to={"/"}>FIFO</Link></li>
                                                                    <li><Link to={"/"}>Wine tasting & scenery tours</Link></li>
                                                                    <li><Link to={"/"}>Corporate Events</Link></li>
                                                            </ul>
                                                  </div>
                                        </div>
                               </div>
                               <div className="footer-socials">
                                        <ul>
                                                  <li><Link to={"/"}><span><GrFacebookOption /></span></Link></li>
                                                  <li><Link to={"/"}><span><IoLogoInstagram /></span></Link></li>
                                                  <li><Link to={"/"}><span><FaXTwitter /></span></Link></li>
                                                  <li><Link to={"/"}><span><IoLogoTiktok /></span></Link></li>
                                        </ul>
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