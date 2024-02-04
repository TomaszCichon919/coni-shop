import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { Button, Form, Container, Row, Col } from 'react-bootstrap';
import { memoizedGetAll, updateCartProductQuantity, removeAllCartProducts, updateCartProductComment } from '../../../redux/cartRedux';
import './Cart.scss';


const Cart = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const cartProducts = useSelector(memoizedGetAll);
  const [comments, setComments] = useState({});
  const [comment, setComment] = useState('');

  const handleQuantityChange = (productId, newQuantity, productPrice) => {
    newQuantity = parseInt(newQuantity);
    productPrice = parseFloat(productPrice);

    if (!isNaN(newQuantity) && newQuantity >= 0) {
      const cartItem = cartProducts.find(item => item.id === productId);

      if (cartItem && !isNaN(cartItem.quantity)) {
        const pricePerItem = productPrice / cartItem.quantity;
        const totalPrice = newQuantity * pricePerItem;
        dispatch(updateCartProductQuantity(productId, newQuantity, totalPrice));
      }
    }
  };

  const handleAddComment = (productId) => {
    setComments({
      ...comments,
      [productId]: comment
    });
    dispatch(updateCartProductComment(productId, comments[productId]));
    setComment('');
  };

  const handleClearCart = () => {
    dispatch(removeAllCartProducts());
    navigate('/');
  };
  

  return (
    <Container>
      <h2>Shopping Cart</h2>
      {cartProducts.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <div>
          {cartProducts.map((cartItem) => (
            <Row key={cartItem.id}>
              <Col xs={12} sm={6} className='cart_img_wrapper'>
                <img className='cart_product_img' src={cartItem.img} alt={cartItem.name} />
              </Col>
              <Col xs={12} sm={6}>
                <div>
                  <p>{cartItem.name}</p>
                  <p>Price: ${cartItem.totalPrice}</p>
                  <div className="quantity-controls d-flex align-items-center">
                    <Button
                      variant="outline-secondary"
                      onClick={() => handleQuantityChange(cartItem.id, cartItem.quantity - 1, cartItem.totalPrice)}
                    >
                      -
                    </Button>
                    <Form.Control
                      type="number"
                      value={cartItem.quantity}
                      onChange={(e) => handleQuantityChange(cartItem.id, e.target.value, cartItem.totalPrice)}
                      min="1"
                      className="form-control mb-2 mx-2"
                    />
                    <Button
                      variant="outline-secondary"
                      onClick={() => handleQuantityChange(cartItem.id, cartItem.quantity + 1, cartItem.totalPrice)}
                      className="mb-2 mx-2"
                    >
                      +
                    </Button>
                  </div>
                </div>
                <Form.Group controlId={`comment-${cartItem.id}`} className="mb-2">
                  <Form.Control
                    as="textarea"
                    rows={3}
                    placeholder="Add Comment"
                    value={comments[cartItem.id] || ''}
                    onChange={(e) => setComments({
                      ...comments,
                      [cartItem.id]: e.target.value
                    })}
                  />
                </Form.Group>
                <Button
                  variant="primary"
                  onClick={() => handleAddComment(cartItem.id)}
                >
                  Add comment
                </Button>
              </Col>
            </Row>
          ))}
        </div>
      )}
      <Link to="/">
        <Button
          className='my-2 mx-3 px-5'
          variant='primary'
        >
          Back to shopping
        </Button>
      </Link>
      <Link to="/order">
        <Button
          className='my-2 mx-3 px-5'
          variant='primary'
        >
          Order summary
        </Button>
      </Link>
      <Button
          className='my-2 mx-3 px-5'
          variant='primary'
          onClick={handleClearCart}
        >
          Clear Cart
        </Button>
    </Container>
  );
};
export default Cart;