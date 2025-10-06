import { Link } from "react-router-dom"
import hero1 from "../../../assets/hero1.jpg"
import hero2 from "../../../assets/hero3.jpg"
const HeroSection = () => {
  return (
    <div className="hero-section">
             <div className="inner-row">
                        <div className="hero-section-content">
                                   <div className="hero-texts">
                                             <h1>Driven by Excellence, Every Mile.</h1>
                                             <div className="hero-texts-column">
                                                      <p>We’re trusted by travelers who value their time, appreciate true comfort, and expect reliability in every ride.</p>
                                                      <Link to={"/auth/signup"}>Sign up to ride</Link>
                                             </div>
                                   </div>

                                   <div className="hero-images-row">
                                            <img src={hero1} alt="" />
                                            <img src={hero2} alt="" />
                                   </div>
                        </div>
             </div>
    </div>
  )
}

export default HeroSection