import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import './ClientCarousel.scss'

const ClientCarousel = () => {
    // Configuration options for the carousel
    const settings = {
      infinite: true,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1,
      autoplay: true,
      autoplaySpeed: 3000,
      dots: false, // Remove dots navigation
      arrows: true,
      accessibility: true,
    };
  
    // Array of images to display in the carousel
    const images = [
      '/images/decorations/dog-4.jpg',
      '/images/decorations/dog-5.jpg',
      '/images/decorations/dog-6.jpg',
      '/images/decorations/cat-1.jpg',
      '/images/decorations/cat-2.jpg',
      '/images/decorations/cat-3.jpg',
    ];
  
    return (
        <div className="carousel-wrapper">
      <Slider {...settings}>
        {images.map((image, index) => (
          <div key={index} className="carousel-image-wrapper">
            <img src={image} className="carousel-image" alt={`Slide ${index}`} />
          </div>
        ))}
      </Slider>
      <div className="carousel-overlay">
        <p className="carousel-text">Meet some of our happy clients!</p>
      </div>
    </div>
    );
  };
  
  export default ClientCarousel;