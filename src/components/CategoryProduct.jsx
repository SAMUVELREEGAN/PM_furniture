import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import CategoryItem from './CategoryItem';
import { Container, Row, Col } from 'react-bootstrap';
import './CategoryProduct.css';
import logo from '../assets/logo.png';
import { useMyContext } from '../context/MyContext';

const CategoryProduct = () => {
  const { categories, colorList, typeList, products } = useMyContext();
  const { categorie, link_name } = useParams();
  const [materialType, setMaterialType] = useState('');
  const [sortOption, setSortOption] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedColor, setSelectedColor] = useState('');
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [compareProducts, setCompareProducts] = useState([]);
  const navigate = useNavigate();
  const location = useLocation();

  const isDealerPage = location.pathname.startsWith('/dealer');

  useEffect(() => {
    window.scrollTo({ top: 0 });
  }, []);

  useEffect(() => {
    let filtered = products;

    if (selectedCategory) {
      filtered = filtered.filter((pro) => pro.category === selectedCategory);
    }

    if (categorie && link_name) {
      filtered = filtered.filter(
        (pro) => pro.category === categorie && pro.link_name === link_name
      );
    } else if (categorie) {
      filtered = filtered.filter(
        (pro) => pro.category === categorie && pro.link_name === 'all'
      );
    } else if (link_name) {
      filtered = filtered.filter((pro) => pro.link_name === link_name);
    }

    if (materialType) {
      filtered = filtered.filter(
        (pro) => pro.type?.toLowerCase() === materialType.toLowerCase()
      );
    }

    if (selectedColor) {
      filtered = filtered.filter(
        (pro) => pro.color?.toLowerCase() === selectedColor.toLowerCase()
      );
    }

    if (sortOption === 'lowToHigh') {
      filtered = filtered.sort((a, b) => a.price - b.price);
    } else if (sortOption === 'highToLow') {
      filtered = filtered.sort((a, b) => b.price - a.price);
    }

    setFilteredProducts(filtered);
  }, [categorie, link_name, materialType, sortOption, selectedCategory, selectedColor, products]);

  const handleCompare = (product) => {
    const isAlreadyCompared = compareProducts.some((p) => p.id === product.id);

    if (isAlreadyCompared) {
      setCompareProducts((prev) => prev.filter((p) => p.id !== product.id));
    } else {
      if (compareProducts.length >= 2) {
        alert('You can only compare two products at a time.');
        return;
      }
      setCompareProducts((prev) => [...prev, product]);
    }
  };

  useEffect(() => {
    if (compareProducts.length === 2) {
      navigate('/compare', { state: { products: compareProducts } });
    }
  }, [compareProducts, navigate]);

  return (
    <>
      <div>
        <div className="filter-bar container-fluid sticky-top bg-white py-2 shadow-sm d-flex justify-content-between">
          {isDealerPage && (
            <img src={logo} alt="Logo" width="150px" className="me-2" />
          )}
          <div className="d-flex overflow-auto gap-3 flex-nowrap align-items-center px-2 filter-scroll">

            {/* Material Type */}
            <div className="d-flex align-items-center gap-1">
              <label htmlFor="materialType" className="fw-semibold mb-0 filter_name text-nowrap">Material Type:</label>
              <select
                id="materialType"
                className="form-select form-select-sm w-auto"
                onChange={(e) => setMaterialType(e.target.value)}
                value={materialType}
              >
                <option value="">All Material</option>
                {typeList.map((item) => (
                  <option key={item.id} value={item.type_name}>
                    {item.type_name.charAt(0).toUpperCase() + item.type_name.slice(1)}
                  </option>
                ))}
              </select>
            </div>

            {/* Sort By */}
            <div className="d-flex align-items-center gap-1">
              <label htmlFor="sortBy" className="fw-semibold mb-0 filter_name text-nowrap">Sort By:</label>
              <select
                id="sortBy"
                className="form-select form-select-sm w-auto"
                onChange={(e) => setSortOption(e.target.value)}
                value={sortOption}
              >
                <option value="">Recommended</option>
                <option value="lowToHigh">Price: Low to High</option>
                <option value="highToLow">Price: High to Low</option>
              </select>
            </div>

            {/* Category - Dealer only */}
            {isDealerPage && (
              <div className="d-flex align-items-center gap-1">
                <label htmlFor="category" className="fw-semibold mb-0 filter_name text-nowrap">Category:</label>
                <select
                  id="category"
                  className="form-select form-select-sm w-auto"
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  value={selectedCategory}
                >
                  <option value="">All Categories</option>
                  {categories.map((item, index) => (
                    <option key={index} value={item.categorie}>
                      {item.categorie.charAt(0).toUpperCase() + item.categorie.slice(1)}
                    </option>
                  ))}
                </select>
              </div>
            )}

            {/* Color Filter */}
            <div className="d-flex align-items-center gap-1">
              <label htmlFor="color" className="fw-semibold mb-0 filter_name text-nowrap">Color:</label>
              <select
                id="color"
                className="form-select form-select-sm w-auto"
                onChange={(e) => setSelectedColor(e.target.value)}
                value={selectedColor}
              >
                <option value="">All Colors</option>
                {colorList.map((colorObj) => (
                  <option key={colorObj.id} value={colorObj.color_name}>
                    {colorObj.color_name.charAt(0).toUpperCase() + colorObj.color_name.slice(1).toLowerCase()}
                  </option>
                ))}
              </select>
            </div>

          </div>
        </div>
      </div>

      <Container className="py-4">
        <Row>
          {filteredProducts.map((product, i) => {
            const isCompared = compareProducts.some((p) => p.id === product.id);
            return (
              <Col
                key={i}
                xs={12}
                sm={6}
                md={6}
                lg={3}
                className="mb-4 d-flex justify-content-center"
              >
                <CategoryItem
                  product={product}
                  onCompare={handleCompare}
                  isCompared={isCompared}
                />
              </Col>
            );
          })}
        </Row>
      </Container>
    </>
  );
};

export default CategoryProduct;
