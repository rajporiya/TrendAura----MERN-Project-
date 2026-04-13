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
  const hasProducts = Array.isArray(products) && products.length > 0;
  const showInitialLoader = loading && !hasProducts;

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
  {showInitialLoader ? (<Loader />) : (
    <>
      <Navbar />
      <PageTitle title="TrendAura" />

      <div className="min-h-screen bg-gray-50 dark:bg-[var(--background)]">

        {/* Image Slider */}
        <div className="px-4 pt-6 max-w-6xl mx-auto">
          <ImageSlider />
        </div>

        {/* Products Section */}
        <div className="max-w-6xl mx-auto px-4 py-14">

          {/* Section Header */}
          <div className="flex items-center gap-4 mb-10">
            <div className="flex items-center gap-3">
              <div className="w-1 h-7 rounded-full bg-amber-500" />
              <h2 className="text-2xl font-bold text-gray-900 dark:text-[var(--text-primary)] tracking-tight">
                Trending <span className="text-amber-500">Now</span>
              </h2>
            </div>
            <div className="flex-1 h-px bg-gradient-to-r from-amber-500/20 via-gray-200 dark:via-[var(--border)] to-transparent" />
            <div className="w-1.5 h-1.5 rotate-45 bg-amber-500/40 flex-shrink-0" />
          </div>

          {/* Products Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
            {products.map((product, index) => (
              <Product product={product} key={index} />
            ))}
          </div>

        </div>
      </div>

      <Footer />
    </>
  )}
</>
  );
}

export default Home;
