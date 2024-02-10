import styles from './Gallery.module.scss';
import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { getAllProducts } from '../../../redux/productRedux';
import ProductSummary from '../ProductSummary/ProductSummary';

const Gallery = ({productName}) => {
  const products = useSelector(getAllProducts);
  const [startPoint, setStartPoint] = useState(0);
  const [productsToDisplay, setProductsToDisplay] = useState([]);
  const [slidesPerPage, setSlidesPerPage] = useState(0);


  const filteredProducts = products.filter(product => {
    if (productName.includes('Jar')) {
      return product.name.toLowerCase().includes('jar');
    } else if (productName.includes('Wild')) {
      return product.name.toLowerCase().includes('wild');
    } else {
      return false; // Return false if productName doesn't include 'Jar' or 'Wild'
    }
  });
  const filteredProductsCount = filteredProducts.length;

  const calculateSlidesPerPage = () => {
    const windowWidth = window.innerWidth;
    if (windowWidth >= 992) {
      return 4;
    } else if (windowWidth >= 768 && windowWidth < 992) {
      return 2;
    } else {
      return 1;
    }
  };

  const handleNextSlideChange = () => {
    setStartPoint((startPoint + slidesPerPage) % filteredProductsCount);
  };

  const handlePrevSlideChange = () => {
    let newPage = startPoint - slidesPerPage;
    if (newPage < 0) {
      newPage = filteredProductsCount + newPage;
    }
    setStartPoint(newPage);
  };

  useEffect(() => {
    setSlidesPerPage(calculateSlidesPerPage());
  }, []);

  useEffect(() => {
    const calculateEndPoint = () => {
      const endPoint = (startPoint + slidesPerPage) % filteredProductsCount;

      let productsToDisplay;

      if (startPoint <= endPoint) {
        productsToDisplay = filteredProducts.slice(startPoint, endPoint);
      } else {
        const firstSlice = filteredProducts.slice(startPoint);
        const secondSlice = filteredProducts.slice(0, endPoint);
        productsToDisplay = [...firstSlice, ...secondSlice];
      }

      setProductsToDisplay(productsToDisplay);
    };

    calculateEndPoint();
  }, [startPoint, filteredProductsCount, products, slidesPerPage]);

  useEffect(() => {
    const handleWindowResize = () => {
      setSlidesPerPage(calculateSlidesPerPage());
    };

    window.addEventListener('resize', handleWindowResize);
  }, []);

  return (
    <div className={styles.root}>
        <h2 className={styles.section_name}>Other product you might be interested in</h2>
      <div>
        <hr className={styles.sectionDivider} />
        <div className={styles.slider}>
          <button className={styles.sliderButton} onClick={handlePrevSlideChange}>
            {'<'}
          </button>
          {productsToDisplay.map(product => (
            <ProductSummary key={product.id} {...product} />
          ))}
          <button className={styles.sliderButton} onClick={handleNextSlideChange}>
            {'>'}
          </button>
        </div>
        <hr className={styles.sectionDivider} />
      </div>
    </div>
  );
};


export default Gallery;