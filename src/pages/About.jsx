import React from 'react';
import { BsCheckCircle, BsPeople, BsLightbulb, BsShieldCheck, BsGlobe, BsArrowRight } from 'react-icons/bs';
import { FaHandshake } from 'react-icons/fa';
import aboutVideo from '../Accets/about.mp4';

const About = () => {
  return (
    <div className="about-page">

      {/* 1. Hero Section with Video */}
      <section className="about-hero">
        <video
          className="about-hero-video"
          autoPlay
          muted
          loop
          playsInline
        >
          <source src={aboutVideo} type="video/mp4" />
        </video>
        <div className="about-hero-overlay"></div>
        <div className="about-hero-content">
          <span className="about-hero-badge">ABOUT US</span>
          <h1 className="about-hero-title">
            India's #1 Real Estate<br />Job Portal
          </h1>
          <p className="about-hero-subtitle">
            Connecting ambitious professionals with top-tier real estate
            companies across India.
          </p>
        </div>
      </section>

      {/* 2. Who We Are */}
      <section className="about-section about-who">
        <div className="about-container">
          <div className="about-two-col">
            <div className="about-col-text" data-aos="fade-right">
              <span className="about-tag">WHO WE ARE</span>
              <h2 className="about-heading">
                About <span className="about-highlight">RE JOBS</span>
              </h2>
              <p className="about-text">
                <strong>RealEstateJobs</strong> is India's first and only
                exclusive job portal designed for the real estate industry.
                We connect skilled professionals with leading developers,
                brokerage firms, property consultancies, construction companies,
                and proptech startups across India.
              </p>
              <p className="about-text">
                Our mission is to bridge the gap between talent and opportunity
                in the rapidly growing real estate ecosystem. From fresh graduates
                to experienced professionals, we help candidates discover roles
                that align with their skills and career goals.
              </p>
              <div className="about-badges-row">
                <div className="about-badge-item">
                  <BsCheckCircle />
                  <span>Exclusive Portal</span>
                </div>
                <div className="about-badge-item">
                  <BsCheckCircle />
                  <span>Verified Jobs</span>
                </div>
                <div className="about-badge-item">
                  <BsCheckCircle />
                  <span>Pan India Coverage</span>
                </div>
              </div>
            </div>
            <div className="about-col-img" data-aos="fade-left">
              <img
                src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=800"
                alt="Real Estate"
                className="about-feature-img"
              />
            </div>
          </div>
        </div>
      </section>

      {/* 3. Vision & Mission */}
      <section className="about-section about-vm-section">
        <div className="about-container">
          <div className="about-vm-grid">
            <div className="about-vm-card" data-aos="fade-up">
              <div className="about-vm-icon">
                <BsGlobe />
              </div>
              <h3>Our Vision</h3>
              <p>
                To become the most trusted and immediate hub for real estate
                employers to connect with their employees and job seekers.
                We define our vision as being the most reliable platform that
                bridges the gap, empowering careers and fueling business growth.
              </p>
            </div>

            <div className="about-vm-card" data-aos="fade-up" data-aos-delay="100">
              <div className="about-vm-icon">
                <BsLightbulb />
              </div>
              <h3>Our Mission</h3>
              <p>
                To empower people nationwide to find work they love. We strive
                to simplify the hiring process, ensuring compliance, and
                creating a safe environment specific to the real estate sector.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Core Values */}
      <section className="about-section about-values-section">
        <div className="about-container">
          <div className="about-section-header">
            <span className="about-tag">WHAT DRIVES US</span>
            <h2 className="about-heading">
              Our Core <span className="about-highlight">Values</span>
            </h2>
          </div>

          <div className="about-values-grid">
            {[
              { icon: <FaHandshake />, title: 'Service Beyond Self', desc: 'We serve with empathy and prioritize impact through each action we take.' },
              { icon: <BsGlobe />, title: 'Sustainability', desc: 'We are committed to long-term impact and secure practices for all.' },
              { icon: <BsPeople />, title: 'Empowerment', desc: 'We believe in encouraging individuals and leading teams to grow.' },
              { icon: <BsShieldCheck />, title: 'Integrity', desc: 'Upholding strict standards of honesty, ethics, and trust.' },
              { icon: <BsCheckCircle />, title: 'Accountability', desc: 'We take full responsibility for our actions and outcomes.' },
              { icon: <BsLightbulb />, title: 'Transparency', desc: 'We value truth, research, and honesty in all interactions.' },
            ].map((val, i) => (
              <div className="about-value-card" key={i} data-aos="fade-up" data-aos-delay={i * 80}>
                <div className="about-value-icon">{val.icon}</div>
                <h5>{val.title}</h5>
                <p>{val.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. What We Offer */}
      <section className="about-section about-offer-section">
        <div className="about-container">
          <div className="about-section-header">
            <span className="about-tag-light">FOR YOU</span>
            <h2 className="about-heading-light">What We Offer</h2>
          </div>

          <div className="about-offer-grid">
            {[
              { title: 'Exclusive Real Estate Focus', desc: 'Dedicated purely to the real estate industry, understanding its unique needs unlike generic portals.' },
              { title: 'Comprehensive Career Opportunities', desc: 'From entry-level to leadership roles, we cover sales, marketing, tech, legal, and more.' },
              { title: 'Smart & User-Friendly Platform', desc: 'Technology-driven platform ensuring relevant matches using advanced filters and algorithms.' },
              { title: 'Invaluable Resources', desc: 'Skill assessments, resume support, and career guidance tailored for real estate professionals.' },
            ].map((item, i) => (
              <div className="about-offer-card" key={i} data-aos="fade-up" data-aos-delay={i * 80}>
                <span className="about-offer-num">0{i + 1}</span>
                <h4>{item.title}</h4>
                <p>{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. CTA */}
      <section className="about-section about-cta-section">
        <div className="about-container">
          <div className="about-cta-box" data-aos="zoom-in">
            <h2>Ready to Start Your Journey?</h2>
            <p>
              Whether you're a job seeker or a recruiter, we're here to
              help you find the perfect match in real estate.
            </p>
            <div className="about-cta-btns">
              <a href="/jobs" className="about-cta-btn primary">
                <BsPeople /> Browse Jobs <BsArrowRight />
              </a>
              <a href="/contact" className="about-cta-btn secondary">
                <FaHandshake /> Contact Us <BsArrowRight />
              </a>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
};

export default About;