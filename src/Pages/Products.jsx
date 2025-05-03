import React, { useState } from 'react';
import './Products.css';
import {Link} from 'react-router-dom'
import {Row , Col, Container} from 'react-bootstrap'
import { products } from '../Data/Product';
import Item from '../components/Item';

const Products = () => {
  const starred = products.filter(p => p.star === "Yes");
  const unstarred = products.filter(p => p.star !== "Yes");
  const sortedProducts = [...starred, ...unstarred];

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 12;

  const totalPages = Math.ceil(sortedProducts.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentItems = sortedProducts.slice(startIndex, startIndex + itemsPerPage);
  
  return (
   <div>
     <div className="product-hero">
      <div className="product-overlay">
        <h1>Product</h1>
        <p><Link to='/'>Home</Link> <span>/</span> <Link to='/'>Product</Link></p>
      </div>
      </div>
      <div>
       <Container style={{marginTop:"7%"}}> 
       <Row>
          <Col md={2}></Col>
          <Col md={10}>
          <div className='product_header'>
            <div style={{display:'flex',justifyContent:"space-around",alignItems:"center",flexWrap:"wrap",justifyItems:"center"}}>
              <div><h2>Our Products</h2></div>
              <div>
               
                <label for="fruit"> <h2>Sort by : </h2></label>
                <select name="select-container" id="fruit">
                  <option value="one">Latest Product</option>
                  <option value="two">Upcomming Product</option>
                  <option value="three">Price</option>
                  <option value="four">Color</option>
                </select>  
              </div>
            </div>
          </div>
            <div style={{marginTop:"5%", display: 'flex', flexWrap: 'wrap',marginLeft:"-2%"}}>
              {currentItems.map((product, index) => (
                <Item key={index} product={product} />
              ))}
            </div>

            <div style={{ marginTop: '10px' }}>
            <button onClick={() => setCurrentPage(prev => prev - 1)} disabled={currentPage === 1}>
              Prev
            </button>
            <span style={{ margin: '0 10px' }}>
              Page {currentPage} of {totalPages}
            </span>
            <button onClick={() => setCurrentPage(prev => prev + 1)} disabled={currentPage === totalPages}>
              Next
            </button>
          </div>
          </Col>
        </Row>
       </Container>
      </div>
   </div>
    
  );
};

export default Products;
