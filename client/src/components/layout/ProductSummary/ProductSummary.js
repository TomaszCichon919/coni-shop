import { Row, Col } from 'react-bootstrap';
import React from 'react';
import './ProductSummary.scss';
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';
// import { IMGS_URL } from '../../../config'

const ProductSummary = ({ name, img, price, id}) =>
{

  return (
    <Col key={id} className='wrapper'>
    <h3 className='p-2'>{name}</h3>
    <Row>
      <Col xs={8} className='p-4'>
        <div className='img-container'>
          <img className='ad_img' src={img} alt={id} />
        </div>
      </Col>
      <Col xs={4}>
        <p>
          <span className='caption'>price</span>
          {price}
        </p>
        <div className='buttons-container'>
          <Link to={'/product/' + id}>
            <Button className='mt-5' variant='dark' block>
              Read More
            </Button>
           </Link>
        </div>
      </Col>
    </Row>
  </Col>
);
};

export default ProductSummary;