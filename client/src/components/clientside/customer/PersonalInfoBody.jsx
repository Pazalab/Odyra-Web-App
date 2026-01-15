import { HiChevronDoubleRight } from "react-icons/hi";
import { Link, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { CiEdit } from "react-icons/ci";

const PersonalInfoBody = () => {
    const { pathname } = useLocation();
    const activePath = pathname.slice(10, pathname.length);
    const { profile } = useSelector(state => state.client)
    
  return (
        <div className="customer-body">
             <div className="customer-body-navigation">
                       <div className="inner-row">
                                 <div className="customer-body-header">
                                            <Link to={"/"}>Home  </Link>
                                            <span><HiChevronDoubleRight /></span>
                                            <h4>{activePath.replaceAll("-", " ")}</h4>
                                 </div>
                       </div>
             </div>
             <div className="customer-body-content">
                      <div className="inner-row">
                              <div className="customer-body-grid">
                                       <div className="customer-body-nav">
                                                <h3>Account management</h3>
                                                <ul>
                                                         <li><Link className={activePath === "account" ? "active" : ""} to={"/customer/account"}>My ride</Link></li>
                                                         <li><Link className={activePath === "personal-information"? "active" : ""} to={"/customer/personal-information"}>Personal information</Link></li>
                                                </ul>
                                       </div>
                                       <div className="customer-body-wrap">
                                                 <div className="customer-body-inner">
                                                            <div className="customer-content-header">
                                                                      <h3>Welcome { profile && profile.name}</h3>
                                                                      <button className="delete">Delete account</button>
                                                            </div>
                                                            <div className="customer-content-wrapper">
                                                                    <div className="customer-ride-block">
                                                                              <div className="personal-block-header">
                                                                                        <h3>Personal information</h3>
                                                                                        <div className="info-btns">
                                                                                                  <button>Change password</button>
                                                                                                 <button><span><CiEdit /></span>Edit</button>
                                                                                        </div>
                                                                              </div>
                                                                              <div className="ride-block-content">
                                                                                       <div className="content-texts">
                                                                                                 <p>Name: {profile && profile.name}</p>
                                                                                                 <p>Contact Email: {profile && profile.email}</p>
                                                                                                 <p>Phone Number: {profile && profile.phone}</p>
                                                                                       </div>
                                                                              </div>
                                                                    </div>
                                                            </div>
                                                 </div>
                                       </div>
                              </div>
                      </div>
             </div>
    </div>
  )
}

export default PersonalInfoBody