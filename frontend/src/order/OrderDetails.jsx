import React, { useEffect } from "react";
import "../OrderStyles/OrderDetails.css";
import PageTitle from "../componant/PageTitle";
import Navbar from "../componant/Navbar";
import Footer from "../componant/Footer";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getOrderDetails, removeError } from "../feature/order/orderSlice";
import { toast } from "react-toastify";
import Loader from "../componant/Loader";

function OrderDetails() {
  const { orderId } = useParams();
  const { order, loading, error } = useSelector((state) => state.order);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getOrderDetails(orderId));
    
    return () => {
      dispatch(removeError());
    };
  }, [dispatch, orderId]);

  useEffect(() => {
    if (error) {
      toast.error(error, { position: "top-right", autoClose: 3000 });
    }
  }, [error]);

  const {
    shipingInfo = {},
    orderItem = [],
    paymentInfo = {},
    orderStatus = "processing",
    totalPrice,
    taxPrice,
    shippingPrice,
    itemPrice,
    paidAt,
  } = order;
  
  // Handle typo in backend field name (shipingInfo vs shippingInfo)
  const shippingInfo = shipingInfo;
  const paymentStatus = paymentInfo.status === 'succed'? 'Paid' : 'Not Paid'
  return (
    <>
      <Navbar />
      <PageTitle title={orderId} />
      {loading ? (
        <Loader />
      ) : (
        <div className="order-box">
          {/* oder table */}
          <div className="table-block">
            <h2 className="table-title">Order Items</h2>
            <table className="table-main">
              <thead>
                <tr className="table-head">
                  <th className="head-cell">Image</th>
                  <th className="head-cell">Name</th>
                  <th className="head-cell">Quantity</th>
                  <th className="head-cell">Price</th>
                </tr>
              </thead>
              <tbody>
                {orderItem.map((item) => (
                  <tr className="table-row" key={item.product || item._id}>
                    <td className="table-cell">
                      <img className="item-img" src={item.image} alt="Product Name"></img>
                    </td>
                    <td className="table-cell">{item.name}</td>
                    <td className="table-cell">{item.quantity}</td>
                    <td className="table-cell">{item.price}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Shipping Info Table */}
          <div className="table-block">
            <h2 className="table-title">Shipping Info</h2>
            <table className="table-main">
              <tbody>
                <tr className="table-row">
                  <th className="table-cell">Address</th>
                  <td className="table-cell">{shippingInfo.address},{shippingInfo.city},{shippingInfo.state},{shippingInfo.country},{shippingInfo.pincode}</td>
                </tr>
                <tr className="table-row">
                  <th className="table-cell">Phone</th>
                  <td className="table-cell">{shippingInfo.phoneNo}</td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Order Summary */}
          <div className="table-block">
            <h2 className="table-title">Order Summary</h2>
            <table className="table-main">
              <tr className="table-row">
                <th className="table-cell">Order Status</th>
                <td className="table-cell">
                  <span className={`status-tag ${orderStatus === 'Delivered' ? 'delivered' : 'processing'}`}>{orderStatus || 'processing'}</span>
                </td>
              </tr>
              <tr className="table-row">
                <th className="table-cell">Payment Status</th>
                <td className="table-cell">
                  <span className={`pay-tag ${paymentStatus === 'Paid' ? 'paid' : 'not-paid'}`}>{paymentStatus}</span>
                </td>
              </tr>
              <tr className="table-row">
                <th className="table-cell">Paid At Status</th>
                <td className="table-cell">{paidAt ? new Date(paidAt).toLocaleDateString() : 'N/A'}</td>
              </tr>
              <tr className="table-row">
                <th className="table-cell">Item Price</th>
                <td className="table-cell">₹{itemPrice || 0}/-</td>
              </tr>
              <tr className="table-row">
                <th className="table-cell">Tax Price</th>
                <td className="table-cell">₹{taxPrice || 0}/-</td>
              </tr>
              <tr className="table-row">
                <th className="table-cell">Shipping Price</th>
                <td className="table-cell">₹{shippingPrice || 0}/-</td>
              </tr>
              <tr className="table-row">
                <th className="table-cell">Total Price</th>
                <td className="table-cell">₹{totalPrice || 0}/-</td>
              </tr>
            </table>
          </div>
        </div>
      )}
      <Footer />
    </>
  );
}

export default OrderDetails;
