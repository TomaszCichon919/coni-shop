import { React, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { Button, Form } from 'react-bootstrap'; // Import Button and Form from react-bootstrap
import { getAll, updateCartProductQuantity } from '../../../redux/cartRedux';

const Cart = () => {
  const dispatch = useDispatch();
  const cartProducts = useSelector(getAll);
  const [comment, setComment] = useState('');

  const handleQuantityChange = (productId, newQuantity, productPrice) => {
    // Ensure newQuantity is a number
    newQuantity = parseInt(newQuantity);

    // Ensure productPrice is a number
    productPrice = parseFloat(productPrice);

    // Check if newQuantity is a valid number
    if (!isNaN(newQuantity) && newQuantity >= 0) {
      // Find the cartItem with the corresponding productId
      const cartItem = cartProducts.find(item => item.id === productId);

      // If cartItem exists and has a valid quantity
      if (cartItem && !isNaN(cartItem.quantity)) {
        // Calculate price per item
        const pricePerItem = productPrice / cartItem.quantity;

        // Calculate new total price
        const totalPrice = newQuantity * pricePerItem;
        console.log('new price', totalPrice);

        // Dispatch action to update cart product quantity and total price
        dispatch(updateCartProductQuantity(productId, newQuantity, totalPrice, cartItem.comments));
      }
    }
  };

  const handleAddComment = (productId) => {
    // Dispatch action to update cart product with the comment
    dispatch(updateCartProductQuantity(productId, cartProducts.find(item => item.id === productId).quantity, cartProducts.find(item => item.id === productId).totalPrice, comment));

    // Clear the comment field
    setComment('');
  };

  return (
    <div>
      <h2>Shopping Cart</h2>
      {cartProducts.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <div>
          {cartProducts.map((cartItem) => (
            <div key={cartItem.id} className="mb-3">
              <img src={cartItem.img} alt={cartItem.name} />
              <p>{cartItem.name}</p>
              <p>Price: ${cartItem.totalPrice}</p>
              <input
                type="number"
                value={cartItem.quantity}
                onChange={(e) => handleQuantityChange(cartItem.id, parseInt(e.target.value), cartItem.totalPrice)}
                min="1"
                className="form-control mb-2" // Bootstrap class for input fields
              />
              <Form.Group controlId="exampleForm.ControlTextarea1" className="mb-2">
                <Form.Control
                  as="textarea"
                  rows={3}
                  placeholder="Add Comment"
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                />
              </Form.Group>
              <Button
                variant="primary"
                onClick={() => handleAddComment(cartItem.id)}
              >
                Add Comment
              </Button>
            </div>
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
    </div>
  );
};

export default Cart;
