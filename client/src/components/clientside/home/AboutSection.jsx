import { useEffect, useRef } from "react"
import about1 from "../../../assets/about5.jpg"
import gsap from "gsap";
import ScrollTrigger from "gsap/dist/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);
import safety from "../../../assets/public-safety.png"
import booking from "../../../assets/online-booking.png"
import reliable from "../../../assets/fifo.png"
import { Link } from "react-router-dom"
import about2 from "../../../assets/about2.jpg"

const AboutSection = () => {
    const bannerRef = useRef();

    useEffect(() => {
            gsap.to(bannerRef.current.querySelector("img"), {
                   width: "130%",
                   scrollTrigger: {
                         trigger: bannerRef.current.querySelector("img"),
                         start: "-100px center",
                         end: "+=600px",
                         scrub: true,
                         invalidateOnRefresh: true,
                   }
            })
    }, [])
  return (
    <div className="about-section">
                <div ref={bannerRef} className="about-banner-image">
                          <img src={about1} alt="" />
                </div>
                <div className="about-section-texts">
                          <div className="inner-row">
                                    <div className="about-section-content">
                                                <h2>Discover the difference Behind every <span>Odyra Journey</span></h2>

                                                <p>We know that travel isn’t just about the destination — it’s about how you get there. That’s why Odyra Safaris focuses on what matters most: friendly service, comfortable rides, and reliable transfers you can count on every time.</p>


                                                <div className="about-section-features">
                                                          <div className="about-feature-moja">
                                                                     <img src={booking} alt="" />
                                                                     <h3>Effortless Booking, Total Flexibility</h3>
                                                                     <p>We understand that travel plans can change. That’s why Odyra Safaris offers simple, flexible booking options, an industry-leading cancellation policy, and 24/7 English-speaking customer support to assist you anytime.</p>
                                                          </div>
                                                         <div className="about-feature-moja">
                                                                     <img src={safety} alt="" />
                                                                     <h3>Safety You Can Trust</h3>
                                                                     <p>Your safety comes first. Every Odyra ride is backed by professionally trained drivers and regularly inspected vehicles, ensuring you travel with complete confidence and peace of mind.</p>
                                                          </div>
                                                         <div className="about-feature-moja">
                                                                     <img src={reliable} alt="" />
                                                                     <h3>Reliable Comfort, Anytime You Need It</h3>
                                                                     <p>Wherever you're headed, count on Odyra Safaris for prompt, dependable rides — day or night, rain or shine. We make every journey convenient, comfortable, and worry-free, so you can focus on what matters most.</p>
                                                          </div>
                                                </div>
                                    </div>
                          </div>
                </div>
                <div className="about-body-content">
                           <div className="inner-row">
                                   <div className="about-intro">
                                              <h3>About Us</h3>
                                              <h2>Odyra Safaris is a trusted car-hailing and airport transfer company in Australia</h2>
                                              <p>Experience smooth, dependable travel with a team that puts your comfort first. From the moment you’re picked up to the moment you arrive, every ride is designed for ease, safety, and peace of mind.</p>
                                   </div>

                                   <div className="about-body-row">
                                            <div className="about-body-texts">
                                                        <p>At Odyra Safaris, we believe that getting from point A to point B should be effortless, predictable, and even enjoyable. Yet too many ride hailing experiences are plagued by long waits, unpredictable pricing, and a frustrating lack of accountability.  That is why we started Odyra, to fundamentally improve how ride hailing is done. By stripping away the inefficiencies and putting customer experience at the very center of everything we do, we have built a service that prioritizes your time, your comfort, and your peace of mind.</p>
                                                        <p>From the moment you request a ride to the moment you step out, every touchpoint is designed to be seamless. Our technology ensures fast dispatching, transparent pricing, and real time coordination, while our human first approach means your needs are always heard and respected. Whether you are heading to the airport, a corporate event, a wine tour, or a remote site, Odyra Safaris delivers a ride that simply works, no guesswork, no hassle. We are driven by a simple mission: make rides easier for everyone, one trip at a time.</p>

                                                        <Link to={"/about"}>Learn more</Link>
                                            </div>
                                            <div className="about-body-image">
                                                     <img src={about2} alt="" />
                                            </div>
                                   </div>
                           </div>
                </div>
    </div>
  )
}

export default AboutSection