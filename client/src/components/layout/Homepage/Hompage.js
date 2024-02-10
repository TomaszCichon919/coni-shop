import React from 'react';



import ProductSection from '../../features/ProductSection/ProductSection';
import ClientCarousel from '../../layout/ClientCarousel/ClientCarousel';



const Homepage = () => {

  return (
    <div>
      <ClientCarousel />
      <ProductSection />
    </div>
  );
}



export default Homepage;