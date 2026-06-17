
const ContactForm = () => {
  return (
        <div className="contact-form">
               <div className="inner-row">
                         <div className="contact-form-content">
                                    <h2>Send Us a Message</h2>
                                    <p>Feel free to reach out anytime by filling the form below</p>

                                    <div className="contact-form-box">
                                               <form>
                                                        <div className="form-row split">
                                                                      <div className="form-row-column">
                                                                               <label htmlFor="firstname">Firstname</label>
                                                                                <input type="text" className="form-control" placeholder="Firstname" />
                                                                      </div>
                                                                      <div className="form-row-column">
                                                                               <label htmlFor="lastname">Lastname</label>
                                                                                <input type="text" className="form-control" placeholder="Lastname" />
                                                                      </div>
                                                        </div>
                                                        <div className="form-row split">
                                                                      <div className="form-row-column">
                                                                               <label htmlFor="email">Email</label>
                                                                                <input type="email" className="form-control" placeholder="Email address" />
                                                                      </div>
                                                                      <div className="form-row-column">
                                                                               <label htmlFor="phone">Phone</label>
                                                                                <input type="number" className="form-control" placeholder="Phone number" />
                                                                      </div>
                                                        </div>
                                                        <div className="form-row">
                                                                   <label htmlFor="message">Your message</label>
                                                                   <textarea className="form-textarea" placeholder="Write your message"></textarea>
                                                        </div>
                                                        <button>Submit Message</button>
                                               </form>
                                    </div>
                         </div>
               </div>
    </div>
  )
}

export default ContactForm