import handleAsyncError from "../middleware/handleAsyncError.js";
import HandleErroe from "../utils/handleError.js";
import Order from "../model/order.models.js";
import Product from "../model/product.models.js";
import User from "../model/user.models.js";
import { sendMail } from "../utils/sendEmail.js";

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

  if (!req.user || !req.user._id) {
    console.error("❌ User not authenticated");
    return next(new HandleErroe("User authentication required", 401));
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

  console.log("📝 Order creation request from user:", req.user._id, { 
    hasShipingInfo: !!shipingInfo, 
    hasOrderItem: !!orderItem, 
    hasPaymentInfo: !!paymentInfo,
    orderItemCount: orderItem?.length || 0
  });

  if (!shipingInfo || !orderItem || !paymentInfo) {
    console.error("❌ Missing required fields:", { hasShipingInfo: !!shipingInfo, hasOrderItem: !!orderItem, hasPaymentInfo: !!paymentInfo });
    return next(
      new HandleErroe(
        "shipingInfo, orderItem and paymentInfo are required",
        400,
      ),
    );
  }

  if (!Array.isArray(orderItem) || orderItem.length === 0) {
    console.error("❌ orderItem must be a non-empty array");
    return next(new HandleErroe("Order must contain at least one item", 400));
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

    const customer = await User.findById(req.user._id).select("name email");
    if (customer?.email) {
      const currency = (amount) => `INR ${Number(amount || 0).toFixed(2)}`;
      const orderDate = new Date(newOrder.createdAt || Date.now()).toLocaleString("en-IN", {
        dateStyle: "medium",
        timeStyle: "short",
      });

      const itemsMarkup = newOrder.orderItem
        .map(
          (item) => `
            <tr>
              <td style="padding:10px 0;color:#111827;font-size:14px;line-height:20px;">${item.name}</td>
              <td style="padding:10px 0;color:#6b7280;font-size:14px;line-height:20px;text-align:center;">${item.quantity}</td>
              <td style="padding:10px 0;color:#111827;font-size:14px;line-height:20px;text-align:right;">${currency(item.price * item.quantity)}</td>
            </tr>
          `,
        )
        .join("");

      const html = `
      <!doctype html>
      <html>
        <head>
          <meta charset="UTF-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1.0" />
          <title>Order Confirmation</title>
        </head>
        <body style="margin:0;padding:0;background:#f3f4f6;font-family:Arial,Helvetica,sans-serif;">
          <table role="presentation" cellpadding="0" cellspacing="0" width="100%" style="background:#f3f4f6;padding:24px 12px;">
            <tr>
              <td align="center">
                <table role="presentation" cellpadding="0" cellspacing="0" width="620" style="max-width:620px;background:#ffffff;border-radius:16px;overflow:hidden;box-shadow:0 12px 24px rgba(0,0,0,0.08);">
                  <tr>
                    <td style="padding:28px 28px 20px;background:linear-gradient(120deg,#0f766e,#2563eb);">
                      <p style="margin:0;color:#cffafe;font-size:12px;letter-spacing:1px;text-transform:uppercase;">Order Confirmed</p>
                      <h1 style="margin:8px 0 0;color:#ffffff;font-size:26px;line-height:32px;">Thanks for your order, ${customer.name || "Customer"}!</h1>
                    </td>
                  </tr>
                  <tr>
                    <td style="padding:24px 28px;">
                      <p style="margin:0 0 14px;color:#374151;font-size:15px;line-height:24px;">We have received your order and started processing it. Here is your order summary.</p>
                      <table role="presentation" cellpadding="0" cellspacing="0" width="100%" style="background:#f9fafb;border:1px solid #e5e7eb;border-radius:10px;padding:14px;">
                        <tr>
                          <td style="color:#6b7280;font-size:13px;">Order ID</td>
                          <td style="color:#111827;font-size:13px;text-align:right;">${newOrder._id}</td>
                        </tr>
                        <tr>
                          <td style="padding-top:8px;color:#6b7280;font-size:13px;">Date</td>
                          <td style="padding-top:8px;color:#111827;font-size:13px;text-align:right;">${orderDate}</td>
                        </tr>
                        <tr>
                          <td style="padding-top:8px;color:#6b7280;font-size:13px;">Payment</td>
                          <td style="padding-top:8px;color:#111827;font-size:13px;text-align:right;">${newOrder.paymentInfo?.status || "Paid"}</td>
                        </tr>
                      </table>

                      <h2 style="margin:22px 0 8px;color:#111827;font-size:18px;">Items</h2>
                      <table role="presentation" cellpadding="0" cellspacing="0" width="100%" style="border-collapse:collapse;">
                        <tr>
                          <th style="padding:8px 0;border-bottom:1px solid #e5e7eb;color:#6b7280;font-size:12px;text-transform:uppercase;letter-spacing:0.4px;text-align:left;">Product</th>
                          <th style="padding:8px 0;border-bottom:1px solid #e5e7eb;color:#6b7280;font-size:12px;text-transform:uppercase;letter-spacing:0.4px;text-align:center;">Qty</th>
                          <th style="padding:8px 0;border-bottom:1px solid #e5e7eb;color:#6b7280;font-size:12px;text-transform:uppercase;letter-spacing:0.4px;text-align:right;">Total</th>
                        </tr>
                        ${itemsMarkup}
                      </table>

                      <table role="presentation" cellpadding="0" cellspacing="0" width="100%" style="margin-top:18px;border-top:1px solid #e5e7eb;padding-top:12px;">
                        <tr>
                          <td style="color:#6b7280;font-size:14px;">Subtotal</td>
                          <td style="color:#111827;font-size:14px;text-align:right;">${currency(newOrder.itemPrice)}</td>
                        </tr>
                        <tr>
                          <td style="padding-top:6px;color:#6b7280;font-size:14px;">Shipping</td>
                          <td style="padding-top:6px;color:#111827;font-size:14px;text-align:right;">${currency(newOrder.shippingPrice)}</td>
                        </tr>
                        <tr>
                          <td style="padding-top:6px;color:#6b7280;font-size:14px;">Tax</td>
                          <td style="padding-top:6px;color:#111827;font-size:14px;text-align:right;">${currency(newOrder.taxPrice)}</td>
                        </tr>
                        <tr>
                          <td style="padding-top:10px;color:#111827;font-size:16px;font-weight:700;">Grand Total</td>
                          <td style="padding-top:10px;color:#111827;font-size:16px;font-weight:700;text-align:right;">${currency(newOrder.totalPrice)}</td>
                        </tr>
                      </table>

                      <p style="margin:22px 0 0;color:#6b7280;font-size:13px;line-height:22px;">Shipping to: ${newOrder.shipingInfo?.address || ""}, ${newOrder.shipingInfo?.city || ""}, ${newOrder.shipingInfo?.state || ""}, ${newOrder.shipingInfo?.country || ""} - ${newOrder.shipingInfo?.pincode || ""}</p>
                    </td>
                  </tr>
                  <tr>
                    <td style="padding:16px 28px;background:#111827;color:#d1d5db;font-size:12px;text-align:center;">Need help? Reply to this email and our team will assist you.</td>
                  </tr>
                </table>
              </td>
            </tr>
          </table>
        </body>
      </html>
      `;

      const plainTextMessage = `Order Confirmed\n\nOrder ID: ${newOrder._id}\nAmount: ${currency(newOrder.totalPrice)}\nDate: ${orderDate}\n\nThanks for shopping with us.`;

      sendMail({
        email: customer.email,
        subject: `TrendAura | Order Confirmed - ${newOrder._id}`,
        message: plainTextMessage,
        html,
      }).catch((mailErr) => {
        console.error("❌ Failed to send order confirmation email:", mailErr.message);
      });
    }

    console.log("✅ Order created successfully:", newOrder._id);
    res.status(201).json({
      success: true,
      newOrder,
    });
  } catch (error) {
    console.error("❌ Order creation error:", error.message, error);
    if (error.name === "ValidationError") {
      const messages = Object.values(error.errors).map(e => e.message).join(", ");
      return next(new HandleErroe(`Validation Error: ${messages}`, 400));
      return next(new HandleErroe(`Validation Error: ${messages}`, 400));
    }
    throw error;
  }
});

