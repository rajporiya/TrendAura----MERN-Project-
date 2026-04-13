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

      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 px-4 pt-6 pb-12">
        <div className="max-w-3xl mx-auto flex flex-col gap-6">

          {/* Heading */}
          <div className="flex items-center gap-2">
            <div className="w-1 h-6 rounded-full bg-amber-500" />
            <h1 className="text-2xl font-bold text-white tracking-tight">Shipping Details</h1>
          </div>

          <form onSubmit={shippingInfoSubmit} className="flex flex-col gap-6">

            {/* ── Section 1: Address Info ── */}
            <div className="bg-slate-800/60 backdrop-blur-sm border border-slate-700/50 rounded-2xl shadow-2xl overflow-hidden">
              <div className="px-6 py-4 border-b border-slate-700/50">
                <p className="text-xs font-bold uppercase tracking-widest text-slate-400">Address Info</p>
              </div>
              <div className="px-6 py-6 grid grid-cols-1 md:grid-cols-3 gap-5">

                {/* Address */}
                <div className="flex flex-col gap-1.5">
                  <label htmlFor="address" className="text-xs font-bold uppercase tracking-widest text-slate-400">Address</label>
                  <input
                    type="text"
                    id="address"
                    name="address"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    placeholder="Enter Your Address"
                    className="bg-slate-900/50 border border-slate-700/50 rounded-xl px-4 py-2.5 text-sm text-white placeholder-slate-500 outline-none focus:border-amber-500/50 focus:ring-1 focus:ring-amber-500/20 transition-all duration-200"
                  />
                </div>

                {/* Pincode */}
                <div className="flex flex-col gap-1.5">
                  <label htmlFor="pincode" className="text-xs font-bold uppercase tracking-widest text-slate-400">Pincode</label>
                  <input
                    type="number"
                    id="pincode"
                    name="pincode"
                    value={pincode}
                    onChange={(e) => setPincode(e.target.value)}
                    placeholder="Enter Your Pincode"
                    className="bg-slate-900/50 border border-slate-700/50 rounded-xl px-4 py-2.5 text-sm text-white placeholder-slate-500 outline-none focus:border-amber-500/50 focus:ring-1 focus:ring-amber-500/20 transition-all duration-200"
                  />
                </div>

                {/* Phone */}
                <div className="flex flex-col gap-1.5">
                  <label htmlFor="phoneNumber" className="text-xs font-bold uppercase tracking-widest text-slate-400">Phone Number</label>
                  <input
                    type="tel"
                    id="phoneNumber"
                    name="phoneNumber"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    placeholder="Enter Your Phone Number"
                    className="bg-slate-900/50 border border-slate-700/50 rounded-xl px-4 py-2.5 text-sm text-white placeholder-slate-500 outline-none focus:border-amber-500/50 focus:ring-1 focus:ring-amber-500/20 transition-all duration-200"
                  />
                </div>

              </div>
            </div>

            {/* ── Section 2: Location ── */}
            <div className="bg-slate-800/60 backdrop-blur-sm border border-slate-700/50 rounded-2xl shadow-2xl overflow-hidden">
              <div className="px-6 py-4 border-b border-slate-700/50">
                <p className="text-xs font-bold uppercase tracking-widest text-slate-400">Location</p>
              </div>
              <div className="px-6 py-6 grid grid-cols-1 md:grid-cols-3 gap-5">

                {/* Country */}
                <div className="flex flex-col gap-1.5">
                  <label htmlFor="country" className="text-xs font-bold uppercase tracking-widest text-slate-400">Country</label>
                  <select
                    name="country" id="country" value={country}
                    onChange={(e) => { setCountry(e.target.value); setState(""); setCity(""); }}
                    className="bg-slate-900/50 border border-slate-700/50 rounded-xl px-4 py-2.5 text-sm text-white outline-none focus:border-amber-500/50 focus:ring-1 focus:ring-amber-500/20 transition-all duration-200 cursor-pointer"
                  >
                    <option value="">Select a Country</option>
                    {Country && Country.getAllCountries().map((c) => (
                      <option key={c.isoCode} value={c.isoCode}>{c.name}</option>
                    ))}
                  </select>
                </div>

                {/* State */}
                {country && (
                  <div className="flex flex-col gap-1.5">
                    <label htmlFor="state" className="text-xs font-bold uppercase tracking-widest text-slate-400">State</label>
                    <select
                      name="state" id="state" value={state}
                      onChange={(e) => { setState(e.target.value); setCity(""); }}
                      className="bg-slate-900/50 border border-slate-700/50 rounded-xl px-4 py-2.5 text-sm text-white outline-none focus:border-amber-500/50 focus:ring-1 focus:ring-amber-500/20 transition-all duration-200 cursor-pointer"
                    >
                      <option value="">Select a State</option>
                      {State && State.getStatesOfCountry(country).map((s) => (
                        <option key={s.isoCode} value={s.isoCode}>{s.name}</option>
                      ))}
                    </select>
                  </div>
                )}

                {/* City */}
                {state && (
                  <div className="flex flex-col gap-1.5">
                    <label htmlFor="city" className="text-xs font-bold uppercase tracking-widest text-slate-400">City</label>
                    <select
                      name="city" id="city" value={city}
                      onChange={(e) => setCity(e.target.value)}
                      className="bg-slate-900/50 border border-slate-700/50 rounded-xl px-4 py-2.5 text-sm text-white outline-none focus:border-amber-500/50 focus:ring-1 focus:ring-amber-500/20 transition-all duration-200 cursor-pointer"
                    >
                      <option value="">Select a City</option>
                      {City && City.getCitiesOfState(country, state).map((c) => (
                        <option key={c.name} value={c.name}>{c.name}</option>
                      ))}
                    </select>
                  </div>
                )}

              </div>
            </div>

            {/* ── Submit ── */}
            <div className="flex justify-end">
              <button
                type="submit"
                className="px-10 py-3.5 rounded-xl font-bold text-sm tracking-widest uppercase transition-all duration-200 bg-amber-500 hover:bg-amber-300 text-slate-900 shadow-lg shadow-amber-500/20 hover:shadow-amber-500/40 active:scale-[0.98]"
              >
                Continue
              </button>
            </div>

          </form>
        </div>
      </div>
    </>
  );
}

export default Shipping;
