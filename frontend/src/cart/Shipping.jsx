import React, { useState } from "react";
import "../CartStyles/Shipping.css";
import Navbar from "../componant/Navbar";
import PageTitle from "../componant/PageTitle";
import CheckoutPath from "./CheckoutPath";
import { Country, State, City }  from 'country-state-city';
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { saveShippingInfo } from "../feature/cart/cartSlice";
import { useNavigate } from "react-router-dom";

function Shipping() {
  const {shippingInfo} = useSelector(state=> state.cart)
    const [address, setAddress]=useState(shippingInfo.address || "");
    const [pincode, setPincode]=useState(shippingInfo.pincode || "");
    const [phoneNumber, setPhoneNumber]=useState(shippingInfo.phoneNumber || "");
    const [country, setCountry]=useState(shippingInfo.country || "");
    const [state, setState]=useState(shippingInfo.state || "");
    const [city, setCity]=useState(shippingInfo.city || "");
    const dispatch = useDispatch();
    const navigate = useNavigate()

    const shippingInfoSubmit=(e)=>{
      e.preventDefault();
      // phone valid
      if(phoneNumber.length !== 10){
        toast.error("Invalid Phone number", {position:'top-center', autoClose: 2000})
        return;
      }
      dispatch(saveShippingInfo({address, pincode,phoneNumber,country,state,city}))
      navigate('/order/confirm')
    }
  return (
    <>
      <Navbar />
      <CheckoutPath activePath={0}/>
      <PageTitle title="Shipping Details" />
      <div className="shipping-form-container">
        <h1 className="shipping-form-header">Shipping Details</h1>
        <form className="shipping-form" onSubmit={shippingInfoSubmit}>
          <div className="shipping-section">
            <div className="shipping-form-group">
              <label htmlFor="address">Address</label>
              <input
                type="text"
                id="address" onChange={(e)=>setAddress(e.target.value)}
                name="address" value={address}
                placeholder="Enter Your Address"
              />
            </div>
            <div className="shipping-form-group">
              <label htmlFor="pincode">Address</label>
              <input
                type="number"
                id="pincode" onChange={(e)=>setPincode(e.target.value)}
                name="pincode" value={pincode}
                placeholder="Enter Your Pincode"
              />
            </div>
            <div className="shipping-form-group">
              <label htmlFor="phoneNumber">Address</label>
              <input
                type="tel"
                id="phoneNumber"
                name="phoneNumber" value={phoneNumber} onChange={(e)=>setPhoneNumber(e.target.value)}
                placeholder="Enter Your Phone Number"
              />
            </div>
          </div>

          <div className="shipping-section">
            <div className="shipping-form-group">
              <label htmlFor="country">Country</label>
              <select name="country" id="country" value={country} onChange={(e)=>{setCountry(e.target.value)
                setState("")
              setCity("")
              }}>
                <option value="">Select a Country</option>
                {Country && Country.getAllCountries().map((c) => (
                  <option key={c.isoCode} value={c.isoCode}>{c.name}</option>
                ))}
              </select>
            </div>
            {country && (<div className="shipping-form-group">
              <label htmlFor="state">State</label>
              <select name="state" id="state" value={state} onChange={(e)=>{setState(e.target.value)
                setCity("")
              }}>
                <option value="">Select a State</option>
                {State && State.getStatesOfCountry(country).map((s) => (
                  <option key={s.isoCode} value={s.isoCode}>{s.name}</option>
                ))}
              </select>
            </div>)}
            {state && (<div className="shipping-form-group">
              <label htmlFor="city">City</label>
              <select name="city" id="city" value={city} onChange={(e)=>setCity(e.target.value)}>
                <option value="">Select a City</option>
                {City && City.getCitiesOfState(country, state).map((c) => (
                  <option key={c.name} value={c.name}>{c.name}</option>
                ))}
              </select>
            </div>)}
          </div>

          <button className="shipping-submit-btn">Continue</button>
        </form>
      </div>
    </>
  );
}

export default Shipping;
