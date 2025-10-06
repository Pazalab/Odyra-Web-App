import Navbar from "../../components/clientside/common/navigation/Navbar"
import HeroSection from "../../components/clientside/home/HeroSection"
import ServicesSection from "../../components/clientside/home/ServicesSection"
import "../../css/clientside/home.css"

const Home = () => {
  return (
    <>
        <Navbar />
        <HeroSection />
        <ServicesSection />
    </>
  )
}

export default Home