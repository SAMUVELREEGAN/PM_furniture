import{ useState, useEffect } from 'react';
import './Arrivals.css';
// import { products } from '../Data/Product';
import { FaIndianRupeeSign } from "react-icons/fa6";    
import { Link } from 'react-router-dom';
import { MdFavorite } from "react-icons/md"; // Import the heart icon
import { useMyContext } from '../context/MyContext';

const Arrivals = () => {
  const {products , BASE_URL} = useMyContext()
  const [wishlist, setWishlist] = useState([]);

  // Load wishlist from localStorage on component mount
  useEffect(() => {
    const savedWishlist = JSON.parse(localStorage.getItem('wishlist')) || [];
    setWishlist(savedWishlist);
  }, []);

  // Handle adding/removing product from wishlist
  const toggleWishlist = (product) => {
    let updatedWishlist = [...wishlist];
    const isProductInWishlist = updatedWishlist.some(item => item.id === product.id);

    if (isProductInWishlist) {
      // Remove from wishlist
      updatedWishlist = updatedWishlist.filter(item => item.id !== product.id);
    } else {
      // Add to wishlist
      updatedWishlist.push(product);
    }

    // Save to localStorage
    localStorage.setItem('wishlist', JSON.stringify(updatedWishlist));
    setWishlist(updatedWishlist); // Update state
  };

  const newArrivalProducts = products
    .filter(product => product.link_name === 'all')
    .slice(-4); // Get last 4 with link_name 'all'

  return (
    <div className="arrivals container my-5">
      <h3 className="my-5 text-center">New Arrivals</h3>
      <div className="row">
        {newArrivalProducts.map(product => (
          <div key={product.id} className="col-12 col-sm-6 col-md-3 mb-4">
            <div className="arrival_card h-100 position-relative">
              <Link to={`/product/${product.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                <div style={{ height: "200px", overflow: "hidden" }}>
                  <img
                   src={
                        product.images && product.images.length > 0
                          ? `${BASE_URL}${product.images[0].image}`
                          : ''
                      }
                    className="card-img-top"
                    alt={product.pro_name}
                    style={{ height: '200px', objectFit: 'cover' }}
                  />
                </div>
                <div className="card-body">
                  <div style={{display:"flex" , flexWrap:"wrap" , justifyContent:"space-between" , margin:"10px 0px"}} >
                    <h5 className="card-title">{product.pro_name}</h5>
                  <h5>Price<FaIndianRupeeSign /> {product.price}</h5>
                  </div>
                  <p className="item-descriptionx">{product.description}</p>
                </div>
              </Link>

              {/* Heart Icon for Wishlist */}
              <MdFavorite 
                className="wishlist-heart" 
                onClick={() => toggleWishlist(product)} 
                style={{
                  position: 'absolute',
                  top: '10px',
                  right: '10px',
                  fontSize: '24px',
                  cursor: 'pointer',
                  color: wishlist.some(item => item.id === product.id) ? 'red' : 'gray'
                }} 
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Arrivals;
