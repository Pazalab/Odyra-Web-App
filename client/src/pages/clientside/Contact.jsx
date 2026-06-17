import Footer from "../../components/clientside/common/Footer"
import Navbar from "../../components/clientside/common/navigation/Navbar"
import ContactDetails from "../../components/clientside/contact/ContactDetails"
import ContactForm from "../../components/clientside/contact/ContactForm"
import ContactHero from "../../components/clientside/contact/ContactHero"
import "../../css/clientside/contact.css"
const Contact = () => {
  return (
    <>
          <Navbar />
          <ContactHero />
          <ContactDetails />
          <ContactForm />
          <Footer />
    </>
  )
}

export default Contact