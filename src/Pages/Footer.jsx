import React from 'react';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer mt-5 text-white pt-4 pb-2">
      <div className="container">
        <div className="row">

          <div className="col-md-4 mb-3">
            <h5>About Us</h5>
            <p>
              We are committed to providing the best quality furniture with exceptional design.
              Crafted with precision and care, each piece reflects our dedication to excellence.
            </p>
          </div>

          <div className="col-md-4 mb-3">
            <h5>Quick Links</h5>
            <ul className="list-unstyled">
              <li><a href="/" className="footer-link">Home</a></li>
              <li><a href="/about" className="footer-link">About</a></li>
              <li><a href="/product" className="footer-link">Products</a></li>
              <li><a href="/contact" className="footer-link">Contact</a></li>
            </ul>
          </div>

          <div className="col-md-4 mb-3">
            <h5>Contact</h5>
            <p>Email: support@mail.com</p>
            <p>Phone: +91 93455 32741</p>
            <p>Address: Pudhur, Madurai</p>
          </div>

        </div>

        <div className="text-center mt-3 pt-3 border-top border-light">
          <p className="mb-0">&copy; {new Date().getFullYear()}  Phoenix Development. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
