import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Container, Col, Row, Button, Form } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart } from '../../../redux/cartRedux';
import { getAllProducts } from '../../../redux/productRedux';

const ProductDetails = () => {
  const products = useSelector(getAllProducts);
  const dispatch = useDispatch();
  const { id } = useParams();
  const product = products.find(product => product.id === id);
  const [quantity, setQuantity] = useState(1);

  const handleAddToCart = () => {
    const totalPrice = quantity * product.price;
    const cartItem = {
      id: product.id,
      name: product.name,
      totalPrice,
      quantity,
      img: product.img
    };
    dispatch(addToCart(cartItem));
    console.log(cartItem)
  };

  const handleQuantityChange = (newQuantity) => {
    if (newQuantity >= 1) {
      setQuantity(newQuantity);
    }
  };

  return (
    <Container>
      <h2>Product details</h2>
      <Col key={product.id} className='wrapper'>
        <h3 className='pt-2 px-2'>{product.name}</h3>
        <Row>
          <Col xs={6}>
            <img className='ad_img p-2' src={product.img} alt={product.id} />
          </Col>
          <Col xs={6}>
            <p>
              <span className='caption'>Price</span>
              {product.price}$
            </p>
            <p>
              <span className='caption'>Description</span>
              {product.description}$
            </p>
            <div className='quantity-controls'>
              <Button variant="outline-secondary" onClick={() => handleQuantityChange(quantity - 1)}>-</Button>
              <Form.Control
                type="number"
                value={quantity}
                onChange={(e) => handleQuantityChange(parseInt(e.target.value))}
                min="1"
              />
              <Button variant="outline-secondary" onClick={() => handleQuantityChange(quantity + 1)}>+</Button>
            </div>
            <Button
              className='my-2 mx-3 px-5'
              variant='warning'
              onClick={handleAddToCart}
            >
              Add to Cart
            </Button>
            <Link to="/cart"> {/* Use Link to navigate to /cart */}
              <Button
                className='my-2 mx-3 px-5'
                variant='primary'
                block
              >
                Go to Cart
              </Button>
            </Link>
            <Link to="/"> {/* Use Link to navigate to /cart */}
              <Button
                className='my-2 mx-3 px-5'
                variant='primary'
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