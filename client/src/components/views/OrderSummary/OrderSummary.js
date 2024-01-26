import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getAll } from '../../../redux/cartRedux'
import { Container } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import { Form } from 'react-bootstrap';
import { loadOrders } from '../../../redux/orderRedux';

const OrderSummary = () => {
    const [name, setName] = useState('');
    const [surname, setSurname] = useState('');
    const [address, setAddress] = useState('');
    const [content, setContent] = useState('');
    const [phone, setPhone] = useState('');

    const dispatch = useDispatch();
    // Retrieve cart products from Redux store
    const cartProducts = useSelector(getAll);

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
            totalPrice: totalCost,
            name,
            details: surname,
            content,
            orderItems,
          };
        console.log('order', order);
          dispatch(loadOrders(order));
        };
  

    return (
    <div>
      <h2>Order Summary</h2>
      <ul>
        {cartProducts.map((product) => (
          <li key={product.id}>
            <p>{product.name}</p>
            <img src ={product.img} alt={product.name} />
            <p>Price: ${product.totalPrice}</p>
          </li>
        ))}
      </ul>
      <p>Total Cost: ${totalCost}</p>
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
            </div>
    );
  
};

export default OrderSummary;