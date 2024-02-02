import React, { useState } from 'react';
import ProductSummary from '../ProductSummary/ProductSummary';
import './ProductList.scss'; // Import custom styles for ProductList
import { Row, Col, Button } from 'react-bootstrap';

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
        <h2>Products</h2>
      <hr className="sectionDivider" />
        {currentProducts.map((product) => (
          <Col key={product.id} xs={12} sm={6} md={4} lg={3}>
            <ProductSummary {...product} />
          </Col>
        ))}
      </Row>
      <hr className="sectionDivider" />
      <div className="pagination">
        {currentPage > 1 && <Button className="my-2 mx-3 px-5 page_button"
                variant="dark" onClick={prevPage}>Previous Page  </Button>}
        {currentPage < totalPages &&   <Button variant="dark" className="page_button my-2 mx-3 px-5" onClick={nextPage}>Next Page</Button>}
      </div>
    </>
  );
};

export default ProductList;