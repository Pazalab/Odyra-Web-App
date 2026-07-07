import CallToAction from "../../components/clientside/common/CallToAction"
import Footer from "../../components/clientside/common/Footer"
import Navbar from "../../components/clientside/common/navigation/Navbar"
import AboutSection from "../../components/clientside/home/AboutSection"
import HeroSection from "../../components/clientside/home/HeroSection"
import ServicesSection from "../../components/clientside/home/ServicesSection"
import "../../css/clientside/home.css"
import { Link } from "react-router-dom"
import { HiArrowNarrowRight } from "react-icons/hi";

const Home = () => {
  return (
    <>
        <div className="landing">
               <Navbar />
               <div className="hero-section-v2">
                       <div className="inner-row">
                              <div className="hero-texts-block">
                                        <h1>Experience Personalized Luxury Transfers</h1>
                                        <p>We provide dependable, comfortable, and personalized transport solutions for travelers who expect the best. We are trusted by those who value their time, demand reliability, and refuse to compromise on comfort.</p>

                                        <Link to={"/new-booking"}>
                                               Book Now <span><HiArrowNarrowRight /></span>
                                        </Link>
                              </div>
                       </div>
               </div>
        </div>
        <ServicesSection />
        <AboutSection />
        <CallToAction />
        <Footer />
    </>
  )
}

export default Home