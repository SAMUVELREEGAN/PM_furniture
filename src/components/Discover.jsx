import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { GoTrophy } from "react-icons/go";
import { FaAward } from "react-icons/fa6";
import { FaShippingFast } from "react-icons/fa";
import { MdSupportAgent } from "react-icons/md";
import './Discover.css';

const Discover = () => {
  const features = [
    {
      icon: <GoTrophy style={{ fontSize: '45px' }} />,
      title: "High Quality",
      description: "Crafted from top materials",
    },
    {
      icon: <FaAward style={{ fontSize: '45px' }} />,
      title: "Warranty Protection",
      description: "Over 2 years",
    },
    {
      icon: <FaShippingFast style={{ fontSize: '45px' }} />,
      title: "Fast Shipping",
      description: "Order over",
    },
    {
      icon: <MdSupportAgent style={{ fontSize: '45px' }} />,
      title: "24 / 7 Support",
      description: "Dedicated support",
    },
  ];

  return (
    <div>
      <Container className="text-center mt-5">
        <h3 className="mb-5">Discover Furniture With High Quality Wood</h3>
      </Container>

      <Container className="my-5">
        <Row className="g-4">
          {features.map((item, idx) => (
            <Col key={idx} xs={12} sm={6} md={3} className="text-center">
              <div className="d-flex flex-column align-items-center">
                {item.icon}
                <h6 className="mt-3">{item.title}</h6>
                <p>{item.description}</p>
              </div>
            </Col>
          ))}
        </Row>
      </Container>
    </div>
  );
};

export default Discover;
