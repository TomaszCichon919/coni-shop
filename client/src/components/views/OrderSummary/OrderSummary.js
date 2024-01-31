import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { memoizedGetAll } from '../../../redux/cartRedux'
import { Container, Col, Row } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import { Form, Alert } from 'react-bootstrap';
import { addOrder } from '../../../redux/orderRedux';
import { removeAllCartProducts } from '../../../redux/cartRedux';
import './OrderSummary.scss';

const OrderSummary = () => {
  const [name, setName] = useState('');
  const [surname, setSurname] = useState('');
  const [address, setAddress] = useState('');
  const [content, setContent] = useState('');
  const [phone, setPhone] = useState('');
  const [showAlert, setShowAlert] = useState(false);

  const dispatch = useDispatch();
  // Retrieve cart products from Redux store
  const cartProducts = useSelector(memoizedGetAll);


  // Calculate total cost
  const totalCost = cartProducts.reduce((acc, product) => acc + parseFloat(product.totalPrice), 0);

  const handleSubmit = (e) => {
    e.preventDefault();


    const orderItems = cartProducts.map(product => ({
      id: product.id,
      quantity: product.quantity,
      price: parseFloat(product.totalPrice),
      comments: product.comments,
    }));

    // Create order object
    const order = {
      address,
      phone,
      totalCost,
      name,
      surname,
      deliveryDetails: content,
      orderItems,
    };
    console.log('order', order);
    dispatch(addOrder(order));

    dispatch(removeAllCartProducts());

    setName('');
    setSurname('');
    setAddress('');
    setPhone('');
    setContent('');

    // Show alert for 3 seconds
    setShowAlert(true);
    setTimeout(() => {
      setShowAlert(false);
    }, 3000);
  };


  return (
    <Container>
      <h2>Order Summary</h2>
      {cartProducts.map((product) => (
        <Row key={product.id} className="mb-3">
          <Col xs={12} sm={6} className="d-flex align-items-center">
            <img className="img_order_summary" src={product.img} alt={product.name} />
          </Col>
          <Col xs={12} sm={6} className="align-items-center">
            <div>
              <p>{product.name}</p>
              <p>Price: ${product.totalPrice}</p>
              <p>Comments: {product.comments}</p>
            </div>
          </Col>
        </Row>
      ))}

      <p>Total Cost: ${totalCost}</p>
      <Row>
        <Form className="col-12 col-sm-3 mx-auto" onSubmit={handleSubmit}>

          <h1 className="my-4">Delivery information</h1>


          <Form.Group className="mb-3" controlId="formTitle">
            <Form.Label>Customer Name</Form.Label>
            <Form.Control type="text" value={name} onChange={e => setName(e.target.value)} placeholder="Enter name"></Form.Control>
          </Form.Group>

          <Form.Group className="mb-3" controlId="formDate">
            <Form.Label>Surname</Form.Label>
            <Form.Control type="text" value={surname} onChange={e => setSurname(e.target.value)} placeholder="surname"></Form.Control>
          </Form.Group>

          <Form.Group className="mb-3" controlId="formAddress">
            <Form.Label>Adress</Form.Label>
            <Form.Control type="text" value={address} onChange={e => setAddress(e.target.value)} placeholder=" Enter address"></Form.Control>
          </Form.Group>

          <Form.Group className="mb-3" controlId="formAddress">
            <Form.Label>Phone</Form.Label>
            <Form.Control type="number" value={phone} onChange={e => setPhone(e.target.value)} placeholder=" Enter phone"></Form.Control>
          </Form.Group>

          <Form.Group className="mb-3" controlId="formContent">
            <Form.Label>Additional information</Form.Label>
            <Form.Control type="text" as="textarea" rows={5} value={content} onChange={e => setContent(e.target.value)} placeholder="Enter content"></Form.Control>
          </Form.Group>

          <Button variant="dark" type="submit">
            Confirm order
          </Button>
        </Form>
      </Row>
      {showAlert && (
        <Alert variant="success" className="mt-3">
          Order confirmed successfully!
        </Alert>
      )}
    </Container>
  );

};

export default OrderSummary;