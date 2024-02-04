import React, { useState, useEffect } from 'react';
import ProductSummary from '../ProductSummary/ProductSummary';
import './ProductList.scss'; 
import { Row, Col, Button, Form } from 'react-bootstrap';

const ProductList = ({ products }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredProducts, setFilteredProducts] = useState([]);
  const productsPerPage = 8;

  useEffect(() => {
    setFilteredProducts(products);
  }, [products]);

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;

  const handleSubmit = event => {
    event.preventDefault();
    setCurrentPage(1); 
    const searchTerm = event.target.search.value;
    setSearchTerm(searchTerm);
    const filtered = products.filter(product =>
      product.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredProducts(filtered);
  };

  const currentProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct);
  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);

  const nextPage = () => {
    setCurrentPage(currentPage + 1);
  };

  const prevPage = () => {
    setCurrentPage(currentPage - 1);
  };

  return (
    <>
      <Row className="product-list">
        <Col xs={12}>
          <h2>Products</h2>
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="search">
              <Form.Control
                type="text"
                name="search"
                placeholder="Search by product name"
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
              />
            </Form.Group>
            <Button type="submit" variant="dark">Search</Button>
          </Form>
        </Col>
        <hr className="sectionDivider" />
        {filteredProducts.length === 0 ? (
          <Col xs={12}>
            <p>No products found</p>
          </Col>
        ) : (
          currentProducts.map((product) => (
            <Col key={product.id} xs={12} sm={6} md={4} lg={3}>
              <ProductSummary {...product} />
            </Col>
          ))
        )}
      </Row>
      <hr className="sectionDivider" />
      <div className="pagination">
        {currentPage > 1 && <Button className="my-2 mx-3 px-5 page_button" variant="dark" onClick={prevPage}>Previous Page</Button>}
        {currentPage < totalPages && <Button variant="dark" className="page_button my-2 mx-3 px-5" onClick={nextPage}>Next Page</Button>}
      </div>
    </>
  );
};

export default ProductList;