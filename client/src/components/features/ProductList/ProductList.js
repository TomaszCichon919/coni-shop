import React, { useState, useEffect } from 'react';
import ProductSummary from '../ProductSummary/ProductSummary';
import styles from './ProductList.module.scss';
import { Row, Col, Form, Alert } from 'react-bootstrap';
import Button from '../../layout/Button/Button';

const ProductList = ({ products }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [showAllProducts, setShowAllProducts] = useState(true);
 
  const productsPerPage = 8;

  useEffect(() => {
    setFilteredProducts(products);
  }, [products]);

  useEffect(() => {
    if (filteredProducts.length === 0 && !showAllProducts) {
      const timeout = setTimeout(() => {
        setSearchTerm('');
        setShowAllProducts(true);
      }, 2000);

      return () => clearTimeout(timeout);
    }
  }, [filteredProducts, showAllProducts]);

  useEffect(() => {
    if (showAllProducts) {
      setFilteredProducts(products);
    }
  }, [showAllProducts, products]);

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
    setShowAllProducts(false);
  };

  const currentProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct);
  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);

  const nextPage = () => {
    setCurrentPage(prevPage => prevPage + 1);
  };

  const prevPage = () => {
    setCurrentPage(prevPage => prevPage - 1);
  };

  return (
    <div className='px-5'>
      <Row>
        <Col xs={12}>
          <Form className='d-flex align-items-center justify-content-center' onSubmit={handleSubmit}>
            <Form.Group controlId="search">
              <Form.Control
                className={styles.input}
                type="text"
                name="search"
                placeholder="Search by product name"
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
              />
            </Form.Group>
            <Button type="submit">Search</Button>
          </Form>
        </Col>
        <h2 className={styles.section_name}>Product List</h2>
        <hr className={styles.sectionDivider} />
        {filteredProducts.length === 0 && !showAllProducts ? (
          <Col xs={12}>
            <Alert variant="warning">No products found</Alert>
          </Col>
        ) : (
          currentProducts.map(product => (
            <Col key={product.id} xs={12} sm={6} md={4} lg={3}>
              <ProductSummary {...product} />
            </Col>
          ))
        )}
      </Row>
      <hr className={styles.sectionDivider} />
      <div className={styles.pagination}>
        {currentPage > 1 && <Button onClick={prevPage}>Previous Page</Button>}
        {currentPage < totalPages && <Button onClick={nextPage}>Next Page</Button>}
      </div>
    </div>
  );
};

export default ProductList;
