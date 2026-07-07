import hero from "../../../assets/hero3.jpg"
const AboutHero = () => {
  return (
        <div className="about-hero">
             <div className="inner-row">
                       <div className="about-hero-content">
                                  <h3>Who We Are</h3>
                                  <h2>Redefining the Way you Travel.</h2>

                                  <div className="about-hero-image">
                                            <img src={hero} alt="" />
                                  </div>
                       </div>
             </div>
    </div>
  )
}

export default AboutHero