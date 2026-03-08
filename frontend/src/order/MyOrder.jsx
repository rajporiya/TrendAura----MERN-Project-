import React, { useEffect } from "react";
import Navbar from "../componant/Navbar";
import PageTitle from "../componant/PageTitle";
import Footer from "../componant/Footer";
import { Link } from "react-router-dom";
import { LaunchOutlined } from "@mui/icons-material";
import "../OrderStyles/MyOrders.css";
import { useDispatch, useSelector } from "react-redux";
import { getMyAllOrders } from "../feature/order/orderSlice";
import Loader from "../componant/Loader";

function MyOrder() {
  const { orders = [], loading } = useSelector((state) => state.order);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getMyAllOrders());
  }, [dispatch]);
  return (
    <>
      <Navbar />
      <PageTitle title="My Orders" />
      {loading ? (<Loader />):orders.length > 0 ?(
        <div className="my-orders-container">
        <h1>My Orders</h1>
        <div className="table-responsive">
          <table className="orders-table">
            <thead>
              <tr>
                <th>Order ID</th>
                <th>Items Count</th>
                <th>Stats</th>
                <th>Total Price</th>
                <th>View Order</th>
              </tr>
            </thead>

            <tbody>
              {orders.map((order) => (
                <tr key={order._id}>
                  <td>{order._id}</td>
                  <td>{(order.orderItem || order.orderItems || []).length}</td>
                  <td>{order.orderStatus}</td>
                  <td>{order.totalPrice}</td>
                  <td>
                    <Link to={`/order/${order._id}`}>
                      <LaunchOutlined />
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>) : (
        <div className="no-orders">
            <p className="no-order-message">No Order Found</p>
        </div>
      )}
      <Footer />
    </>
  );
}

export default MyOrder;
