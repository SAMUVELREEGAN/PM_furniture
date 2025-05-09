import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Card, Alert } from 'react-bootstrap';
import AOS from 'aos';
import api, { BASE_URL } from "../axios";
import './About.css';

function About() {
  const [aboutData, setAboutData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    AOS.init({ duration: 1000 });
    
    const fetchAboutData = async () => {
      try {
        const response = await api.get(`${BASE_URL}/api/about-setting/`);
        setAboutData(response.data);
      } catch (err) {
        console.error(err.message);
        setError("Unable to fetch data. Showing default content.");
      }
    };

    fetchAboutData();
  }, []);

  return (
    <Container className="py-5">
      {/* Hero Section */}
      <Row className="align-items-center mb-5">
        <Col lg={6} data-aos="fade-right">
          <img
            src={aboutData ? `${BASE_URL}${aboutData.about_story_img}` : 'https://t3.ftcdn.net/jpg/02/26/14/90/360_F_226149059_XaAkChkpfZfvmPPt4JH5UicqKJH5zLHM.jpg'}
            alt="About"
            className="img-fluid rounded shadow"
            style={{ maxHeight: "500px", objectFit: "cover", width: "100%" }}
          />
        </Col>
        <Col lg={6} data-aos="fade-left">
          <h1 className="mb-4 text-primary">About Us</h1>
          <p className="lead">Welcome to Veeraragavan Furnitures.</p>
          <p>We offer both wholesale and retail furniture, combining comfort, style, and value.</p>
        </Col>
      </Row>

      {/* Who We Are */}
      <Card className="border-0 shadow mb-5" data-aos="fade-up">
        <Card.Body>
          <Row className="align-items-center">
            <Col md={8}>
              <h2>Who We Are</h2>
              <p>We are leaders in quality furniture manufacturing with years of craftsmanship experience.</p>
            </Col>
            <Col md={4}>
              <img
                src={aboutData ? `${BASE_URL}${aboutData.designer_img}` : 'https://t3.ftcdn.net/jpg/02/26/14/90/360_F_226149059_XaAkChkpfZfvmPPt4JH5UicqKJH5zLHM.jpg'}
                alt="Designer"
                className="img-fluid rounded"
                style={{ maxHeight: "250px", objectFit: "cover", width: "100%" }}
              />
            </Col>
          </Row>
        </Card.Body>
      </Card>

      {/* Features Section */}
      <Row className="mb-5" data-aos="zoom-in-up">
        {[
          { title: "What We Offer", img: aboutData?.card_1_img },
          { title: "Our Mission", img: aboutData?.card_2_img },
          { title: "Why Choose Us?", img: aboutData?.card_3_img },
        ].map((item, index) => (
          <Col md={4} key={index} className="mb-4">
            <Card className="h-100 text-center border-0 shadow">
              <Card.Body>
                <div className="mx-auto mb-3" style={{ width: "120px", height: "120px" }}>
                  <img
                    src={item.img ? `${BASE_URL}${item.img}` : 'https://t3.ftcdn.net/jpg/01/01/89/46/240_F_101894688_RVSZUtDfPR6Cr5eBDQI7Qo5pZ01jmyK3.jpg'}
                    alt={item.title}
                    className="img-fluid rounded-circle"
                    style={{ objectFit: "cover", width: "100%", height: "100%", border: "3px solid #f8f9fa", boxShadow: "0 2px 4px rgba(0,0,0,0.1)" }}
                  />
                </div>
                <h4>{item.title}</h4>
                {index === 0 && <p>Modern & traditional designs with top-quality materials.</p>}
                {index === 1 && <p>Delivering comfort, durability, and elegant style.</p>}
                {index === 2 && (
                  <ul className="text-start d-inline-block">
                    <li>Wide design range</li>
                    <li>Affordable pricing</li>
                    <li>Expert craftsmen</li>
                    <li>Friendly service</li>
                  </ul>
                )}
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>

      {/* Quality Section */}
      <div className="text-center mb-5" data-aos="fade-up">
        <h2>Top Quality Materials & Standards</h2>
        <Row className="justify-content-center mt-4">
          {['Water Resistance', 'Eco Friendly', 'Frost Resistant', 'Easy Assembling', 'Durability'].map((feature, i) => (
            <Col key={i} xs={6} sm={4} md={2} className="mb-4 text-center">
              <img
                src={`https://eskil.qodeinteractive.com/wp-content/uploads/2022/05/h7-icon-0${i + 1}.png`}
                alt={feature}
                className="img-fluid rounded-circle mb-2"
                width="60"
              />
              <h6>{feature.toUpperCase()}</h6>
            </Col>
          ))}
        </Row>
      </div>

      {/* Error Message */}
      {error && (
        <Alert variant="warning" className="text-center">
          {error}
        </Alert>
      )}
    </Container>
  );
}

export default About;
