import React, { useEffect, useState } from "react";
import "../PageStyles/Products.css";
import PageTitle from "../componant/PageTitle";
import Navbar from "../componant/Navbar";
import Footer from "../componant/Footer";
import { useDispatch, useSelector } from "react-redux";
import { getProduct, removeError } from "../feature/product/productSllice";
import { toast } from "react-toastify";
import Loader from "../componant/Loader";
import Product from "../componant/Product";
import { useLocation, useNavigate } from "react-router-dom";
import NoProduct from "../componant/NoProduct";
import Pagination from "../componant/Pagination";

function Products() {
  const { loading, error, products, resultPerPage, productCount } = useSelector(
    (state) => state.product,
  );
  const hasProducts = Array.isArray(products) && products.length > 0;
  const showInitialLoader = loading && !hasProducts;
  const dispatch = useDispatch();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const keyword = searchParams.get("keyword");
  const category = searchParams.get("category");
  const pageFromUrl = parseInt(searchParams.get("page"), 10) || 1;
  const [currentPage, setCurrentPage] = useState(pageFromUrl);
  const categories = [
    'Laptop',
    'Mobile',
    'Electronics',
    'Watch',
    'Earbuds',
    'Googles',
    'Shoes',
    'Shirt',
    'T-Shirt',
    '',
  ]
  const navigate = useNavigate();

  // Sync state with URL changes
  useEffect(() => {
    setCurrentPage(pageFromUrl);
  }, [pageFromUrl]);

  useEffect(() => {
    dispatch(getProduct({ keyword, page: currentPage, category }));
  }, [dispatch, keyword, currentPage, category]);

  useEffect(() => {
    if (error) {
      toast.error(error?.message || error, {
        position: "top-right",
        autoClose: 2000,
      });
      dispatch(removeError());
    }
  }, [error, dispatch]);

  const handlePageChange = (page) => {
    if (page !== currentPage) {
      setCurrentPage(page);
      const newSearchParams = new URLSearchParams(location.search);
      if (page === 1) {
        newSearchParams.delete('page');
      } else {
        newSearchParams.set('page', page);
      }
      navigate(`?${newSearchParams.toString()}`);
    }
  };

  const handleCategoryClick = (selectedCategory) => {
    setCurrentPage(1);
    const newSearchParams = new URLSearchParams(location.search);
    newSearchParams.set('category', selectedCategory);
    newSearchParams.delete('page');
    navigate(`?${newSearchParams.toString()}`);
  };

  return (
  <>
  {showInitialLoader ? (
    <Loader />
  ) : (
    <>
      <PageTitle title="All Products" />
      <Navbar />

      <div className="mt-5 min-h-screen bg-gray-50 dark:bg-[var(--background)] px-4 pt-16 pb-10">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row gap-6">

          {/* ── Filter Sidebar ── */}
          <aside className="md:w-56 shrink-0">
            <div className="bg-white dark:bg-[var(--card-bg)] backdrop-blur-sm border border-gray-200 dark:border-[var(--border)] rounded-2xl shadow-2xl p-5 sticky top-6">

              {/* Heading */}
              <div className="flex items-center gap-2 mb-4">
                <div className="w-1 h-5 rounded-full bg-amber-500" />
                <h3 className="text-sm font-bold uppercase tracking-widest text-gray-500 dark:text-[var(--text-secondary)]">
                  Categories
                </h3>
              </div>

              {/* Divider */}
              <div className="h-px bg-gray-200 dark:bg-[var(--border)] mb-4" />

              {/* Category List */}
              <ul className="flex flex-col gap-1">
                {categories.map(category => (
                  <li
                    key={category}
                    onClick={() => handleCategoryClick(category)}
                    className="px-3 py-2 rounded-xl text-sm text-gray-500 dark:text-[var(--text-secondary)] cursor-pointer
                      hover:bg-amber-500/10 hover:text-amber-500
                      border border-transparent hover:border-amber-500/20
                      transition-all duration-200 font-medium"
                  >
                    {category}
                  </li>
                ))}
              </ul>
            </div>
          </aside>

          {/* ── Products Section ── */}
          {products?.length > 0 ? (
            <div className="flex-1 flex flex-col gap-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
                {products.map((product) => (
                  <Product product={product} key={product._id} />
                ))}
              </div>
              <Pagination currentPage={currentPage} onPageChange={handlePageChange} />
            </div>
          ) : (
            <div className="flex-1">
              <NoProduct keyword={keyword} />
            </div>
          )}

        </div>
      </div>

      <Footer />
    </>
  )}
</>
  );
}

export default Products;  