import React, { useEffect, useState } from "react";
import "../AdminStyles/UpdateOrder.css";
import PageTitle from "../componant/PageTitle";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate, Link } from "react-router-dom";
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
        <div className="order-container">
          <p>Order not found. <Link to="/admin/orders">Go back</Link></p>
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
          <PageTitle title="Update Order" />

          <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 px-6 pt-6 pb-12">
            <div className="max-w-3xl mx-auto flex flex-col gap-6">

              {/* Heading */}
              <div className="flex items-center gap-2">
                <div className="w-1 h-6 rounded-full bg-amber-500" />
                <h1 className="text-2xl font-bold text-white tracking-tight">Update Order</h1>
              </div>

              {/* ── Order Info ── */}
              <div className="bg-slate-800/60 backdrop-blur-sm border border-slate-700/50 rounded-2xl shadow-2xl overflow-hidden">
                <div className="px-6 py-4 border-b border-slate-700/50">
                  <p className="text-xs font-bold uppercase tracking-widest text-slate-400">Order Info</p>
                </div>
                <div className="px-6 py-5 flex flex-col gap-3">

                  <div className="flex items-center justify-between py-2 border-b border-slate-700/30">
                    <span className="text-xs font-bold uppercase tracking-widest text-slate-500">Order ID</span>
                    <span className="text-slate-300 font-mono text-xs">{order._id}</span>
                  </div>

                  <div className="flex items-center justify-between py-2 border-b border-slate-700/30">
                    <span className="text-xs font-bold uppercase tracking-widest text-slate-500">Total Price</span>
                    <span className="text-amber-500 font-bold">₹{order.totalPrice?.toFixed(2)}</span>
                  </div>

                  <div className="flex items-center justify-between py-2 border-b border-slate-700/30">
                    <span className="text-xs font-bold uppercase tracking-widest text-slate-500">Current Status</span>
                    <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold
                      ${order.orderStatus?.toLowerCase() === 'delivered'
                        ? 'bg-emerald-500/10 border border-emerald-500/20 text-emerald-400'
                        : order.orderStatus?.toLowerCase() === 'processing'
                          ? 'bg-amber-500/10 border border-amber-500/20 text-amber-500'
                          : order.orderStatus?.toLowerCase() === 'shipped'
                            ? 'bg-blue-500/10 border border-blue-500/20 text-blue-400'
                            : 'bg-red-500/10 border border-red-500/20 text-red-400'
                      }`}>
                      <span className={`w-1.5 h-1.5 rounded-full
                        ${order.orderStatus?.toLowerCase() === 'delivered' ? 'bg-emerald-400'
                          : order.orderStatus?.toLowerCase() === 'processing' ? 'bg-amber-500 animate-pulse'
                          : order.orderStatus?.toLowerCase() === 'shipped' ? 'bg-blue-400'
                          : 'bg-red-400'}`}
                      />
                      {order.orderStatus}
                    </span>
                  </div>

                  <div className="flex items-center justify-between py-2">
                    <span className="text-xs font-bold uppercase tracking-widest text-slate-500">Paid At</span>
                    <span className="text-slate-300 text-sm">{new Date(order.paidAt).toLocaleDateString()}</span>
                  </div>

                </div>
              </div>

              {/* ── Order Items ── */}
              <div className="bg-slate-800/60 backdrop-blur-sm border border-slate-700/50 rounded-2xl shadow-2xl overflow-hidden">
                <div className="px-6 py-4 border-b border-slate-700/50">
                  <p className="text-xs font-bold uppercase tracking-widest text-slate-400">Order Items</p>
                </div>
                <div className="divide-y divide-slate-700/50">
                  {order.orderItem?.map((item, i) => (
                    <div key={i} className="px-6 py-4 flex items-center justify-between hover:bg-slate-700/20 transition-all duration-150">
                      <span className="text-white font-medium text-sm">{item.name}</span>
                      <div className="flex items-center gap-4">
                        <span className="text-xs text-slate-400">× {item.quantity}</span>
                        <span className="text-amber-500 font-bold text-sm">₹{item.price}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* ── Update Status ── */}
              <div className="bg-slate-800/60 backdrop-blur-sm border border-slate-700/50 rounded-2xl shadow-2xl overflow-hidden">
                <div className="px-6 py-4 border-b border-slate-700/50">
                  <p className="text-xs font-bold uppercase tracking-widest text-slate-400">Update Status</p>
                </div>
                <form onSubmit={handleSubmit} className="px-6 py-5 flex flex-col sm:flex-row gap-4">
                  <select
                    value={status}
                    onChange={(e) => setStatus(e.target.value)}
                    className="flex-1 bg-slate-900/50 border border-slate-700/50 rounded-xl px-4 py-2.5 text-sm text-white outline-none focus:border-amber-500/50 focus:ring-1 focus:ring-amber-500/20 transition-all duration-200 cursor-pointer"
                  >
                    <option value="Processing">Processing</option>
                    <option value="Shipped">Shipped</option>
                    <option value="Delivered">Delivered</option>
                  </select>
                  <button
                    type="submit"
                    className="px-8 py-2.5 rounded-xl font-bold text-sm tracking-widest uppercase transition-all duration-200 bg-amber-500 hover:bg-amber-300 text-slate-900 shadow-lg shadow-amber-500/20 hover:shadow-amber-500/40 active:scale-[0.98]"
                  >
                    Update Status
                  </button>
                </form>
              </div>

            </div>
          </div>
        </>
      )}
    </>
  );
}

export default UpdateOrder;
