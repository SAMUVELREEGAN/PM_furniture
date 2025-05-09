import React, { useEffect } from 'react';
import './AnimatedCard.css';
import AOS from 'aos';
import 'aos/dist/aos.css';
import bgImage from '../assets/ani.jpg'; // Use your image here

const AnimatedCard = () => {
  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  return (
    <div className="snap-container">
      <section
        className="snap-slide"
        style={{ backgroundImage: `url(${bgImage})` }}
      >
        <div className="snap-content" data-aos="fade-up">
          <h1>Wood Elegance</h1>
          <p>Discover timeless elegance in every detail.</p>
        </div>
      </section>
    </div>
  );
};

export default AnimatedCard;
