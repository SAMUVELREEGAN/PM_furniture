import React, { useEffect, useState } from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Offcanvas from 'react-bootstrap/Offcanvas'; 
import logo from '../assets/logo.png';
import AOS from 'aos';
import './Navbar.css'
import axios from 'axios'

const Navbars = () => {
    const [DataLogo, setDataLogo] = useState("")
    useEffect(() => {
        AOS.init({
          offset: 100,
          duration: 1200,
          easing: 'ease-in-out',
          once: false,
        });
      }, []);
  const expand = 'md';

  // useEffect(() => {
  //   axios.get('http://localhost:8000/logo/latest/')
  //     .then((response) => {
        
  //       if (response.data.picture){
  //         setDataLogo(`http://localhost:8000${response.data.picture}`);
  //         console.log(response.data)
  //       }
  //     })
  //     .catch((error) => console.error('Error fetching logo:', error));
  // }, []);

  return (
    <Navbar expand={expand} className="nav_bar">
      <Container fluid>
        <Navbar.Brand href="/" className="nav_logo ms-md-5">
        <img src={logo} alt='err' width="200px"/>
        {/* {DataLogo ? (<img src={DataLogo} alt='err' width="200px"/>) : (<img src={logo} alt='err' width="200px"/>)} */}
        </Navbar.Brand>
        <Navbar.Toggle aria-controls={`offcanvasNavbar-expand-${expand}`} className="nav_button" />
        <Navbar.Offcanvas
          id={`offcanvasNavbar-expand-${expand}`}
          aria-labelledby={`offcanvasNavbarLabel-expand-${expand}`}
          placement="end"
        >
          <Offcanvas.Header closeButton>
            <Offcanvas.Title id={`offcanvasNavbarLabel-expand-${expand}`}>
            <img src={logo} className="nav_img" alt="Brand Logo" width="100px"/>
            {/* {DataLogo ? (<img src={DataLogo} alt='err' width="200px"/>) : (<img src={logo} className="nav_img" alt="Brand Logo" width="100px"/>)} */}
            </Offcanvas.Title>
          </Offcanvas.Header>
          <Offcanvas.Body>
            <Nav className="justify-content-end flex-grow-1 pe-3 me-5">
              <Nav.Link href="/" className="me-3 nav_head">Home</Nav.Link>
              <Nav.Link href="/" className="me-3 nav_head">About</Nav.Link>
              <Nav.Link href="/product" className="me-3 nav_head">Product</Nav.Link>
              <Nav.Link href="/" className="me-3 nav_head">Contact</Nav.Link>
            </Nav>
          </Offcanvas.Body>
        </Navbar.Offcanvas>
      </Container>
    </Navbar>
  );
};

export default Navbars;
