import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { memoizedGetAll } from '../../../redux/cartRedux'
import { Col, Row, Table, Form, Alert, Container } from 'react-bootstrap';
import { useNavigate, Link } from 'react-router-dom';
import { useState } from 'react';
import Button from '../../layout/Button/Button';
import { addOrder } from '../../../redux/orderRedux';
import { removeAllCartProducts } from '../../../redux/cartRedux';
import { useForm } from "react-hook-form";
import styles from './OrderSummary.module.scss';

const OrderSummary = () => {
  const [name, setName] = useState('');
  const [surname, setSurname] = useState('');
  const [address, setAddress] = useState('');
  const [content, setContent] = useState('');
  const [phone, setPhone] = useState('');
  const [showAlert, setShowAlert] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { register, handleSubmit: validate, formState: { errors } } = useForm();
  const cartProducts = useSelector(memoizedGetAll);



  const totalCost = cartProducts.reduce((acc, product) => acc + parseFloat(product.totalPrice), 0);
  const totalQuantity = cartProducts.reduce((acc, product) => acc + product.quantity, 0);

  const handleSubmit = () => {
    console.log('click');
    const orderItems = cartProducts.map(product => ({
      id: product.id,
      quantity: product.quantity,
      price: parseFloat(product.totalPrice),
      comments: product.comments,
    }));


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


    setShowAlert(true);
    setTimeout(() => {
      setShowAlert(false);
      navigate('/');
    }, 3000);

  };
  const handleClearCart = () => {
    dispatch(removeAllCartProducts());

    setName('');
    setSurname('');
    setAddress('');
    setPhone('');
    setContent('');

    navigate('/');
  };

  return (
    <Container>
      <h2 className={styles.section_name}>Order Summary</h2>
      <hr className={styles.sectionDivider} />
      <Row>
        <Col>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Nr.</th>
                <th>Product</th>
                <th>Quantity</th>
                <th>Price</th>
                <th>Comments</th>
              </tr>
            </thead>
            <tbody>
              {cartProducts.map((product, index) => (
                <tr key={product.id}>
                  <td>{index + 1}</td>
                  <td>{product.name}</td>
                  <td>{product.quantity}</td>
                  <td>{product.totalPrice} $</td>
                  <td>{product.comments}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Col>
      </Row>
      <Row>
  <Col className="d-flex align-items-center">
    <p className={styles.summary}>Total Order Cost: {totalCost} $</p>
  </Col>
  <Col className="d-flex align-items-center">
    <p className={styles.summary}>Total Number of Products Ordered: {totalQuantity} pcs</p>
  </Col>
</Row>
      <h1 className={styles.section_name}>Delivery information</h1>
      <hr className={styles.sectionDivider} />
      <Row className='mx-5'>
        <Col>
          <Form onSubmit={validate(handleSubmit)}>
            <Form.Group className="mb-3" controlId="formName">
              <Form.Label>Customer Name</Form.Label>
              <Form.Control {...register("name", { required: true })} type="text" value={name}
                onChange={e => setName(e.target.value)} placeholder="Enter name" />
              {errors.name && <small className="d-block form-text text-danger mt-2">Field is requiered</small>}
            </Form.Group>

            <Form.Group className="mb-3" controlId="formSurname">
              <Form.Label>Surname</Form.Label>
              <Form.Control {...register("surname", { required: true })} type="text" value={surname}
                onChange={e => setSurname(e.target.value)} placeholder="Surname" />
              {errors.surname && <small className="d-block form-text text-danger mt-2">Field is requiered</small>}
            </Form.Group>

            <Form.Group className="mb-3" controlId="formAddress">
              <Form.Label>Address</Form.Label>
              <Form.Control {...register("address", { required: true })} type="text" value={address}
                onChange={e => setAddress(e.target.value)} placeholder="Enter address" />
              {errors.address && <small className="d-block form-text text-danger mt-2">Field is requiered</small>}
            </Form.Group>

            <Form.Group className="mb-3" controlId="formPhone">
              <Form.Label>Phone</Form.Label>
              <Form.Control {...register("phone", { required: true })} className={styles.no_center} type="number" value={phone}
                onChange={e => setPhone(e.target.value)} placeholder="Enter phone" />
              {errors.phone && <small className="d-block form-text text-danger mt-2">Field is requiered</small>}
            </Form.Group>

            <Form.Group className="mb-3" controlId="formContent">
              <Form.Label>Additional information</Form.Label>
              <Form.Control as="textarea" rows={5} value={content}
                onChange={e => setContent(e.target.value)} placeholder="Enter content" />
            </Form.Group>
            <div className="d-flex align-items-center justify-content-between">
              <Button special type="submit">
                Confirm order
              </Button>
              <Button onClick={handleClearCart}>
                Cancel order
              </Button>
              <Link to="/">
                <Button>
                  Back to shopping
                </Button>
              </Link>
            </div>
          </Form>
        </Col>
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