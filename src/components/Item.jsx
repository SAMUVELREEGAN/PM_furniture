import React, { useEffect, useState } from 'react';
import './item.css';
import { FaIndianRupeeSign } from "react-icons/fa6";
import { TbArmchair2 } from "react-icons/tb";
import { Link } from 'react-router-dom';
import { FaRegHeart, FaHeart } from "react-icons/fa"; // filled heart

const Item = ({ product }) => {
  const [isWishlisted, setIsWishlisted] = useState(false);

  useEffect(() => {
    const wishlist = JSON.parse(localStorage.getItem('wishlist')) || [];
    const exists = wishlist.find(item => item.id === product.id);
    setIsWishlisted(!!exists);
  }, [product.id]);

  const toggleWishlist = (e) => {
    e.preventDefault(); // Prevent <Link> navigation
    const wishlist = JSON.parse(localStorage.getItem('wishlist')) || [];

    const exists = wishlist.find(item => item.id === product.id);

    let updatedWishlist;
    if (exists) {
      updatedWishlist = wishlist.filter(item => item.id !== product.id);
      setIsWishlisted(false);
    } else {
      updatedWishlist = [...wishlist, product];
      setIsWishlisted(true);
    }

    localStorage.setItem('wishlist', JSON.stringify(updatedWishlist));
  };

  return (
    <div className="item-card">
     
        {product.star === "yes" && <div className="star-badge">★</div>}
        <img src={Array.isArray(product.pro_img) ? product.pro_img[0] : product.pro_img} alt={product.pro_name} className="item-image" />
        <Link to={`/product/${product.id}`} style={{ textDecoration: "none", color: "black" }}>
        <p className="item-titlew">{product.pro_name}</p>
        <p className="item-description">{product.description}</p>
        </Link>
        <div style={{ display: "flex" }} className='mt-2'>
          <p style={{ position: "absolute", left: "5px" }} className='item_size'>
            <TbArmchair2 />{product.size}
            <span onClick={toggleWishlist} style={{ marginLeft: "10px", cursor: "pointer" }}>
              {isWishlisted ? <FaHeart color="red" /> : <FaRegHeart />}
            </span>
          </p>
          <p className="item-price"> <FaIndianRupeeSign />{product.price}</p>
        </div>
     
    </div>
  );
};

export default Item;
