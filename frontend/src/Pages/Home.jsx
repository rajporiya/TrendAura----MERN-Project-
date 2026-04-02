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
    // ✅ ONLY UI CHANGED — all logic, state, handlers are identical to your original

<>
  {loading ? (<Loader />) : (
    <>
      <Navbar />
      <PageTitle title="TrendAura" />

      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">

        {/* Image Slider */}
        <div className="px-4 pt-6 max-w-6xl mx-auto">
          <ImageSlider />
        </div>

        {/* Products Section */}
        <div className="max-w-6xl mx-auto px-4 py-14">

          {/* Section Header */}
          <div className="flex items-center gap-4 mb-10">
            <div className="flex items-center gap-3">
              <div className="w-1 h-7 rounded-full bg-amber-400" />
              <h2 className="text-2xl font-bold text-white tracking-tight">
                Trending <span className="text-amber-400">Now</span>
              </h2>
            </div>
            <div className="flex-1 h-px bg-gradient-to-r from-amber-400/20 via-slate-700/50 to-transparent" />
            <div className="w-1.5 h-1.5 rotate-45 bg-amber-400/40 flex-shrink-0" />
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
