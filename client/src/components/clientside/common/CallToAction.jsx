import { Link } from "react-router-dom"

const CallToAction = () => {
  return (
    <div className="call-to-action">
             <div className="inner-row">
                      <div className="call-to-action-content">
                                <div className="call-to-action-texts">
                                         <h2>Ready to Unlock Mobility Freedom with Us</h2>
                                         <p>Your comfort is our priority. We go the extra mile to create an experience that feels thoughtful, welcoming, and thoroughly seamless. Expect friendly service, impeccable care, and a travel experience that leaves you relaxed, valued, and confident every time you ride with us.</p>
                                         <Link to={"/new-booking"}>Book a ride now</Link>
                                </div>
                      </div>
             </div>
    </div>
  )
}

export default CallToAction