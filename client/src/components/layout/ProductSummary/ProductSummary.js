import React from 'react';
import { Col, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import styles from './ProductSummary.module.scss';
import Button from '../Button/Button';
import clsx from 'clsx';

const ProductSummary = ({ name, img, price, id }) => {
  const isLargeProduct = name.includes('Jar');
  const isSmallProduct = name.includes('Wild');

  return (
    <Col key={id} className={styles.wrapper}>
      <Row className={styles.img_row}>
        <Col className='sm-12 p-0'>
          <div className={styles.img_wrapper}>
            <img className={clsx(styles['product_img'],
              { [styles['small_img']]: isSmallProduct, [styles['large_img']]: isLargeProduct })} src={img} alt={id} />
          </div>
          <div className={styles.overlay}>
            <Link to={'/product/' + id}>
              <Button>Read More</Button>
            </Link>
          </div>
        </Col>
      </Row>
      <Row className={styles.details}>
        <Col>
          <div className={styles.name_container}>
            <h4 className={styles.name}>{name}</h4>
            <p className={styles.price}>Price: {price} $</p>
          </div>
        </Col>
      </Row>
    </Col>
  );
};

export default ProductSummary;