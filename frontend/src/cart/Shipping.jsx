import React from "react";
import "../CartStyles/Shipping.css";
import Navbar from "../componant/Navbar";
import PageTitle from "../componant/PageTitle";
function Shipping() {
  return (
    <>
      <Navbar />
      <PageTitle title="Shipping Details" />
      <div className="shipping-form-container">
        <h1 className="shipping-form-header">Shipping Details</h1>
        <form className="shipping-form">
          <div className="shipping-section">
            <div className="shipping-form-group">
              <label htmlFor="address">Address</label>
              <input
                type="text"
                id="address"
                name="address"
                placeholder="Enter Your Address"
              />
            </div>
            <div className="shipping-form-group">
              <label htmlFor="pincode">Address</label>
              <input
                type="number"
                id="pincode"
                name="pincode"
                placeholder="Enter Your Pincode"
              />
            </div>
            <div className="shipping-form-group">
              <label htmlFor="phonenumber">Address</label>
              <input
                type="tel"
                id="phonenumber"
                name="phonenumber"
                placeholder="Enter Your Phone Number"
              />
            </div>
          </div>

          <div className="shipping-section">
            <div className="shipping-form-group">
              <label htmlFor="country">Country</label>
              <select name="country" id="country">
                <option value="">Select a Country</option>
                <option value="">India</option>
              </select>
            </div>
            <div className="shipping-form-group">
              <label htmlFor="state">State</label>
              <select name="state" id="state">
                <option value="">Select a Country</option>
                <option value="">Guj</option>
              </select>
            </div>
            <div className="shipping-form-group">
              <label htmlFor="city">City</label>
              <select name="city" id="city">
                <option value="">Select a Country</option>
                <option value="">Rajot</option>
              </select>
            </div>
          </div>

          <button className="shipping-submit-btn">Continue</button>
        </form>
      </div>
    </>
  );
}

export default Shipping;
