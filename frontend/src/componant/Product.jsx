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
    <Link to={`/product/${product._id}`} className="product_id">
      <div className="product-cart">
        <img 
          src={
            product?.image?.[0]?.url ||
            product?.image?.[0]?.uri?.replace("./public", "") ||
            "/images/no-products.png"
          }
          alt={product?.name}
          className="product-image-card"
        />
        <div className="product-details">
          <h3 className="product-title">{product.name} </h3>
          <p className="home-price">
            Price : <strong>{product.price}</strong>
          </p>
          <div className="rating-container">
            <Rating
              value={product?.ratting ?? product?.rating ?? 0}
              onChange={(_, newValue) => handleRatingChange(newValue)}
              disabled={true}
            />
          </div>
          <span className="productCardSpan">
            ( {product?.numOfReview ?? product?.numOfReviews ?? 0}
            {(product?.numOfReview ?? product?.numOfReviews ?? 0) === 1 ? "Review" : "Reviews"})
          </span>
          <button className="add-to-cart">View Details</button>
        </div>
      </div>
    </Link>
  );
}
export default Product;
