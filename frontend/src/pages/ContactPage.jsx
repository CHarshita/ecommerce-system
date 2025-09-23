// File: frontend/src/pages/ContactPage.jsx

import React, { useState } from 'react';
import './ContactPage.css';

// SVG Icons for the Contact Page
const PhoneIcon = () => <svg className="contact-icon" viewBox="0 0 24 24"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg>;
const MailIcon = () => <svg className="contact-icon" viewBox="0 0 24 24"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>;
const MessageCircleIcon = () => <svg className="contact-icon" viewBox="0 0 24 24"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path></svg>;
const MapPinIcon = () => <svg className="contact-icon" viewBox="0 0 24 24"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>;
const ClockIcon = () => <svg className="contact-icon-sm" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"></circle><polyline points="12,6 12,12 16,14"></polyline></svg>;

export function ContactPage() {
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', subject: '', message: '', urgency: 'medium' });
  const [submitted, setSubmitted] = useState(false);

  const handleInputChange = (field, value) => setFormData(prev => ({ ...prev, [field]: value }));

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Contact form:', formData);
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 4000);
  };

  const contactInfo = [
    { icon: <PhoneIcon />, title: "Phone Support", details: ["+1 (555) 123-4567", "Mon-Fri: 8AM-8PM", "Sat-Sun: 9AM-6PM"] },
    { icon: <MailIcon />, title: "Email Support", details: ["support@freshgrocer.com", "Response within 2 hours"] },
    { icon: <MessageCircleIcon />, title: "Live Chat", details: ["Available on website", "Mon-Fri: 8AM-10PM"] },
    { icon: <MapPinIcon />, title: "Headquarters", details: ["123 Fresh Street", "San Francisco, CA 94105"] }
  ];

  const faqItems = [
    { question: "What are your delivery areas?", answer: "We currently deliver to most major cities. Enter your ZIP code at checkout to confirm." },
    { question: "How fresh are your products?", answer: "Our produce is sourced directly from local farms, harvested within 24-48 hours of delivery." },
    { question: "What if I'm not satisfied?", answer: "We offer a 100% satisfaction guarantee. Contact us within 24 hours for a full refund or replacement." },
    { question: "Can I schedule recurring deliveries?", answer: "Yes! You can set up recurring orders for your favorite items through your account dashboard." }
  ];

  return (
    <div className="contact-page-wrapper">
      <div className="home-content-wrapper">
        <div className="contact-page-header">
          <h1>Get in Touch</h1>
          <p>Have questions, feedback, or need assistance? We're here to help and would love to hear from you.</p>
        </div>

        <div className="contact-layout-grid">
          <div className="contact-form-container">
            <div className="contact-card">
              {submitted ? (
                <div className="form-submitted-message">
                  <div className="submitted-icon-wrapper"><MessageCircleIcon /></div>
                  <h3>Message Sent!</h3>
                  <p>Thank you for contacting us. We'll get back to you shortly.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="contact-form">
                  <div className="form-grid">
                    <div>
                      <label htmlFor="name">Full Name *</label>
                      <input id="name" value={formData.name} onChange={(e) => handleInputChange('name', e.target.value)} required />
                    </div>
                    <div>
                      <label htmlFor="email">Email Address *</label>
                      <input id="email" type="email" value={formData.email} onChange={(e) => handleInputChange('email', e.target.value)} required />
                    </div>
                    <div>
                      <label htmlFor="phone">Phone Number</label>
                      <input id="phone" value={formData.phone} onChange={(e) => handleInputChange('phone', e.target.value)} />
                    </div>
                    <div>
                      <label htmlFor="urgency">Priority Level</label>
                      <select id="urgency" value={formData.urgency} onChange={(e) => handleInputChange('urgency', e.target.value)}>
                        <option value="low">Low - General inquiry</option>
                        <option value="medium">Medium - Order question</option>
                        <option value="high">High - Urgent issue</option>
                      </select>
                    </div>
                  </div>
                  <div>
                    <label htmlFor="subject">Subject *</label>
                    <input id="subject" value={formData.subject} onChange={(e) => handleInputChange('subject', e.target.value)} placeholder="What can we help you with?" required />
                  </div>
                  <div>
                    <label htmlFor="message">Message *</label>
                    <textarea id="message" value={formData.message} onChange={(e) => handleInputChange('message', e.target.value)} placeholder="Please provide details..." required />
                  </div>
                  <button type="submit" className="btn-primary form-submit-btn">Send Message</button>
                </form>
              )}
            </div>
          </div>
          
          <div className="contact-info-container">
            <div className="contact-card">
              <h3 className="info-card-title">Contact Information</h3>
              {contactInfo.map((info, index) => (
                <div key={index} className="info-item">
                  {info.icon}
                  <div>
                    <h4>{info.title}</h4>
                    {info.details.map((detail, i) => <p key={i}>{detail}</p>)}
                  </div>
                </div>
              ))}
            </div>
            <div className="contact-card">
              <h3 className="info-card-title with-icon"><ClockIcon /> Business Hours</h3>
              <div className="business-hours">
                <p><span>Monday - Friday</span> <span>8:00 AM - 8:00 PM</span></p>
                <p><span>Saturday - Sunday</span> <span>9:00 AM - 6:00 PM</span></p>
              </div>
            </div>
          </div>
        </div>
        {/* Quick Links */}
        <div className="contact-card">
        <h3 className="info-card-title">Quick Help</h3>
        <div className="quick-help-buttons">
      <button className="quick-help-btn">Track Your Order</button>
      <button className="quick-help-btn">Return & Refunds</button>
      <button className="quick-help-btn">Account Help</button>
      <button className="quick-help-btn">Delivery Information</button>
    </div>
  </div>

        {/*FAQ Section*/}  
        <div className="faq-section">
          <div className="contact-card">
            <h2 className="faq-title">Frequently Asked Questions</h2>
            <div className="faq-grid">
              {faqItems.map((faq, index) => (
                <div key={index}>
                  <h4>{faq.question}</h4>
                  <p>{faq.answer}</p>
                </div>
              ))}
            </div>
            <div className="faq-button-container">
              <button className="btn-secondary">
                View All FAQs
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}