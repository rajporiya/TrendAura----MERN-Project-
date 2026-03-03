import React, { useEffect, useState } from "react";
import "../PageStyles/ProductDetails.css";
import PageTitle from "../componant/PageTitle";
import Navbar from "../componant/Navbar";
import Footer from "../componant/Footer";
import Rating from "@mui/material/Rating";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import {
  getProductDetails,
  removeError,
} from "../feature/product/productSllice";
import { toast } from "react-toastify";
import Loader from "../componant/Loader";

function ProductDetails() {
  const [userRatin, setUserRating] = useState(0);
  const handleRatingChange = (newRating) => {
    setUserRating(newRating);
  };
  const { loading, error, product } = useSelector((state) => state.product);
  const dispatch = useDispatch();
  const { id } = useParams();
  useEffect(() => {
    if (id) {
      dispatch(getProductDetails(id));
    }
  }, [dispatch]);

  useEffect(() => {
    if (error) {
      toast.error(error?.message || error, {
        position: "top-right",
        autoClose: 2000,
      });

      dispatch(removeError());
    }
  }, [error, dispatch]);

  if (loading) {
    return (
      <>
        <Navbar />
        <Loader />
        <Footer />
      </>
    );
  }

  if (error || !product) {
    return (
      <>
        <PageTitle title="Product-Details" />
        <Navbar />
        <Footer />
      </>
    );
  }
  return (
    <>
      <PageTitle title={`${product.name} - Details`} />
      <Navbar />
      <div className="product-details-container">
        <div className="product-detail-container">
          <div className="product-image-container">
            {/* src={product.image[0].url.replace('./', '/')} */}
            <img
              src={"./public/Images/05.jpg"}
              alt={product.name}
              className="product-detail-image"
            />
          </div>
          <div className="product-info">
            <h2>{product.name}</h2>
            <p className="product-description">{product.description}</p>
            <p className="product-price">{product.price}/-</p>
            <div className="product-rating">
              <Rating value={3} disabled={true} />
              <span className="productCardSpan">
                {product.numOfReviews === 1 ? "Review" : "Reviews"}
              </span>
              <div className="stock-status">
                <span
                  className={product.stock > 0 ? "in-Stock" : "out-of-stock"}
                >
                  {" "}
                  {product.stock > 0
                    ? `In Stock(${product.stock} available)`
                    : "Out Of Stock"}
                </span>
              </div>

              {product.stock > 0 && (
                <>
                  <div className="quantity-controls">
                    <span className="quantity-lable">Quantity:</span>
                    <button className="quantity-button">-</button>

                    <input
                      type="text"
                      className="quantity-value"
                      readOnly
                      value={1}
                    />
                    <button className="quantity-button">+</button>
                  </div>
                  <button className="add-to-cart-btn">Add To Cart</button>
                </>
              )}
              <form className="review-form">
                <h3>Write a Review </h3>
                <Rating
                  value={0}
                  disabled={false}
                  onRatingChange={handleRatingChange}
                />
                <textarea
                  className="review-input"
                  placeholder="Write  your review here"
                ></textarea>
                <button className="submit-review-btn">submit review</button>
              </form>
            </div>
          </div>
        </div>

        <div className="review-container">
          <h3>Customer Review</h3>
          {product.reviews && product.reviews.length > 0 ? (
            <div className="review-section">
              {product.review.map((review) => (
                <div className="review-item">
                  <div className="view-header">
                    <Rating value={review.ratibg} disabled={true} />
                  </div>
                  <p className="review-comment">{review.comment}</p>
                  <p className="review-name">By{review.name}</p>
                </div>
              ))}
            </div>
          ) : (
            <p className="no-reviews">No Review </p>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
}

export default ProductDetails;