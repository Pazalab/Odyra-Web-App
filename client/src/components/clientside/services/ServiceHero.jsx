import service1 from "../../../assets/services1.jpeg"
import service2 from "../../../assets/services2.jpeg"

const ServiceHero = () => {
  return (
    <div className="services-hero">
             <div className="inner-row">
                      <div className="services-hero-content">
                                <div className="services-hero-intro">
                                        <h3>How we can serve you</h3>
                                        <h2>Enjoy Seamless Ride Experience with Odyra Services</h2>
                                        <p>Our focus is to deliver efficient service from pickup to drop‑off – so you get where you're going faster, without the usual ride‑hailing headaches.</p>
                                </div>
                                <div className="services-hero-images">
                                          <img src={service1} alt="" />
                                          <img src={service2} alt="" />
                                </div>
                      </div>
             </div>
    </div>
  )
}

export default ServiceHero