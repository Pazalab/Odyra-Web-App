import AboutBody from "../../components/clientside/about/AboutBody"
import AboutHero from "../../components/clientside/about/AboutHero"
import Values from "../../components/clientside/about/Values"
import CallToAction from "../../components/clientside/common/CallToAction"
import Footer from "../../components/clientside/common/Footer"
import Navbar from "../../components/clientside/common/navigation/Navbar"
import "../../css/clientside/about.css"

const About = () => {
  return (
    <>
            <Navbar />
            <AboutHero />
            <AboutBody />
            <Values />
            <CallToAction />
            <Footer />
    </>
  )
}

export default About