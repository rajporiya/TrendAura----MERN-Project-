import React, { useEffect, useState } from "react";
import "../AdminStyles/UpdateOrder.css";
import Navbar from "../componant/Navbar";
import PageTitle from "../componant/PageTitle";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import {
  updateOrderStatus,
  removeError,
  removeSuccess,
  clearMessage,
} from "../feature/admin/adminSlice";
import Loader from "../componant/Loader";
import { toast } from "react-toastify";

function UpdateOrder() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { orders, loading, error, success, message } = useSelector(
    (state) => state.admin
  );

  const order = orders.find((o) => o._id === id);

  const [status, setStatus] = useState("");

  useEffect(() => {
    if (order) {
      setStatus(order.orderStatus);
    }
  }, [order]);

  useEffect(() => {
    if (error) {
      toast.error(error?.message || error, {
        position: "top-right",
        autoClose: 2000,
        toastId: "update-order-error",
      });
      dispatch(removeError());
    }
  }, [error, dispatch]);

  useEffect(() => {
    if (success) {
      toast.success(message || "Order updated", {
        position: "top-right",
        autoClose: 2000,
      });
      dispatch(removeSuccess());
      dispatch(clearMessage());
      navigate("/admin/orders");
    }
  }, [success, message, dispatch, navigate]);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(updateOrderStatus({ id, status }));
  };

  if (!order) {
    return (
      <>
        <Navbar />
        <div className="order-container">
          <p>Order not found. <a href="/admin/orders">Go back</a></p>
        </div>
      </>
    );
  }

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
          <Navbar />
          <PageTitle title="Update Order" />
          <div className="order-container">
            <h1 className="order-title">Update Order</h1>

            <div className="order-details">
              <h2>Order Info</h2>
              <p><strong>Order ID:</strong> {order._id}</p>
              <p><strong>Total Price:</strong> ₹{order.totalPrice?.toFixed(2)}</p>
              <p>
                <strong>Current Status:</strong>{" "}
                <span className={`order-status ${order.orderStatus?.toLowerCase()}`}>
                  {order.orderStatus}
                </span>
              </p>
              <p><strong>Paid At:</strong> {new Date(order.paidAt).toLocaleDateString()}</p>
            </div>

            <div className="order-items">
              <h2>Order Items</h2>
              {order.orderItem?.map((item, i) => (
                <div key={i} className="order-item">
                  <p><strong>{item.name}</strong> × {item.quantity} — ₹{item.price}</p>
                </div>
              ))}
            </div>

            <div className="order-status">
              <h2>Update Status</h2>
              <form onSubmit={handleSubmit} className="update-status-form">
                <select
                  value={status}
                  onChange={(e) => setStatus(e.target.value)}
                  className="status-select"
                >
                  <option value="Processing">Processing</option>
                  <option value="Shipped">Shipped</option>
                  <option value="Delivered">Delivered</option>
                </select>
                <button type="submit" className="update-status-btn">
                  Update Status
                </button>
              </form>
            </div>
          </div>
        </>
      )}
    </>
  );
}

export default UpdateOrder;
