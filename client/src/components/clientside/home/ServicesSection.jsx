import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules"
import "swiper/css";
import 'swiper/css/autoplay'; 
import { Link } from "react-router-dom"
import { HiOutlineArrowRight } from "react-icons/hi";
import { useState } from "react";
import { services } from "../../../data/services";

const ServicesSection = () => {
  // eslint-disable-next-line no-unused-vars
  const [ swiperRef, setSwiperRef ] = useState(null);

  return (
    <div className="services-section">
           <div className="inner-row">
                    <div className="services-section-content">
                                 <div className="services-intro">
                                             <h3>Ride with Odyra Safaris</h3>
                                             <h2>Rides Built on Comfort, Reliability, and Convenience</h2>
                                             <p>With Odyra Safaris, every ride is built around you — timely pickups, friendly drivers, and clean, comfortable cars that make travel feel effortless. Wherever you’re headed, we’ll get you there with care.</p>
                                 </div>
                    </div>
           </div>
            <div className="services-row-slider">
                    <Swiper
                          slidesPerView={1}      
                          spaceBetween={20}
                          autoplay={{
                            delay: 5000,
                            disableOnInteraction: false,
                          }}
                          loop={true}
                          onSwiper={(swiper) => setSwiperRef(swiper)}
                          modules={[Autoplay]}
                          breakpoints={{
                                 1090: {
                                        slidesPerView: 4
                                 },
                                 768: {
                                        slidesPerView: 3,
                                 },
                                 530: {
                                        slidesPerView: 2
                                 }
                          }}
                    >
                             { services.map(service => (
                                    <SwiperSlide key={service.id} className="service-slider-item">
                                            <div  className="service-moja">
                                                    <img src={service.image} alt="" />
                                                    <div className="service-moja-texts">
                                                            <h3>{service.title}</h3>
                                                            {/* <p>{service.subtitle}</p> */}
                                                            <Link to={service.link}>Explore More <span><HiOutlineArrowRight /></span></Link>
                                                    </div>
                                            </div>
                                    </SwiperSlide>
                             ))}
                    </Swiper>
            </div>
           {/* <div className="services-row">
                     <div className="service-moja">
                              <img src={airportTransfer} alt="" />

                              <div className="service-moja-texts">
                                       <h3>Airport Transfers</h3>
                                       <p>Enjoy smooth, on-time airport rides designed for comfort and peace of mind.</p>
                                       <Link to={"/service/airport-transfers"}>Explore More <span><HiOutlineArrowRight /></span></Link>
                              </div>
                     </div>
                      <div className="service-moja">
                              <img src={fifo} alt="" />

                              <div className="service-moja-texts">
                                       <h3>FIFO Airport Pick-Up & Drop-Off</h3>
                                       <p>Reliable, timely rides for fly-in fly-out travelers who value efficiency and comfort.</p>
                                       <Link to={"/service/fifo"}>Explore More <span><HiOutlineArrowRight /></span></Link>
                              </div>
                     </div>

                    <div className="service-moja">
                              <img src={wineTasting} alt="" />

                              <div className="service-moja-texts">
                                       <h3>Wine Tasting & Scenery Tours</h3>
                                       <p>Relax and explore Australia's finest vineyards and landscapes in comfort and style.</p>
                                       <Link to={"/service/wine-tasting-and-scenery-tours"}>Explore More <span><HiOutlineArrowRight /></span></Link>
                              </div>
                     </div>

                      <div className="service-moja">
                              <img src={corporate} alt="" />

                              <div className="service-moja-texts">
                                       <h3>Corporate Events</h3>
                                       <p>Professional, punctual transport solutions tailored for meetings, teams, and events.</p>
                                       <Link to={"/service/corporate-events"}>Explore More <span><HiOutlineArrowRight /></span></Link>
                              </div>
                     </div>
          </div> */}

            {/* <div className="btn-wrapper">
                    <Link to={"/services"} className="link-btn">Explore All Services <span><HiOutlineArrowRight /></span></Link>
            </div> */}
    </div>
  )
}

export default ServicesSection