import React, { useEffect } from "react";
import Footer from "../componant/Footer";
import "../PageStyles/Home.css";
import Navbar from "../componant/Navbar";
import ImageSlider from "../componant/ImageSlider";
import Product from "../componant/Product";
import PageTitle from "../componant/PageTitle";
import { useDispatch, useSelector } from "react-redux";
import { getProduct,removeError } from "../feature/product/productSllice";
import Loader from "../componant/Loader";
import { toast } from "react-toastify";

function Home() {
  const { error, loading, products, productCount } = useSelector(
    (state) => state.product,
  );

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getProduct({keyword : ''}));
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
  return (
    <>
    {loading ? (<Loader />) : (<>
      <Navbar />
      <PageTitle title="TrendAura" />
      <ImageSlider />
      <div className="home-container">
        <h2 className="home-heading">Trending now</h2>

        <div className="home-product-container">
          {products.map((product, index) => (
            <Product product={product} key={index} />
          ))}
        </div>
      </div>
      <Footer />
    </>)}
    </>
  );
}

export default Home;
