import { APIProvider, Map, useMapsLibrary, useMap } from "@vis.gl/react-google-maps";
import usePlacesAutocomplete from "use-places-autocomplete";
import { useForm } from "react-hook-form";
import BtnSpinner from "../common/BtnSpinner";
import { PiMapPin } from "react-icons/pi";
import { LiaUserClockSolid } from "react-icons/lia";
import { useEffect, useState } from "react";
import { BsFillLuggageFill } from "react-icons/bs";
import { IoPeopleOutline } from "react-icons/io5";
import visa from "../../../assets/visa.png"
import mastercard from "../../../assets/mastercard.png"
import { useInitiatePaymentMutation } from "../../../redux/slices/client/clientApiSlice";
import { TfiTimer } from "react-icons/tfi";
import { useSelector, useDispatch } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { setGeneralNotification } from "../../../redux/slices/util/utilActionsSlice";

const BytheHour = () => {
   const [ waitingCharge, setWaitingCharge ] = useState(false);
     const [ pickupPoint, setPickupPoint ] = useState("");
     const [ dropoffPoint, setDropoffPoint ] = useState("");
     const { register, handleSubmit, formState: { errors }, watch, setValue } = useForm();
     const [ payment, setPayment ] = useState("");
     const [ paymentChoiceErr, setPaymentChoiceErr ] = useState("")
         
    const position = { lat: -31.9514, lng: 115.8617 }
    const [ chosenLeg, setChosenLeg ] = useState();
    const selectedHours = watch("durationHours");

    const { profile } = useSelector(state => state.client);
    const { pathname } = useLocation();
    const navigate = useNavigate();
    const dispatch = useDispatch();

 const handlePaymentChoiceChange = (val) => {
      setPaymentChoiceErr("");
      setPayment(val)
 }

    const prefillLoggedInUser = () => {
         setValue("customerName", profile.name);
         setValue("customerEmail", profile.email);
         setValue("customerPhone", profile.phone)
   }

   const redirectToLogin = () => {
        navigate("/auth/login", {
                state: { from: pathname}
        })
   }

 const [ InitiateStripe, { isLoading }] = useInitiatePaymentMutation();
 const handleBytheHourBooking = async(data) => {
          if(payment === ""){
           setPaymentChoiceErr("Please select a payment option to continue");
           return;
      }
      const formData = {
             rideType: "By the Hour",
             pickupAddress: chosenLeg ? chosenLeg.start_address : "",
             dropoffAddress: chosenLeg ? chosenLeg.end_address : "",
             waitingCharge: selectedHours && waitingCharge ? Math.round((Number(chosenLeg.distance.text.split(" ")[0]) * 30) * 0.2) : 0,
             rideDuration: selectedHours ? `${selectedHours} hours` : "",
             rideCost: selectedHours ? Math.round((Number(chosenLeg.distance.text.split(" ")[0]) * 30) * 0.2) : 0,
             ...data,
             paymentMethod: payment
      }

       try {
           const res = await InitiateStripe(formData).unwrap();

           window.location.href = res.url;
       } catch (error) {
             dispatch(setGeneralNotification({ status: true, message: error.data.message, type: "error"}))
       }
 }
  return (
        <form onSubmit={handleSubmit(handleBytheHourBooking)}>
                  <APIProvider apiKey={import.meta.env.VITE_GOOGLE_MAP_KEY}>
                            <div className="booking-body-wrap">
                                    <div className="booking-body-form">
                                             <div className="journey-wrap">
                                                    <div className="wrap-head">
                                                            <h3>Journey details</h3>
                                                    </div>
                                                    <div className="pickup-and-drop-off">
                                                            <CombinedPickDrop setPickupPoint={setPickupPoint} setDropoffPoint={setDropoffPoint} />
                                                    </div>

                                                    <div className="booking-form-row">
                                                                <div className="booking-input">
                                                                        <span><LiaUserClockSolid /></span>
                                                                        <div className="input-row">
                                                                                    <label htmlFor="pickup">Date and Time of journey</label>
                                                                                    <input {...register("pickupDateTime", { required: "Please enter time and date of pickup"})} type="datetime-local" placeholder="Enter location" className="input-row-control" />
                                                                        </div>
                                                                </div>
                                                                { errors.pickupDateTime && <span className="error">{errors.pickupDateTime.message}</span>}
                                                    </div>
                                                    <div className="booking-form-row">
                                                                <div className="booking-input">
                                                                         <span><TfiTimer /></span>
                                                                         <div className="input-row">
                                                                                 <label>Duration in hours</label>
                                                                                 <select {...register("durationHours", { required: "Please enter the number of hours of your journey"})} className="input-row-control">
                                                                                          <option value="">Select hours</option>
                                                                                          <option value="1">1 hour</option>
                                                                                          <option value="2">2 hours</option>
                                                                                          <option value="3">3 hours</option>
                                                                                          <option value="4">4 hours</option>
                                                                                          <option value="5">5 hours</option>
                                                                                          <option value="6">6 hours</option>
                                                                                          <option value="7">7 hours</option>
                                                                                          <option value="8">8 hours</option>
                                                                                 </select>
                                                                         </div>
                                                                </div>
                                                                { errors.durationHours && <span className="error">{errors.durationHours.message}</span>}
                                                    </div>
                                                    <div className="booking-form-row split">
                                                              <div className="booking-form-row-column">
                                                                          <div className="booking-input">
                                                                                <span><IoPeopleOutline /></span>
                                                                                <div className="input-row">
                                                                                        <label htmlFor="passangers">Passengers</label>
                                                                                        <input {...register("passengersNumber", { required: "Please enter no. of passengers "})} type="number" placeholder="No. of passengers" className="input-row-control" />
                                                                                </div>
                                                                        </div>
                                                                        { errors.passengersNumber && <span className="error">{errors.passengersNumber.message}</span>}
                                                              </div>
                                                              <div className="booking-form-row-column">
                                                                        <div className="booking-input">
                                                                                <span><BsFillLuggageFill  /></span>
                                                                                <div className="input-row">
                                                                                        <label htmlFor="pickup">Bags/Luggage</label>
                                                                                        <input {...register("bagsNumber", { required: "Please enter no. of bags"})} type="number" placeholder="No. of bags" className="input-row-control" />
                                                                                </div>
                                                                        </div>
                                                                        { errors.bagsNumber && <span className="error">{errors.bagsNumber.message}</span>}
                                                              </div>
                                                    </div>
                                                    <div className="booking-form-row">
                                                            <div className="waiting-input">
                                                                        <h4>Would you like the driver to wait for you for more than 30 mins?</h4>

                                                                        <div className="option-action">
                                                                                <input type="checkbox" onChange={() => setWaitingCharge(!waitingCharge)}   />
                                                                                <span className="no-choice">No</span>
                                                                                <span className="yes-choice">Yes</span>
                                                                                <span className="ball"></span>
                                                                        </div>
                                                            </div>
                                                            { waitingCharge &&
                                                                    <div className="waiting-calc-row">
                                                                            <p>To ensure smooth scheduling for all travelers, a 20% waiting charge will apply if the waiting time exceeds 30 minutes from the scheduled pickup time.</p>
                                                                    </div>
                                                                }
                                                </div>
                                        </div>
                                        <div className="payments-wrap">
                                              <div className="wrap-head">
                                                          <h3>Payment details</h3>
                                              </div>
                                                <h4>Choose payment method:</h4>
                                                <div className="payment-blocks">
                                                            <div className={ payment === "Card" ? "payment-block active" : "payment-block"} onClick={() => handlePaymentChoiceChange("Card")}>
                                                                    <div className="images-block">
                                                                            <img src={visa} alt="" />
                                                                            <img src={mastercard} alt="" />
                                                                    </div>
                                                            </div>
                                                      
                                                </div>
                                                { paymentChoiceErr && <span className="error">{paymentChoiceErr}</span>}
                                      </div>

                                      <div className="customer-wrap">
                                                <div className="wrap-head">
                                                        <h3>Personal Details</h3>
                                                        { profile ? <h5 className="existing" onClick={prefillLoggedInUser}>Use your current details</h5> :
                                                                 <h5 onClick={redirectToLogin}>Already a customer? Sign in</h5>
                                                        }
                                                </div>
                                                <div className="booking-form-row">
                                                            <div className="booking-input">
                                                                    <div className="input-row">
                                                                                <label htmlFor="name">Name</label>
                                                                                <input { ...register("customerName", { required: "Please enter your name"})} type="text" placeholder="Enter name" className="input-row-control" />
                                                                    </div>
                                                            </div>
                                                            { errors.customerName && <span className="error">{errors.customerName.message}</span>}
                                                </div>
                                                <div className="booking-form-row split">
                                                           <div className="booking-form-row-column">
                                                                <div className="booking-input">
                                                                        <div className="input-row">
                                                                                <label htmlFor="name">Email address</label>
                                                                                <input type="email" {...register("customerEmail", { required: "Please enter your email address"})} placeholder="Enter email" className="input-row-control" />
                                                                        </div>
                                                                </div>
                                                                { errors.customerEmail && <span className="error">{errors.customerEmail.message}</span>}
                                                           </div>
                                                           <div className="booking-form-row-column">
                                                                 <div className="booking-input">
                                                                        <div className="input-row">
                                                                                <label htmlFor="name">Phone number</label>
                                                                                <input type="number" {...register("customerPhone", { required: "Please enter your phone number"})} placeholder="+61 847858904" className="input-row-control" />
                                                                        </div>
                                                                </div>
                                                                { errors.customerPhone && <span className="error">{errors.customerPhone.message}</span>}
                                                           </div>
                                                </div>
                                        </div>
                                    </div>

                                    <div className="booking-body-extra">
                                          <div className="booking-map">
                                                    <Map
                                                            defaultCenter={position}
                                                          defaultZoom={9}
                                                            zoomControl={true}
                                                            mapId={import.meta.env.VITE_GOOGLE_MAP_ID}
                                                            
                                                        >
                                                            <Directions setLeg={setChosenLeg} pickup={pickupPoint} dropoff={dropoffPoint} />
                                                    </Map>
                                          </div>
                                          <div className="booking-details">
                                                <div className="destination-row">
                                                          <h4>From</h4>
                                                          <p>{chosenLeg ? chosenLeg.start_address : "N/A"}</p>
                                                          <h4 className="adjust">To</h4>
                                                          <p>{chosenLeg ? chosenLeg.end_address : "N/A"}</p>
                                                          <div className="duration-distance">
                                                                  <div className="block">
                                                                          <h4>Distance</h4>
                                                                          <p>{chosenLeg ? chosenLeg.distance.text : "N/A"}</p>
                                                                  </div>
                                                                  <div className="block">
                                                                          <h4>Duration</h4>
                                                                          {/* <p>{chosenLeg ? chosenLeg.duration.text : "N/A"}</p> */}
                                                                          <p>{ selectedHours ? selectedHours+` ${selectedHours !== "1" ? "hours" : "hour"}` : "N/A"}</p>
                                                                  </div>
                                                          </div>
                                                  </div>
  
                                                  <div className="ride-cost-row">
                                                              <h3>Cost</h3>
                                                              <div className="ride-cost-block">
                                                                      <p>Ride</p>
                                                                      <h4>{ chosenLeg ? `${Math.round(Number(chosenLeg.distance.text.split(" ")[0]) * 1.85)}` : 0 } AUD</h4>
                                                              </div>
                                                              <div className="ride-cost-block">
                                                                        <p>Wait time</p>
                                                                        <h4>{waitingCharge && chosenLeg ? `${Math.round((Number(chosenLeg.distance.text.split(" ")[0]) * 1.85) * 0.2)}` : 0} AUD</h4>
                                                              </div>
                                                  </div>
                                                  <h4>
  
                                                  </h4>
                                                  <div className="total-row">
                                                              <h4>Total</h4>
                                                              
                                                                 <h5>
                                                                        {chosenLeg && waitingCharge ? 
                                                                                Math.round(
                                                                                Math.round(Number(chosenLeg.distance.text.split(" ")[0]) * 1.85) + 
                                                                                Math.round((Number(chosenLeg.distance.text.split(" ")[0]) * 1.85) * 0.2)
                                                                                ) :
                                                                        chosenLeg ? 
                                                                        Math.round(Number(chosenLeg.distance.text.split(" ")[0]) * 1.85) : 
                                                                        "0"
                                                                } AUD</h5>
                                                  </div>
  
                                                  <div className="booking-form-btn">
                                                              <button type="submit">{ isLoading ? <BtnSpinner /> : "Book Now"}</button>
                                                  </div>
                                          </div>
                              </div>
                            </div>
                  </APIProvider>
        </form>
  )
}

