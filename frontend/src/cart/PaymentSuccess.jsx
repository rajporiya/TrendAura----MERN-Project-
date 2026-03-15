import React, { useRef } from "react";
import "../CartStyles/PaymentSuccess.css";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import PageTitle from "../componant/PageTitle";
import Navbar from "../componant/Navbar";
import Footer from "../componant/Footer";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { toast } from "react-toastify";
import {
  createOder,
  removeError,
  removeSuccess,
} from "../feature/order/orderSlice";
import { clearCart } from "../feature/cart/cartSlice";
import Loader from "../componant/Loader";

function PaymentSuccess() {
  const [serchparams] = useSearchParams();
  const reference = serchparams.get("reference");
  const { shippingInfo, cartItems } = useSelector((state) => state.cart);
  const { loading, error, success } = useSelector((state) => state.order);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const orderCreatedRef = useRef(false);

  useEffect(() => {
    const createOrderData = async () => {
      try {
        if (orderCreatedRef.current) {
          return;
        }

        if (!reference) {
          toast.error("Payment reference not found", {
            position: "top-right",
            autoClose: 3000,
          });
          return;
        }

        const orderItem = JSON.parse(sessionStorage.getItem("orderItem"));
        if (!orderItem) {
          console.log("Order item not found in sessionStorage");
          toast.error("Order summary missing. Please try checkout again.", {
            position: "top-left",
            autoClose: 3000,
          });
          return;
        }
        if (!cartItems || cartItems.length === 0) {
          console.log("Cart items empty", cartItems);
          toast.error("Cart items missing. Please try checkout again.", {
            position: "top-left",
            autoClose: 3000,
          });
          return;
        }
        // Validate all cart items have required fields
        const invalidItems = cartItems.filter(
          (item) =>
            !item.product || !item.name || !item.price || !item.quantity,
        );
        if (invalidItems.length > 0) {
          console.error("Invalid cart items:", invalidItems);
          toast.error("Invalid items in cart", {
            position: "top-left",
            autoClose: 3000,
          });
          return;
        }
        console.log(
          "Cart items with images:",
          cartItems.map((item) => ({ ...item, hasImage: !!item.image })),
        );
        if (!shippingInfo?.address || !shippingInfo?.city || !shippingInfo?.state || !shippingInfo?.country || !shippingInfo?.pincode || !shippingInfo?.phoneNumber) {
          console.log("Shipping info missing", shippingInfo);
          toast.error("Shipping information is incomplete.", {
            position: "top-left",
            autoClose: 3000,
          });
          return;
        }

        const orderData = {
          shipingInfo: {
            country: shippingInfo.country,
            address: shippingInfo.address,
            city: shippingInfo.city,
            state: shippingInfo.state,
            pincode: shippingInfo.pincode,
            phoneNo: shippingInfo.phoneNumber,
          },
          orderItem: cartItems.map((item) => ({
            name: item.name,
            price: item.price,
            quantity: item.quantity,
            image: item.image || "",
            product: item.product,
          })),
          paymentInfo: {
            id: reference,
            status: "succeeded",
          },
          itemPrice: orderItem.subTotal,
          taxPrice: orderItem.tax,
          shippingPrice: orderItem.shippingCharges,
          totalPrice: orderItem.total,
        };

        console.log("Creating order with data:", orderData);
        orderCreatedRef.current = true;
        await dispatch(createOder(orderData)).unwrap();
        dispatch(clearCart());
        sessionStorage.removeItem("orderItem");
      } catch (error) {
        orderCreatedRef.current = false;
        console.error("Order creation error:", error);
        toast.error(error?.message || "Order creation failed", {
          position: "top-left",
          autoClose: 2000,
        });
      }
    };
    createOrderData();
  }, [dispatch, reference, cartItems, shippingInfo]);

  useEffect(() => {
    if (success) {
      toast.success("Order Placed", { position: "top-right", autoClose: 2000 });
      dispatch(removeSuccess());
      navigate("/orders/user");
    }
  }, [dispatch, success, navigate]);
  useEffect(() => {
    if (error) {
      toast.error(error, { position: "top-right", autoClose: 2000 });
      dispatch(removeError());
    }
  }, [dispatch, error]);
  return (
    <>
      <PageTitle title="Payment Statud" />
      <Navbar />
      {loading ? (
        <Loader />
      ) : (
        <div className="payment-success-container">
          <div className="success">
            <div className="success-icon">
              <div className="checkmark"></div>
            </div>
            <h1>Order Confirmation</h1>
            <p>
              Your Payment was successfull. referemce ID :
              <strong>{reference}</strong>{" "}
            </p>
            <Link to="/orders/user" className="explore-btn">
              View Orders
            </Link>
          </div>
        </div>
      )}
      <Footer />
    </>
  );
}

export default PaymentSuccess;
