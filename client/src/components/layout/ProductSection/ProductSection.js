import React  from 'react';
import { useSelector } from 'react-redux';
import { getAllProducts, loadProductsRequest } from '../../../redux/productRedux';
import { useEffect } from 'react';
import { Alert } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import ProductList from '../ProductList/ProductList'

const ProductSection = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(loadProductsRequest());
  }, [dispatch]);
  const products = useSelector(getAllProducts);
  console.log('products', products)
  if (products === undefined || !products.length) {
    return <Alert color="info">Loading...</Alert>;
  } else if (products.length === 0) {
    return <Alert color="info">No Products</Alert>;
  } else {
    return <ProductList products={products} />;
  }
};



export default ProductSection;