export default BytheHour



const Directions = ({ pickup, dropoff, setLeg}) => {
    const map = useMap();
    const routesLibrary = useMapsLibrary("routes");
    const [ directionsService, setDirectionsService ] = useState();
    const [ directionsRenderer, setDirectionsRenderer ] = useState();
    const [ route, setRoute] = useState();
    
    const leg = route && route[0].legs[0];

    useEffect(() => {
            if(!routesLibrary || !map) return;
            setDirectionsService(new routesLibrary.DirectionsService());
            setDirectionsRenderer(new routesLibrary.DirectionsRenderer({ map }))
    }, [routesLibrary, map])


    useEffect(() => {
            if(!directionsService || !directionsRenderer) return;

            if(pickup !== "" && dropoff !== ""){
                directionsService.route({
                        origin: pickup,
                        destination: dropoff,
                        travelMode: "DRIVING",
                }).then(result => {
                        directionsRenderer.setDirections(result);
                        setRoute(result.routes)
                })
            }
    }, [ directionsRenderer, directionsService, dropoff, pickup])

   useEffect(() => {
         if(!leg){
                return;;
        }else{
                setLeg(leg)
        }
   }, [setLeg, leg])

    return null;
}

const PlacesWrapBox = ({ title, selectPoint}) => {
    const [ dropOff, setDropOff ] = useState(false);
    const [ chosen, setChosen ] = useState("")
    const { setValue, suggestions: { status, data }, clearSuggestions } = usePlacesAutocomplete();

    const handleDropOff = (val) => {
          if(val !== ""){
                setDropOff(true)
          }else{
               setDropOff(false);
          }
          setValue(val)
          setChosen(val)
    }

    const handleSelect = (address) => {
           setChosen(address);
           selectPoint(address)
           clearSuggestions();
           setDropOff(false);
    }

return (
         <>
                <div className="booking-input">
                        <span><PiMapPin /></span>
                        <div className="input-row">
                                    <label htmlFor="pickup">{title}</label>
                                    <input type="text" value={chosen} placeholder="Enter location" onChange={(e) => handleDropOff(e.target.value)}  className="input-row-control" />
                        </div>

                        { dropOff && 
                            <div className="places-wrap-box">
                                     { status === "OK" && data.map(({ place_id, description }) => 
                                       <div className="place-moja" key={place_id} onClick={() => handleSelect(description)}>
                                            <p>{description}</p>
                                      </div>
                                   )}
                            </div>
                        }
                </div>
         </>

      )
}


const CombinedPickDrop = ({setPickupPoint, setDropoffPoint}) => {
        const map = useMap();
        const placesLibrary = useMapsLibrary("places");
        const [ placesService, setPlacesService ] = useState();

        useEffect(()=> {
                 if(!placesLibrary || !map) return;
                 setPlacesService(new placesLibrary.PlacesService(map));
        }, [placesLibrary, map])
        return (
           <> 
               { placesService ? <>
                        <div className="booking-form-row">
                                <PlacesWrapBox title={"Pick up address"} selectPoint={setPickupPoint} />
                        </div>
                        <div className="booking-form-row">
                                <PlacesWrapBox title={"Drop off address"} selectPoint={setDropoffPoint}  /> 
                        </div>
               </> : ""}

           </>
        );
}