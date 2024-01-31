import React, { useState, useEffect, useMemo } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Container, Col, Row, Button, Form, Alert } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart } from '../../../redux/cartRedux';
import { getAllProducts } from '../../../redux/productRedux';
import { memoizedGetAll } from '../../../redux/cartRedux';
import './ProductDetails.scss';
import clsx from 'clsx';

const ProductDetails = () => {
  const memoizedcartItems = useSelector(memoizedGetAll);
  const products = useSelector(getAllProducts);
  const dispatch = useDispatch();
  const { id } = useParams();
  const product = products.find(product => product.id === id);
  const [quantity, setQuantity] = useState(1);
  const [showAlert, setShowAlert] = useState(false);
  const [showErrorAlert, setShowErrorAlert] = useState(false);

  const handleAddToCart = () => {
    const isProductInCart = memoizedcartItems.find(item => item.id === product.id) !== undefined;

    if (isProductInCart) {
      setShowErrorAlert(true);
    } else {
      const totalPrice = quantity * product.price;
      const cartItem = {
        id: product.id,
        name: product.name,
        totalPrice,
        quantity,
        img: product.img
      };
      dispatch(addToCart(cartItem));
      setShowAlert(true);
      console.log(cartItem);
    }
  };

  const handleQuantityChange = newQuantity => {
    if (newQuantity >= 1) {
      setQuantity(newQuantity);
    }
  };

  useEffect(() => {
    let timer;
    if (showAlert || showErrorAlert) {
      timer = setTimeout(() => {
        setShowAlert(false);
        setShowErrorAlert(false);
      }, 3000); // Hide alert after 3 seconds
    }
    return () => clearTimeout(timer);
  }, [showAlert, showErrorAlert]);

  const isLargeProduct = product.name.includes('jar');
  const isSmallProduct = product.name.includes('Wild');

  return (
    <Container>
      <h2>Product details</h2>
      {showAlert && (
        <Alert variant="success" onClose={() => setShowAlert(false)} dismissible>
          Product added to cart!
        </Alert>
      )}
      {showErrorAlert && (
        <Alert variant="danger" onClose={() => setShowErrorAlert(false)} dismissible>
          Product already added to cart! Quantity can be altered in Cart.
        </Alert>
      )}
      <Col key={product.id} className="details-wrapper">
        <h3 className="pt-2 px-2">{product.name}</h3>
        <Row>
          <Col xs={12} sm={6} className="img_container_d">
            <img className={clsx('product_img_d', { 'small_img_d': isSmallProduct, 'large_img_d': isLargeProduct })} src={product.img} alt={product.id} />
          </Col>
          <Col xs={12} sm={6} className="description_container">
            <p>
              <span className="caption">Price</span>
              {product.price}$
            </p>
            <p>
              <span className="caption">Description</span>
              {product.description}$
            </p>
            <div className="quantity-controls">
              <Form.Group className="mb-3 d-flex align-items-center">
                <Button variant="outline-secondary" onClick={() => handleQuantityChange(quantity - 1)}>-</Button>
                <Form.Control
                  type="number"
                  value={quantity}
                  onChange={(e) => handleQuantityChange(parseInt(e.target.value))}
                  min="1"
                  max="999"
                  style={{ width: '80px', margin: '0 10px' }}
                />
                <Button variant="outline-secondary" onClick={() => handleQuantityChange(quantity + 1)}>+</Button>
              </Form.Group>
            </div>
            <Button
              className="my-2 mx-3 px-5"
              variant="warning"
              onClick={handleAddToCart}
            >
              Add to Cart
            </Button>
            <Link to="/cart">
              <Button
                className="my-2 mx-3 px-5"
                variant="primary"
              >
                Go to Cart
              </Button>
            </Link>
            <Link to="/">
              <Button
                className="my-2 mx-3 px-5 te"
                variant="primary"
              >
                Back to shopping
              </Button>
            </Link>
          </Col>
        </Row>
      </Col>
    </Container>
  );
};

export default ProductDetails;