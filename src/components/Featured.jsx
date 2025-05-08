import React from 'react';
import { products } from '../Data/Product';
import './Featured.css';
import { Link } from 'react-router-dom';

const Featured = () => {
  // Filter and shuffle products
  const featuredProducts = products
    .filter((item) => item.star === 'yes' && item.link_name === 'all')
    .sort(() => 0.5 - Math.random()) // Shuffle
    .slice(0, 10); // Limit to 5

  return (
    <div className="featured-section container">
      <h2 className="text-center mb-4" style={{ color: '#102D59' }}>Featured Products</h2>
         <div className="product-card">
         {featuredProducts.map((product) => (
            <div  className="product-card-info" key={product.id}>  
                <div className="product-img">
                <img src={product.pro_img[0]} alt={product.pro_name} />
                <div className='product-brand'><span style={{position:"relative", top:"12px",left:"-3px" , color:"white", fontWeight:"600"}}>{product.type.charAt(0).toUpperCase() + product.type.slice(1)}</span></div>
                </div>
                <div className="product-info">
                <p className="item-titles">{product.pro_name}</p>
                <p>₹{product.price}</p>
                <p className="item-description">{product.description}</p>
                <Link to={`/product/${product.id}`}>
                <button className='product_btn'>View Details</button></Link>
              </div>
            </div>
          ))}
         </div>

      </div>
    // </div>
  );
};

export default Featured;
