import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import Navbar from "../componant/Navbar";
import Footer from "../componant/Footer";
import PageTitle from "../componant/PageTitle";
import Loader from "../componant/Loader";
import { addItemsToCart, removeError as removeCartError, removeMessage } from "../feature/cart/cartSlice";
import {
  clearWishlistError,
  clearWishlistMessage,
  removeProductFromWishlist,
} from "../feature/wishlist/wishlistSlice";

function Wishlist() {
  const dispatch = useDispatch();
  const { wishlistItems, loading, error, message, success } = useSelector((state) => state.wishlist);
  const { error: cartError, message: cartMessage, success: cartSuccess } = useSelector((state) => state.cart);

  useEffect(() => {
    if (error) {
      toast.error(error?.message || error, {
        position: "top-right",
        autoClose: 2000,
      });
      dispatch(clearWishlistError());
    }

    if (message && success) {
      toast.success(message, {
        position: "top-right",
        autoClose: 2000,
      });
      dispatch(clearWishlistMessage());
    }
  }, [dispatch, error, message, success]);

  useEffect(() => {
    if (cartError) {
      toast.error(cartError?.message || cartError, {
        position: "top-right",
        autoClose: 2000,
      });
      dispatch(removeCartError());
    }

    if (cartMessage && cartSuccess) {
      toast.success(cartMessage, {
        position: "top-right",
        autoClose: 2000,
      });
      dispatch(removeMessage());
    }
  }, [dispatch, cartError, cartMessage, cartSuccess]);

  const handleMoveToCart = (productId) => {
    dispatch(addItemsToCart({ id: productId, quantity: 1 }));
  };

  const handleRemove = (productId) => {
    dispatch(removeProductFromWishlist(productId));
  };

  return (
    <>
  <Navbar />
  <PageTitle title="My Wishlist" />

  {loading ? (
    <Loader />
  ) : wishlistItems.length === 0 ? (
    <div className="min-h-screen bg-gray-50 dark:bg-[var(--background)] flex flex-col items-center justify-center gap-5">
      <div className="w-16 h-16 rounded-2xl bg-gray-100 dark:bg-[var(--background-light)] border border-gray-200 dark:border-[var(--border)] flex items-center justify-center">
        <svg className="w-8 h-8 text-gray-400 dark:text-[var(--text-light)]" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 8.25c0-1.86-1.507-3.375-3.367-3.375-1.12 0-2.113.55-2.73 1.396-.618-.846-1.61-1.396-2.73-1.396-1.86 0-3.367 1.515-3.367 3.375 0 5.04 6.097 8.885 6.097 8.885s6.097-3.846 6.097-8.885z" />
        </svg>
      </div>
      <p className="text-gray-400 dark:text-[var(--text-light)] text-lg font-medium">Your wishlist is empty</p>
      <Link
        to="/products"
        className="px-6 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-900 font-bold text-sm tracking-widest uppercase transition-all duration-200 shadow-lg shadow-amber-500/20"
      >
        Explore Products
      </Link>
    </div>
  ) : (
    <div className="min-h-screen bg-gray-50 dark:bg-[var(--background)] px-4 pt-24 pb-12">
      <div className="max-w-7xl mx-auto">
        <div className="mb-5 flex items-center gap-2">
          <div className="w-1 h-5 rounded-full bg-amber-500" />
          <h2 className="text-xl font-bold text-gray-900 dark:text-[var(--text-primary)]">My Wishlist</h2>
          <span className="ml-2 text-sm text-gray-400 dark:text-[var(--text-light)]">({wishlistItems.length} items)</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {wishlistItems.map((item) => (
            <div
              key={item._id}
              className="bg-white dark:bg-[var(--card-bg)] backdrop-blur-sm border border-gray-200 dark:border-[var(--border)] rounded-2xl overflow-hidden hover:border-amber-500/30 transition-all duration-300"
            >
              <Link to={`/product/${item._id}`}>
                <div className="h-56 bg-gray-100 dark:bg-[var(--background-light)] overflow-hidden">
                  <img
                    src={item?.image?.[0]?.url || "/images/no-products.png"}
                    alt={item?.name}
                    className="w-full h-full object-cover object-center"
                  />
                </div>
              </Link>

              <div className="p-4 flex flex-col gap-3">
                <Link to={`/product/${item._id}`} className="text-gray-900 dark:text-[var(--text-primary)] font-semibold text-sm line-clamp-2 hover:text-amber-500">
                  {item?.name}
                </Link>
                <p className="text-amber-500 font-bold text-base">₹{item?.price}</p>

                <div className="grid grid-cols-2 gap-2">
                  <button
                    onClick={() => handleMoveToCart(item._id)}
                    className="py-2 rounded-xl text-xs font-bold uppercase tracking-widest bg-amber-500 hover:bg-amber-400 text-slate-900 transition-all duration-200"
                  >
                    Add to Cart
                  </button>
                  <button
                    onClick={() => handleRemove(item._id)}
                    className="py-2 rounded-xl text-xs font-bold uppercase tracking-widest border border-rose-400/40 text-rose-500 hover:bg-rose-400/10 transition-all duration-200"
                  >
                    Remove
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )}

  <Footer />
</>
  );
}

export default Wishlist;