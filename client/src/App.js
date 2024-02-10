import React from 'react';
import { Routes, Route, } from 'react-router-dom';


import Container from './components/layout/Container/Container';
import Homepage from './components/layout/Homepage/Hompage';
import ProductDetails from './components/features/ProductDetails/ProductDetails';
import Cart from './components/features/Cart/Cart';
import OrderSummary from './components/features/OrderSummary/OrderSummary';
import NotFound from './components/layout/NotFound/NotFound';


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