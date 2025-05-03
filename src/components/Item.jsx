import React from 'react'
import './item.css'

const Item = ({ product }) => (
  <div className="item-card">
  <img src={product.pro_img} alt={product.pro_name} className="item-image" />
  <h3 className="item-title">{product.pro_name}</h3>
  <p className="item-description">{product.description}</p>
  <p className="item-star">Starred: {product.star}</p>
</div>
);

export default Item