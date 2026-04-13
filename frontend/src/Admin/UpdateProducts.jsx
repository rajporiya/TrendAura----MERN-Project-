import React, { useEffect, useState } from "react";
import "../AdminStyles/UpdateProduct.css";
import PageTitle from "../componant/PageTitle";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import {getProductDetails} from '../feature/product/productSllice.js'
import { removeError, removeSuccess, updateProduct } from "../feature/admin/adminSlice";
import { toast } from "react-toastify";

function UpdateProducts() {
  const [name, setName] = useState("");
    const [price, setPrice] = useState("");
    const [description, setDescription] = useState("");
    const [category, setCategory] = useState("");
    const [stock, setStock] = useState("");
    const [image, setImage] = useState([]);
    const [imagePreview, setImagePreview] = useState([]);
    const [oldImage, setOldImage] = useState([]);
    const {product} = useSelector(state=>state.product);
    const {success, error, loading} = useSelector(state=>state.admin);
    const navigate = useNavigate()
    const dispatch = useDispatch();
    const {updateId} = useParams();

    useEffect(()=>{
      if(updateId){
        dispatch(getProductDetails(updateId))
      }
    },[dispatch, updateId])

    useEffect(()=>{
      if(product){
        setName(product.name)
        setPrice(product.price)
        setDescription(product.description)
        setStock(product.stock)
        setCategory(product.category)
        setOldImage(product.image)
      }
    },[product])
  
    const categories = [
    "Mobile",
    "Laptop",
    "Electronics",
    "Clothing",
    "Shoes",
    "Accessories",
    "Watch",
    "Furniture",
    "Books",
    "Beauty",
  ];
  const handleImageChange  = (e) =>{
     const files = Array.from(e.target.files);
    console.log(files);
    setImage([]);
    setImagePreview([]);

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
  }
  const updateProductSubmit =(e)=>{
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
        // send remaining old images so backend knows what to keep
        oldImage.forEach((img) => {
          myForm.append("oldImages", JSON.stringify(img));
        })
        dispatch(updateProduct({id:updateId, formData: myForm}))
  }
   useEffect(() => {
      if (error) {
        toast.error(error?.message || error, {
          position: "top-right",
          autoClose: 2000,
        });
    
        dispatch(removeError());
      }
      if (success) {
        toast.success("Product Updated Successfully", {
          position: "top-right",
          autoClose: 2000,
        });
        dispatch(removeSuccess());
        navigate('/admin/products')
      }
    }, [error, dispatch, success]);
  return (
 <>
      <PageTitle title="Update Products" />

      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 px-4 pt-6 pb-12">
        <div className="max-w-2xl mx-auto flex flex-col gap-6">

          {/* Heading */}
          <div className="flex items-center gap-2">
            <div className="w-1 h-6 rounded-full bg-amber-500" />
            <h1 className="text-2xl font-bold text-white tracking-tight">Update Product</h1>
          </div>

          {/* Card */}
          <div className="bg-slate-800/60 backdrop-blur-sm border border-slate-700/50 rounded-2xl shadow-2xl overflow-hidden">
            <div className="px-6 py-4 border-b border-slate-700/50">
              <p className="text-xs font-bold uppercase tracking-widest text-slate-400">Product Details</p>
            </div>

            <form encType="multipart/form-data" onSubmit={updateProductSubmit} className="px-6 py-6 flex flex-col gap-5">

              {/* Name */}
              <div className="flex flex-col gap-1.5">
                <label htmlFor="name" className="text-xs font-bold uppercase tracking-widest text-slate-400">Product Name</label>
                <input
                  type="text" value={name} name="name" id="name"
                  onChange={(e) => setName(e.target.value)}
                  required
                  className="bg-slate-900/50 border border-slate-700/50 rounded-xl px-4 py-2.5 text-sm text-white placeholder-slate-500 outline-none focus:border-amber-500/50 focus:ring-1 focus:ring-amber-500/20 transition-all duration-200"
                />
              </div>

              {/* Price */}
              <div className="flex flex-col gap-1.5">
                <label htmlFor="price" className="text-xs font-bold uppercase tracking-widest text-slate-400">Product Price (₹)</label>
                <input
                  type="number" value={price} name="name" id="price"
                  onChange={(e) => setPrice(e.target.value)}
                  required
                  className="bg-slate-900/50 border border-slate-700/50 rounded-xl px-4 py-2.5 text-sm text-white placeholder-slate-500 outline-none focus:border-amber-500/50 focus:ring-1 focus:ring-amber-500/20 transition-all duration-200"
                />
              </div>

              {/* Description */}
              <div className="flex flex-col gap-1.5">
                <label htmlFor="decsriprion" className="text-xs font-bold uppercase tracking-widest text-slate-400">Product Description</label>
                <input
                  type="text" value={description} name="name" id="decsriprion"
                  onChange={(e) => setDescription(e.target.value)}
                  required
                  className="bg-slate-900/50 border border-slate-700/50 rounded-xl px-4 py-2.5 text-sm text-white placeholder-slate-500 outline-none focus:border-amber-500/50 focus:ring-1 focus:ring-amber-500/20 transition-all duration-200"
                />
              </div>

              {/* Category */}
              <div className="flex flex-col gap-1.5">
                <label htmlFor="category" className="text-xs font-bold uppercase tracking-widest text-slate-400">Product Category</label>
                <select
                  value={category} id="category" name="category"
                  onChange={(e) => setCategory(e.target.value)}
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
                <label htmlFor="stock" className="text-xs font-bold uppercase tracking-widest text-slate-400">Product Stock</label>
                <input
                  type="number" value={stock} name="stock" id="stock"
                  onChange={(e) => setStock(e.target.value)}
                  required
                  className="bg-slate-900/50 border border-slate-700/50 rounded-xl px-4 py-2.5 text-sm text-white placeholder-slate-500 outline-none focus:border-amber-500/50 focus:ring-1 focus:ring-amber-500/20 transition-all duration-200"
                />
              </div>

              {/* File Upload */}
              <div className="flex flex-col gap-1.5">
                <label htmlFor="image" className="text-xs font-bold uppercase tracking-widest text-slate-400">Product Images</label>
                <div className="bg-slate-900/50 border border-slate-700/50 rounded-xl px-4 py-2.5 hover:border-amber-500/30 transition-all duration-200">
                  <input
                    type="file" multiple accept="image/" name="image" id="image"
                    onChange={handleImageChange}
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

              {/* New Image Previews */}
              {imagePreview.length > 0 && (
                <div className="flex flex-col gap-2">
                  <p className="text-xs font-bold uppercase tracking-widest text-slate-400">New Images</p>
                  <div className="flex flex-wrap gap-3">
                    {imagePreview.map((img, index) => (
                      <div key={index} className="w-20 h-20 rounded-xl overflow-hidden border border-amber-500/30 bg-slate-900/50">
                        <img src={img} alt="" className="w-full h-full object-cover object-center" />
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Old Images */}
              {oldImage.length > 0 && (
                <div className="flex flex-col gap-2">
                  <p className="text-xs font-bold uppercase tracking-widest text-slate-400">Current Images</p>
                  <div className="flex flex-wrap gap-3">
                    {oldImage.map((img, index) => (
                      <div key={index} className="w-20 h-20 rounded-xl overflow-hidden border border-slate-700/50 bg-slate-900/50">
                        <img src={img.url} alt="Old Image Preview" className="w-full h-full object-cover object-center" />
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Divider */}
              <div className="h-px bg-slate-700/50" />

              {/* Submit */}
              <button
                type="submit"
                className="w-full py-3.5 rounded-xl font-bold text-sm tracking-widest uppercase transition-all duration-200 bg-amber-500 hover:bg-amber-300 text-slate-900 shadow-lg shadow-amber-500/20 hover:shadow-amber-500/40 active:scale-[0.98] disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {loading ? 'Updating Product...' : 'Update'}
              </button>

            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default UpdateProducts;
/*
import React, { useEffect, useState } from "react";
import "../AdminStyles/UpdateProduct.css";
import Navbar from "../componant/Navbar";
import PageTitle from "../componant/PageTitle";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import {getProductDetails} from '../feature/product/productSllice.js'

function UpdateProducts() {
  const [name, setName] = useState("");
    const [price, setPrice] = useState("");
    const [description, setDescription] = useState("");
    const [category, setCategory] = useState("");
    const [stock, setStock] = useState("");
    const [image, setImage] = useState([]);
    const [imagePreview, setImagePreview] = useState([]);
    const [oldImage, setOldImage] = useState([]);
    const {product} = useSelector(state=>state.product);
    console.log(product);
    
    const dispatch = useDispatch();
    const {updateId} = useParams();

    useEffect(()=>{
      if(updateId){
        dispatch(getProductDetails(updateId))
      }
    },[dispatch, updateId])

    useEffect(()=>{
      if(product){
        setName(product.name)
        setPrice(product.price)
        setDescription(product.description)
        setStock(product.stock)
        setCategory(product.category)
        setOldImage(product.image)
      }
    },[product])
  
    const categories = [
    "Mobile",
    "Laptop",
    "Electronics",
    "Clothing",
    "Shoes",
    "Accessories",
    "Watch",
    "Furniture",
    "Books",
    "Beauty",
  ];
  const handleRemoveOldImage = (index) => {
    setOldImage((prev) => prev.filter((_, i) => i !== index));
  };

  const handleImageChange  = (e) =>{
     const files = Array.from(e.target.files);
    console.log(files);
    setImage([]);
    setImagePreview([]);

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
  }
  const updateProductSubmit =(e)=>{
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
  }
  return (
    <>
      <Navbar />
      <PageTitle title="Update Products" />
      <div className="update-product-wrapper">
        <h1 className="update-product-title">Update Product</h1>
        <form encType="multipart/form-data" onSubmit={updateProductSubmit}>
          <label htmlFor="name">Product Name</label>
          <input
            type="text" value={name}
            name="name"
            id="name" onChange={(e)=> setName(e.target.value)}
            required
            className="update-product-input"
          />
          <br />
          <label htmlFor="price">Product Price</label>
          <input
            type="number"
            name="name"value={price }
            id="price" onChange={(e)=> setPrice(e.target.value)}
            required
            className="update-product-input"
          />
          <br />
          <label htmlFor="decsriprion">Product Decsriprion</label>
          <input
            type="text" value={description}
            name="name" onChange={(e)=> setDescription(e.target.value)}
            id="decsriprion"
            required
            className="update-product-textarea"
          />
          <br />
          <label htmlFor="category">Product Category </label>
          <select
            className="update-product-select"
              value={category}
            id="category" onChange={(e)=> setCategory(e.target.value)}
            name="category"
            required
          >
            <option value="">Select a category</option>
            {categories.map((iteam, index) => (
              <option value={iteam} key={index}>
                {iteam}
              </option>
            ))}
          </select>
          <label htmlFor="stock">Product Stock</label>
          <input
            type="number" value={stock} 
            name="stock" onChange={(e)=> setStock(e.target.value)}
            id="stock"
            required
            className="update-product-input"
          />
          <br />
          <label htmlFor="image">Product Image </label>
          <div className="update-product-file-wrapper">
            <input
              type="file"
              multiple 
              accept="image/"
              name="image" 
              id="image" onChange={handleImageChange}
              className="update-product-file-input"
            />
          </div>
          <div className="update-product-preview-wrapper">
            {imagePreview.map((img,index)=>(<img
              src={img} key={index}
              className="update-product-preview-image"
              alt=""
            />))}
          </div>
          <div className="update-product-old-images-wrapper">
            {oldImage.map((img, index) => (
              <div key={index} style={{ position: "relative", display: "inline-block" }}>
                <img
                  src={img.url}
                  alt="Old Image Preview"
                  className="update-product-old-image"
                />
                <button
                  type="button"
                  onClick={() => handleRemoveOldImage(index)}
                  style={{
                    position: "absolute",
                    top: "4px",
                    right: "4px",
                    background: "red",
                    color: "white",
                    border: "none",
                    borderRadius: "50%",
                    width: "22px",
                    height: "22px",
                    cursor: "pointer",
                    fontWeight: "bold",
                    fontSize: "14px",
                    lineHeight: "1",
                  }}
                >
                  &times;
                </button>
              </div>
            ))}
          </div>
          <button className="update-product-submit-btn">Update</button>
        </form>
      </div>
    </>
  );
}

export default UpdateProducts;

*/