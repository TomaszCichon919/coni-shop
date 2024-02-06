import React from 'react';
import { Col, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import './ProductSummary.scss';
import Button from '../Button/Button'; 
import clsx from 'clsx';

const ProductSummary = ({ name, img, price, id }) => {
  const isLargeProduct = name.includes('jar');
  const isSmallProduct = name.includes('Wild');

  return (
    <Col key={id} className='wrapper'>
      <Row className='img-row'>
        <Col className='sm-12 p-0'>
          <div>
            <img className={clsx('product-img', { 'small-img': isSmallProduct, 'large-img': isLargeProduct })} src={img} alt={id} />
          </div>
          <div className='overlay'>
            <Link to={'/product/' + id}>
              <Button>Read More</Button>
            </Link>
          </div>
        </Col>
      </Row>
      <Row className='details'>
        <Col>
          <div className='name-container pt-5'>
            <h3 className='name'>{name}</h3>
            <p className='price'>Price: {price}</p>
          </div>
        </Col>
      </Row>
    </Col>
  );
};

export default ProductSummary;