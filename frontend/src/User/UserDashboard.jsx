import React, { useState } from "react";
import "../UserStyles/UserDashboard.css";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout, removeSuccess } from "../feature/user/userSlice.js";
import { toast } from "react-toastify";
import { removeError } from "../feature/product/productSllice";
import useTheme from "../hooks/useTheme";

function UserDashboard({ user }) {
  const [menuVisible, setMenuVisible] = useState(false);
  const { cartItems } = useSelector((state) => state.cart);

  const { theme } = useTheme();
  const isDark = theme === "dark";
  const toggleMenu = () => {
    setMenuVisible((prev) => !prev);
  };
  const closeMenu = () => {
    setMenuVisible(false);
  };
  const dispatch = useDispatch();
  const options = [
    { name: "Orders", funcName: orders },
    { name: "Account", funcName: account },
    { name: `cart (${cartItems.length})`, funcName: myCart, isCart: true },
    { name: "Logout", funcName: logoutUser },
  ];
  if (user.role === "admin") {
    options.unshift({
      name: "Admin",
      funcName: dashboard,
    });
  }
  const navigate = useNavigate();

  function orders() {
    setMenuVisible(false);
    navigate("/orders/user");
  }
  function account() {
    setMenuVisible(false);
    navigate("/profile");
  }
  function logoutUser() {
    setMenuVisible(false);
    dispatch(logout())
      .unwrap()
      .then(() => {
        toast.success("Logout Successful", {
          position: "top-right",
          autoClose: 3000,
        });
        dispatch(removeSuccess());
        navigate("/login");
      })
      .catch((error) => {
        toast.error(error?.message || "Logout failed", {
          position: "top-right",
          autoClose: 3000,
        });
        dispatch(removeError());
      });
  }
  function dashboard() {
    setMenuVisible(false);
    navigate('/admin/dashboard')
  }
  function myCart() {
    navigate("/cart");
  }
  return (
<>
  {/* Overlay */}
  <div
    className={`fixed inset-0 z-40 backdrop-blur-sm transition-opacity duration-300 ${
      menuVisible ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
    } ${isDark ? "bg-slate-900/60" : "bg-slate-500/30"}`}
    onClick={toggleMenu}
  />

  {/* Dashboard Container */}
  <div className="relative z-50">

    {/* Profile Header / Trigger */}
    <div
      onClick={toggleMenu}
      className={`flex items-center gap-2.5 px-3 py-1.5 rounded-xl border cursor-pointer transition-all duration-200 select-none ${
        isDark
          ? "bg-slate-800/80 border-slate-700/50 hover:border-amber-500/30 hover:bg-slate-800"
          : "bg-white/80 border-slate-200 hover:border-amber-400/50 hover:bg-white"
      }`}
    >
      <div
        className={`w-8 h-8 rounded-lg overflow-hidden flex-shrink-0 border ${
          isDark ? "border-amber-500/20" : "border-amber-400/30"
        }`}
      >
        <img
          src={user?.avatar?.url || "./images/profile.png"}
          alt="Profile"
          className="w-full h-full object-cover"
          onError={(e) => { e.target.src = "./images/profile.png"; }}
        />
      </div>
      <span
        className={`text-sm font-semibold max-w-[120px] truncate transition-colors duration-300 ${
          isDark ? "text-white" : "text-slate-800"
        }`}
      >
        {user.name || "User"}
      </span>
      {/* Chevron */}
      <svg
        className={`w-3.5 h-3.5 transition-transform duration-200 ${
          menuVisible ? "rotate-180" : ""
        } ${isDark ? "text-slate-400" : "text-slate-500"}`}
        fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24"
      >
        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
      </svg>
    </div>

    {/* Dropdown Menu */}
    {menuVisible && (
      <div
        className={`absolute right-0 mt-2 w-52 backdrop-blur-sm border rounded-2xl shadow-2xl overflow-hidden transition-colors duration-300 ${
          isDark
            ? "bg-slate-800/95 border-slate-700/50 shadow-slate-900/50"
            : "bg-white/95 border-slate-200 shadow-slate-200/80"
        }`}
      >

        {/* Menu Header */}
        <div
          className={`px-4 py-3 border-b flex items-center gap-2.5 ${
            isDark ? "border-slate-700/50" : "border-slate-100"
          }`}
        >
          <div
            className={`w-8 h-8 rounded-lg overflow-hidden flex-shrink-0 border ${
              isDark ? "border-amber-500/20" : "border-amber-400/30"
            }`}
          >
            <img
              src={user?.avatar?.url || "./images/profile.png"}
              alt="Profile"
              className="w-full h-full object-cover"
              onError={(e) => { e.target.src = "./images/profile.png"; }}
            />
          </div>
          <div className="min-w-0">
            <p
              className={`text-xs font-semibold truncate ${
                isDark ? "text-white" : "text-slate-800"
              }`}
            >
              {user.name || "User"}
            </p>
            <p
              className={`text-xs truncate ${
                isDark ? "text-slate-500" : "text-slate-400"
              }`}
            >
              {user.email || ""}
            </p>
          </div>
        </div>

        {/* Menu Options */}
        <div className="p-1.5 flex flex-col gap-0.5">
          {options &&
            options.map((item) => (
              <button
                onClick={item.funcName}
                key={item.name}
                className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-150 text-left
                  ${item.isCart && cartItems.length > 0
                    ? "text-amber-500 bg-amber-500/10 hover:bg-amber-500/20 border border-amber-500/20"
                    : isDark
                      ? "text-slate-300 hover:text-white hover:bg-slate-700/60"
                      : "text-slate-600 hover:text-slate-900 hover:bg-slate-100"
                  }`}
              >
                <span>{item.name}</span>
                {/* Cart badge */}
                {item.isCart && cartItems.length > 0 && (
                  <span className="ml-2 min-w-[20px] h-5 px-1.5 rounded-full bg-amber-500 text-slate-900 text-xs font-bold flex items-center justify-center">
                    {cartItems.length}
                  </span>
                )}
              </button>
            ))}
        </div>

      </div>
    )}
  </div>
</>
  );
}

export default UserDashboard;
