import React, { useEffect, useState } from 'react';
import ProductSummary from '../ProductSummary/ProductSummary';
import './ProductList.scss'; // Import custom styles for ProductList

const ProductList = ({ products }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 8;

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = products.slice(indexOfFirstProduct, indexOfLastProduct);

  const totalPages = Math.ceil(products.length / productsPerPage);

  useEffect(() => {
    const updateProductsPerPage = () => {
      if (window.innerWidth >= 1024) {
        setCurrentPage(1);
      }
    };

    window.addEventListener('resize', updateProductsPerPage);

    return () => {
      window.removeEventListener('resize', updateProductsPerPage);
    };
  }, []);

  const nextPage = () => {
    setCurrentPage(currentPage + 1);
  };

  const prevPage = () => {
    setCurrentPage(currentPage - 1);
  };

  return (
    <>
      <div className="product-list">
        {currentProducts.map((product, index) => (
          <ProductSummary key={product.id} {...product} />
        ))}
      </div>
      <div className="pagination">
        {currentPage > 1 && <button onClick={prevPage}>Previous</button>}
        {currentPage < totalPages && <button onClick={nextPage}>Next</button>}
      </div>
    </>
  );
};

export default ProductList;