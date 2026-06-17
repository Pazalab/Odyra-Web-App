import { values } from "../../../data/values"
const Values = () => {
  return (
        <div className="values-section">
               <div className="inner-row">
                        <div className="values-section-content">
                                    <div className="values-intro">
                                              <h3>Our Values</h3>
                                              <h2>What We Stand For</h2>
                                              <p>At Odyra Safaris, we are guided by a simple belief: great service is not a luxury, it is a standard. Our values reflect that commitment and define who we are as a company.</p>
                                    </div>

                                    <div className="values-row">
                                             { values.map(item => 
                                                   <div className="value-moja" key={item.id}>
                                                             <img src={item.icon} alt="" />
                                                             <h3>{item.title}</h3>
                                                             <p>{item.description}</p>
                                                   </div>
                                             )}
                                    </div>
                        </div>
               </div>
    </div>
  )
}

export default Values