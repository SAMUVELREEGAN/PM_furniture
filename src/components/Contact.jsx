import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Form, Button, Alert, Image } from 'react-bootstrap';
import { motion } from 'framer-motion';
import axios from '../axios';
import api, { BASE_URL } from '../axios';
import { FaFacebook, FaInstagram, FaYoutube, FaWhatsapp } from 'react-icons/fa'; // Import React Icons
import './Contact.css';

const fallbackContactData = {
  adress: "123 Main Street, City, Country",
  ph_number: "+1 (123) 456-7890",
  email: "contact@example.com",
  facebook_url: "https://facebook.com",
  instagram_url: "https://instagram.com",
  youtube_url: "https://youtube.com",
  whatsapp_url: "https://whatsapp.com"
};

function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    ph_number: '',
    subject: '',
    message: '',
  });
  const [status, setStatus] = useState('');
  const [contactData, setContactData] = useState(null);
  const [contactImages, setContactImages] = useState(null);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('contact-us/', formData);
      setStatus('Message sent successfully!');
      setFormData({
        name: '', email: '', ph_number: '', subject: '', message: ''
      });
    } catch {
      setStatus('Failed to send message. Please try again later.');
    } finally {
      setTimeout(() => setStatus(''), 4000);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [contactRes, imagesRes] = await Promise.all([
          api.get("footer-setting/"),
          axios.get("contact-images/")
        ]);
        setContactData(contactRes.data);
        setContactImages(imagesRes.data);
      } catch (err) {
        setError("Server error — showing default contact information.");
        setContactData(fallbackContactData);
      }
    };
    fetchData();
  }, []);

  const displayData = contactData || fallbackContactData;
  const displayImages = contactImages;

  return (
    <Container className="py-5">
      {error && <Alert variant="warning" className="text-center">{error}</Alert>}

      <Row className="mb-5">
        <Col md={6} className="mb-4">
          <motion.div initial={{ opacity: 0, x: -50 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5 }}>
            <h3 className="mb-4">Contact Us</h3>
            {status && (
              <Alert variant={status.includes('successfully') ? 'success' : 'danger'}>{status}</Alert>
            )}
            <Form onSubmit={handleSubmit}>
              <Form.Control className="mb-3" name="name" placeholder="Your Name" value={formData.name} onChange={handleChange} required />
              <Form.Control className="mb-3" name="email" type="email" placeholder="Your Email" value={formData.email} onChange={handleChange} required />
              <Form.Control className="mb-3" name="ph_number" type="tel" placeholder="Your Mobile Number" value={formData.ph_number} onChange={handleChange} required />
              <Form.Control className="mb-3" name="subject" placeholder="Subject" value={formData.subject} onChange={handleChange} required />
              <Form.Control className="mb-3" as="textarea" rows={4} name="message" placeholder="Message" value={formData.message} onChange={handleChange} required />
              <Button variant="dark" type="submit" className="mt-2 px-4">Send Message</Button>
            </Form>
          </motion.div>
        </Col>

        <Col md={6} className="mb-4 d-flex justify-content-center align-items-center">
          <motion.div initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5 }}>
            <Image
              src={displayImages ? `${BASE_URL}${displayImages.contact_top_img}` : 'https://img.freepik.com/free-photo/smiling-woman-headset-presentation-something_329181-11710.jpg'}
              alt="Contact"
              fluid
              rounded
            />
          </motion.div>
        </Col>

        <Col md={6} className="mb-4 d-flex justify-content-center align-items-center">
          <motion.div initial={{ opacity: 0, x: -50 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5 }}>
            <Image
              src={displayImages ? `${BASE_URL}${displayImages.contact_bottom_img}` : 'https://img.freepik.com/free-vector/flat-design-illustration-customer-support_23-2148887720.jpg'}
              alt="Support"
              fluid
              rounded
            />
          </motion.div>
        </Col>

        <Col md={6} className="mb-4">
          <motion.div initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5 }}>
            <div className="contact-detail p-4 rounded" style={{ background: '#f8f9fa' }}>
              <h5 className="mb-2">Address</h5>
              <p>
                <a href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(displayData.adress)}`} target="_blank" rel="noopener noreferrer">
                  {displayData.adress}
                </a>
              </p>
              <h5 className="mt-4 mb-2">Phone</h5>
              <p><a href={`tel:${displayData.ph_number}`}>{displayData.ph_number}</a></p>
              <h5 className="mt-4 mb-2">Email</h5>
              <p>
                <a href={`mailto:${displayData.email}`}>{displayData.email}</a>
              </p>
              <div className="d-flex gap-3 mt-3 flex-wrap">
                <a href={displayData.facebook_url} target="_blank" rel="noopener noreferrer" className="social-icon facebook">
                  <FaFacebook size={30} className="p-2" />
                </a>
                <a href={displayData.instagram_url} target="_blank" rel="noopener noreferrer" className="social-icon instagram">
                  <FaInstagram size={30} className="p-2" />
                </a>
                <a href={displayData.youtube_url} target="_blank" rel="noopener noreferrer" className="social-icon youtube">
                  <FaYoutube size={30} className="p-2" />
                </a>
                <a href={displayData.whatsapp_url} target="_blank" rel="noopener noreferrer" className="social-icon whatsapp">
                  <FaWhatsapp size={30} className="p-2" />
                </a>
              </div>
            </div>
          </motion.div>
        </Col>

        <Col xs={12} className="mt-5">
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }}>
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3931.310485174061!2d77.97896547376214!3d9.824268776036451!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3b00d253b855851d%3A0x4e3c2e390ba785da!2sVEERARAGAVAN%20FURNITURE%20SHOWROOM!5e0!3m2!1sen!2sin!4v1744031154700!5m2!1sen!2sin"
              width="100%"
              height="400"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              title="Google Map"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </motion.div>
        </Col>
      </Row>
    </Container>
  );
}

export default Contact;
