import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { Form, Row, Col } from 'react-bootstrap';
import { memoizedGetAll, updateCartProductQuantity, removeAllCartProducts, updateCartProductComment, removeFromCart } from '../../../redux/cartRedux';
import styles from './Cart.module.scss';
import Button from '../../layout/Button/Button';
import { Button as BootstrapButton } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleXmark } from '@fortawesome/free-solid-svg-icons';
import clsx from 'clsx';

const Cart = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const cartProducts = useSelector(memoizedGetAll);
  const [comments, setComments] = useState({});

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
    dispatch(updateCartProductComment(productId, comments[productId]));
  };

  const handleRemoveProduct = (productId) => {
    dispatch(removeFromCart(productId));
  };


  const handleClearCart = () => {
    dispatch(removeAllCartProducts());
    navigate('/');
  };



  return (
    <div className='px-5'>
      <h2 className={styles.section_name}>Shopping Cart</h2>
      <hr className={styles.sectionDivider} />
      {cartProducts.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <div>
          {cartProducts.map((cartItem) => (
            <Row key={cartItem.id} className={styles.cartItem}>
              <Col xs={12} sm={6} className={styles.cartImageWrapper}>
                <img className={clsx(styles.cartProductImg, {
                  [styles.small_img]: cartItem.name.includes('Wild'),
                  [styles.large_img]: cartItem.name.includes('jar'),
                })} src={cartItem.img} alt={cartItem.name} />
              </Col>
              <Col xs={12} sm={6}>
                <div className="d-flex align-items-center justify-content-between">
                  <h3 className="pt-2">{cartItem.name}</h3>
                  <FontAwesomeIcon
                    icon={faCircleXmark}
                    className={styles.removeIcon}
                    onClick={() => handleRemoveProduct(cartItem.id)}
                  />
                </div>
                <p className={styles.caption_price}>Price: {cartItem.totalPrice} $</p>
                <div className={styles.quantityControls}>
                  <Form.Group className="my-4 d-flex align-items-center">
                    <BootstrapButton
                      variant="outline-secondary"
                      onClick={() => handleQuantityChange(cartItem.id, cartItem.quantity - 1, cartItem.totalPrice)}
                    >
                      -
                    </BootstrapButton>
                    <Form.Control
                      type="number"
                      value={cartItem.quantity}
                      onChange={(e) => handleQuantityChange(cartItem.id, e.target.value, cartItem.totalPrice)}
                      min="1"
                      max="999"
                      style={{ width: '80px', margin: '0 10px' }}

                    />
                    <BootstrapButton
                      variant="outline-secondary"
                      onClick={() => handleQuantityChange(cartItem.id, cartItem.quantity + 1, cartItem.totalPrice)}
                    >
                      +
                    </BootstrapButton>
                  </Form.Group>
                </div>
                <Form.Group controlId={`comment-${cartItem.id}`} className="mb-3 d-flex align-items-start align-items-center">
                  <Form.Control className={styles.comment_field}
                    as="textarea"
                    rows={3}
                    placeholder="Add Comment"
                    value={comments[cartItem.id] || ''}
                    onChange={(e) => setComments({
                      ...comments,
                      [cartItem.id]: e.target.value
                    })}
                  />
                  <Button onClick={() => handleAddComment(cartItem.id)}>Add comment</Button>
                </Form.Group>
              </Col>
            </Row>
          ))}
        </div>
      )}
      <Link to="/order">
        <Button special className='my-2 mx-3 px-5'>Order summary</Button>
      </Link>
      <Link to="/">
        <Button className='my-2 mx-3 px-5'>Back to shopping</Button>
      </Link>
      <Button className='my-2 mx-3 px-5' onClick={handleClearCart}>Clear Cart</Button>
    </div>
  );
};

export default Cart;