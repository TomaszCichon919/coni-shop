import React from 'react';
// import PropTypes from 'prop-types';
// import { useEffect } from 'react';
// import { useDispatch } from 'react-redux';
// import { loadProductsRequest } from '../../../redux/productRedux';


import ProductSection from '../../layout/ProductSection/ProductSection';
import ClientCarousel from '../../layout/ClientCarousel/ClientCarousel';



const Homepage = () => {

  // const dispatch = useDispatch();

  // useEffect(() => {
  //   dispatch(loadProductsRequest());
  // }, [dispatch]);
 return (
  <div>
    <ClientCarousel />
    <ProductSection />

  </div>
);
}

// Homepage.propTypes = {};

export default Homepage;