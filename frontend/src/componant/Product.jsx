import React, { useState } from "react";
import "../componentStyles/Product.css";
import { Link } from "react-router-dom";
import Rating from "@mui/material/Rating";
import "../componentStyles/Rating.css";

function Product({ product }) {
  const [rating, setRating] = useState(0);
  const handleRatingChange = (newRating) => {
    setRating(newRating);
  };
  // console.log(product);

  return (

<Link to={`/product/${product._id}`} className="block group">
  <div className="mt-5 bg-slate-800/60 backdrop-blur-sm border border-slate-700/50 rounded-2xl overflow-hidden hover:border-amber-400/30 hover:shadow-xl hover:shadow-amber-400/10 transition-all duration-300 hover:-translate-y-1">

    {/* Product Image — fixed height so all cards are equal */}
    <div className="relative overflow-hidden bg-slate-900/50 w-full h-56">
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
      <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
    </div>

    {/* Product Details */}
    <div className="p-4 flex flex-col gap-2.5">

      {/* Name */}
      <h3 className="text-sm font-semibold text-white leading-snug line-clamp-2 group-hover:text-amber-300 transition-colors duration-200">
        {product.name}
      </h3>

      {/* Price */}
      <p className="text-xs text-slate-400">
        Price:{" "}
        <strong className="text-amber-400 text-sm font-bold">
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
        <span className="text-xs text-slate-500">
          ({product?.numOfReview ?? product?.numOfReviews ?? 0}{" "}
          {(product?.numOfReview ?? product?.numOfReviews ?? 0) === 1 ? "Review" : "Reviews"})
        </span>
      </div>

      {/* Divider */}
      <div className="h-px bg-slate-700/50" />

      {/* View Details Button */}
      <button className="w-full py-2.5 rounded-xl text-xs font-bold uppercase tracking-widest bg-amber-400 hover:bg-amber-300 text-slate-900 shadow-md shadow-amber-400/20 hover:shadow-amber-400/40 active:scale-[0.98] transition-all duration-200">
        View Details
      </button>

    </div>
  </div>
</Link>
  );
}
export default Product;
