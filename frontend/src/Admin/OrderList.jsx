import React, { useEffect } from "react";
import "../AdminStyles/OrdersList.css";
import Navbar from "../componant/Navbar";
import PageTitle from "../componant/PageTitle";
import Footer from "../componant/Footer";
import { Link } from "react-router-dom";
import { Delete, Edit } from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import { clearMessage, deleteOrder, fetchAllOrders, removeError, removeSuccess } from "../feature/admin/adminSlice";
import { toast } from "react-toastify";
import Loader from "../componant/Loader";

function OrderList() {
  const { orders, loading, error, success, message } = useSelector((state) => state.admin);
  console.log(orders);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchAllOrders());
  }, [dispatch]);

  useEffect(() => {
    if (error) {
      toast.error(error?.message || error, {
        position: "top-right",
        autoClose: 2000,
        toastId: "order-fetch-error",
      });
      dispatch(removeError());
    }
  }, [error, dispatch]);

  useEffect(() => {
    if (success) {
      toast.success(message, {
        position: "top-right",
        autoClose: 2000,
      });
      dispatch(removeSuccess());
      dispatch(clearMessage());
      dispatch(fetchAllOrders());
    }
  }, [success, message, dispatch]);

  const handleDelete = (id) => {
    const confirm = window.confirm("Are You sure want to delete this order?");
    if (confirm) {
      dispatch(deleteOrder(id));
    }
  };
  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
          <Navbar />
          <PageTitle title="All Orders" />
          <div className="ordersList-container">
            <h1 className="ordersList-title">All Orders</h1>
            {orders && orders.length === 0 && (
                <div className="no-orders-container">
                    <p>No Order</p>
                </div>
            )}
            <div className="ordersList-table-container">
              <table className="ordersList-table ">
                <thead>
                  <tr>
                    <th>Sl No.</th>
                    <th>Order ID</th>
                    <th>Status</th>
                    <th>Total Price</th>
                    <th>Number Of Item</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {orders &&
                    orders.map((order, index) => (
                      <tr key={order._id}>
                        <td>{index + 1}</td>
                        <td>{order._id}</td>
                        <td className={`order-status ${order.orderStatus.toLowerCase()}`}>{order.orderStatus}</td>
                        <td>{order.totalPrice.toFixed(2)}</td>
                        <td>{order.orderItem.length}</td>
                        <td>
                          <Link
                            to={`/admin/order/${order._id}`}
                            className="action-icon edit-icon"
                          >
                            <Edit />
                          </Link>
                          <button
                            className="action-icon delete-icon"
                            onClick={() => handleDelete(order._id)}
                          >
                            <Delete />
                          </button>
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          </div>
          <Footer />
        </>
      )}
    </>
  );
}

export default OrderList;
