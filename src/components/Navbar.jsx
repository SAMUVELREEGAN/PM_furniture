import React, { useEffect, useState } from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Offcanvas from 'react-bootstrap/Offcanvas';
import logo from '../assets/logo.png';
import AOS from 'aos';
import './Navbar.css';
import axios from 'axios';
import { BsListNested } from "react-icons/bs";
import { useNavigate } from 'react-router-dom';
import Loader from './Loader'; // Adjust path if needed
import { GoHeartFill } from "react-icons/go";

const Navbars = () => {
  const [DataLogo, setDataLogo] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const expand = 'md';

  useEffect(() => {
    AOS.init({
      offset: 100,
      duration: 1200,
      easing: 'ease-in-out',
      once: false,
    });
  }, []);

  useEffect(() => {
    axios.get('http://localhost:8000/logo/latest/')
      .then((response) => {
        if (response.data.picture) {
          setDataLogo(`http://localhost:8000${response.data.picture}`);
        }
      })
      .catch((error) => console.error('Error fetching logo:', error));
  }, []);

  // Handles navigation + closes navbar on mobile
  const handleNavClick = (path) => {
    setLoading(true);

    // Auto-close Offcanvas if on mobile
    const backdrop = document.querySelector('.offcanvas-backdrop');
    if (backdrop) backdrop.click();

    setTimeout(() => {
      navigate(path);
      setLoading(false);
    }, 1000);
  };

  return (
    <>
      {loading && <Loader />}
      <Navbar expand={expand} className="nav_bar">
        <Container fluid>
          <Navbar.Brand href="/" className="nav_logo ms-md-5">
            {DataLogo ? (
              <img src={DataLogo} alt='Logo' width="200px" />
            ) : (
              <img src={logo} alt='Logo' width="200px" />
            )}
          </Navbar.Brand>

          <Navbar.Toggle
            aria-controls={`offcanvasNavbar-expand-${expand}`}
            className="nav_button"
            style={{ border: "none", fontSize: "30px" }}
          >
            <BsListNested />
          </Navbar.Toggle>

          <Navbar.Offcanvas
            id={`offcanvasNavbar-expand-${expand}`}
            aria-labelledby={`offcanvasNavbarLabel-expand-${expand}`}
            placement="end"
          >
            <Offcanvas.Header closeButton>
              <Offcanvas.Title id={`offcanvasNavbarLabel-expand-${expand}`}>
                {DataLogo ? (
                  <img src={DataLogo} alt='Logo' width="200px" />
                ) : (
                  <img src={logo} className="nav_img" alt="Brand Logo" width="100px" />
                )}
              </Offcanvas.Title>
            </Offcanvas.Header>

            <Offcanvas.Body>
              <Nav className="justify-content-end flex-grow-1 pe-3 me-5">
                <Nav.Link onClick={() => handleNavClick('/')} className="me-3 nav_head">Home</Nav.Link>
                <Nav.Link onClick={() => handleNavClick('/about')} className="me-3 nav_head">About</Nav.Link>
                <Nav.Link onClick={() => handleNavClick('/product')} className="me-3 nav_head">Product</Nav.Link>
                <Nav.Link onClick={() => handleNavClick('/contact')} className="me-3 nav_head">Contact</Nav.Link>
                <Nav.Link onClick={() => handleNavClick('/wishlist')} className="me-3 nav_head">Wishlist <GoHeartFill style={{color:"red",fontSize:"20px"}}/> </Nav.Link>
                {/* <Nav.Link onClick={() => handleNavClick('/dealer/a')} className="me-3 nav_head">A </Nav.Link> */}
              </Nav>
            </Offcanvas.Body>
          </Navbar.Offcanvas>
        </Container>
      </Navbar>
    </>
  );
};

export default Navbars;
