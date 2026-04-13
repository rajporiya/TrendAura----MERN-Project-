import React, { useState } from "react";
import "../componentStyles/Navbar.css";
import { Link, useNavigate } from "react-router-dom";
import SearchIcon from "@mui/icons-material/Search";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import PersonAdd from "@mui/icons-material/PersonAdd";
import CloseIcon from "@mui/icons-material/Close";
import MenuIcon from "@mui/icons-material/Menu";
import "../PageStyles/Search.css";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../feature/user/userSlice";
import useTheme from "../hooks/useTheme";
import ThemeToggle from "./ThemeToggle";

function Navbar() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { theme, toggleTheme } = useTheme();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const [profileOpen, setProfileOpen] = useState(false);
  const toggleProfile = () => setProfileOpen(!profileOpen);
  const [isSearchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const toggleSearch = () => setSearchOpen(!isSearchOpen);
  const { isAuthenticated, user } = useSelector((state) => state.user);
  const { cartItems } = useSelector((state) => state.cart);
  const { wishlistItems } = useSelector((state) => state.wishlist);

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
    { name: "Wishlist", funcName: () => { navigate("/wishlist"); setProfileOpen(false); }, isWishlist: true },
    { name: "Cart", funcName: () => { navigate("/cart"); setProfileOpen(false); }, isCart: true },
    ...(user?.role === "admin"
      ? [{ name: "Dashboard", funcName: () => { navigate("/admin/dashboard"); setProfileOpen(false); } }]
      : []),
    { name: "Logout", funcName: handleLogout },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 glass-navbar">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 gap-4">

          {/* ── Logo ── */}
          <div className="shrink-0">
            <Link
              to="/"
              onClick={() => setIsMenuOpen(false)}
              className="text-xl font-bold text-[var(--navbar-text)] hover:text-[var(--primary-dark)] tracking-tight transition-colors duration-200"
            >
              Trend<span className="text-[var(--primary-dark)]">Aura</span>
            </Link>
          </div>

          {/* ── Desktop Nav Links ── */}
          <ul className="hidden md:flex items-center gap-1">
            <li>
              <Link to="/" onClick={() => setIsMenuOpen(false)}
                className="px-3 py-2 rounded-lg text-sm font-medium text-[var(--navbar-muted)] hover:text-[var(--primary-dark)] hover:bg-[var(--navbar-icon-bg-hover)] transition-all duration-150">
                Home
              </Link>
            </li>
            <li>
              <Link to="/products"
                className="px-3 py-2 rounded-lg text-sm font-medium text-[var(--navbar-muted)] hover:text-[var(--primary-dark)] hover:bg-[var(--navbar-icon-bg-hover)] transition-all duration-150">
                Product
              </Link>
            </li>
            <li>
              <Link to="/about-us"
                className="px-3 py-2 rounded-lg text-sm font-medium text-[var(--navbar-muted)] hover:text-[var(--primary-dark)] hover:bg-[var(--navbar-icon-bg-hover)] transition-all duration-150">
                About Us
              </Link>
            </li>
            <li>
              <Link to="/contact-us"
                className="px-3 py-2 rounded-lg text-sm font-medium text-[var(--navbar-muted)] hover:text-[var(--primary-dark)] hover:bg-[var(--navbar-icon-bg-hover)] transition-all duration-150">
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
                className={`flex items-center transition-all duration-300 overflow-hidden ${isSearchOpen ? "w-44 sm:w-56" : "w-0"}`}
              >
                <input
                  type="text"
                  placeholder="Search Product.."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-[var(--card-bg)] border border-[var(--border)] focus:border-[var(--primary)] focus:ring-1 focus:ring-[var(--primary-light)] text-[var(--text-primary)] placeholder-[var(--text-light)] rounded-xl pl-3 pr-3 py-1.5 text-sm outline-none transition-all duration-200"
                />
              </form>
              <button
                type="button"
                onClick={toggleSearch}
                className="flex items-center justify-center w-9 h-9 rounded-xl text-[var(--navbar-muted)] hover:text-[var(--primary-dark)] hover:bg-[var(--navbar-icon-bg-hover)] transition-all duration-150 shrink-0"
              >
                <SearchIcon style={{ fontSize: 20 }} />
              </button>
            </div>

            {/* ── Slider Theme Toggle ── */}
            <ThemeToggle theme={theme} onToggle={toggleTheme} />

            {/* Wishlist */}
            {isAuthenticated && (
              <div className="relative">
                <Link to="/wishlist"
                  className="flex items-center justify-center w-9 h-9 rounded-xl text-[var(--navbar-muted)] hover:text-[var(--primary-dark)] hover:bg-[var(--navbar-icon-bg-hover)] transition-all duration-150">
                  <FavoriteBorderIcon style={{ fontSize: 20 }} />
                  {wishlistItems?.length > 0 && (
                    <span className="absolute -top-1 -right-1 min-w-4.5 h-4.5 px-1 rounded-full bg-[var(--primary)] text-white text-xs font-bold flex items-center justify-center leading-none">
                      {wishlistItems.length}
                    </span>
                  )}
                </Link>
              </div>
            )}

            {/* Cart */}
            <div className="relative">
              <Link to="/cart"
                className="flex items-center justify-center w-9 h-9 rounded-xl text-[var(--navbar-muted)] hover:text-[var(--primary-dark)] hover:bg-[var(--navbar-icon-bg-hover)] transition-all duration-150">
                <ShoppingCartIcon style={{ fontSize: 20 }} />
                {cartItems?.length > 0 && (
                  <span className="absolute -top-1 -right-1 min-w-4.5 h-4.5 px-1 rounded-full bg-[var(--primary)] text-white text-xs font-bold flex items-center justify-center leading-none">
                    {cartItems.length}
                  </span>
                )}
              </Link>
            </div>

            {/* Register */}
            {!isAuthenticated && (
              <Link to="/register"
                className="flex items-center justify-center w-9 h-9 rounded-xl text-[var(--navbar-muted)] hover:text-[var(--primary-dark)] hover:bg-[var(--navbar-icon-bg-hover)] transition-all duration-150">
                <PersonAdd style={{ fontSize: 20 }} />
              </Link>
            )}

            {/* ── Profile Dropdown ── */}
            {isAuthenticated && (
              <div className="relative">
                <div
                  className={`fixed left-0 right-0 top-16 bottom-0 z-40 bg-[var(--overlay-bg)] backdrop-blur-sm transition-opacity duration-300 ${profileOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}`}
                  onClick={toggleProfile}
                />
                <div
                  onClick={toggleProfile}
                  className="relative z-50 flex items-center gap-2 px-2.5 py-1.5 rounded-xl bg-[var(--navbar-bg)] border border-[var(--navbar-border)] hover:border-[var(--primary)] cursor-pointer transition-all duration-200 select-none"
                >
                  <div className="w-7 h-7 rounded-lg overflow-hidden border border-[var(--navbar-border)] shrink-0">
                    <img
                      src={user?.avatar?.url || "./images/profile.png"}
                      alt="Profile"
                      className="w-full h-full object-cover"
                      onError={(e) => { e.target.src = "./images/profile.png"; }}
                    />
                  </div>
                  <span className="hidden sm:block text-sm font-semibold text-[var(--navbar-text)] max-w-25 truncate">
                    {user?.name || "User"}
                  </span>
                  <svg
                    className={`w-3.5 h-3.5 text-[var(--navbar-muted)] transition-transform duration-200 ${profileOpen ? "rotate-180" : ""}`}
                    fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                  </svg>
                </div>

                {profileOpen && (
                  <div className="absolute right-0 mt-2 w-52 glass-panel rounded-2xl shadow-2xl overflow-hidden z-50">
                    <div className="px-4 py-3 border-b border-[var(--navbar-border)] flex items-center gap-2.5">
                      <div className="w-8 h-8 rounded-lg overflow-hidden border border-[var(--navbar-border)] shrink-0">
                        <img
                          src={user?.avatar?.url || "./images/profile.png"}
                          alt="Profile"
                          className="w-full h-full object-cover"
                          onError={(e) => { e.target.src = "./images/profile.png"; }}
                        />
                      </div>
                      <div className="min-w-0">
                        <p className="text-xs font-semibold text-[var(--navbar-text)] truncate">{user?.name || "User"}</p>
                        <p className="text-xs text-[var(--text-light)] truncate">{user?.email || ""}</p>
                      </div>
                    </div>
                    <div className="p-1.5 flex flex-col gap-0.5">
                      {options && options.map((item) => (
                        <button
                          onClick={item.funcName}
                          key={item.name}
                          className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-150 text-left ${
                            item.isCart && cartItems.length > 0
                              ? "text-[var(--primary-dark)] bg-[var(--primary-light)] hover:bg-[var(--primary-light)] border border-[var(--primary)]"
                              : item.isWishlist && wishlistItems.length > 0
                                ? "text-[var(--primary-dark)] bg-[var(--primary-light)] hover:bg-[var(--primary-light)] border border-[var(--primary)]"
                                : "text-[var(--navbar-muted)] hover:text-[var(--primary-dark)] hover:bg-[var(--navbar-icon-bg-hover)]"
                          }`}
                        >
                          <span>{item.name}</span>
                          {item.isCart && cartItems.length > 0 && (
                            <span className="ml-2 min-w-5 h-5 px-1.5 rounded-full bg-[var(--primary)] text-white text-xs font-bold flex items-center justify-center">
                              {cartItems.length}
                            </span>
                          )}
                          {item.isWishlist && wishlistItems.length > 0 && (
                            <span className="ml-2 min-w-5 h-5 px-1.5 rounded-full bg-[var(--primary)] text-white text-xs font-bold flex items-center justify-center">
                              {wishlistItems.length}
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
              className="flex md:hidden items-center justify-center w-9 h-9 rounded-xl text-[var(--navbar-muted)] hover:text-[var(--primary-dark)] hover:bg-[var(--navbar-icon-bg-hover)] transition-all duration-150"
            >
              {isMenuOpen ? <CloseIcon style={{ fontSize: 20 }} /> : <MenuIcon style={{ fontSize: 20 }} />}
            </button>

          </div>
        </div>

        {/* ── Mobile Menu ── */}
        {isMenuOpen && (
          <div className="md:hidden border-t border-[var(--navbar-border)] py-3 flex flex-col gap-1">
            <Link to="/" onClick={() => setIsMenuOpen(false)}
              className="px-4 py-2.5 rounded-xl text-sm font-medium text-[var(--navbar-muted)] hover:text-[var(--primary-dark)] hover:bg-[var(--navbar-icon-bg-hover)] transition-all duration-150">
              Home
            </Link>
            <Link to="/products" onClick={() => setIsMenuOpen(false)}
              className="px-4 py-2.5 rounded-xl text-sm font-medium text-[var(--navbar-muted)] hover:text-[var(--primary-dark)] hover:bg-[var(--navbar-icon-bg-hover)] transition-all duration-150">
              Product
            </Link>
            <Link to="/about-us" onClick={() => setIsMenuOpen(false)}
              className="px-4 py-2.5 rounded-xl text-sm font-medium text-[var(--navbar-muted)] hover:text-[var(--primary-dark)] hover:bg-[var(--navbar-icon-bg-hover)] transition-all duration-150">
              About Us
            </Link>
            <Link to="/contact-us" onClick={() => setIsMenuOpen(false)}
              className="px-4 py-2.5 rounded-xl text-sm font-medium text-[var(--navbar-muted)] hover:text-[var(--primary-dark)] hover:bg-[var(--navbar-icon-bg-hover)] transition-all duration-150">
              Contact Us
            </Link>

            {/* Theme toggle row in mobile menu */}
            <div className="flex items-center justify-between px-4 py-2.5 mt-1">
              <span className="text-sm font-medium text-[var(--navbar-muted)]">
                {theme === "dark" ? "Dark Mode" : "Light Mode"}
              </span>
              <ThemeToggle theme={theme} onToggle={toggleTheme} />
            </div>
          </div>
        )}

      </div>
    </nav>
  );
}

export default Navbar;