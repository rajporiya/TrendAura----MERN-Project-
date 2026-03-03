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
    'tv',
    'Glass',
    'Fruits'
  ]
  const navigate = useNavigate();


  // Sync state with URL changes
  useEffect(() => {
    setCurrentPage(pageFromUrl);
  }, [pageFromUrl]);

  useEffect(() => {
    dispatch(getProduct({ keyword, page: currentPage,category }));
  }, [dispatch, keyword,currentPage, category]);

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
      {loading ? (
        <Loader />
      ) : (
        <>
          <PageTitle title="All Products" />
          <Navbar />
          <div className="products-layout">
            <div className="filter-section">
              <h3 className="filter-heading">Categories</h3>
              {/* Rendrer categories */}
              <ul>
                {categories.map(category=>{
                  return(
                    <li key={category} onClick={()=> handleCategoryClick(category)}>{category}</li>
                  )
                })}
              </ul>
            </div>
            {products?.length > 0 ? (
              <div className="products-section">
                <div className="products-product-container">
                  {products.map((product) => (
                    <Product product={product} key={product._id} />
                  ))}
                </div>
                <Pagination currentPage={currentPage} onPageChange={handlePageChange} />
              </div>
            ) : (
              <NoProduct keyword={keyword} />
            )}
          </div>
          <Footer />
        </>
      )}
    </>
  );
}

export default Products;
