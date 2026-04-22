
const PricingSettingsTab = () => {
  return (
    <div className="settings-tab-wrap">
            <h3>Pricing Options</h3>

            <div className="pricing-information">
                    <form>
                            <div className="input-row">
                                    <label htmlFor="fullname">Base Fare($)<span className="required">*</span></label>
                                    <input type="text" className="form-control" placeholder="240"/>
                            </div>
                            <div className="input-row">
                                    <label htmlFor="fullname">Per Hour Rate($)<span className="required">*</span></label>
                                    <input type="text" className="form-control" placeholder="2.5"/>
                            </div>
                             <div className="input-row">
                                    <label htmlFor="fullname">Per Kilometre Rate($)<span className="required">*</span></label>
                                    <input type="text" className="form-control" placeholder="1.85"/>
                            </div>

                            <span className="luggage-title">Luggage</span>
                            <div className="input-grid-row">
                                      <div className="input-row">
                                                <label htmlFor="fullname">Luggage Threshold<span className="required">*</span></label>
                                                <input type="text" className="form-control" placeholder="3"/>
                                        </div>
                                        <div className="input-row">
                                                <label htmlFor="fullname">Luggage Cost($)<span className="required">*</span></label>
                                                <input type="text" className="form-control" placeholder="30"/>
                                        </div>
                            </div>
                             <div className="input-row">
                                    <label htmlFor="fullname">Cancellation Fee($)<span className="required">*</span></label>
                                    <input type="text" className="form-control" placeholder="25"/>
                            </div>
                           <div className="form-submit-btn">
                                    <button type="submit">Save Changes</button>
                            </div>
                    </form>
            </div>
    </div>
  )
}

export default PricingSettingsTab