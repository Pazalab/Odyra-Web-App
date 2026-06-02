import { services } from "../../../data/services"
import { HiOutlineArrowRight } from "react-icons/hi"
import { Link } from "react-router-dom"

const ServicesBody = () => {
  return (
    <div className="services-body">
             <div className="inner-row">
                     <div className="services-body-intro">
                              <h2>Explore All Our Services</h2>
                              <p>Odyra Safaris services cover everything from timely airport runs and remote FIFO transfers to curated wine tours and seamless corporate events. No matter the occasion, expect the same standard: efficient booking, real‑time coordination, and a stress‑free experience from start to finish.</p>
                     </div>

                     <div className="services-body-row">
                            { services.map(item => 
                                <div className="service-moja" key={item.id}>
                                        <img src={item.image} alt="" />

                                        <div className="service-moja-texts">
                                                <h3>{item.title}</h3>
                                                <p>{item.subtitle}</p>
                                                <Link to={item.link}>Explore More <span><HiOutlineArrowRight /></span></Link>
                                        </div>
                                </div>
                            )}
                     </div>
             </div>
    </div>
  )
}

export default ServicesBody