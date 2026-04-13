import React, { useEffect, useState } from "react";
// import "../AdminStyles/CreateProduct.css";
import PageTitle from "../componant/PageTitle";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { createProducts, removeError, removeSuccess } from "../feature/admin/adminSlice";
import { useNavigate } from "react-router-dom";

export default function CreateProduct() {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [stock, setStock] = useState("");
  const [image, setImage] = useState([]);
  const [imagePreview, setImagePreview] = useState([]);

  const categories = [
    "Mobile",
    "Laptop",
    "Electronics",
    "Clothing",
    "Shoes",
    "Watch",
    "Furniture",
    "Books",
    "Gogles"
  ];
  const { loading, success, error } = useSelector((state) => state.admin);
  const dispatch =  useDispatch()
  const navigate = useNavigate();
  
  const createProductSubmit = (e) => {
    e.preventDefault();

    const myForm = new FormData();
    myForm.set("name", name);
    myForm.set("price", price);
    myForm.set("description", description);
    myForm.set("category", category);
    myForm.set("stock", stock);
    image.forEach((img) => {
      myForm.append("image", img);
    })
    dispatch(createProducts(myForm))
  };
    useEffect(() => {
    if (error) {
      toast.error(error?.message || error, {
        position: "top-right",
        autoClose: 2000,
      });
  
      dispatch(removeError());
    }
    if (success) {
      toast.success("Product Create Successfully", {
        position: "top-right",
        autoClose: 2000,
      });
      dispatch(removeSuccess());
    //   reset Form
    setName("")
    setCategory("")
    setDescription("")
    setImage([])
    setPrice("")
    setStock("")
    setImagePreview([])
    navigate("/admin/dashboard");
    }
  }, [error, dispatch, success, navigate]);

  // images 
  const createProductImag = (e) => {
    const files = Array.from(e.target.files);
    console.log(files);

    files.forEach((file) => {
      setImage((old) => [...old, file]);
      const reader = new FileReader();
      reader.onload = () => {
        if (reader.readyState === 2) {
          setImagePreview((old) => [...old, reader.result]);
        }
      }
      reader.readAsDataURL(file)
    });
  };

  // Remove image function
  const removeImage = (index) => {
    setImage((old) => old.filter((_, i) => i !== index));
    setImagePreview((old) => old.filter((_, i) => i !== index));
  };
  return (
<>
      <PageTitle title="Create Product" />

      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 px-4 pt-6 pb-12">
        <div className="max-w-2xl mx-auto flex flex-col gap-6">

          {/* Heading */}
          <div className="flex items-center gap-2">
            <div className="w-1 h-6 rounded-full bg-amber-500" />
            <h1 className="text-2xl font-bold text-white tracking-tight">Create Product</h1>
          </div>

          {/* Card */}
          <div className="bg-slate-800/60 backdrop-blur-sm border border-slate-700/50 rounded-2xl shadow-2xl overflow-hidden">
            <div className="px-6 py-4 border-b border-slate-700/50">
              <p className="text-xs font-bold uppercase tracking-widest text-slate-400">Product Details</p>
            </div>

            <form
              onSubmit={createProductSubmit}
              encType="multipart/form-data"
              className="px-6 py-6 flex flex-col gap-5"
            >

              {/* Name */}
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-bold uppercase tracking-widest text-slate-400">Product Name</label>
                <input
                  onChange={(e) => setName(e.target.value)}
                  type="text"
                  name="name"
                  placeholder="Enter product name"
                  required
                  className="bg-slate-900/50 border border-slate-700/50 rounded-xl px-4 py-2.5 text-sm text-white placeholder-slate-500 outline-none focus:border-amber-500/50 focus:ring-1 focus:ring-amber-500/20 transition-all duration-200"
                />
              </div>

              {/* Price */}
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-bold uppercase tracking-widest text-slate-400">Price (₹)</label>
                <input
                  onChange={(e) => setPrice(e.target.value)}
                  type="number"
                  placeholder="Enter product price"
                  required
                  className="bg-slate-900/50 border border-slate-700/50 rounded-xl px-4 py-2.5 text-sm text-white placeholder-slate-500 outline-none focus:border-amber-500/50 focus:ring-1 focus:ring-amber-500/20 transition-all duration-200"
                />
              </div>

              {/* Description */}
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-bold uppercase tracking-widest text-slate-400">Description</label>
                <input
                  onChange={(e) => setDescription(e.target.value)}
                  type="text"
                  placeholder="Enter product description"
                  required
                  className="bg-slate-900/50 border border-slate-700/50 rounded-xl px-4 py-2.5 text-sm text-white placeholder-slate-500 outline-none focus:border-amber-500/50 focus:ring-1 focus:ring-amber-500/20 transition-all duration-200"
                />
              </div>

              {/* Category */}
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-bold uppercase tracking-widest text-slate-400">Category</label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  name="category"
                  required
                  className="bg-slate-900/50 border border-slate-700/50 rounded-xl px-4 py-2.5 text-sm text-white outline-none focus:border-amber-500/50 focus:ring-1 focus:ring-amber-500/20 transition-all duration-200 cursor-pointer"
                >
                  <option value="">Select a category</option>
                  {categories.map((item, index) => (
                    <option value={item} key={index}>{item}</option>
                  ))}
                </select>
              </div>

              {/* Stock */}
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-bold uppercase tracking-widest text-slate-400">Stock</label>
                <input
                  value={stock}
                  onChange={(e) => setStock(e.target.value)}
                  type="number"
                  name="stock"
                  placeholder="Enter product stock"
                  required
                  className="bg-slate-900/50 border border-slate-700/50 rounded-xl px-4 py-2.5 text-sm text-white placeholder-slate-500 outline-none focus:border-amber-500/50 focus:ring-1 focus:ring-amber-500/20 transition-all duration-200"
                />
              </div>

              {/* File Upload */}
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-bold uppercase tracking-widest text-slate-400">Product Images</label>
                <div className="bg-slate-900/50 border border-slate-700/50 rounded-xl px-4 py-2.5 transition-all duration-200 hover:border-amber-500/30">
                  <input
                    type="file"
                    accept="image/*"
                    multiple
                    name="image"
                    onChange={createProductImag}
                    className="w-full text-sm text-slate-400
                      file:mr-4 file:py-1.5 file:px-4
                      file:rounded-lg file:border-0
                      file:text-xs file:font-bold file:uppercase file:tracking-wider
                      file:bg-amber-500/10 file:text-amber-500
                      hover:file:bg-amber-500/20
                      cursor-pointer transition-all duration-200"
                  />
                </div>
              </div>

              {/* Image Previews */}
              {imagePreview.length > 0 && (
                <div className="flex flex-wrap gap-3">
                  {imagePreview.map((img, index) => (
                    <div key={index} className="relative w-20 h-20 rounded-xl overflow-hidden border border-slate-700/50 bg-slate-900/50 group">
                      <img
                        alt="Products Preview"
                        src={img}
                        className="w-full h-full object-cover object-center"
                      />
                      <button
                        type="button"
                        onClick={() => removeImage(index)}
                        className="absolute inset-0 bg-black/70 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center"
                      >
                        <svg className="w-5 h-5 text-red-400" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                        </svg>
                      </button>
                    </div>
                  ))}
                </div>
              )}

              {/* Divider */}
              <div className="h-px bg-slate-700/50" />

              {/* Submit */}
              <button
                type="submit"
                disabled={loading}
                className="w-full py-3.5 rounded-xl font-bold text-sm tracking-widest uppercase transition-all duration-200 bg-amber-500 hover:bg-amber-300 text-slate-900 shadow-lg shadow-amber-500/20 hover:shadow-amber-500/40 active:scale-[0.98] disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {loading ? "Creating..." : "Create"}
              </button>

            </form>
          </div>
        </div>
      </div>
    </>
  );
}
