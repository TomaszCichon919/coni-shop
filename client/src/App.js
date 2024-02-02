import React from 'react';
import { Routes, Route, } from 'react-router-dom';


import Container from './components/layout/Container/Container';
import Homepage from './components/views/Homepage/Hompage';
import ProductDetails from './components/views/ProductDetails/ProductDetails';
import Cart from './components/views/Cart/Cart';
import OrderSummary from './components/views/OrderSummary/OrderSummary';
import NotFound from './components/views/NotFound/NotFound';


const App = () => (
  <Container>
  <Routes>
  <Route path="/" element={<Homepage />} />
  <Route path="/cart" element={<Cart />} />
  <Route path="/order" element={<OrderSummary />} />
  <Route path="/product/:id" element={<ProductDetails />} />
  <Route path="*" element={<NotFound />}/>
</Routes>
</Container>
);

export default App;