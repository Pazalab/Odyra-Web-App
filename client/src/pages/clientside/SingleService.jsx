import React from 'react'
import Navbar from '../../components/clientside/common/navigation/Navbar'
import { services } from '../../data/services'
import { useParams } from 'react-router-dom'
import Footer from '../../components/clientside/common/Footer'
import CallToAction from '../../components/clientside/common/CallToAction'

const SingleService = () => {
  const { name } = useParams();
  const service = services.find(item => item.url_param === name);
  return (
    <>
         <Navbar />
         <div className="single-service-wrapper">
                    <div className="inner-row">
                           <div className="single-service-content">
                                    <h2>{service.title}</h2>
                                    <p className='intro'>{service.intro_desc}</p>

                                    <div className="single-service-images-grid">
                                             <img src={service.image} alt="" />
                                             <img src={service.image2} alt="" />
                                    </div>

                                    <div className="single-service-body">
                                            { service.description.map(item => <p key={item}>{item}</p>)}

                                            { service.reasons.map(item => (
                                                  <div key={item.id} className='entry'>
                                                          <h3>{item.title}</h3>
                                                          <p>{item.description}</p>
                                                  </div>
                                            ))}

                                            <p>{service.extra}</p>

                                            { service.specificIntro && <p>{service.specificIntro}</p>}

                                            { service.specifics?.map(item => 
                                                  <div key={item.id} className='entry'>
                                                          <h3>{item.title}</h3>
                                                           <h4>{item.subtitle}</h4>
                                                          <p>{item.description}</p>
                                                  </div>
                                            )}
                                            <div className="service-tour-images">
                                                       { service.tourImages?.map(item => 
                                                              <img src={item} key={item} />
                                                       )}
                                            </div>
                                    </div>
                           </div>
                    </div>
         </div>
          <CallToAction />
         <Footer />
    </>
  )
}

export default SingleService