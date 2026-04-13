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
      <CheckoutPath activePath={1}  />

      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 px-4 pt-4 pb-12">
        <div className="max-w-5xl mx-auto flex flex-col gap-6">

          {/* Page Heading */}
          <div className="flex items-center gap-2">
            <div className="w-1 h-6 rounded-full bg-amber-500" />
            <h1 className="text-2xl font-bold text-white tracking-tight">Order Confirmation</h1>
          </div>

          {/* ── Shipping Details ── */}
          <div className="bg-slate-800/60 backdrop-blur-sm border border-slate-700/50 rounded-2xl shadow-2xl overflow-hidden">
            <div className="px-6 py-4 border-b border-slate-700/50">
              <p className="text-xs font-bold uppercase tracking-widest text-slate-400">Shipping Details</p>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-slate-700/50">
                    <th className="text-left px-6 py-3 text-xs font-bold uppercase tracking-widest text-slate-500">Name</th>
                    <th className="text-left px-6 py-3 text-xs font-bold uppercase tracking-widest text-slate-500">Phone</th>
                    <th className="text-left px-6 py-3 text-xs font-bold uppercase tracking-widest text-slate-500">Address</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="px-6 py-4 text-white font-medium">{user?.name || "-"}</td>
                    <td className="px-6 py-4 text-slate-300">{shippingInfo?.phoneNumber || "-"}</td>
                    <td className="px-6 py-4 text-slate-300">
                      {shippingInfo?.address || "-"}, {shippingInfo?.city || "-"},{" "}
                      {shippingInfo?.state || "-"}, {shippingInfo?.country || "-"},{" "}
                      {shippingInfo?.pincode || "-"}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* ── Cart Items ── */}
          <div className="bg-slate-800/60 backdrop-blur-sm border border-slate-700/50 rounded-2xl shadow-2xl overflow-hidden">
            <div className="px-6 py-4 border-b border-slate-700/50">
              <p className="text-xs font-bold uppercase tracking-widest text-slate-400">Cart Items</p>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-slate-700/50">
                    <th className="text-left px-6 py-3 text-xs font-bold uppercase tracking-widest text-slate-500">Image</th>
                    <th className="text-left px-6 py-3 text-xs font-bold uppercase tracking-widest text-slate-500">Product Name</th>
                    <th className="text-left px-6 py-3 text-xs font-bold uppercase tracking-widest text-slate-500">Price</th>
                    <th className="text-left px-6 py-3 text-xs font-bold uppercase tracking-widest text-slate-500">Quantity</th>
                    <th className="text-left px-6 py-3 text-xs font-bold uppercase tracking-widest text-slate-500">Total Price</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-700/50">
                  {cartItems.map((item) => (
                    <tr key={item.product || item._id} className="hover:bg-slate-700/20 transition-all duration-150">
                      <td className="px-6 py-4">
                        <div className="w-12 h-12 rounded-xl overflow-hidden border border-slate-700/50 bg-slate-900/50">
                          <img
                            src={item?.image?.url || item?.image}
                            alt={item?.name || "product"}
                            className="w-full h-full object-cover object-center"
                          />
                        </div>
                      </td>
                      <td className="px-6 py-4 text-white font-medium">{item.name}</td>
                      <td className="px-6 py-4 text-slate-300">₹{Number(item.price).toFixed(2)}</td>
                      <td className="px-6 py-4 text-slate-300">{item.quantity}</td>
                      <td className="px-6 py-4 text-amber-500 font-bold">₹{(Number(item.price) * item.quantity).toFixed(2)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* ── Order Summary ── */}
          <div className="bg-slate-800/60 backdrop-blur-sm border border-slate-700/50 rounded-2xl shadow-2xl overflow-hidden">
            <div className="px-6 py-4 border-b border-slate-700/50">
              <p className="text-xs font-bold uppercase tracking-widest text-slate-400">Order Summary</p>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-slate-700/50">
                    <th className="text-left px-6 py-3 text-xs font-bold uppercase tracking-widest text-slate-500">Subtotal</th>
                    <th className="text-left px-6 py-3 text-xs font-bold uppercase tracking-widest text-slate-500">Shipping</th>
                    <th className="text-left px-6 py-3 text-xs font-bold uppercase tracking-widest text-slate-500">GST</th>
                    <th className="text-left px-6 py-3 text-xs font-bold uppercase tracking-widest text-slate-500">Total</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="px-6 py-4 text-slate-300">₹{subTotal.toFixed(2)}</td>
                    <td className="px-6 py-4 text-slate-300">₹{shippingCharges.toFixed(2)}</td>
                    <td className="px-6 py-4 text-slate-300">₹{tax.toFixed(2)}</td>
                    <td className="px-6 py-4 text-amber-500 font-extrabold text-base">₹{total.toFixed(2)}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* ── Proceed Button ── */}
          <div className="flex justify-end">
            <button
              onClick={proceedToPayment}
              className="px-10 py-3.5 rounded-xl font-bold text-sm tracking-widest uppercase transition-all duration-200 bg-amber-500 hover:bg-amber-300 text-slate-900 shadow-lg shadow-amber-500/20 hover:shadow-amber-500/40 active:scale-[0.98]"
            >
              Proceed To Payment
            </button>
          </div>

        </div>
      </div>

      <Footer />
    </>
  );
}

export default OrderConfirm;
