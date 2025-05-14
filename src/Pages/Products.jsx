import React, { useState, useMemo } from 'react';
import './Products.css';
import { Link } from 'react-router-dom';
import { Row, Col, Container, Form, Button, Offcanvas } from 'react-bootstrap';
import Item from '../components/Item';
import { FaSearch } from 'react-icons/fa';
import { RiArrowRightBoxFill, RiArrowLeftBoxFill } from 'react-icons/ri';
import { BsFilterLeft } from 'react-icons/bs';
import { useMyContext } from '../context/MyContext';

const shuffleArray = (array) => [...array].sort(() => Math.random() - 0.5);

const Products = () => {
  const { categories, colorList, products, size ,typeList } = useMyContext();
  const [selectedColor, setSelectedColor] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedType, setSelectedType] = useState('');
  const [priceRange, setPriceRange] = useState(100000000000000);
  const [selectedSizes, setSelectedSizes] = useState([]);
  const [searchInput, setSearchInput] = useState('');
  const [searchTriggered, setSearchTriggered] = useState(false);
  const [showFilter, setShowFilter] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [sortOption, setSortOption] = useState('default');

  // Filter only products where link_name === 'all'
  const filterScopeProducts = useMemo(() => {
    return products.filter(p => p.link_name === 'all');
  }, [products]);

  const filteredAllProducts = useMemo(() => {
    return filterScopeProducts.filter(p => {
      const colorMatch = selectedColor ? p.color?.toLowerCase() === selectedColor : true;
      const categoryMatch = selectedCategory ? p.category === selectedCategory : true;
      const typeMatch = selectedType ? p.type === selectedType : true;
      const priceMatch = parseFloat(p.price) <= priceRange;
      const sizeMatch = selectedSizes.length > 0 ? selectedSizes.includes(p.size) : true;
      const searchMatch = searchTriggered ? (
        p.category.toLowerCase().includes(searchInput.toLowerCase()) ||
        p.color.toLowerCase().includes(searchInput.toLowerCase())
      ) : true;

      return colorMatch && categoryMatch && priceMatch && sizeMatch && searchMatch && typeMatch;
    });
  }, [filterScopeProducts, selectedColor, selectedCategory, selectedType, priceRange, selectedSizes, searchTriggered, searchInput]);

  // Separate star and unstar products
  const rawStarProducts = filteredAllProducts.filter(p => p.star === 'yes');
  const rawUnstarProducts = filteredAllProducts.filter(p => p.star !== 'yes');

  // Shuffle independently
  const starProducts = shuffleArray(rawStarProducts).slice(0, 6);
  const unstarProducts = shuffleArray(rawUnstarProducts);

  // Combine after shuffling
  let combinedProducts = [...starProducts, ...unstarProducts];

  // Sort combined products
  if (sortOption === 'lowToHigh') {
    combinedProducts.sort((a, b) => parseFloat(a.price) - parseFloat(b.price));
  } else if (sortOption === 'highToLow') {
    combinedProducts.sort((a, b) => parseFloat(b.price) - parseFloat(a.price));
  }

  const itemsPerPage = 6;
  const totalPages = Math.ceil(combinedProducts.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentItems = combinedProducts.slice(startIndex, startIndex + itemsPerPage);

  const handleSizeChange = (e) => {
    const value = e.target.value;
    setSelectedSizes(prev =>
      e.target.checked ? [...prev, value] : prev.filter(s => s !== value)
    );
  };

  const handleSearch = () => {
    setSearchTriggered(true);
  };

  const categorySizesObj = size.find(obj => obj.name === selectedCategory);
  const availableSizes = categorySizesObj
    ? Object.keys(categorySizesObj)
        .filter(key => key.startsWith('size')) // This will get all sizes starting with 'size'
        .map(key => categorySizesObj[key])
    : [];

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
            setSelectedSizes([]); // Reset sizes when category changes
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
            {typeList.map((t, i) => (
              <option key={i} value={t.type_name.toLowerCase()}>
                {t.type_name.charAt(0).toUpperCase() + t.type_name.slice(1)}
              </option>
            ))}
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
          {colorList.map((colorObj, index) => {
            const lcColor = colorObj.color_name.toLowerCase();
            return (
              <Col key={index} xs={6} className='mt-2'>
                <Form.Check
                  type="checkbox"
                  label={
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <div style={{ width: '20px', height: '20px', backgroundColor: lcColor, border: '1px solid #ccc' }} />
                      <span>{colorObj.color_name.charAt(0).toUpperCase() + colorObj.color_name.slice(1).toLowerCase()}</span>
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
                  <input type="text" value={searchInput} onChange={(e) => setSearchInput(e.target.value)} style={{ width: "200px" }} />
                  <button onClick={handleSearch} className='ms-1 search'><FaSearch style={{ paddingBottom: "3px" }} /></button>
                </div>

                <div className='mt-1'>
                  <Button className="d-md-none mb-2" variant="outline-dark" onClick={() => setShowFilter(true)}>
                    <BsFilterLeft /> Filter
                  </Button>
                </div>

                <div className="mt-2">
                  <Form.Select value={sortOption} onChange={(e) => setSortOption(e.target.value)} className='ms-3'>
                    <option value="default">Sort by</option>
                    <option value="lowToHigh">Price: Low to High</option>
                    <option value="highToLow">Price: High to Low</option>
                  </Form.Select>
                </div>
              </div>

              <Row>
                {currentItems.length > 0 ? currentItems.map((product, i) => (
                  <Col key={i} sm={12} md={6} lg={4}>
                    <Item product={product} />
                  </Col>
                )) : (
                  <div className='text-center w-100 mt-5'>No products found!</div>
                )}
              </Row>

              <div className='mt-3'>
                <Button disabled={currentPage === 1} onClick={() => setCurrentPage(prev => prev - 1)}><RiArrowLeftBoxFill /></Button>
                <span className='mx-3'>{currentPage} of {totalPages}</span>
                <Button disabled={currentPage === totalPages} onClick={() => setCurrentPage(prev => prev + 1)}><RiArrowRightBoxFill /></Button>
              </div>
            </Container>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Products;
