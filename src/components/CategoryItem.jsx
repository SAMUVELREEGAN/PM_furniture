import { useMyContext } from '../context/MyContext';
import './CategoryItem.css';
import { Link, useLocation } from 'react-router-dom';

const CategoryItem = ({ product, onCompare, isCompared }) => {
  const {BASE_URL} = useMyContext()
  const location = useLocation();

  const isDealerPage = location.pathname.startsWith('/dealer');

  const handleCompare = (e) => {
    e.stopPropagation(); // Prevent bubbling
    onCompare(product);
  };

  return (
    <div className={`${isCompared ? 'card_remove' : ''} category-card`}>
      <div className="category-image-wrapper">
        <img
           src={
          product.images && product.images.length > 0
            ? `${BASE_URL}${product.images[0].image}`
            : ''
        }
          alt={product.pro_name}
          className="category-image"
        />
      </div>
      <div className="category-info">
        {isDealerPage ? (
          <>
            <Link to={`/dealer/${product.link_name}/${product.id}`} style={{ textDecoration: 'none', color: 'black' }}>
              <p className="product-name mb-1">{product.pro_name}</p>
              <p className="product-material mb-1">{product.type}</p>
              <p className="product-price">
                <span className="price">₹{product.price}</span>
              </p>
              <p className="item-description">{product.description}</p>
            </Link>
          </>
        ) : (
          <Link to={`/product/${product.id}`} style={{ textDecoration: 'none', color: 'black' }}>
            <p className="product-name mb-1">{product.pro_name}</p>
            <p className="product-material mb-1">{product.type}</p>
            <p className="product-price">
              <span className="price">₹{product.price}</span>
            </p>
            <p className="item-description">{product.description}</p>
          </Link>
        )}

        {!isDealerPage && (
          <div className="mt-2">
            <button
              onClick={handleCompare}
              className={`btn btn-sm ${isCompared ? 'remove' : 'btn-outline-primary'}`}
            >
              {isCompared ? 'Remove Compare' : 'Compare'}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default CategoryItem;
