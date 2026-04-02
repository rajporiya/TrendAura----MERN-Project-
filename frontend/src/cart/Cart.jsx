import React from "react";
import "../CartStyles/Cart.css";
import Navbar from "../componant/Navbar";
import Footer from "../componant/Footer";
import PageTitle from "../componant/PageTitle";
import CartItem from "./CartItem";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
function Cart() {
  const navigate = useNavigate();
  const { cartItems } = useSelector((state) => state.cart);
  const { isAuthenticated } = useSelector((state) => state.user);
  const subTotal = cartItems.reduce((acc, item)=> acc+item.price * item.quantity ,0)
  const tax = (subTotal * 0.18)
  const shippngCharges = subTotal >500 ? 0 :  100;
  const total = subTotal + tax + shippngCharges;
  
  const checkOutHandlier=()=>{
    if (isAuthenticated) {
      navigate('/shipping');
    } else {
      navigate('/login?redirect=/shipping');
    }
  }
  return (
   <>
      <Navbar />
      <PageTitle title="Your Cart" />

      {cartItems.length === 0 ? (
        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex flex-col items-center justify-center gap-5">
          <div className="w-16 h-16 rounded-2xl bg-slate-700/30 border border-slate-600/50 flex items-center justify-center">
            <svg className="w-8 h-8 text-slate-500" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" />
            </svg>
          </div>
          <p className="text-slate-400 text-lg font-medium">Your cart is empty</p>
          <Link
            to="/products"
            className="px-6 py-2.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-900 font-bold text-sm tracking-widest uppercase transition-all duration-200 shadow-lg shadow-amber-400/20"
          >
            Go To Products
          </Link>
        </div>
      ) : (
        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 px-4 pt-6 pb-12">
          <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-6 items-start">

            {/* ── Cart Items ── */}
            <div className="mt-20 flex-1 bg-slate-800/60 backdrop-blur-sm border border-slate-700/50 rounded-2xl shadow-2xl overflow-hidden">

              {/* Heading */}
              <div className="px-6 py-5 border-b border-slate-700/50 flex items-center gap-2">
                <div className="w-1 h-5 rounded-full bg-amber-400" />
                <h2 className="text-lg font-bold text-white tracking-tight">Your Cart</h2>
              </div>

              {/* Table Header */}
              <div className="hidden md:grid grid-cols-4 px-6 py-3 text-xs font-bold uppercase tracking-widest text-slate-500 border-b border-slate-700/50">
                <div>Product</div>
                <div className="text-center">Quantity</div>
                <div className="text-center">Item Total</div>
                <div className="text-center">Actions</div>
              </div>

              {/* Cart Items */}
              <div className="divide-y divide-slate-700/50">
                {cartItems && cartItems.map((item) => (
                  <CartItem item={item} key={item.name} />
                ))}
              </div>
            </div>

            {/* ── Price Summary ── */}
            <div className="mt-20 w-full lg:w-80 shrink-0 bg-slate-800/60 backdrop-blur-sm border border-slate-700/50 rounded-2xl shadow-2xl overflow-hidden sticky top-6">

              {/* Heading */}
              <div className="px-6 py-5 border-b border-slate-700/50 flex items-center gap-2">
                <div className="w-1 h-5 rounded-full bg-amber-400" />
                <h3 className="text-lg font-bold text-white tracking-tight">Price Summary</h3>
              </div>

              <div className="px-6 py-5 flex flex-col gap-3">

                {/* Subtotal */}
                <div className="flex items-center justify-between text-sm">
                  <span className="text-slate-400">Subtotal</span>
                  <span className="text-white font-medium">₹{subTotal}</span>
                </div>

                {/* Tax */}
                <div className="flex items-center justify-between text-sm">
                  <span className="text-slate-400">Tax (18%)</span>
                  <span className="text-white font-medium">₹{tax}</span>
                </div>

                {/* Shipping */}
                <div className="flex items-center justify-between text-sm">
                  <span className="text-slate-400">Shipping Charge</span>
                  <span className="text-white font-medium">₹{shippngCharges}</span>
                </div>

                {/* Divider */}
                <div className="h-px bg-slate-700/50 my-1" />

                {/* Total */}
                <div className="flex items-center justify-between">
                  <span className="text-white font-bold text-base">Total</span>
                  <span className="text-amber-400 font-extrabold text-xl">₹{total.toFixed(2)}</span>
                </div>

                {/* Checkout Button */}
                <button
                  onClick={checkOutHandlier}
                  className="w-full mt-2 py-3.5 rounded-xl font-bold text-sm tracking-widest uppercase transition-all duration-200 bg-amber-400 hover:bg-amber-300 text-slate-900 shadow-lg shadow-amber-400/20 hover:shadow-amber-400/40 active:scale-[0.98]"
                >
                  Proceed to Checkout
                </button>
              </div>
            </div>

          </div>
        </div>
      )}

      <Footer />
    </>
  );
}

export default Cart;
