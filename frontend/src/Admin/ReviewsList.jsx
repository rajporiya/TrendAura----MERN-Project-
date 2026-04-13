import React, { useEffect, useState } from "react";
import "../AdminStyles/ReviewsList.css";
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
          <PageTitle title="All Reviews" />

          <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 px-6 pt-6 pb-12">
            <div className="w-full flex flex-col gap-6">

              {/* Heading */}
              <div className="flex items-center gap-2">
                <div className="w-1 h-6 rounded-full bg-amber-500" />
                <h1 className="text-2xl font-bold text-white tracking-tight">Product Reviews</h1>
              </div>

              {/* ── Products Table ── */}
              <div className="bg-slate-800/60 backdrop-blur-sm border border-slate-700/50 rounded-2xl shadow-2xl overflow-hidden">
                <div className="px-6 py-4 border-b border-slate-700/50">
                  <p className="text-xs font-bold uppercase tracking-widest text-slate-400">All Products</p>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-slate-700/50">
                        <th className="text-left px-6 py-3 text-xs font-bold uppercase tracking-widest text-slate-500">Sl No.</th>
                        <th className="text-left px-6 py-3 text-xs font-bold uppercase tracking-widest text-slate-500">Product Name</th>
                        <th className="text-left px-6 py-3 text-xs font-bold uppercase tracking-widest text-slate-500">Image</th>
                        <th className="text-left px-6 py-3 text-xs font-bold uppercase tracking-widest text-slate-500">No. of Reviews</th>
                        <th className="text-left px-6 py-3 text-xs font-bold uppercase tracking-widest text-slate-500">Action</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-700/50">
                      {products.map((product, index) => (
                        <tr key={product._id} className="hover:bg-slate-700/20 transition-all duration-150">

                          <td className="px-6 py-4 text-slate-400">{index + 1}</td>

                          <td className="px-6 py-4 text-white font-medium">{product.name}</td>

                          <td className="px-6 py-4">
                            <div className="w-12 h-12 rounded-xl overflow-hidden border border-slate-700/50 bg-slate-900/50">
                              <img
                                src={product?.image?.[0]?.url || "/images/no-products.png"}
                                alt="Product-Image"
                                className="w-full h-full object-cover object-center"
                              />
                            </div>
                          </td>

                          <td className="px-6 py-4">
                            <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold bg-slate-700/50 border border-slate-600/50 text-slate-300">
                              {product.numOfReview}
                            </span>
                          </td>

                          <td className="px-6 py-4">
                            {product.numOfReview > 0 && (
                              <button
                                onClick={() => handleViewRevies(product._id)}
                                className="px-4 py-1.5 rounded-xl text-xs font-bold uppercase tracking-wider border border-emerald-500/30 text-emerald-400 hover:bg-emerald-500/10 transition-all duration-200"
                              >
                                View Reviews
                              </button>
                            )}
                          </td>

                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* ── Reviews For Selected Product ── */}
              {selectedProduct && reviews && reviews.length > 0 && (
                <div className="bg-slate-800/60 backdrop-blur-sm border border-slate-700/50 rounded-2xl shadow-2xl overflow-hidden">
                  <div className="px-6 py-4 border-b border-slate-700/50">
                    <p className="text-xs font-bold uppercase tracking-widest text-slate-400">Reviews For Product</p>
                  </div>
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="border-b border-slate-700/50">
                          <th className="text-left px-6 py-3 text-xs font-bold uppercase tracking-widest text-slate-500">Sl No.</th>
                          <th className="text-left px-6 py-3 text-xs font-bold uppercase tracking-widest text-slate-500">Reviewer Name</th>
                          <th className="text-left px-6 py-3 text-xs font-bold uppercase tracking-widest text-slate-500">Rating</th>
                          <th className="text-left px-6 py-3 text-xs font-bold uppercase tracking-widest text-slate-500">Comment</th>
                          <th className="text-left px-6 py-3 text-xs font-bold uppercase tracking-widest text-slate-500">Action</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-700/50">
                        {reviews.length > 0 ? (
                          reviews.map((review, index) => (
                            <tr key={review._id} className="hover:bg-slate-700/20 transition-all duration-150">

                              <td className="px-6 py-4 text-slate-400">{index + 1}</td>

                              <td className="px-6 py-4">
                                <div className="flex items-center gap-2">
                                  <div className="w-8 h-8 rounded-full bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-xs font-bold text-emerald-400">
                                    {review.name?.charAt(0).toUpperCase()}
                                  </div>
                                  <span className="text-white font-medium">{review.name}</span>
                                </div>
                              </td>

                              <td className="px-6 py-4">
                                <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold bg-amber-500/10 border border-amber-500/20 text-amber-500">
                                  ★ {review.rating}
                                </span>
                              </td>

                              <td className="px-6 py-4 text-slate-300 max-w-xs truncate">{review.comment}</td>

                              <td className="px-6 py-4">
                                <button
                                  onClick={() => handleDeleteReview(selectedProduct, review._id)}
                                  className="w-8 h-8 rounded-lg flex items-center justify-center border border-red-500/30 text-red-400 hover:bg-red-500/10 transition-all duration-200"
                                >
                                  <Delete style={{fontSize: 16}} />
                                </button>
                              </td>

                            </tr>
                          ))
                        ) : (
                          <tr>
                            <td colSpan="5" className="px-6 py-12 text-center text-sm text-slate-400">
                              {selectedProduct ? "No reviews for this product" : "Click View Reviews to load reviews"}
                            </td>
                          </tr>
                        )}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

            </div>
          </div>

          <Footer />
        </>
      )}
    </>
  );
}

export default ReviewsList;
