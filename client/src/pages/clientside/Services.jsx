import CallToAction from "../../components/clientside/common/CallToAction"
import Footer from "../../components/clientside/common/Footer"
import Navbar from "../../components/clientside/common/navigation/Navbar"
import ServiceHero from "../../components/clientside/services/ServiceHero"
import ServicesBody from "../../components/clientside/services/ServicesBody"
import "../../css/clientside/services.css"

const Services = () => {
  return (
    <>
          <Navbar />
          <ServiceHero />
          <ServicesBody />
          <CallToAction />
          <Footer />
    </>
  )
}

export default Services