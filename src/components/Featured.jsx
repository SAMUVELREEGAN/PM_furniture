import './Featured.css';
import { Link } from 'react-router-dom';
import { useMyContext } from '../context/MyContext';
import { useRef } from 'react';
import { FaChevronLeft } from "react-icons/fa6";
import { FaAngleRight } from "react-icons/fa6";

const Featured = () => {
  const { products, BASE_URL } = useMyContext();
  const scrollRef = useRef(); // Create a reference to control the scroll

  // Filter and shuffle products
  const featuredProducts = products
    .filter((item) => item.star === 'yes' && item.link_name === 'all')
    .sort(() => 0.5 - Math.random()) // Shuffle
    .slice(0, 10); // Limit to 10

  // Scroll Functions
  const scrollLeft = () => {
    scrollRef.current.scrollBy({ left: -300, behavior: 'smooth' });
  };

  const scrollRight = () => {
    scrollRef.current.scrollBy({ left: 300, behavior: 'smooth' });
  };

  return (
    <div className="featured-section container my-3">
      <h2 className="text-center mb-4" style={{ color: '#102D59' }}>Featured Products</h2>

      {/* Scroll Buttons */}
      <div className="scroll-buttons">
        <button onClick={scrollLeft} className="scroll-btn left-btn"><FaChevronLeft style={{position:"relative" , left:"-7px"}}/></button>
        <button onClick={scrollRight} className="scroll-btn right-btn"><FaAngleRight style={{position:"relative" , left:"-7px"}}/></button>
      </div>

      {/* Scrollable Products Container */}
      <div className="product-card" ref={scrollRef}>
        {featuredProducts.map((product) => (
          <div className="product-card-info" key={product.id}>
            <div className="product-img">
              <img 
                src={product.images && product.images.length > 0 ? `${BASE_URL}${product.images[0].image}` : ''} 
                alt={product.pro_name} 
              />
              <div className='product-brand'>
                <span style={{
                  position: "relative",
                  top: "12px",
                  left: "-3px",
                  color: "white",
                  fontWeight: "600"
                }}>
                  {product.type.charAt(0).toUpperCase() + product.type.slice(1)}
                </span>
              </div>
            </div>
            <div className="product-info">
              <p className="item-titles">{product.pro_name}</p>
              <p>₹{product.price}</p>
              <p className="item-description">{product.description}</p>
              <Link to={`/product/${product.id}`}>
                <button className='product_btn'>View Details</button>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Featured;
