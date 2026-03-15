import React, { useEffect, useState } from "react";
import "../AdminStyles/ReviewsList.css";
import Navbar from "../componant/Navbar";
import PageTitle from "../componant/PageTitle";
import Footer from "../componant/Footer";
import { Delete } from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import {
  clearMessage,
  deleteReview,
  fetchAllProducts,
  fetchProductReview,
  removeError,
  removeSuccess,
} from "../feature/admin/adminSlice";
import { toast } from "react-toastify";
import Loader from "../componant/Loader";
import { useNavigate } from "react-router-dom";

function ReviewsList() {
  const { products, loading, error, reviews, success, message } = useSelector(
    (state) => state.admin,
  );
  const navigate= useNavigate()
  const [selectedProduct, setSelectedProduct] = useState(null);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchAllProducts());
  }, [dispatch]);

  const handleDeleteReview = (productId, reviewId) => {
    const confirm = window.confirm(" Are you sure to delete this review?");
    if (confirm) {
      dispatch(deleteReview({ productId, reviewId }));
    }
  };
  useEffect(() => {
    if (error) {
      toast.error(error?.message || error, {
        position: "top-right",
        autoClose: 2000,
      });
      dispatch(removeError());
    }
    if (success) {
      toast.success(message, {
        position: "top-right",
        autoClose: 2000,
      });
      dispatch(removeSuccess());
      dispatch(clearMessage());
      navigate('/admin/reviews')
    }
  }, [error, dispatch, success, message]);

  if (!products || products.length === 0) {
    return (
      <>
        <Navbar />
        <PageTitle title="All Reviews" />
        <div className="reviews-list-container">
          <h1 className="reviews-list-title">Admin Reviews</h1>
          <p>No products found.</p>
        </div>
        <Footer />
      </>
    );
  }

  const handleViewRevies = (productId) => {
    setSelectedProduct(productId);
    dispatch(fetchProductReview(productId));
  };
  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
          <Navbar />
          <PageTitle title="All Reviews" />
          <div className="reviews-list-container">
            <h1 className="reviews-list-title">Product Reviews</h1>
            <table className="reviews-table">
              <thead>
                <tr>
                  <th>Sl No.</th>
                  <th>Product Name</th>
                  <th>Product Image</th>
                  <th>Number Of Reviews</th>
                  <th>aCTION</th>
                </tr>
              </thead>
              <tbody>
                {products.map((product, index) => (
                  <tr key={product._id}>
                    <td>{index + 1}</td>
                    <td>{product.name}</td>
                    <td>
                      <img
                        className="product-image"
                        src={
                          product?.image?.[0]?.url || "/images/no-products.png"
                        }
                        alt="Product-Image"
                      />
                    </td>
                    <td>{product.numOfReview}</td>
                    <td>
                      {product.numOfReview > 0 && (
                        <button
                          onClick={() => handleViewRevies(product._id)}
                          className="action-btn view-btn"
                        >
                          View Review
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {/* Review For Product */}
            {selectedProduct && reviews && reviews.length > 0 && (
              <div className="reviews-details">
                <h2>Reviews For Product</h2>
                <table className="reviews-table">
                  <thead>
                    <tr>
                      <th>Sl No</th>
                      <th>Reviewer Name</th>
                      <th>Retting</th>
                      <th>Comment</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {reviews.length > 0 ? (
                      reviews.map((review, index) => (
                        <tr key={review._id}>
                          <td>{index + 1}</td>
                          <td>{review.name}</td>
                          <td>{review.rating}</td>
                          <td>{review.comment}</td>
                          <td>
                            <button
                              onClick={() =>
                                handleDeleteReview(selectedProduct, review._id)
                              }
                            >
                              <Delete />
                            </button>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="5">
                          {selectedProduct
                            ? "No reviews for this product"
                            : "Click View Review to load reviews"}
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            )}
          </div>
          <Footer />
        </>
      )}
    </>
  );
}

export default ReviewsList;
