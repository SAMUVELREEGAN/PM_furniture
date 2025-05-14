import React, { useState, useEffect } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import { products } from '../Data/Product';
import { Row, Col, Container, Form, Button } from 'react-bootstrap';
import Item from './Item';
import '../components/ProductDetails.css';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/navigation';
import 'swiper/css/thumbs';
import { FreeMode, Navigation, Thumbs } from 'swiper/modules';
import { FaShareSquare } from "react-icons/fa";

const ProductDetails = () => {
  const [thumbsSwiper, setThumbsSwiper] = useState(null);
  const { id } = useParams();
  const location = useLocation();
  const product = products.find((pro) => pro.id.toString() === id);

  const relatedProducts = product
    ? products
        .filter((pro) => pro.category === product.category && pro.id !== product.id)
        .sort(() => 0.5 - Math.random())
        .slice(0, 4)
    : [];

  const [quantity, setQuantity] = useState(1);
  const [isWishlisted, setIsWishlisted] = useState(false);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    console.log(window.location);
    
  }, [location.pathname]);

  useEffect(() => {
    const wishlist = JSON.parse(localStorage.getItem('wishlist')) || [];
    const exists = wishlist.find((item) => item.id === product?.id);
    setIsWishlisted(!!exists);
  }, [location.pathname, product?.id]);

  const toggleWishlist = () => {
    const wishlist = JSON.parse(localStorage.getItem('wishlist')) || [];
    const exists = wishlist.find((item) => item.id === product.id);
    let updatedWishlist;

    if (exists) {
      updatedWishlist = wishlist.filter((item) => item.id !== product.id);
      setIsWishlisted(false);
    } else {
      updatedWishlist = [...wishlist, product];
      setIsWishlisted(true);
    }

    localStorage.setItem('wishlist', JSON.stringify(updatedWishlist));
  };

  const handleShare = () => {
    const shareData = {
      title: product.pro_name,
      text: `Check out this product: ${product.pro_name}`,
      url: window.location.href
    };

    if (navigator.share) {
      navigator.share(shareData).catch((err) => console.error('Share failed:', err));
    } else {
      const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(`${shareData.text} - ${shareData.url}`)}`;
      window.open(whatsappUrl, '_blank');
    }
  };

  if (!product) return <div className="text-center py-5">Product not found</div>;

  const totalPrice = product.price * quantity;

  return (
    <Container className="product-details-container py-4">
      <Row>
        <Col md={7} className="mb-4">
          <div>
            <Swiper
              style={{
                '--swiper-navigation-color': '#fff',
                '--swiper-pagination-color': '#fff',
              }}
              loop={true}
              spaceBetween={10}
              navigation={true}
              thumbs={{ swiper: thumbsSwiper }}
              modules={[FreeMode, Navigation, Thumbs]}
              className="mySwiper2"
            >
              {Array.isArray(product.pro_img) &&
                product.pro_img.map((img, index) => (
                  <SwiperSlide key={index}>
                    <div className="carousel-image-wrapper">
                      <img src={img} alt={`Slide ${index}`} />
                    </div>
                  </SwiperSlide>
                ))}
            </Swiper>

            <Swiper
              onSwiper={setThumbsSwiper}
              loop={true}
              spaceBetween={10}
              slidesPerView={4}
              freeMode={true}
              watchSlidesProgress={true}
              modules={[FreeMode, Navigation, Thumbs]}
              className="mySwiper"
            >
              {Array.isArray(product.pro_img) &&
                product.pro_img.map((img, index) => (
                  <SwiperSlide key={index}>
                    <div className="carousel-image-wrapper">
                      <img src={img} alt={`Slide ${index}`} className="carousel-img" />
                    </div>
                  </SwiperSlide>
                ))}
            </Swiper>
          </div>

          <div className='mt-3'>
            <div style={{ display: "flex", justifyContent: "space-between" }}></div>
            <h2 style={{ color: "#102D59", fontWeight: "700" }}>{product.pro_name}</h2>
            <h2>
              <span><del className="text-danger">₹{product.price + 200}</del></span> ₹{product.price}
            </h2>
            <p>{product.category}</p>
            <p className='mt-3'>{product.description}</p>
          </div>
        </Col>

        <Col md={1}></Col>

        <Col md={4}>
          <div className='d-flex flex-wrap justify-content-around'>
            <button
              onClick={toggleWishlist}
              style={{
                width:"50%",
                backgroundColor: isWishlisted ? "red" : "#f0f0f0",
                color: isWishlisted ? "white" : "black",
                border: "none",
                padding: "10px",
                borderRadius: "5px",
                margin: "10px 0px"
              }}
            >
              {isWishlisted ? "Wishlisted ❤️" : "Add to Wishlist ♡"}
            </button>
            <button onClick={handleShare} style={{background:"#f0f0f0" , border:"none",borderRadius: "5px", width:"45%",margin: "10px 0px"}}> <span className='me-1'>Share</span><FaShareSquare/></button>
          </div>

          <div style={{
            backgroundColor: "white",
            height: "fit-content",
            padding: "7%",
            boxShadow: "0 4px 16px rgba(0, 0, 0, 0.08)"
          }}>
            <h2 style={{ color: "#102D59", fontWeight: "700", textAlign: "center" }}>Enquiry Form</h2>
            <Form>
              <Form.Group className="mb-3">
                <Form.Label>Quantity</Form.Label>
                <div style={{
                  display: "flex",
                  justifyContent: "space-between",
                  flexWrap: "wrap",
                  alignItems: "center"
                }}>
                  <input
                    type="number"
                    value={quantity}
                    min={1}
                    onChange={(e) => setQuantity(parseInt(e.target.value))}
                  />
                  <div className="ms-2">
                    <strong>Total Price: ₹{totalPrice ? totalPrice : product.price}</strong>
                  </div>
                </div>
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Name</Form.Label>
                <Form.Control type="text" placeholder="Your name" required />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Phone Number</Form.Label>
                <Form.Control type="tel" placeholder="Your phone number" required />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Email</Form.Label>
                <Form.Control type="email" placeholder="Your email" required />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Check
                  inline
                  label="Reselling"
                  name="usage"
                  type="radio"
                  id={`reselling`}
                />
                <Form.Check
                  inline
                  label="End Use"
                  name="usage"
                  type="radio"
                  id={`enduse`}
                />
              </Form.Group>

              <Button type="submit" style={{ backgroundColor: "#102D59" }}>Send Enquiry</Button>
            </Form>
          </div>
        </Col>
      </Row>

      <div className="related-products mt-5">
        <h2 className="text-center mb-4">Explore More Products</h2>
        <Row>
          {relatedProducts.length > 0 ? (
            relatedProducts.map((product, i) => (
              <Col key={i} xs={12} sm={6} md={4} lg={3} className="d-flex justify-content-center mb-4">
                <Item product={product} />
              </Col>
            ))
          ) : (
            <div className="text-center py-5">No related products found.</div>
          )}
        </Row>
      </div>
    </Container>
  );
};

export default ProductDetails;
