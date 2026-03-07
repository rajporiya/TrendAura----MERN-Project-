import React from "react";
import "../CartStyles/Cart.css";
import Navbar from "../componant/Navbar";
import Footer from "../componant/Footer";
import PageTitle from "../componant/PageTitle";
import CartItem from "./CartItem";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
function Cart() {
  const navigate = useNavigate();
  const { cartItems } = useSelector((state) => state.cart);
  const { isAuthenticated } = useSelector((state) => state.user);
  const subTotal = cartItems.reduce((acc, item)=> acc+item.price * item.quantity ,0)
  const tax = (subTotal * 0.18)
  const shippngCharges = subTotal >5000 ? 0 :  100;
  const total = subTotal + tax + shippngCharges;
  
  const checkOutHandlier=()=>{
    if (isAuthenticated) {
      navigate('/shipping');
    } else {
      navigate('/login?redirect=/shipping');
    }
  }
  return (
    <>
      <Navbar />
      <PageTitle title=" Your Cart" />
      {cartItems.length === 0? (
        <div className="empty-cart-container">
            <p className="empty-cart-message">Your cart is empty</p>
            <Link to='/products' className="viewProducts">Go TO Products</Link>
        </div>
      ) : (<div className="cart-page">
        {/* first section */}

        <div className="cat-items">
          <h2 className="cart-items-heading">Your Cart</h2>
          <div className="cart-table">
            <div className="cart-table-header">
              <div>Product</div>
              <div>Quantity</div>
              <div>Item Total</div>
              <div>Actions</div>
            </div>

            {/* <div className="header-product">Product</div>
                    <div className="header-quantity">Quantity</div>
                    <div className="header-total-item item-total-heading">Item Total</div>
                    <div className="header-product item-total-heading">Aactions</div> */}

            {/* cart item */}
            {cartItems &&
              cartItems.map((item) => <CartItem item={item} key={item.name} />)}
          </div>
        </div>

        {/* second */}
        <div className="price-summary">
          <h3 className="price-summary-heading">Price Summary</h3>

          <div className="summary-item">
            <p className="summary-lable">Subtotal</p>
            <p className="summary-value">{subTotal}</p>
          </div>
          <div className="summary-item">
            <p className="summary-lable">Tax(18%)</p>
            <p className="summary-value">{tax}</p>
          </div>
          <div className="summary-item">
            <p className="summary-lable">Shipping Charge</p>
            <p className="summary-value">{shippngCharges}</p>
          </div>
          <div className="summary-total">
            <p className="summary-lable">Total : </p>
            <p className="toal-value">{total}</p>
          </div>

          <button className="checkout-btn" onClick={checkOutHandlier}>Proceed to checkout</button>
        </div>
      </div>)}
      <Footer />
    </>
  );
}

export default Cart;