// get single product
export const getSingleOrder = handleAsyncError(async (req, res, next) => {
  console.log("📝 Fetching order:", req.params.id, "for user:", req.user?._id);
  const order = await Order.findById(req.params.id);
  if (!order) {
    console.error("❌ Order Not found:", req.params.id);
    return next(new HandleErroe("Order Not found ", 400));
  }
  console.log("✅ Order found:", order._id);
  res.status(201).json({
    success: true,
    order,
  });
});

// All my order find
export const allMyOrder = handleAsyncError(async (req, res, next) => {
  console.log("📝 Fetching all orders for user:", req.user?._id);
  if (!req.user || !req.user._id) {
    console.error("❌ User not authenticated");
    return next(new HandleErroe("User authentication required", 401));
  }
  
  const orders = await Order.find({ user: req.user._id });
  console.log("✅ Found", orders.length, "orders for user:", req.user._id);

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

  // Check if user is trying to delete their own order
  if (req.user._id.toString() === order.user.toString()) {
    // Users can only cancel if order is NOT delivered
    if (order.orderStatus === "Delivered") {
      return next(new HandleErroe("Cannot delete delivered orders", 400));
    }
    // Mark order as cancelled by user instead of deleting
    order.isCancelled = true;
    order.cancelledBy = "user";
    order.cancelledAt = Date.now();
    await order.save();
    return res.status(200).json({
      success: true,
      message: "Order cancelled successfully"
    });
  }

  // Admin cannot delete - only confirm cancellations
  return next(new HandleErroe("Unauthorized to delete this order", 403));
});

// Confirm order cancellation (Admin only)
export const confirmOrderCancellation = handleAsyncError(async (req, res, next) => {
  const order = await Order.findById(req.params.id);
  if (!order) {
    return next(new HandleErroe("No order Found", 400));
  }

  if (order.orderStatus === "Delivered") {
    return next(new HandleErroe("Cannot cancel delivered orders", 400));
  }

  // Confirm the cancellation
  order.isCancelled = true;
  order.cancelledBy = "admin";
  order.cancelledAt = Date.now();
  await order.save();

  res.status(200).json({
    success: true,
    message: "Order cancellation confirmed",
    order
  });
});
