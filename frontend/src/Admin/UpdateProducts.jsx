import React, { useEffect, useState } from "react";
import "../AdminStyles/UpdateProduct.css";
import Navbar from "../componant/Navbar";
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
            {oldImage.map((img,index)=>(
              <img key={index}
              src={img.url}
              alt="Old Image Preview"
              className="update-product-old-image"
            />
            ))}
          </div>
          <button className="update-product-submit-btn">{loading? 'Updating Product' : 'Update'}</button>
        </form>
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