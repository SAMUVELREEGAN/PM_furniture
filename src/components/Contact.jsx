import React, { useState, useEffect } from 'react'
import axios from '../axios'
import '../App.css'
// import 'bootstrap-icons/font/bootstrap-icons.css';
import api, { BASE_URL } from '../axios';
import './Contact.css'

// ✅ Moved outside the component to fix ESLint warning
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
  const [loading, setLoading] = useState(true);
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
      setTimeout(() => setStatus(''), 5000);
    } catch (error) {
      setStatus('Failed to send message. Please try again later.');
      setTimeout(() => setStatus(''), 5000);
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
        console.error("API Error:", err);
        setError("Connection to server failed - showing default content");
        setContactData(fallbackContactData);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const displayData = contactData;
  const displayImages = contactImages;

  if (loading) return <div className="text-center mt-5">Loading...</div>;

  return (
    <div className="container py-5">
      {error && (
        <div className="alert alert-warning text-center mb-4">{error}</div>
      )}
      <div className="row">
        {/* Contact Form */}
        <div className="col-12 col-md-6 mb-4">
          <h3 className="mb-4 text-capitalize">Contact Us</h3>
          {status && (
            <div className={`alert ${status.includes('success') ? 'alert-success' : 'alert-danger'}`}>
              {status}
            </div>
          )}
          <form onSubmit={handleSubmit}>
            <input 
              className="form-control mb-3" 
              type="text" 
              name="name" 
              placeholder="Your Name" 
              value={formData.name} 
              onChange={handleChange} 
              required 
            />
            <input 
              className="form-control mb-3" 
              type="email" 
              name="email" 
              placeholder="Your Email" 
              value={formData.email} 
              onChange={handleChange} 
              required 
            />
            <input 
              className="form-control mb-3" 
              type="tel" 
              name="ph_number" 
              placeholder="Your Mobile Number" 
              value={formData.ph_number} 
              onChange={handleChange} 
              required
            />
            <input 
              className="form-control mb-3" 
              type="text" 
              name="subject" 
              placeholder="Mail Subject" 
              value={formData.subject} 
              onChange={handleChange} 
              required 
            />
            <textarea 
              className="form-control mb-3" 
              name="message" 
              rows="4" 
              placeholder="Enter Your Message" 
              value={formData.message} 
              onChange={handleChange} 
              required
            ></textarea>
            <button className="btn btn-dark px-4 py-2 mt-2" type="submit">
              Send Message
            </button>
          </form>
        </div>

        {/* Top Image */}
        <div className="col-12 col-md-6 mb-4 d-flex justify-content-center align-items-center">
          <div className="contact-img w-100">
            {contactImages ? (
              <img
                src={`${BASE_URL}${displayImages.contact_top_img}`}
                alt="Contact us"
                className="img-fluid rounded"
              />
            ) : (
              <img
                src="https://img.freepik.com/free-photo/smiling-woman-headset-presentation-something_329181-11710.jpg"
                alt="Contact us"
                className="img-fluid rounded"
              />
            )}
          </div>
        </div>

        {/* Bottom Image */}
        <div className="col-12 col-md-6 mb-4 d-flex justify-content-center align-items-center">
          <div className="contact-img w-100">
            {contactImages ? (
              <img
                src={`${BASE_URL}${displayImages.contact_bottom_img}`}
                alt="Contact us"
                className="img-fluid rounded"
              />
            ) : (
              <img
                src="https://img.freepik.com/free-vector/flat-design-illustration-customer-support_23-2148887720.jpg"
                alt="Contact us"
                className="img-fluid rounded"
              />
            )}
          </div>
        </div>

        {/* Contact Info */}
        <div className="col-12 col-md-6 mb-4 d-flex justify-content-center align-items-center">
          <div className="p-4 w-100 contact-detail" style={{ maxWidth: "500px" }}>
            <h6>Address <i className="bi bi-geo-alt"></i></h6>
            {contactData ? (
              <p className="fw-medium">
                <i className="bi bi-geo-alt"></i>{" "}
                <a
                  href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(displayData.adress)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-decoration-none"
                >
                  {displayData.adress}
                </a>
              </p>
            ) : (
              <p>Veera ragavan furnitures, no7, vandi pettai, Tirumangalam, Madurai</p>
            )}

            <br />
            <h6>Mobile Number <i className="bi bi-telephone"></i></h6>
            {contactData ? (
              <p className="fw-medium">
                <i className="bi bi-telephone"></i>{" "}
                <a href={`tel:${contactData.ph_number}`} className="text-decoration-none">
                  {contactData.ph_number}
                </a>
              </p>
            ) : (
              <p>+917010224506</p>
            )}

            <br />
            <h6>Email <i className="bi bi-envelope"></i></h6>
            {contactData ? (
              <p className="fw-medium">
                <i className="bi bi-envelope"></i>{" "}
                <a
                  href={`https://mail.google.com/mail/?view=cm&fs=1&to=${contactData.email}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-decoration-none"
                >
                  {contactData.email}
                </a>
              </p>
            ) : (
              <p>rajesrajesh33@gmail.com</p>
            )}

            <div className="d-flex gap-3 pt-3 flex-wrap">
              <a href={displayData.facebook_url} target="_blank" rel="noopener noreferrer">
                <i className="t-blue bi bi-facebook fs-4 p-1 px-2"></i>
              </a>
              <a href={displayData.instagram_url} target="_blank" rel="noopener noreferrer">
                <i className="t-blue bi bi-instagram fs-4 p-1 px-2"></i>
              </a>
              <a href={displayData.youtube_url} target="_blank" rel="noopener noreferrer">
                <i className="t-blue bi bi-youtube fs-4 p-1 px-2"></i>
              </a>
              <a href={displayData.whatsapp_url} target="_blank" rel="noopener noreferrer">
                <i className="t-blue bi bi-whatsapp fs-4 p-1 px-2"></i>
              </a>
            </div>
          </div>
        </div>

        {/* Google Map */}
        <div className="col-12 mt-4">
          <div className="contact-map">
          <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3931.310485174061!2d77.97896547376214!3d9.824268776036451!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3b00d253b855851d%3A0x4e3c2e390ba785da!2sVEERARAGAVAN%20FURNITURE%20SHOWROOM!5e0!3m2!1sen!2sin!4v1744031154700!5m2!1sen!2sin"
              width="100%"
              height="400"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Contact Location"
            ></iframe>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Contact;
