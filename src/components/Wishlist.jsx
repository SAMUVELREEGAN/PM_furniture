import React, { useEffect, useState } from 'react';
import './Wishlist.css';
import { FaIndianRupeeSign } from "react-icons/fa6";
import { TbArmchair2 } from "react-icons/tb";
import { Link } from 'react-router-dom';
import { MdDelete } from "react-icons/md";

const Wishlist = () => {
  const [wishlistItems, setWishlistItems] = useState([]);

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem('wishlist')) || [];
    setWishlistItems(data);
  }, []);

  const handleRemove = (id) => {
    const updatedWishlist = wishlistItems.filter(item => item.id !== id);
    setWishlistItems(updatedWishlist);
    localStorage.setItem('wishlist', JSON.stringify(updatedWishlist));
  };

  return (
    <div className="wishlist-page container my-5">
      <h3 className="mb-4">Your Wishlist</h3>
      {wishlistItems.length === 0 ? (
        <p style={{fontSize:"40px", textAlign:"center"}}>No items in your wishlist.</p>
      ) : (
        <div className="row">
          {wishlistItems.map(product => (
            <div key={product.id} className="col-md-4 mb-4">
              <div className="wishlist-card p-3 b position-relative hover-card">
                <Link to={`/product/${product.id}`} style={{ textDecoration: "none", color: "black" }}>
                  <div>
                    <img
                      src={Array.isArray(product.pro_img) ? product.pro_img[0] : product.pro_img}
                      alt={product.pro_name}
                      style={{ width: "100%", height: "250px", objectFit: "contain" }}
                    />
                  </div>
                  <p className="item-titlesa">{product.pro_name}</p>
                  <p className="item-description">{product.description}</p>
                </Link>
                <div style={{display:"flex" , justifyContent:"space-between"}}>
                  <p><TbArmchair2 /> {product.size}</p>
                  <p><FaIndianRupeeSign /> {product.price}</p>
                </div>

                <button
                  className="btn btn-sm btn-danger position-absolute top-0 end-0 m-2 delete-icon"
                  onClick={() => handleRemove(product.id)}
                >
                  <MdDelete />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Wishlist;
