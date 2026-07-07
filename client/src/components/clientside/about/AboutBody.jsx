import statements from "../../../assets/statements85.jpg"
const AboutBody = () => {
  return (
         <div className="about-body">
              <div className="inner-row">
                        <div className="about-body-wrap">
                                  {/* <div className="about-body-grid">
                                            <p>Every great solution starts with a frustrating problem. Like many of you, we experienced the same ride hailing frustrations: long wait times, unpredictable surge pricing, drivers who cancel at the last minute, and a complete lack of accountability. We found ourselves asking why something so simple is made so complicated. That question planted a seed. We began to wonder what if ride hailing could actually work the way it should? That seed grew into Odyra Safaris. We did not set out to build just another app. We set out to build a better way to move, driven by the need to improve how ride hailing is done and put customer experience at the very center of everything we do.</p>
                                            <p>Odyra Safaris started as a small operation with a single driver and a simple promise: get people where they need to go, reliably and affordably. We learned the ropes by serving our local community directly, listening to every piece of feedback, and fine tuning every part of the experience. Today, we serve everything from airport transfers and corporate events to FIFO site runs and wine tasting tours. Our technology ensures fast dispatching, real time tracking, and transparent pricing, while our human first approach means we listen, adapt, and always put the customer first. With consistent five star ratings and a growing base of repeat clients, we are proving that a customer centric model is better for everyone.</p>
                                  </div> */}
                                  <p>Odyra Safaris was founded with a singular purpose: to elevate the way people experience every journey. Built on the principles of excellence, reliability, and genuine hospitality, we believe exceptional transportation is defined not only by where it takes you, but by how it makes you feel along the way. What began as a modest operation driven by an unwavering commitment to outstanding service has evolved into a trusted mobility partner for individuals, businesses, and travelers seeking airport transfers, corporate travel, special events, tours, and bespoke transport solutions. Every journey reflects our dedication to professionalism, seamless technology, safety, and thoughtful attention to detail, ensuring each client enjoys an experience that is effortless from beginning to end. As we continue to grow, innovate, and expand our reach, our commitment remains unchanged: to set new standards in premium mobility through service that is dependable, transparent, and personal. At Odyra Safaris, we do more than move people. We create journeys that inspire confidence, build lasting relationships, and leave every passenger with the assurance that they have chosen a partner who values excellence as much as they do.</p>

                                  <div className="about-statements">
                                             <div className="about-statement-image">
                                                      <img src={statements} alt="" />
                                             </div>
                                             <div className="about-statement-texts">
                                                       <div className="about-statement-moja">
                                                                  <h3>Our Mission</h3>
                                                                  <p><span>To redefine ride-hailing by delivering exceptional customer experiences through efficient, transparent, and reliable service. </span>We are committed to making every ride effortless, predictable, and tailored to the unique needs of our customers.</p>
                                                       </div>
                                                       <span className="line"></span>
                                                       <div className="about-statement-moja">
                                                                 <h3>Our Vision</h3>
                                                                 <p><span>To become the most trusted and customer-centric ride-hailing platform in the region, expanding our reach while maintaining the personal touch and service excellence that defines us.</span> We envision a future where getting from point A to point B is no longer a hassle, but a highlight of your day.</p>
                                                       </div>
                                             </div>
                                  </div>
                        </div>
              </div>
    </div>
  )
}

export default AboutBody