import React, { useState } from "react";
import "../componentStyles/Navbar.css";
import { Link, useNavigate } from "react-router-dom";
import SearchIcon from "@mui/icons-material/Search";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import PersonAdd from "@mui/icons-material/PersonAdd";
import CloseIcon from "@mui/icons-material/Close";
import MenuIcon from "@mui/icons-material/Menu";
import "../PageStyles/Search.css";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../feature/user/userSlice";

function Navbar() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const [profileOpen, setProfileOpen] = useState(false);
  const toggleProfile = () => setProfileOpen(!profileOpen);
  const [isSearchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const toggleSearch = () => setSearchOpen(!isSearchOpen);
  const { isAuthenticated, user } = useSelector((state) => state.user);
  const { cartItems } = useSelector((state) => state.cart);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/products?keyword=${encodeURIComponent(searchQuery)}`);
    } else {
      navigate(`/products`);
    }
  };

  const handleLogout = () => {
    dispatch(logout());
    setIsMenuOpen(false);
    setProfileOpen(false);
    navigate("/login");
  };

  const options = [
    { name: "Profile", funcName: () => { navigate("/profile"); setProfileOpen(false); } },
    { name: "My Orders", funcName: () => { navigate("/orders/user"); setProfileOpen(false); } },
    { name: "Cart", funcName: () => { navigate("/cart"); setProfileOpen(false); }, isCart: true },
    ...(user?.role === "admin"
      ? [{ name: "Dashboard", funcName: () => { navigate("/admin/dashboard"); setProfileOpen(false); } }]
      : []),
    { name: "Logout", funcName: handleLogout },
  ];
  return (
<nav className="fixed top-0 left-0 right-0 z-50 bg-slate-900/95 backdrop-blur-md border-b border-slate-700/50 shadow-lg shadow-slate-900/50">
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <div className="flex items-center justify-between h-16 gap-4">

      {/* ── Logo ── */}
      <div className="flex-shrink-0">
        <Link
          to="/"
          onClick={() => setIsMenuOpen(false)}
          className="text-xl font-bold text-white hover:text-amber-300 tracking-tight transition-colors duration-200"
        >
          Trend
          <span className="text-amber-400">Aura</span>
        </Link>
      </div>

      {/* ── Desktop Nav Links ── */}
      <ul className={`hidden md:flex items-center gap-1`}>
        <li>
          <Link
            to="/"
            onClick={() => setIsMenuOpen(false)}
            className="px-3 py-2 rounded-lg text-sm font-medium text-slate-300 hover:text-white hover:bg-slate-800 transition-all duration-150"
          >
            Home
          </Link>
        </li>
        <li>
          <Link
            to="/products"
            className="px-3 py-2 rounded-lg text-sm font-medium text-slate-300 hover:text-white hover:bg-slate-800 transition-all duration-150"
          >
            Product
          </Link>
        </li>
        <li>
          <Link
            to="/about-us"
            className="px-3 py-2 rounded-lg text-sm font-medium text-slate-300 hover:text-white hover:bg-slate-800 transition-all duration-150"
          >
            About Us
          </Link>
        </li>
        <li>
          <Link
            to="/contact-us"
            className="px-3 py-2 rounded-lg text-sm font-medium text-slate-300 hover:text-white hover:bg-slate-800 transition-all duration-150"
          >
            Contact Us
          </Link>
        </li>
      </ul>

      {/* ── Right Side Icons ── */}
      <div className="flex items-center gap-2 ml-auto">

        {/* Search */}
        <div className="relative flex items-center">
          <form
            onSubmit={handleSearchSubmit}
            className={`flex items-center transition-all duration-300 overflow-hidden ${
              isSearchOpen ? "w-44 sm:w-56" : "w-0"
            }`}
          >
            <input
              type="text"
              placeholder="Search Product.."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-slate-800 border border-slate-700 focus:border-amber-400 focus:ring-1 focus:ring-amber-400/20 text-white placeholder-slate-500 rounded-xl pl-3 pr-3 py-1.5 text-sm outline-none transition-all duration-200"
            />
          </form>
          <button
            type="button"
            onClick={toggleSearch}
            className="flex items-center justify-center w-9 h-9 rounded-xl text-slate-400 hover:text-amber-400 hover:bg-slate-800 transition-all duration-150 flex-shrink-0"
          >
            <SearchIcon style={{ fontSize: 20 }} />
          </button>
        </div>

        {/* Cart */}
        <div className="relative">
          <Link
            to="/cart"
            className="flex items-center justify-center w-9 h-9 rounded-xl text-slate-400 hover:text-amber-400 hover:bg-slate-800 transition-all duration-150"
          >
            <ShoppingCartIcon style={{ fontSize: 20 }} />
            {cartItems?.length > 0 && (
              <span className="absolute -top-1 -right-1 min-w-[18px] h-[18px] px-1 rounded-full bg-amber-400 text-slate-900 text-xs font-bold flex items-center justify-center leading-none">
                {cartItems.length}
              </span>
            )}
          </Link>
        </div>

        {/* Register if not authenticated */}
        {!isAuthenticated && (
          <Link
            to="/register"
            className="flex items-center justify-center w-9 h-9 rounded-xl text-slate-400 hover:text-amber-400 hover:bg-slate-800 transition-all duration-150"
          >
            <PersonAdd style={{ fontSize: 20 }} />
          </Link>
        )}

        {/* ── Dashboard / Profile (RIGHT END) ── */}
        {isAuthenticated && (
        <div className="relative">

          {/* Overlay */}
          <div
            className={`fixed inset-0 z-40 bg-slate-900/60 backdrop-blur-sm transition-opacity duration-300 ${
              profileOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
            }`}
            onClick={toggleProfile}
          />

          {/* Profile Trigger */}
          <div
            onClick={toggleProfile}
            className="relative z-50 flex items-center gap-2 px-2.5 py-1.5 rounded-xl bg-slate-800/80 border border-slate-700/50 hover:border-amber-400/30 hover:bg-slate-800 cursor-pointer transition-all duration-200 select-none"
          >
            <div className="w-7 h-7 rounded-lg overflow-hidden border border-amber-400/20 flex-shrink-0">
              <img
                src={user?.avatar?.url || "./images/profile.png"}
                alt="Profile"
                className="w-full h-full object-cover"
                onError={(e) => { e.target.src = "./images/profile.png"; }}
              />
            </div>
            <span className="hidden sm:block text-sm font-semibold text-white max-w-[100px] truncate">
              {user?.name || "User"}
            </span>
            <svg
              className={`w-3.5 h-3.5 text-slate-400 transition-transform duration-200 ${profileOpen ? "rotate-180" : ""}`}
              fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
            </svg>
          </div>

          {/* Dropdown */}
          {profileOpen && (
            <div className="absolute right-0 mt-2 w-52 bg-slate-800/95 backdrop-blur-sm border border-slate-700/50 rounded-2xl shadow-2xl shadow-slate-900/50 overflow-hidden z-50">

              {/* Dropdown Header */}
              <div className="px-4 py-3 border-b border-slate-700/50 flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg overflow-hidden border border-amber-400/20 flex-shrink-0">
                  <img
                    src={user?.avatar?.url || "./images/profile.png"}
                    alt="Profile"
                    className="w-full h-full object-cover"
                    onError={(e) => { e.target.src = "./images/profile.png"; }}
                  />
                </div>
                <div className="min-w-0">
                  <p className="text-xs font-semibold text-white truncate">{user?.name || "User"}</p>
                  <p className="text-xs text-slate-500 truncate">{user?.email || ""}</p>
                </div>
              </div>

              {/* Dropdown Options */}
              <div className="p-1.5 flex flex-col gap-0.5">
                {options &&
                  options.map((item) => (
                    <button
                      onClick={item.funcName}
                      key={item.name}
                      className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-150 text-left ${
                        item.isCart && cartItems.length > 0
                          ? "text-amber-400 bg-amber-400/10 hover:bg-amber-400/20 border border-amber-400/20"
                          : "text-slate-300 hover:text-white hover:bg-slate-700/60"
                      }`}
                    >
                      <span>{item.name}</span>
                      {item.isCart && cartItems.length > 0 && (
                        <span className="ml-2 min-w-[20px] h-5 px-1.5 rounded-full bg-amber-400 text-slate-900 text-xs font-bold flex items-center justify-center">
                          {cartItems.length}
                        </span>
                      )}
                    </button>
                  ))}
              </div>

            </div>
          )}
        </div>
        )}

        {/* ── Mobile Hamburger ── */}
        <button
          onClick={toggleMenu}
          className="flex md:hidden items-center justify-center w-9 h-9 rounded-xl text-slate-400 hover:text-amber-400 hover:bg-slate-800 transition-all duration-150"
        >
          {isMenuOpen ? (
            <CloseIcon style={{ fontSize: 20 }} />
          ) : (
            <MenuIcon style={{ fontSize: 20 }} />
          )}
        </button>

      </div>
    </div>

    {/* ── Mobile Menu ── */}
    {isMenuOpen && (
      <div className="md:hidden border-t border-slate-700/50 py-3 flex flex-col gap-1">
        <Link
          to="/"
          onClick={() => setIsMenuOpen(false)}
          className="px-4 py-2.5 rounded-xl text-sm font-medium text-slate-300 hover:text-white hover:bg-slate-800 transition-all duration-150"
        >
          Home
        </Link>
        <Link
          to="/products"
          className="px-4 py-2.5 rounded-xl text-sm font-medium text-slate-300 hover:text-white hover:bg-slate-800 transition-all duration-150"
        >
          Product
        </Link>
        <Link
          to="/about-us"
          className="px-4 py-2.5 rounded-xl text-sm font-medium text-slate-300 hover:text-white hover:bg-slate-800 transition-all duration-150"
        >
          About Us
        </Link>
        <Link
          to="/contact-us"
          className="px-4 py-2.5 rounded-xl text-sm font-medium text-slate-300 hover:text-white hover:bg-slate-800 transition-all duration-150"
        >
          Contact Us
        </Link>
      </div>
    )}

  </div>
</nav>  
  );
}

export default Navbar;
