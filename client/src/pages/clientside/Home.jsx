import CallToAction from "../../components/clientside/common/CallToAction"
import Footer from "../../components/clientside/common/Footer"
import Navbar from "../../components/clientside/common/navigation/Navbar"
import AboutSection from "../../components/clientside/home/AboutSection"
import HeroSection from "../../components/clientside/home/HeroSection"
import ServicesSection from "../../components/clientside/home/ServicesSection"
import "../../css/clientside/home.css"

const Home = () => {
  return (
    <>
        <Navbar />
        <HeroSection />
        <ServicesSection />
        <AboutSection />
        <CallToAction />
        <Footer />
    </>
  )
}

export default Home