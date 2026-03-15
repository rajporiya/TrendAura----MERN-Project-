import handleAsyncError from "../middleware/handleAsyncError.js";
import HandleErroe from "../utils/handleError.js";
import Order from "../model/order.models.js";
import Product from "../model/product.models.js";
import User from "../model/user.models.js";

// create Order
export const createNewOrder = handleAsyncError(async (req, res, next) => {
  if (!req.body || Object.keys(req.body).length === 0) {
    return next(
      new HandleErroe(
        "Request body is required. Send JSON with Content-Type: application/json",
        400,
      ),
    );
  }

  const {
    shipingInfo,
    orderItem,
    paymentInfo,
    itemPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
  } = req.body;

  console.log("Order creation request:", { shipingInfo, orderItem, paymentInfo, itemPrice, taxPrice, shippingPrice, totalPrice, userId: req.user?._id });

  if (!shipingInfo || !orderItem || !paymentInfo) {
    console.error("Missing required fields:", { hasShipingInfo: !!shipingInfo, hasOrderItem: !!orderItem, hasPaymentInfo: !!paymentInfo });
    return next(
      new HandleErroe(
        "shipingInfo, orderItem and paymentInfo are required",
        400,
      ),
    );
  }

  try {
    const newOrder = await Order.create({
      shipingInfo,
      orderItem,
      paymentInfo,
      itemPrice,
      taxPrice,
      shippingPrice,
      totalPrice,
      paidAt: Date.now(),
      user: req.user._id,
    });
    console.log("Order created successfully:", newOrder._id);
    res.status(201).json({
      success: true,
      newOrder,
    });
  } catch (error) {
    console.error("Order creation error:", error.message);
    if (error.name === "ValidationError") {
      const messages = Object.values(error.errors).map(e => e.message).join(", ");
      return next(new HandleErroe(`Validation Error: ${messages}`, 400));
    }
    throw error;
  }
});

// get single product
export const getSingleOrder = handleAsyncError(async (req, res, next) => {
  const order = await Order.findById(req.params.id);
  if (!order) {
    return next(new HandleErroe("Order Not found ", 400));
  }
  res.status(201).json({
    success: true,
    order,
  });
});

// All my order find
export const allMyOrder = handleAsyncError(async (req, res, next) => {
  const orders = await Order.find({ user: req.user._id });

  res.status(201).json({
    success: true,
    orders,
  });
});

// get all order
export const getAllOrders = handleAsyncError(async (req, res, next) => {
  const orders = await Order.find();

  // find total order toal amount
  let totalAmount = 0;
  orders.forEach((order) => {
    totalAmount = totalAmount + order.totalPrice;
  });
  res.status(200).json({
    success: true,
    orders,
    totalAmount,
  });
});

// update order status
export const updateOrderStatus = handleAsyncError(async (req, res, next) => {
  const order = await Order.findById(req.params.id);
  if (!order) {
    return next(new HandleErroe("Order Not found ", 400));
  }

  if (!req.body?.status) {
    return next(new HandleErroe("Order status is required", 400));
  }

  if (order.orderStatus === "Delivered") {
    return next(new HandleErroe("Order already delivered", 400));
  }

  const nextStatus = req.body.status;
  const updateData = {
    orderStatus: nextStatus,
  };

  if (nextStatus === "Delivered") {
    await Promise.all(
      order.orderItem.map((item) => updateQuamtity(item.product, item.quantity)),
    );
    updateData.deliverdAt = Date.now();
  }

  const updatedOrder = await Order.findByIdAndUpdate(
    req.params.id,
    { $set: updateData },
    {
      new: true,
      runValidators: false,
    },
  );

  res.status(200).json({
    success: true,
    message: "Order status updated successfully",
    order: updatedOrder,
  });
});

async function updateQuamtity(id, quantity) {
  const product = await Product.findById(id);
  if (!product) {
     throw new HandleErroe("No Product Found", 400);
  }

  product.stock = product.stock - quantity;
  await product.save({ validateBeforeSave: false });
}

// delete order
export const deleteOrder = handleAsyncError(async (req, res, next) => {
  const order = await Order.findById(req.params.id);
  if (!order) {
    return next(new HandleErroe("No order Found", 400));
  }
  if(order.orderStatus !== "Delivered"){
    return next(new HandleErroe("This order is under processing and cannot be deleted", 404));
  }
  await Order.deleteOne({ _id: req.params.id });
  res.status(200).json({
    success: true,
    message: "Order deleted successfully"
  });
});
