import React, { useState } from 'react';
import ProductSummary from '../ProductSummary/ProductSummary';
import './ProductList.scss'; // Import custom styles for ProductList
import { Row, Col } from 'react-bootstrap';

const ProductList = ({ products }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 8;

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = products.slice(indexOfFirstProduct, indexOfLastProduct);

  const totalPages = Math.ceil(products.length / productsPerPage);

  const nextPage = () => {
    setCurrentPage(currentPage + 1);
  };

  const prevPage = () => {
    setCurrentPage(currentPage - 1);
  };

  return (
    <>
      <Row className="product-list">
        {currentProducts.map((product) => (
          <Col key={product.id} xs={12} sm={6} md={4} lg={3}>
            <ProductSummary {...product} />
          </Col>
        ))}
      </Row>
      <div className="pagination">
        {currentPage > 1 && <button onClick={prevPage}>Previous</button>}
        {currentPage < totalPages && <button onClick={nextPage}>Next</button>}
      </div>
    </>
  );
};

export default ProductList;