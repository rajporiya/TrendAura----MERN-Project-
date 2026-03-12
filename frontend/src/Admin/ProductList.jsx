import React, { useEffect } from "react";
import "../AdminStyles/ProductsList.css";
import Navbar from "../componant/Navbar";
import PageTitle from "../componant/PageTitle";
import Footer from "../componant/Footer";
import { Delete, Edit } from "@mui/icons-material";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../componant/Loader";
import {
  deleteProduct,
  fetchAllProducts,
  removeError,
} from "../feature/admin/adminSlice";
import { toast } from "react-toastify";

function ProductList() {
  const { products, loading, error, deleting = {} } = useSelector(
    (state) => state.admin
  );

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchAllProducts());
  }, [dispatch]);

  useEffect(() => {
    if (error) {
      toast.error(error?.message || error, {
        position: "top-right",
        autoClose: 2000,
      });

      dispatch(removeError());
    }
  }, [error, dispatch]);
  if (!products || products.length === 0) {
    return (
      <div className="product-list-container">
        <h1 className="product-list-title">All Products</h1>
        <p className="admin-no-products">No Products Found</p>
      </div>
    );
  }

  const handleDelete = (productId) => {
    const isConfirmed = window.confirm("Are You Sure Dlete item?");
    if (isConfirmed) {
      dispatch(deleteProduct(productId)).then((action) => {
        if (action.type === "admin/deleteProduct/fulfilled") {
          toast.success("Product Deleted Successfully", {
            position: "top-right",
            autoClose: 2000,
          });
        }
      });
    }
  };
  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
          <Navbar />
          <PageTitle title="All Products" />
          <div className="product-list-container">
            <h1 className="product-list-title">All Products</h1>
            <table className="product-table">
              <thead>
                <tr>
                  <th>Sr No.</th>
                  <th>Product Image</th>
                  <th>Product Name</th>
                  <th>Price</th>
                  <th>Category</th>
                  <th>Stock</th>
                  <th>Created At</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {Array.isArray(products) && products.length > 0 ? (
                  products.map((product, index) => (
                    <tr key={product._id}>
                      <td>{index + 1}</td>
                      <td>
                        <img
                          src={
                            product.image?.[0]?.url ||
                            product.image?.[0]?.uri ||
                            "/placeholder.png"
                          }
                          className="admin-product-image"
                          alt={product.name}
                        />
                      </td>
                      <td>{product.name}</td>
                      <td>₹{product.price}</td>
                      <td>{product.category}</td>
                      <td>{product.stock}</td>
                      <td>
                        {new Date(product.createdAt).toLocaleDateString()}
                      </td>
                      <td>
                        <Link
                          to={`/admin/product/${product._id}`}
                          className="action-icon edit-icon"
                          disabled={loading}
                        >
                          <Edit />
                        </Link>
                        <button
                          disabled={deleting[product._id]}
                          className="action-icon delete-icon"
                          onClick={() => handleDelete(product._id)}
                        >
                          {deleting[product._id] ? <Loader /> : <Delete />}
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan="8"
                      style={{ textAlign: "center", padding: "20px" }}
                    >
                      No products available
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
          <Footer />
        </>
      )}
    </>
  );
}

export default ProductList;
