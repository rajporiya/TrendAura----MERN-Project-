import React, { useState } from "react";
import "../componentStyles/Product.css";
import { Link, useNavigate } from "react-router-dom";
import Rating from "@mui/material/Rating";
import "../componentStyles/Rating.css";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { useDispatch, useSelector } from "react-redux";
import { addProductToWishlist, removeProductFromWishlist } from "../feature/wishlist/wishlistSlice";
import { toast } from "react-toastify";

function Product({ product }) {
  const [rating, setRating] = useState(0);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isAuthenticated } = useSelector((state) => state.user);
  const { wishlistItems, loading } = useSelector((state) => state.wishlist);
  const isInWishlist = wishlistItems.some((item) => item._id === product?._id);

  const handleRatingChange = (newRating) => {
    setRating(newRating);
  };
  const handleWishlistToggle = (e) => {
    e.preventDefault();
    e.stopPropagation();

    if (!isAuthenticated) {
      toast.error("Please login to manage wishlist", {
        position: "top-right",
        autoClose: 2000,
      });
      navigate("/login");
      return;
    }

    if (!product?._id) {
      return;
    }

    if (isInWishlist) {
      dispatch(removeProductFromWishlist(product._id));
      return;
    }
    dispatch(addProductToWishlist(product._id));
  };
  // console.log(product);

  return (
<Link to={`/product/${product._id}`} className="block group">
  <div className="mt-5 bg-white dark:bg-slate-800/60 backdrop-blur-sm border border-gray-200 dark:border-slate-700/50 rounded-2xl overflow-hidden hover:border-amber-500/30 hover:shadow-xl hover:shadow-amber-500/10 transition-all duration-300 hover:-translate-y-1">

    {/* Product Image — fixed height so all cards are equal */}
    <div className="relative overflow-hidden bg-gray-100 dark:bg-slate-900/50 w-full h-56">
      <button
        onClick={handleWishlistToggle}
        disabled={loading}
        className={`absolute top-2 right-2 z-10 w-9 h-9 rounded-full border backdrop-blur-sm flex items-center justify-center transition-all duration-200 ${
          isInWishlist
            ? "bg-rose-400/20 border-rose-400/30 text-rose-500 dark:text-rose-300"
            : "bg-white/60 dark:bg-slate-900/60 border-gray-300/70 dark:border-slate-600/70 text-gray-600 dark:text-slate-200 hover:border-rose-400/40 hover:text-rose-500 dark:hover:text-rose-300"
        } disabled:opacity-60 disabled:cursor-not-allowed`}
      >
        {isInWishlist ? <FavoriteIcon sx={{ fontSize: 18 }} /> : <FavoriteBorderIcon sx={{ fontSize: 18 }} />}
      </button>
      <img
        src={
          product?.image?.[0]?.url ||
          product?.image?.[0]?.uri?.replace("./public", "") ||
          "/images/no-products.png"
        }
        alt={product?.name}
        className="w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-105"
      />
      {/* Hover overlay */}
      <div className="absolute inset-0 bg-linear-to-t from-slate-900/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
    </div>

    {/* Product Details */}
    <div className="p-4 flex flex-col gap-2.5">

      {/* Name */}
      <h3 className="text-sm font-semibold text-gray-900 dark:text-white leading-snug line-clamp-2 group-hover:text-amber-500 dark:group-hover:text-amber-300 transition-colors duration-200">
        {product.name}
      </h3>

      {/* Price */}
      <p className="text-xs text-gray-500 dark:text-slate-400">
        Price:{" "}
        <strong className="text-amber-500 dark:text-amber-500 text-sm font-bold">
          ₹{product.price}
        </strong>
      </p>

      {/* Rating */}
      <div className="flex items-center gap-2">
        <Rating
          value={product?.ratting ?? product?.rating ?? 0}
          onChange={(_, newValue) => handleRatingChange(newValue)}
          disabled={true}
          size="small"
        />
        <span className="text-xs text-gray-400 dark:text-slate-500">
          ({product?.numOfReview ?? product?.numOfReviews ?? 0}{" "}
          {(product?.numOfReview ?? product?.numOfReviews ?? 0) === 1 ? "Review" : "Reviews"})
        </span>
      </div>

      {/* Divider */}
      <div className="h-px bg-gray-200 dark:bg-slate-700/50" />

      {/* View Details Button */}
      <button className="w-full py-2.5 rounded-xl text-xs font-bold uppercase tracking-widest bg-amber-500 hover:bg-amber-400 dark:hover:bg-amber-300 text-slate-900 shadow-md shadow-amber-500/20 hover:shadow-amber-500/40 active:scale-[0.98] transition-all duration-200">
        View Details
      </button>

    </div>
  </div>
</Link>
  );
}
export default Product;
