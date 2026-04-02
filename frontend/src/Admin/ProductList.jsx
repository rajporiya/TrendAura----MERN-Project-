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

          <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 px-6 pt-6 pb-12">
            <div className="w-full flex flex-col gap-6">

              {/* Heading */}
              <div className="flex items-center gap-2">
                <div className="w-1 h-6 rounded-full bg-amber-400" />
                <h1 className="text-2xl font-bold text-white tracking-tight">All Products</h1>
              </div>

              {/* Table Card */}
              <div className="bg-slate-800/60 backdrop-blur-sm border border-slate-700/50 rounded-2xl shadow-2xl overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-slate-700/50">
                        <th className="text-left px-6 py-3 text-xs font-bold uppercase tracking-widest text-slate-500">Sr No.</th>
                        <th className="text-left px-6 py-3 text-xs font-bold uppercase tracking-widest text-slate-500">Image</th>
                        <th className="text-left px-6 py-3 text-xs font-bold uppercase tracking-widest text-slate-500">Product Name</th>
                        <th className="text-left px-6 py-3 text-xs font-bold uppercase tracking-widest text-slate-500">Price</th>
                        <th className="text-left px-6 py-3 text-xs font-bold uppercase tracking-widest text-slate-500">Category</th>
                        <th className="text-left px-6 py-3 text-xs font-bold uppercase tracking-widest text-slate-500">Stock</th>
                        <th className="text-left px-6 py-3 text-xs font-bold uppercase tracking-widest text-slate-500">Created At</th>
                        <th className="text-left px-6 py-3 text-xs font-bold uppercase tracking-widest text-slate-500">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-700/50">
                      {Array.isArray(products) && products.length > 0 ? (
                        products.map((product, index) => (
                          <tr key={product._id} className="hover:bg-slate-700/20 transition-all duration-150">

                            <td className="px-6 py-4 text-slate-400">{index + 1}</td>

                            <td className="px-6 py-4">
                              <div className="w-12 h-12 rounded-xl overflow-hidden border border-slate-700/50 bg-slate-900/50">
                                <img
                                  src={product.image?.[0]?.url || product.image?.[0]?.uri || "/placeholder.png"}
                                  alt={product.name}
                                  className="w-full h-full object-cover object-center"
                                />
                              </div>
                            </td>

                            <td className="px-6 py-4 text-white font-medium">{product.name}</td>

                            <td className="px-6 py-4 text-amber-400 font-bold">₹{product.price}</td>

                            <td className="px-6 py-4">
                              <span className="px-3 py-1 rounded-full text-xs font-bold bg-slate-700/50 border border-slate-600/50 text-slate-300">
                                {product.category}
                              </span>
                            </td>

                            <td className="px-6 py-4">
                              <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold
                                ${product.stock > 0
                                  ? 'bg-emerald-500/10 border border-emerald-500/20 text-emerald-400'
                                  : 'bg-red-500/10 border border-red-500/20 text-red-400'
                                }`}>
                                <span className={`w-1.5 h-1.5 rounded-full ${product.stock > 0 ? 'bg-emerald-400' : 'bg-red-400'}`} />
                                {product.stock}
                              </span>
                            </td>

                            <td className="px-6 py-4 text-slate-400 text-xs">
                              {new Date(product.createdAt).toLocaleDateString()}
                            </td>

                            <td className="px-6 py-4">
                              <div className="flex items-center gap-2">
                                <Link
                                  to={`/admin/product/${product._id}`}
                                  disabled={loading}
                                  className="w-8 h-8 rounded-lg flex items-center justify-center border border-emerald-500/30 text-emerald-400 hover:bg-emerald-500/10 transition-all duration-200"
                                >
                                  <Edit style={{fontSize: 16}} />
                                </Link>
                                <button
                                  disabled={deleting[product._id]}
                                  onClick={() => handleDelete(product._id)}
                                  className="w-8 h-8 rounded-lg flex items-center justify-center border border-red-500/30 text-red-400 hover:bg-red-500/10 transition-all duration-200 disabled:opacity-40 disabled:cursor-not-allowed"
                                >
                                  {deleting[product._id] ? <Loader /> : <Delete style={{fontSize: 16}} />}
                                </button>
                              </div>
                            </td>

                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td colSpan="8" className="px-6 py-20 text-center">
                            <div className="flex flex-col items-center gap-3">
                              <div className="w-14 h-14 rounded-2xl bg-slate-700/30 border border-slate-600/50 flex items-center justify-center">
                                <Inventory style={{fontSize: 24}} className="text-slate-500" />
                              </div>
                              <p className="text-sm text-slate-400">No products available</p>
                            </div>
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>

            </div>
          </div>

          <Footer />
        </>
      )}
    </>
  );
}

export default ProductList;
