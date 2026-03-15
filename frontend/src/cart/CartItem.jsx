import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { addItemsToCart, removeItemFromCart, removeMessage } from "../feature/cart/cartSlice";

function CartItem({ item }) {
  const { loading, error, message, success } = useSelector(
    (state) => state.cart,
  );
  const dispatch = useDispatch();
  const [quantity, setQuantity] = useState(item.quantity);
  const itemTotal = (item?.price || 0) * (item?.quantity || 0);
  const decreaseQuantity = () => {
    if (quantity <= 1) {
      toast.error("Quantity cannot less than 1", {
        position: "top-center",
        autoClose: 2000,
      });
      return;
    }
    setQuantity((qty) => qty - 1);
  };
  // quantity increase by 1
  const increaseQuantity = () => {
    if (item.stock <= quantity) {
      toast.error("Cannot excees available stock", {
        position: "top-center",
        autoClose: 2000,
      });
      return;
    }
    setQuantity((qty) => qty + 1);
  };

  const handleUpdate = () => {
    if (loading) return;

    if (quantity !== item.quantity) {
      dispatch(addItemsToCart({ id: item.product, quantity: quantity }));
    }
  };

  useEffect(() => {
    if (success && message) {
      toast.success(message, {
        position: "top-right",
        autoClose: 2000, toastId:'cart-update'
      });
      dispatch(removeMessage());
    }
  }, [dispatch, success, message]);

  const handleRemove=()=>{
    if(loading) return
    dispatch(removeItemFromCart(item.product));

  }
  return (
    <div>
      {/* cart item */}
      <div className="cart-item">
        <div className="item-info">
          <img src={item.image} alt={item.name} className="item-image" />
          <div className="item-details">
            <h3 className="item-name">{item.name}</h3>
            <p className="item-price">
              <strong>Price:</strong> {item.price.toFixed(2)}
            </p>
            <p className="item-quantity">
              Quantity: <strong>{item.quantity}</strong>
            </p>
          </div>
        </div>

        <div className="quantity-controls">
          <button
            disabled={loading}
            onClick={decreaseQuantity} 
            className="quantity-button decrease-btn"
          >
            -
          </button>
          <input
            type="number"
            className="quantity-input"
            readOnly
            value={quantity}
          />
          <button
            disabled={loading}
            onClick={increaseQuantity}
            className="quantity-button increase-btn"
          >
            +
          </button>
        </div>

        <div className="item-total">
          <span className="item-total-price">{(item.price * item.quantity).toFixed(2)}/-</span>
        </div>

        <div className="item-actions">
          <button
            className="update-item-btn"
            disabled={loading || quantity === item.quantity}
            onClick={handleUpdate}
          >
            {loading ? "Updating" : "Update"}
          </button>
          <button
            className="remove-item-btn"
            onClick={handleRemove} disabled={loading}
          >
            Remove
          </button>
        </div>
      </div>
    </div>
  );
}

export default CartItem;
