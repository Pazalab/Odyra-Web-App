import airportTransfer from "../../../assets/airport_transfer.jpg"
import fifo from "../../../assets/fifo.jpg"
import wineTasting from "../../../assets/tours2.jpg"
import corporate from "../../../assets/corporate_event.jpg"

const ServicesSection = () => {
  return (
    <div className="services-section">
           <div className="inner-row">
                    <div className="services-section-content">
                                 <div className="services-intro">
                                             <h3>Ride with Odyra Safaris</h3>
                                             <h2>Comfort when you ride, reliability when it counts, and convenience all the way.</h2>
                                             <p>With Odyra Safaris, every ride is built around you — timely pickups, friendly drivers, and clean, comfortable cars that make travel feel effortless. Wherever you’re headed, we’ll get you there with care.</p>
                                 </div>
                    </div>
           </div>
           <div className="services-row">
                     <div className="service-moja">
                              <img src={airportTransfer} alt="" />

                              <div className="service-moja-texts">
                                       <h3>Airport Transfers</h3>
                                       <p>Enjoy smooth, on-time airport rides designed for comfort and peace of mind.</p>
                              </div>
                     </div>
                      <div className="service-moja">
                              <img src={fifo} alt="" />

                              <div className="service-moja-texts">
                                       <h3>FIFO Airport Pick-Up & Drop-Off</h3>
                                       <p>Reliable, timely rides for fly-in fly-out travelers who value efficiency and comfort.</p>
                              </div>
                     </div>

                    <div className="service-moja">
                              <img src={wineTasting} alt="" />

                              <div className="service-moja-texts">
                                       <h3>Wine Tasting & Scenery Tours</h3>
                                       <p>Relax and explore Australia's finest vineyards and landscapes in comfort and style.</p>
                              </div>
                     </div>

                      <div className="service-moja">
                              <img src={corporate} alt="" />

                              <div className="service-moja-texts">
                                       <h3>Corporate Events</h3>
                                       <p>Professional, punctual transport solutions tailored for meetings, teams, and events.</p>
                              </div>
                     </div>
          </div>
    </div>
  )
}

export default ServicesSection