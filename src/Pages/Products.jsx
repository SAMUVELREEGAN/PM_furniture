import React, { useState, useMemo } from 'react';
import './Products.css';
import { Link } from 'react-router-dom';
import { Row, Col, Container, Form, Button, Offcanvas } from 'react-bootstrap';
import { products } from '../Data/Product';
import { categories } from '../Data/categories';
import { colorList } from '../Data/colorList';
import { size } from '../Data/size';
import { type as typeList } from '../Data/type';
import Item from '../components/Item';
import { FaSearch } from 'react-icons/fa';
import { RiArrowRightBoxFill, RiArrowLeftBoxFill } from 'react-icons/ri';
import { BsFilterLeft } from 'react-icons/bs';

const shuffleArray = (array) => {
  return [...array].sort(() => Math.random() - 0.5);
};

const Products = () => {
  const shuffledStarred = useMemo(() => {
    const starred = products.filter(p => p.star === 'yes');
    return shuffleArray(starred).slice(0, 6);
  }, []);

  const shuffledUnstarred = useMemo(() => {
    const unstarred = products.filter(p => p.star !== 'yes');
    return shuffleArray(unstarred);
  }, []);

  const sortedProducts = [...shuffledStarred, ...shuffledUnstarred];

  const [selectedColor, setSelectedColor] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedType, setSelectedType] = useState('');
  const [priceRange, setPriceRange] = useState(10000);
  const [sortOption, setSortOption] = useState('one');
  const [selectedSizes, setSelectedSizes] = useState([]);
  const [searchInput, setSearchInput] = useState('');
  const [searchTriggered, setSearchTriggered] = useState(false);
  const [showFilter, setShowFilter] = useState(false);

  const handleSizeChange = (e) => {
    const value = e.target.value;
    if (e.target.checked) {
      setSelectedSizes([...selectedSizes, value]);
    } else {
      setSelectedSizes(selectedSizes.filter(s => s !== value));
    }
  };

  const handleSearch = () => {
    setSearchTriggered(true);
  };

  const categorySizesObj = size.find(obj => Object.keys(obj)[0] === selectedCategory);
  const availableSizes = categorySizesObj ? categorySizesObj[selectedCategory] : [];

  let filteredProducts = sortedProducts.filter(p => {
    const colorMatch = selectedColor ? p.color === selectedColor : true;
    const categoryMatch = selectedCategory ? p.category === selectedCategory : true;
    const typeMatch = selectedType ? p.type === selectedType : true;
    const priceMatch = p.price <= priceRange;
    const sizeMatch = selectedSizes.length > 0 ? selectedSizes.includes(p.size) : true;
    const searchMatch = searchTriggered ? (
      p.category.toLowerCase().includes(searchInput.toLowerCase()) ||
      p.color.toLowerCase().includes(searchInput.toLowerCase())
    ) : true;

    return colorMatch && categoryMatch && priceMatch && sizeMatch && searchMatch && typeMatch;
  });

  if (sortOption === 'two') {
    filteredProducts = filteredProducts.filter(p => p.star === 'yes');
  } else if (sortOption === 'three') {
    filteredProducts = filteredProducts.sort((a, b) => b.price - a.price);
  } else if (sortOption === 'four') {
    filteredProducts = filteredProducts.sort((a, b) => a.price - b.price);
  }

  const itemsPerPage = 22;
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentItems = filteredProducts.slice(startIndex, startIndex + itemsPerPage);

  const FilterContent = () => (
    <>
      <div className='mt-4 mb-5'>
        <h5 className='text-center'>Filter by Price</h5>
        <Form.Range min={500} max={10000} step={100} value={priceRange} onChange={(e) => setPriceRange(Number(e.target.value))} />
        <div>Up to ₹{priceRange}</div>
      </div>

      <div className="d-flex justify-content-center">
        <div className='mt-2 mb-2'>
          <Form.Select value={selectedCategory} onChange={(e) => {
            setSelectedCategory(e.target.value);
            setSelectedSizes([]);
          }}>
            <option value="">All Category</option>
            {categories.map((cat, i) => (
              <option key={i} value={cat.categorie}>
                {cat.categorie.charAt(0).toUpperCase() + cat.categorie.slice(1)}
              </option>
            ))}
          </Form.Select>
        </div>
        <div className='mt-2 mb-2 ms-3'>
          <Form.Select value={selectedType} onChange={(e) => setSelectedType(e.target.value)}>
            <option value="">All Material</option>
            {typeList.map((t, i) => <option key={i} value={t}>{t}</option>)}
          </Form.Select>
        </div>
      </div>

      <div className='mt-3'>
        <h5 className='text-center'>Select by Size</h5>
        {availableSizes.length > 0 ? (
          <div style={{ display: 'flex', flexWrap: 'wrap' }}>
            {availableSizes.map((s, idx) => (
              <div key={idx} style={{ padding: '5px 7%' }}>
                <Form.Check
                  type="checkbox"
                  label={s}
                  value={s}
                  checked={selectedSizes.includes(s)}
                  onChange={handleSizeChange}
                />
              </div>
            ))}
          </div>
        ) : (
          <div className='text-muted text-center'>Size not available</div>
        )}
      </div>

      <div>
        <h5 className='mt-4'>Select by Color</h5>
        <Row>
          {colorList.map((color, index) => {
            const lcColor = color.toLowerCase();
            return (
              <Col key={index} xs={6} className='mt-2'>
                <Form.Check
                  type="checkbox"
                  label={
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <div style={{ width: '20px', height: '20px', backgroundColor: lcColor, border: '1px solid #ccc' }} />
                      <span>{color}</span>
                    </div>
                  }
                  value={lcColor}
                  checked={selectedColor === lcColor}
                  onChange={(e) => setSelectedColor(e.target.checked ? lcColor : '')}
                />
              </Col>
            );
          })}
        </Row>
      </div>
    </>
  );

  return (
    <div>
      <div className="product-hero">
        <div className="product-overlay">
          <h1>Our Products</h1>
          <p><Link to='/'>Home</Link> <span>/</span> <Link to='/'>Product</Link></p>
        </div>
      </div>

      <Container style={{ marginTop: "7%" }} fluid>
        <Row>
          <Col md={3} className='d-none d-md-block filter-sidebar'>
            <FilterContent />
          </Col>

          <Offcanvas show={showFilter} onHide={() => setShowFilter(false)} placement="start" className="d-md-none">
            <Offcanvas.Header closeButton>
              <Offcanvas.Title>Filter Products</Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body>
              <FilterContent />
            </Offcanvas.Body>
          </Offcanvas>

          <Col md={8}>
            <Container>
              <div className='product_header mb-4 d-flex justify-content-around align-items-center flex-wrap' style={{ padding: "0px 5%", position: "sticky", top: "0px", zIndex: "1000", backgroundColor: "#fff" }}>
                <div className='product_search'>
                  <input type="text" value={searchInput} onChange={(e) => setSearchInput(e.target.value)} style={{width:"200px"}}/>
                  <button onClick={handleSearch} className='ms-1 search'><FaSearch style={{ paddingBottom: "3px" }} /></button>
                </div>

                <div className='d-flex align-items-center'>
                  <h4 className='me-2 d-none d-md-block'> <div className='d-flex'><span className='me-1'>Sort</span> <span>by:</span></div></h4>
                  <Form.Select
                    className="sort-dropdown"
                    value={sortOption}
                    onChange={(e) => setSortOption(e.target.value)}
                    style={{ minWidth: "150px" }}
                  >
                    <option value="one">All Products</option>
                    <option value="two">Featured Products</option>
                    <option value="three">Price High to Low</option>
                    <option value="four">Price Low to High</option>
                  </Form.Select>
                </div>
                <div className='mt-1'>
                  <Button className="d-md-none mb-2" variant="outline-dark" onClick={() => setShowFilter(true)}>
                    <BsFilterLeft /> Filter
                  </Button>
                </div>
              </div>

              <Row>
                {currentItems.length > 0 ? currentItems.filter(product => product.link_name === 'all').map((product, i) => (
                  <Col key={i} xs={12} sm={6} md={6} lg={4} className="d-flex justify-content-center">
                    <Item product={product} />
                  </Col>
                )) : (
                  <div className='text-center py-5'>No products found</div>
                )}
              </Row>

              <div className="mt-4 d-flex justify-content-end align-items-center gap-3 flex-wrap">
                <button
                  className="btn btn-outline"
                  onClick={() => setCurrentPage(prev => prev - 1)}
                  disabled={currentPage === 1}
                  style={{ color: "rgb(0, 19, 128)" }}
                >
                  <RiArrowLeftBoxFill style={{ fontSize: "20px" }} /> Prev
                </button>

                <span className="fw-bold" style={{ color: "rgb(0, 19, 128)" }}>
                  Page {currentPage} of {totalPages}
                </span>

                <button
                  className="btn btn-outline"
                  onClick={() => setCurrentPage(prev => prev + 1)}
                  disabled={currentPage === totalPages}
                  style={{ color: "rgb(0, 19, 128)" }}
                >
                  Next <RiArrowRightBoxFill style={{ fontSize: "20px" }} />
                </button>
              </div>
            </Container>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Products;
