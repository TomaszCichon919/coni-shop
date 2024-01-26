import React from 'react';
import { Routes, Route, } from 'react-router-dom';
import { Container } from 'react-bootstrap';

// import './styles/bootstrap.scss';
// import './styles/global.scss';

// import MainLayout from './components/layout/MainLayout/MainLayout';
import Homepage from './components/views/Homepage/Hompage';
import ProductDetails from './components/views/ProductDetails/ProductDetails';
import Cart from './components/views/Cart/Cart';
import OrderSummary from './components/views/OrderSummary/OrderSummary';


const App = () => (
  <Container>
  <Routes>
  <Route path="/" element={<Homepage />} />
  <Route path="/cart" element={<Cart />} />
  <Route path="/order" element={<OrderSummary />} />
  <Route path="/product/:id" element={<ProductDetails />} />
</Routes>
</Container>
);

export default App;