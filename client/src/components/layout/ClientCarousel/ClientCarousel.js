
import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import styles from './ClientCarousel.module.scss';

const ClientCarousel = () => {
  const settings = {
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    arrow: false,
    dots: false,
  };

  const images = [
    '/images/decorations/dog-4.jpg',
    '/images/decorations/dog-5.jpg',
    '/images/decorations/dog-6.jpg',
    '/images/decorations/cat-1.jpg',
    '/images/decorations/cat-2.jpg',
    '/images/decorations/cat-3.jpg',
  ];

  return (
    <div className={styles.carousel_wrapper}>
      <Slider {...settings}>
        {images.map((image, index) => (
          <div key={index} className={styles.carousel_image_wrapper}>
            <img src={image} className={styles.carousel_image} alt={`Slide ${index}`} />
            <div className={styles.overlay}>
              <p className={styles.carousel_text}>Meet some of our happy clients!</p>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default ClientCarousel;