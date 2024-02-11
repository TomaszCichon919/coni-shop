import React, { useState, useEffect } from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import { Col, Row, Form, Alert } from 'react-bootstrap';
import { Button as BootstrapButton } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart } from '../../../redux/cartRedux';
import { getAllProducts } from '../../../redux/productRedux';
import { memoizedGetAll } from '../../../redux/cartRedux';
import Button from '../../layout/Button/Button'
import Gallery from '../../features/Gallery/Gallery'
import styles from './ProductDetails.module.scss';
import clsx from 'clsx';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPaw } from '@fortawesome/free-solid-svg-icons';

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
      }, 3000);
    }
    return () => clearTimeout(timer);
  }, [showAlert, showErrorAlert]);


  if (!product) return <Navigate to="/" />

  const isLargeProduct = product.name.includes('Jar');
  const isSmallProduct = product.name.includes('Wild');

  const descriptionSentences = product.description.split('. ');

  return (
    <div className='px-5'>
      <h2 className={styles.section_name}>Product details</h2>
      <hr className={styles.sectionDivider} />
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
      <Col key={product.id} className={styles.details_wrapper_d}>
        <Row>
          <Col xs={12} sm={6} className={styles.img_container_d}>
            <img
              className={clsx(styles.product_img_d, {
                [styles.small_img_d]: isSmallProduct,
                [styles.large_img_d]: isLargeProduct
              })}
              src={product.img}
              alt={product.id}
            />
          </Col>
          <Col xs={12} sm={6}>
            <h3 className="pt-2 px-2">{product.name}</h3>
            <p className={styles.caption_price}>Price {product.price} $</p>
            <p className={styles.caption}>Description</p>
            <ul className={styles.description_list}>
              {descriptionSentences.map((sentence, index) => (
                <li key={index}>
                  <FontAwesomeIcon icon={faPaw} className={styles.description_icon} />
                  {sentence}
                </li>
              ))}
            </ul>
            <div className={styles.quantity_controls}>
              <Form.Group className="my-5 d-flex align-items-center">
                <BootstrapButton variant="outline-secondary" onClick={() => handleQuantityChange(quantity - 1)}>-</BootstrapButton>
                <Form.Control
                  type="number"
                  value={quantity}
                  onChange={(e) => handleQuantityChange(parseInt(e.target.value))}
                  min="1"
                  max="999"
                  style={{ width: '80px', margin: '0 10px' }}
                />
                <BootstrapButton variant="outline-secondary" onClick={() => handleQuantityChange(quantity + 1)}>+</BootstrapButton>
              </Form.Group>
            </div>
            <Button
              special
              onClick={handleAddToCart}
            >
              Add to Cart
            </Button>
            <Link to="/cart">
              <Button>
                Go to Cart
              </Button>
            </Link>
            <Link to="/">
              <Button
                className={styles.custom}
              >
                Back to shopping
              </Button>
            </Link>
          </Col>
        </Row>
      </Col>
      <Gallery productName={product.name} />
    </div>
  );

};

export default ProductDetails;