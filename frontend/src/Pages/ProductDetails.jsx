import React, { useEffect, useMemo, useState } from "react";
import "../PageStyles/ProductDetails.css";
import PageTitle from "../componant/PageTitle";
import Navbar from "../componant/Navbar";
import Footer from "../componant/Footer";
import Rating from "@mui/material/Rating";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import {
  createReview,
  getProductDetails,
  removeError,
  removeSuccess,
} from "../feature/product/productSllice";
import { toast } from "react-toastify";
import Loader from "../componant/Loader";
import { addItemsToCart, removeError as removeCartError, removeMessage } from "../feature/cart/cartSlice.js";

function ProductDetails() {
  const [selectImage, setSelectImage]=useState("")
  const [comment, setComment]= useState("")
  const [userRatin, setUserRating] = useState(0);
  const [quantity , setQuantity] = useState(1)
  const handleRatingChange = (newRating) => {
    setUserRating(newRating);
  };
  const { loading, error, product, reviewSuccess, reviewLoading } = useSelector((state) => state.product);
  const { loading: cartLoading, error: cartError, success, message } = useSelector((state) => state.cart);
  const { isAuthenticated } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();
  const imageList = useMemo(() => {
    const urls = (product?.image || [])
      .map((img) => img?.url || img?.uri)
      .filter(Boolean);
    return [...new Set(urls)];
  }, [product]);
  useEffect(() => {
    if (id) {
      dispatch(getProductDetails(id));
    }
  }, [dispatch, id]);

  useEffect(() => {
    if (error) {
      toast.error(error?.message || error, {
        position: "top-right",
        autoClose: 2000,
      });

      dispatch(removeError());
    }
    if (cartError) {
      toast.error(cartError?.message || cartError, {
        position: "top-right",
        autoClose: 2000,
      })
      dispatch(removeCartError());
    }
  }, [dispatch, error, cartError]);

  useEffect(()=>{
    if (success){
      toast.success(message,{
        position: "top-right",
        autoClose: 2000,} )
        dispatch(removeMessage());
    }
  },[dispatch,success,message])

 

  const decreaseQuantity=()=>{
     if(quantity <= 1){
      toast.error("Quantity cannot less than 1", {position: "top-center", autoClose:2000})
      return;
    }
    setQuantity(qty=> qty -1)
  }
  // quantity increase by 1
  const increaseQuantity=()=>{
    if(product.stock <= quantity){
      toast.error("Cannot excees available stock", {position: "top-center", autoClose:2000})
      return;
    }
    setQuantity(qty=> qty +1)
  }
  const addtoCart=()=>{
    if (!isAuthenticated) {
      toast.error("Please login to add product to cart", {
        position: "top-right",
        autoClose: 2000,
      })
      navigate('/login')
      return
    }
    if (!product?._id) {
      toast.error("Product is not available", {
        position: "top-right",
        autoClose: 2000,
      })
      return
    }
    dispatch(addItemsToCart({id: product._id, name: product.name, price: product.price, quantity: quantity, image: product.image}))
  }
  const handleReviewSubmit =(e)=>{
    e.preventDefault();
    if (!isAuthenticated) {
      toast.error("Please login to submit review", { position: 'top-right', autoClose: 2000 })
      navigate('/login')
      return
    }
    if(!userRatin){
      toast.error("Plz give Ratting", {position: 'top-right', autoClose: 2000})
      return;
    }
    dispatch(createReview ({
      rating: userRatin,
      comment,
      productId: id

    }))
  }
  useEffect(()=>{
    if(reviewSuccess){
       toast.success(" Review Sub,iting successfully", {position: 'top-right', autoClose: 2000})
       setUserRating(0);
       setComment("");
       dispatch(removeSuccess());
       dispatch(getProductDetails(id))
    }
  }, [reviewSuccess, dispatch,id])

  useEffect(()=>{
    if(imageList.length > 0){
      setSelectImage(imageList[0])
    } else {
      setSelectImage("")
    }
  },[imageList])

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
            <img
              src={selectImage || "/images/no-products.png"}
              alt={product.name} 
              className="product-detail-image"
            />
            {imageList.length > 1 &&( <div className="product-thumbnails">
              {imageList
                .filter((imgSrc) => imgSrc !== selectImage)
                .map((imgSrc,index)=>(
                <img
                  src={imgSrc || "/images/no-products.png"}
                  alt="Thumnails"
                  key={index}
                  onClick={()=>setSelectImage(imgSrc || "/images/no-products.png")}
                  className="thumbnail-image"
                />
              ))}
            </div>)}
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
                    <button className="quantity-button" onClick={decreaseQuantity}>-</button>

                    <input
                      type="text"
                      className="quantity-value"
                      readOnly
                      value={quantity} 
                    />
                    <button className="quantity-button" onClick={increaseQuantity}>+</button>
                  </div>
                  <button className="add-to-cart-btn" disabled={cartLoading} onClick={addtoCart}>{cartLoading ? 'Adding' :"Add To Cart"}</button>
                </>
              )}
              <form className="review-form" onSubmit={handleReviewSubmit}>
                <h3>Write a Review </h3>
                <Rating
                  value={userRatin}
                  disabled={false}
                  onChange={(e, newValue) => handleRatingChange(newValue)}
                />
                <textarea
                  className="review-input"
                  onChange={(e)=>setComment(e.target.value)} required value={comment}
                  placeholder="Write  your review here"
                ></textarea>
                <button disabled={reviewLoading} className="submit-review-btn">{reviewLoading? 'Submiting ...': 'submit review'}</button>
              </form>
            </div>
          </div>
        </div>

        <div className="review-container">
          <h3>Customer Review</h3>
          {product.reviews && product.reviews.length > 0 ? (
            <div className="review-section">
              {product.reviews.map((review, i) => (
                <div className="review-item" key={i}>
                  <div className="view-header">
                    <Rating value={Number(review.rating) || 0} disabled={true} />
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