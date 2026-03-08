import React from "react";
import "../CartStyles/OrderConfirm.css";
import PageTitle from "../componant/PageTitle";
import Navbar from "../componant/Navbar";
import Footer from "../componant/Footer";
import CheckoutPath from "./CheckoutPath";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

function OrderConfirm() {
  const { shippingInfo, cartItems } = useSelector((state) => state.cart);
  const subTotal = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0,
  );

  const tax = subTotal * 0.18;

  const shippingCharges = subTotal > 500 ? 0 : 100;

  const total = subTotal + tax + shippingCharges;
  const navigate = useNavigate();
  const { user = {} } = useSelector((state) => state.user);

  const proceedToPayment = () => {
    const data = {
      subTotal,
      tax,
      shippingCharges,
      total,
    };
    // save in session storeg
    sessionStorage.setItem("orderItem", JSON.stringify(data));
    navigate("/process/payment");
  };
  return (
    <>
      <PageTitle title="Order Confirm" />
      <Navbar />
      <CheckoutPath activePath={1} />
      <div className="confirm-container">
        <h1 className="confirm-header">Order Confirmation</h1>
        <div className="confirm-table-container">
          <table className="confirm-table">
            <caption>Shipping Details</caption>
            <thead>
              <tr>
                <th>Name</th>
                <th>Phone</th>
                <th>Address</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>{user?.name || "-"}</td>
                <td>{shippingInfo?.phoneNumber || "-"}</td>
                <td>
                  {shippingInfo?.address || "-"}, {shippingInfo?.city || "-"},{" "}
                  {shippingInfo?.state || "-"}, {shippingInfo?.country || "-"},{" "}
                  {shippingInfo?.pincode || "-"}
                </td>
              </tr>
            </tbody>
          </table>
          <table className="confirm-table">
            <caption>Cart Item</caption>
            <thead>
              <tr>
                <th>Image</th>
                <th>Product Name</th>
                <th>Price</th>
                <th>Quantity</th>
                <th>Total Pice</th>
              </tr>
            </thead>
            <tbody>
              {cartItems.map((item) => (
                <tr key={item.product || item._id}>
                  <td>
                    <img
                      src={item?.image?.url || item?.image}
                      alt={item?.name || "product"}
                      className="order-product-image"
                    />
                  </td>
                  <td>{item.name}</td>
                  <td>₹{Number(item.price).toFixed(2)}</td>
                  <td>{item.quantity}</td>
                  <td>₹{(Number(item.price) * item.quantity).toFixed(2)}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <table className="confirm-table">
            <caption>Order Summary</caption>
            <thead>
              <tr>
                <th>Subtotal</th>
                <th>Shipping Charged</th>
                <th>GST</th>
                <th>Total</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>₹{subTotal.toFixed(2)}</td>
                <td>₹{shippingCharges.toFixed(2)}</td>
                <td>₹{tax.toFixed(2)}</td>
                <td>₹{total.toFixed(2)}</td>
              </tr>
            </tbody>
          </table>
        </div>
        <button className="proceed-button" onClick={proceedToPayment}>
          Proceed To Payment
        </button>
      </div>
      <Footer />
    </>
  );
}

export default OrderConfirm;
