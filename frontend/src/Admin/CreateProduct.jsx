import React, { useEffect, useState } from "react";
import "../AdminStyles/CreateProduct.css";
import Navbar from "../componant/Navbar";
import PageTitle from "../componant/PageTitle";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { createProducts, removeError, removeSuccess } from "../feature/admin/adminSlice";

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
    "Accessories",
    "Watch",
    "Furniture",
    "Books",
    "Beauty",
  ];
  const { loading, success, error } = useSelector((state) => state.admin);
  const dispatch =  useDispatch()
  
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
    }
  }, [error, dispatch, success]);

  // images 
  const createProductImag = (e) => {
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
  };
  return (
    <>
      <Navbar />
      <PageTitle title="Create Product" />
      <div className="create-product-container">
        <h1 className="form-title">Create Product</h1>
        <form
          onSubmit={createProductSubmit}
          encType="multipart/form-data"
          className="product-form"
        >
          <input
            onChange={(e) => setName(e.target.value)}
            type="text"
            name="name"
            placeholder="Enter product Nane"
            className="form-input"
            required
          />
          <input
            onChange={(e) => setPrice(e.target.value)}
            type="number"
            placeholder="Enter product price"
            className="form-input"
            required
          />
          <input
            onChange={(e) => setDescription(e.target.value)}
            type="text"
            placeholder="Enter product Desciption"
            className="form-input"
            required
          />
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            name="category"
            required
            className="form-select"
            id=""
          >
            <option value="">Select a category</option>
            {categories.map((iteam, index) => (
              <option value={iteam} key={index}>
                {iteam}
              </option>
            ))}
          </select>
          <input
            value={stock}
            onChange={(e) => setStock(e.target.value)}
            type="number"
            name="stock"
            placeholder="Enter product Stock"
            className="form-input"
            required
          />
          <div className="file-input-container">
            <input
              type="file"
              accept="image/*"
              multiple
              name="image"
              className="form-input-file"
              id=""
              onChange={createProductImag}
            />
          </div>
          <div className="image-preview-container">
            {imagePreview.map((img,index)=>(
<img alt="Products Preview" key={index}  src={img} className="image-preview" />
            )) }
          </div>
          <button type="submit" className="submit-btn" disabled={loading}>
            {loading ? "Creating..." : "Create"}
          </button>
        </form>
      </div>
    </>
  );
}
