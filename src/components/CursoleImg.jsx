import React from 'react';
import Carousel from 'react-bootstrap/Carousel';
import './CursoleImg.css'; // optional: for styles
import { cursoles } from '../Data/Cursoles';
// import Image from 'react-bootstrap/Image';


const CursoleImg = () => {
  return (
    <div>
      <Carousel>
        {cursoles.map((img, index) => (
          <Carousel.Item key={index} interval={2000}>
            <div className="carousel-img-container">
              <img  src={img} alt={`Slide ${index}`} className="w-100 h-60" />
            </div>
          </Carousel.Item>
        ))}
      </Carousel>
    </div>
  );
};

export default CursoleImg;
