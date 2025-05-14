import { useMyContext } from '../context/MyContext';
import { Link } from 'react-router-dom';
import { Container, Row, Col } from 'react-bootstrap';
import './Popular.css';

const Popular = () => {
  const { categories } = useMyContext();

  return (
    <div className="popular-wrapper container my-5">
      <h2 className="text-center mb-4">Our Categories</h2>
      <Container className="py-4">
        <Row className="justify-content-center">
          {categories.map((cat, i) => (
            <Col
              key={i}
              xs={4}
              sm={4}
              md={3}
              lg={2}
              className="text-center mb-4"
            >
              <Link
                to={`/products/${cat.categorie}`}
                className="text-decoration-none category-link"
              >
                <div className="category-icon mb-2">
                  <img
                    src={cat.pic}
                    alt={cat.categorie}
                    className="img-fluid rounded-circle"
                  />
                </div>
                <div className="category-name text-dark fw-semibold">
                  {cat.categorie.charAt(0).toUpperCase() + cat.categorie.slice(1)}s
                </div>
              </Link>
            </Col>
          ))}
        </Row>
      </Container>
    </div>
  );
};

export default Popular;
