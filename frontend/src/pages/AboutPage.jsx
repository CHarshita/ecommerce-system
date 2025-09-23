// File: frontend/src/pages/AboutPage.jsx

import React from 'react';
import './AboutPage.css'; // Import the new CSS

// SVG Icon Components
const LeafIcon = () => <svg className="h-8 w-8" xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M11 20A7 7 0 0 1 4 13H2a10 10 0 0 0 10 10v-2a3 3 0 0 1-3-3z"/><path d="M12 4a10 10 0 0 0-10 10h2a7 7 0 0 1 7-7v2a3 3 0 0 1 3 3h2a10 10 0 0 0-10-10z"/></svg>;
const UsersIcon = () => <svg className="h-8 w-8" xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>;
const AwardIcon = () => <svg className="h-8 w-8" xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="8" r="6"/><path d="M15.477 12.89 17 22l-5-3-5 3 1.523-9.11"/></svg>;
const HeartIcon = () => <svg className="h-8 w-8" xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/></svg>;


export function AboutPage() {
  const values = [
    { icon: <LeafIcon />, title: "Sustainability", description: "We're committed to reducing our environmental impact through eco-friendly packaging and supporting local farmers." },
    { icon: <UsersIcon />, title: "Community", description: "Building stronger communities by supporting local producers and providing access to fresh, healthy food." },
    { icon: <AwardIcon />, title: "Quality", description: "We maintain the highest standards for all our products, ensuring freshness and quality in every delivery." },
    { icon: <HeartIcon />, title: "Care", description: "Every customer is part of our family. We care about your health, satisfaction, and shopping experience." }
  ];

  const stats = [
    { number: "50,000+", label: "Happy Customers" },
    { number: "200+", label: "Local Partners" },
    { number: "10,000+", label: "Products Available" },
    { number: "99.8%", label: "Customer Satisfaction" }
  ];

  const team = [
    { name: "Sarah Johnson", role: "Founder & CEO", image: "https://images.unsplash.com/photo-1494790108755-2616b612b77c?w=500", bio: "Sarah founded FreshGrocer with a vision to make healthy, fresh food accessible to everyone." },
    { name: "Michael Chen", role: "Head of Operations", image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=500", bio: "Michael ensures our supply chain runs smoothly and efficiently to deliver fresh products on time." },
    { name: "Emily Rodriguez", role: "Head of Customer Experience", image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=500", bio: "Emily leads our customer service team to ensure every interaction exceeds expectations." }
  ];

  return (
    <div className="about-page-container">
      {/* Hero Section */}
      <section className="hero-section section">
        <div className="content-wrapper">
          <span className="hero-badge">About FreshGrocer</span>
          <h1>
            Bringing Fresh Food
            <span className="highlight">To Your Doorstep</span>
          </h1>
          <p>
            Since 2020, we've been committed to providing the freshest groceries, supporting local farmers, and making healthy eating accessible to families across the country.
          </p>
        </div>
      </section>

      {/* Story Section */}
      <section className="story-section section">
        <div className="content-wrapper">
          <div className="content-card">
            <div className="story-section-grid">
              <div className="story-content">
                <h2>Our Story</h2>
                <p>FreshGrocer was born from a simple idea: everyone deserves access to fresh, high-quality groceries without the hassle of crowded stores and long checkout lines.</p>
                <p>What started as a local delivery service has grown into a nationwide platform that connects customers with the finest produce, meats, dairy, and pantry essentials.</p>
                 <p>Today, we're proud to serve over 50,000 families, supporting local communities while making grocery shopping convenient, affordable, and sustainable.</p>
              </div>
              <div>
                <img src="https://images.unsplash.com/photo-1578916171728-46686eac8d58?w=800" alt="Fresh groceries" className="story-image" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="values-section section">
        <div className="content-wrapper">
          <div className="section-header">
            <h2>Our Values</h2>
            <p>These core values guide everything we do, from sourcing products to delivering exceptional service.</p>
          </div>
          <div className="values-grid">
            {values.map((value, index) => (
              <div key={index} className="value-card">
                {value.icon}
                <h3>{value.title}</h3>
                <p>{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Stats Section */}
      <section className="stats-section section">
        <div className="content-wrapper">
          <div className="stats-grid">
            {stats.map((stat, index) => (
              <div key={index}>
                <div className="stat-number">{stat.number}</div>
                <div className="stat-label">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Team Section */}
      <section className="team-section section">
        <div className="content-wrapper">
          <div className="section-header">
            <h2>Meet Our Team</h2>
            <p>The passionate people behind FreshGrocer who work every day to bring you the best shopping experience.</p>
          </div>
          <div className="team-grid">
            {team.map((member, index) => (
              <div key={index} className="team-card">
                <img src={member.image} alt={member.name}/>
                <h3>{member.name}</h3>
                <p className="role">{member.role}</p>
                <p className="bio">{member.bio}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

export default AboutPage;